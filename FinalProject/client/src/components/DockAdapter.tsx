import React from 'react'
import Dock from '../othersComponents/dock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faGear, faHome, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useControls } from 'react-zoom-pan-pinch';

interface incomingParams {
    button1?: () => void,
    button2?: () => void,
    button3?: () => void
}

const DockAdapter: React.FC<incomingParams> = ({button1, button2, button3 }) => {
    const { resetTransform, centerView } = useControls()
    const items = [
        { icon: <FontAwesomeIcon icon={faHome} />, label: 'reset', onClick: () => resetTransform() },
        { icon: <FontAwesomeIcon icon={faCrosshairs} />, label: 'center', onClick: () => centerView() },
        { icon: <FontAwesomeIcon icon={faPlus} />, label: 'add marker', onClick: () => { if(button1){ button1() } } },
        { icon: <FontAwesomeIcon icon={faGear} />, label: 'edit marker', onClick: () => { if(button2){ button2() } } },
        { icon: <FontAwesomeIcon icon={faMinus} />, label: 'delete marker', onClick: () => { if(button3){ button3() } } },
      ];
    return (
        <div className='bottom-middle-screen'>
            <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70}></Dock>
        </div>
    )
}

export default DockAdapter