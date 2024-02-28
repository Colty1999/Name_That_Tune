import { useStorageState } from '../../../../hooks/useStorageState';
import Modal from 'react-modal';
import './configurationModal.scss';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface ConfigurationModalProps {
    show: boolean;
    handleClose: () => void;
}

function ConfigurationModal({ show, handleClose }: ConfigurationModalProps) {
    Modal.setAppElement('#root');
    const [t] = useTranslation();
    let tracks = useStorageState({ state: "tracks" });

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([tracks.store ? tracks.store : ""], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "NameThatTuneSettings.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    //-----------------

    const uploadFile = async (e: any) => {
        e.preventDefault();
        const reader = new FileReader()
        reader.onload = async (e) => {
            if (!e.target) return;
            const text = (e.target.result);
            if (typeof (text) === 'string') {
                try {
                    JSON.parse(text);
                } catch (e) {
                    console.error(e);
                    return;
                }
                tracks.setStorageState(text);
            }
        };
        reader.readAsText(e.target.files[0])
    }

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = () => {
        if (!hiddenFileInput.current) return;
        hiddenFileInput.current.click();
    };

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
            <div className="modalHeader">{t('config.modal.settings')}</div>
            <div className="modalBody">
                <button onClick={downloadTxtFile} >{t('config.modal.download')}</button>
                <div>{t('config.modal.downloadmsg')}</div>
                <button onClick={handleClick}>{t('config.modal.upload')}</button>
                <div>{t('config.modal.uploadmsg')}</div>
                {/* <button onClick={resetClues}>Reset clues</button>
                <div> - Resets clues :)</div> */}
                <input
                    type="file"
                    name="myFile"
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                    onChange={uploadFile} />
            </div>
            <div className="modalFooter">
                <button onClick={handleClose}>{t('config.modal.close')}</button>
            </div>
        </Modal>
    );
}

export default ConfigurationModal;