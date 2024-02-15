import {FC} from 'react';
import folderClosedImg from '@assets/img/folder-closed.svg'
import folderOpenedImg from '@assets/img/folder-opened.svg'
import cameraDisabledImg from '@assets/img/camera-disabled.svg'
import cameraEnabledImg from '@assets/img/camera-enabled.svg'
import arrowClosedImg from '@assets/img/arrow-closed.svg'
import arrowOpenedImg from '@assets/img/arrow-opened.svg'
import eventsGroupImg from '@assets/img/events-group.svg'
import realtimeImg from '@assets/img/realtime.svg'

interface IType {
    type?: 'folder' | 'camera'
    isExpanded: boolean
}

const Icon: FC<IType> = ({type, isExpanded}) => {


    const getIcon = (type: any) => {
        switch (type) {
            case 'folder':
                return folderClosedImg
            case 'folder_opened':
                return folderOpenedImg
            case 'arrow_closed':
                return arrowClosedImg
            case 'arrow_opened':
                return arrowOpenedImg
            case 'camera':
                return cameraDisabledImg
            case 'camera_enabled':
                return cameraEnabledImg
            case 'events_group':
                return eventsGroupImg
            case 'realtime':
                return realtimeImg
            default:
                return arrowClosedImg
        }
    }

    const src = !isExpanded && type === 'folder' ? getIcon('folder') :
        isExpanded && type === 'folder' ? getIcon('folder_opened') :
            !isExpanded && type === 'camera' ? getIcon('camera') :
                isExpanded && type === 'camera' ? getIcon('camera_enabled') : getIcon(type)

    return (
        <img src={src} alt="icon" className={isExpanded ? 'rotate-90' : ''}/>
    );
};

export default Icon;

