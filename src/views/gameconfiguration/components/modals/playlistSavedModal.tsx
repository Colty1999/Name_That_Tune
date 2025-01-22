"use client";

import Modal from 'react-modal';
import './modals.scss';
import { useTranslation } from 'react-i18next';

interface ConfigurationModalProps {
    show: boolean;
    handleClose: () => void;
}

function PlaylistSavedModal({ show, handleClose }: ConfigurationModalProps) {
    Modal.setAppElement('#root');
    const [t] = useTranslation();


    return (
        <Modal
            isOpen={show}
            // onAfterOpen={afterOpenModal}
            onRequestClose={handleClose}
            // style={customStyles}
            contentLabel="Game configuration modal"
            className="modalContainer"
            overlayClassName="overlayContainer"
        >
            <div className="modalHeader">{t('config.modal.saved')}</div>
            {/* <div className="modalBody">
                Playlist saved successfully!
            </div> */}
            <div className="modalFooter">
                <button onClick={handleClose}>{t('config.modal.close')}</button>
            </div>
        </Modal>
    );
}

export default PlaylistSavedModal;
