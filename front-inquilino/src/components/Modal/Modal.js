import './Modal.css'
const Modal = ({children, setShowModal}) => {
    return(
        <div className="modal-background" onClick={() => setShowModal(false)}>
            <div className="modal-foreground" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal