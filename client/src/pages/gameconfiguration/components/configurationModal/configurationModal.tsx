import { useStorageState } from '../../../../hooks/useStorageState';
import Modal from 'react-modal';

interface ConfigurationModalProps {
    show: boolean;
    handleClose: () => void;
}

function ConfigurationModal({ show, handleClose }: ConfigurationModalProps) {
    let tracks = useStorageState({ state: "tracks" });

    return (
        <Modal
        isOpen={show}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleClose}
        // style={customStyles}
        contentLabel="Example Modal"
        className="modal"
      >
        <h2>Hello</h2>
        <button onClick={handleClose}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    );
}

export default ConfigurationModal;