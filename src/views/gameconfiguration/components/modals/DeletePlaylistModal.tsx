"use client";

import Modal from 'react-modal';
import './modals.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface ConfigurationModalProps {
    show: boolean;
    id: string;
    deletePlaylist: (id: string) => void;
    fetchAndSetPlaylists: () => void;
    handleClose: () => void;
}

function DeletePlaylistModal({ show, id, deletePlaylist, fetchAndSetPlaylists, handleClose }: ConfigurationModalProps) {
    Modal.setAppElement('#root');
    const [t] = useTranslation();

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <DeletePlaylistSuccessModal show={showModal} handleClose={() => setShowModal(false)} />
            <Modal
                isOpen={show}
                // onAfterOpen={afterOpenModal}
                onRequestClose={handleClose}
                // style={customStyles}
                contentLabel="Game configuration modal"
                className="modalContainer"
                overlayClassName="overlayContainer"
            >
                <div className="modalHeader">{t('config.modal.deletequestion')}</div>
                {/* <div className="modalBody">
                Playlist saved successfully!
            </div> */}
                <div className="modalFooter">
                    <button onClick={() => { deletePlaylist(id); fetchAndSetPlaylists(); setShowModal(true); handleClose() }}>{t('config.modal.delete')}</button>
                    <button onClick={handleClose}>{t('config.modal.close')}</button>
                </div>
            </Modal>
        </>
    );
}

function DeletePlaylistSuccessModal({ show, handleClose }: { show: boolean, handleClose: () => void }) {
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
            <div className="modalHeader">{t('config.modal.deleted')}</div>
            {/* <div className="modalBody">
                            Playlist saved successfully!
                        </div> */}
            <div className="modalFooter">
                <button onClick={handleClose}>{t('config.modal.close')}</button>
            </div>
        </Modal>
    );
}

export default DeletePlaylistModal;
