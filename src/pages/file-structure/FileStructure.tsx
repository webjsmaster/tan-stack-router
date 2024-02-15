import {ChangeEvent, MouseEvent, useEffect, useRef, useState} from 'react'


import styles from './FileStructure.module.scss'

// import {moveNode, renameNodeInTreeByUniqueId, sortTree, transformRawJSONToAddUniqueIds,} from './helpers'
import cn from "classnames";
import {data} from "@/utils/variables.ts";
import {moveNode, renameNodeInTreeByUniqueId, sortTree, transformRawJSONToAddUniqueIds} from "@/utils/helpers.ts";
import Checkbox from "@/pages/file-structure/check-box/CheclBox.tsx";
import Icon from "@/pages/file-structure/icon/Icon.tsx";


const FileStructure = () => {
    const [tree, setTree] = useState([])
    const [expandedNodes, setExpandedNodes] = useState<string[]>([])

    const handleExpandCollapse = (e: MouseEvent<HTMLDivElement>) => {
        !expandedNodes.includes(e.currentTarget.dataset.uniqueId as string)
            ? setExpandedNodes([...expandedNodes, e.currentTarget.dataset.uniqueId as string])
            : setExpandedNodes(expandedNodes.filter((x) => x !== e.currentTarget.dataset.uniqueId))
    }

    useEffect(() => {
        // get('/tree').then((res) => {
        //     if (!res) return
        //     const {results: tree} = res
        //     setTree(transformRawJSONToAddUniqueIds(tree))
        // })


        setTree(transformRawJSONToAddUniqueIds(JSON.parse(data)))
    }, [])

    const [renamingNowUniqueId, setRenamingNowUniqueId] = useState<string | undefined>('')
    const [renamingNowValue, setRenamingNowValue] = useState<string>('')
    const treeWrapperRef = useRef<HTMLDivElement>(null)

    const handleStartRenameNode = (e: MouseEvent<HTMLDivElement>) => {
        console.log('[43] 🎯: ')
        setRenamingNowUniqueId(e.currentTarget.dataset.uniqueId as string)
        setRenamingNowValue(e.currentTarget.dataset.value as string)


        if (treeWrapperRef.current) {
            const input = treeWrapperRef.current.querySelector(`input[data-unique-id="${e.currentTarget.dataset.uniqueId}"]`)
            // if (input) setTimeout(() => input.focu(), 100)
        }
    }

    const handleChangeNodeName = (e: ChangeEvent<HTMLInputElement>) => setRenamingNowValue(e.target.value)

    const catchControlKeysWhenEditNodeName = (e) => {
        if (e.key === 'Enter') {
            let newTree
            newTree = renameNodeInTreeByUniqueId(tree, e.currentTarget.dataset.uniqueId, renamingNowValue)
            newTree = sortTree(newTree)

            setTree(newTree)
            // post('/tree/update', { newTree: JSON.stringify(newTree) }
        }

        if (e.key === 'Enter' || e.key === 'Escape') undoRenaming()
    }

    const undoRenaming = () => {
        setRenamingNowUniqueId(undefined)
        setRenamingNowValue('')
    }

    const [nowDraggingUniqueId, setNowDraggingUniqueId] = useState()
    const [nowDragOverUniqueId, setNowDragOverUniqueId] = useState()
    const [nowDragOverType, setNowDragOverType] = useState()
    //
    const handleDragStartNodeRow = (e) => {
        setNowDraggingUniqueId(e.currentTarget.dataset.uniqueId)
        setNowDragOverUniqueId(e.currentTarget.dataset.uniqueId)
    }
    //
    const handleDragEnterNodeRow = (e) => {
        if (nowDraggingUniqueId !== e.currentTarget.dataset.uniqueId) {
            setNowDragOverUniqueId(e.currentTarget.dataset.uniqueId)
            setNowDragOverType(e.currentTarget.dataset.type)
        } else {
            setNowDragOverUniqueId(nowDraggingUniqueId)
        }
    }

    const handleDragEndNodeRow = () => {
        if (nowDraggingUniqueId !== nowDragOverUniqueId && nowDragOverType === 'folder') {
            let newTree
            newTree = moveNode(tree, nowDraggingUniqueId, nowDragOverUniqueId)
            newTree = sortTree(newTree)
            setTree(newTree)

        }

        setNowDraggingUniqueId(undefined)
        setNowDragOverUniqueId(undefined)
        setNowDragOverType(undefined)
    }

    const buildTree = (tree: any, isRealtime?: boolean) => {

        const mappedNodes = tree.map((node) => {
            const isExpanded = expandedNodes.includes(node.uniqueId)
            const isFolderOrCamera = node.type === 'folder' || node.type === 'camera'
            const isEvent = node.type === 'events_group'
            const isInputDisabled = renamingNowUniqueId !== node.uniqueId
            const isReadyToDrop = nowDragOverUniqueId === node.uniqueId && node.type === 'folder' && nowDragOverUniqueId !== node.parentUniqueId


            return (
                <div
                    key={node.uniqueId}
                    className={cn(styles.node, !isExpanded ? 'h-10' : 'h-auto', isFolderOrCamera && styles.hasVerticalLine)}>
                    <div
                        data-unique-id={node.uniqueId}
                        data-type={node.type}
                        draggable={isFolderOrCamera}
                        onDragStart={handleDragStartNodeRow}
                        onDragEnter={handleDragEnterNodeRow}
                        onDragEnd={handleDragEndNodeRow}
                        className={cn(styles.nodeRow, isReadyToDrop ? 'bg-[#FF820E55]' : 'bg-transparent')}
                    >
                        {isFolderOrCamera ? (
                            <div onClick={handleExpandCollapse} data-unique-id={node.uniqueId} className={styles.arrow}>
                                <div className={styles.iconWrapper}>
                                    <Icon isExpanded={isExpanded}/>
                                </div>
                            </div>
                        ) : isEvent ? (
                            <div className={styles.checkboxWrapper}>
                                <Checkbox/>
                            </div>
                        ) : <div className={styles.arrowFiller}></div>}

                        <div className={styles.iconWrapper}>
                            <Icon type={node.type} isExpanded={isExpanded}/>
                        </div>

                        <div
                            onDoubleClick={(e) => handleStartRenameNode(e)}
                            data-unique-id={node.uniqueId}
                            data-value={node.name}
                            className={cn(styles.nodeName, isInputDisabled && styles.isInputDisabled)}
                        >
                            <input
                                data-unique-id={node.uniqueId}
                                value={(renamingNowUniqueId === node.uniqueId ? renamingNowValue : node.name)}
                                onChange={handleChangeNodeName}
                                onKeyDown={catchControlKeysWhenEditNodeName}
                                onBlur={undoRenaming}
                                disabled={isInputDisabled}
                                className={isInputDisabled ? 'cursor-pointer, text-[#aaa]' : 'cursor-auto, text-[#333]'}
                            />
                        </div>
                    </div>

                    {node.contains ? buildTree(node.contains, !!node.realtime) : null}
                </div>
            )
        })

        if (isRealtime) {
            mappedNodes.unshift(
                <div key={Math.random()} className={styles.node}>
                    <div className={styles.nodeRow}>
                        <div className={styles.arrowFiller}></div>
                        <div className={styles.iconWrapper}>
                            <Icon isExpanded={tree}/>
                        </div>
                        <div className={styles.arrowFillerRealtime}></div>
                        <span>Прямой эфир</span>
                    </div>
                </div>
            )
        }

        return mappedNodes
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.treeWrapper} ref={treeWrapperRef}>
                    {/*{tree.length*/}
                    {/*    ? buildTree(tree)*/}
                    {/*    : <NoData>Нет данных</NoData>*/}
                    {/*}*/}

                    {buildTree(tree)}
                </div>
            </div>
        </div>
    )
}

export default FileStructure;
