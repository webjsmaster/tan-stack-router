import {uuidv4} from "@/utils/uuid.ts";

export const moveNode = (tree, whatToMoveUniqueId, whereToMoveUniqueId) => {
    const [
        nodeWithGivenUniqueId,
        treeWithoutNodeWithGivenUniqueId
    ] = findNodeByUniqueIdAndRemoveFromTree(tree, whatToMoveUniqueId)

    return insertGivenNodeIntoNodeWithGivenUniqueId(
        treeWithoutNodeWithGivenUniqueId,
        nodeWithGivenUniqueId,
        whereToMoveUniqueId
    )
}

export const sortTree = (tree) => {
    const walkOnTree = (tree) => {
        return tree.map((node) => {
            const {contains, ...nodeWithoutContains} = node

            const newNodeState = {...nodeWithoutContains}

            if (node.type === 'folder' || node.type === 'camera') {
                newNodeState.contains = []
            }

            if (contains && contains.length) {
                const sortFunc = (a, b) => {
                    if (a.name < b.name) return -1
                    if (a.name > b.name) return 1
                    return 0
                }

                const onlyFolders = contains.filter((node) => node.type === 'folder').sort(sortFunc)
                const restNodes = contains.filter((node) => node.type !== 'folder').sort(sortFunc)

                newNodeState.contains = walkOnTree([
                    ...onlyFolders,
                    ...restNodes,
                ])
            }

            return newNodeState
        })
    }

    return walkOnTree(tree)
}

export const renameNodeInTreeByUniqueId = (tree, uniqueId, newName) => (
    tree.map((node) => {
        if (node.uniqueId === uniqueId) {
            return {
                ...node,
                name: newName,
            }
        } else if (node.contains) {
            return {
                ...node,
                contains: renameNodeInTreeByUniqueId(node.contains, uniqueId, newName)
            }
        } else {
            return node
        }
    })
)

export const transformRawJSONToAddUniqueIds = (tree: any) => {
    if (!tree) return []

    return tree.map((node) => {
        const newNode = {
            ...node,
            uniqueId: uuidv4(),
        }

        if (node.contains) {
            newNode.contains = transformRawJSONToAddUniqueIds(node.contains)
        }

        return newNode
    })
}

const findNodeByUniqueIdAndRemoveFromTree = (tree, targetUniqueId) => {
    let removedNode
    let treeWithoutRemovedNode: any

    const walkOnTree = (tree, targetUniqueId) => {
        // Firstly, filter current level of tree to remove target and save it for return
        const filteredTree = tree.filter((node: HTMLElement) => {
            if (node.uniqueId === targetUniqueId) {
                removedNode = node
                return false
            }

            return true
        })

        // Map our countains props for every object in given tree and return it
        return filteredTree.map((node: HTMLElement) => {
            const {contains, ...nodeWithoutContains} = node

            const returnObj = {...nodeWithoutContains, contains: []}

            if (contains) {
                returnObj.contains = walkOnTree(contains, targetUniqueId)
            }

            return returnObj
        })
    }

    // eslint-disable-next-line prefer-const
    treeWithoutRemovedNode = walkOnTree(tree, targetUniqueId)

    return [removedNode, treeWithoutRemovedNode]
}

const insertGivenNodeIntoNodeWithGivenUniqueId = (tree, nodeToInsert, whereToInsertUniqueId) => {
    const walkOnTree = (tree, nodeToInsert, whereToInsertUniqueId) => {
        return tree.map((node) => {
            const {contains, ...nodeWithoutContains} = node

            const newNodeState = {...nodeWithoutContains}

            if (node.type === 'folder' || node.type === 'camera') {
                newNodeState.contains = []
            }

            if (node.uniqueId === whereToInsertUniqueId) {
                newNodeState.contains = [
                    ...contains,
                    nodeToInsert,
                ]
            } else if (contains && contains.length) {
                newNodeState.contains = walkOnTree(contains, nodeToInsert, whereToInsertUniqueId)
            }

            return newNodeState
        })
    }

    return walkOnTree(tree, nodeToInsert, whereToInsertUniqueId)
}
