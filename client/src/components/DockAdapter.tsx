import React from 'react'
import Dock from '../othersComponents/dock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faFaceSmile, faHome, faPerson } from '@fortawesome/free-solid-svg-icons';

interface incomingParams {
    button1?: () => void,
    button2?: () => void,
    button3?: () => void,
    button4?: () => void,
}

const DockAdapter: React.FC<incomingParams> = ({button1, button2, button3, button4}) => {
    const items = [
        { icon: <FontAwesomeIcon icon={faHome} />, label: 'Home', onClick: () => { if(button1){ button1() } }},
        { icon: <FontAwesomeIcon icon={faFaceSmile} />, label: 'Archive', onClick: () => { if(button2){ button2() } } },
        { icon: <FontAwesomeIcon icon={faPerson} />, label: 'Profile', onClick: () => { if(button3){ button3() } } },
        { icon: <FontAwesomeIcon icon={faCircleInfo} />, label: 'Settings', onClick: () => { if(button4){ button4() } } },
      ];
    return (
        <div className='bottom-middle-screen'>
            <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70}></Dock>
        </div>
    )
}

export default DockAdapter