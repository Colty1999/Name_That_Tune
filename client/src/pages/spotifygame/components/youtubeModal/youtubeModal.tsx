import Modal from 'react-modal';
import YouTube from "react-youtube";
import { useTranslation } from 'react-i18next';
import './youtubeModal.scss';

interface ConfigurationModalProps {
    show: boolean;
    handleClose: () => void;
    id: string;
}

function YoutubeModal({ show, handleClose, id }: ConfigurationModalProps) {
    Modal.setAppElement('#root');
    
    const [t] = useTranslation();

    const onPlayerReady = (event:any) => {
        const player = event.target;
        player.pauseVideo();
    };

    const onPlayerStateChange = (event:any) => {
        const player = event.target;
        player.playVideo();
    };

    const options = {
        height: "100%",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    console.log(id)

    return (
        <Modal
            isOpen={show}
            // onAfterOpen={afterOpenModal}
            onRequestClose={handleClose}
            // style={customStyles}
            contentLabel="Example Modal"
            className="youtubeModalContainer"
            overlayClassName="overlayContainer"
        >
            <div className="modalHeader">{t('game.modal.name')}</div>
            <div className="modalBody">
            <YouTube
                videoId={id.substring(id.indexOf("watch?v=") + 8)}
                opts={options}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange}
                style={{ width: "100%", height: "100%" }}
            />
            </div>
            {/* <div className="modalFooter"> */}
                {/* <button onClick={handleClose}>{t('config.modal.close')}</button> */}
            {/* </div> */}
        </Modal>
    );
}

export default YoutubeModal;