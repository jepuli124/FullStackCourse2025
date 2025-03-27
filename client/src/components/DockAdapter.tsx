import React from 'react'
import Dock from '../othersComponents/dock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFaceSmile, faHome, faPerson } from '@fortawesome/free-solid-svg-icons';

const DockAdapter: React.FC = () => {
    const items = [
        { icon: <FontAwesomeIcon icon={faHome} />, label: 'Home', onClick: () => alert('Home!') },
        { icon: <FontAwesomeIcon icon={faFaceSmile} />, label: 'Archive', onClick: () => alert('Archive!') },
        { icon: <FontAwesomeIcon icon={faPerson} />, label: 'Profile', onClick: () => alert('Profile!') },
        { icon: <FontAwesomeIcon icon={faCheck} />, label: 'Settings', onClick: () => alert('Settings!') },
      ];
    return (
        <div className='bottom-middle-screen'>
            <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70}></Dock>
        </div>
    )
}

export default DockAdapter