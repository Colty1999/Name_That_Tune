import Modal from 'react-modal';
import './errorModal.scss';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AppContext } from '../../App';


function ErrorModal() {
    Modal.setAppElement('#root');
    const [t] = useTranslation();
    const {error, setError} = useContext(AppContext);

    const handleReload = () => {
        setError("");
        location.reload();
    }


    return (
        <Modal
            isOpen={!!error}
            // onAfterOpen={afterOpenModal}
            onRequestClose={handleReload}
            // style={customStyles}
            contentLabel="Error modal"
            className="errorModalContainer"
            overlayClassName="overlayContainer"
        >
            <div className="modalHeader">Oooops</div>
            <div className="modalBody">
                <h3>An error has occurred :(</h3>
                <div>{error}</div>
            </div>
            <div className="modalFooter">
                <button onClick={handleReload}>Refresh page</button>
                <button onClick={() => setError("")}>Close</button>
            </div>
        </Modal>
    );
}

export default ErrorModal;
