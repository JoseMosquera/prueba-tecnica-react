import { useAppContext } from "../../contex/AppContext";

import "./modal.css"

export const Modal = () => {

    const {
        newString,
        dialogRef,
        setNewString,
        handleAddString,
      } = useAppContext();

    return <dialog id='modal' ref={dialogRef} className='create-modal'>
        <p className='create-modal__title'>Add new item to the list</p>
        <input value={newString} onChange={(ev) => setNewString(ev.target.value)} className='create-modal__input' placeholder='Type the text here...' />
        <div className='create-modal__btnGroup'>
            <div className='create-modal__btnContainer'>
                <button className='create-modal__addBtn' aria-label="add item" disabled={newString.trim() === ''} onClick={() => handleAddString()}>Add</button>
                <button className='create-modal__cancelBtn' aria-label="cancel" onClick={() => dialogRef.current?.close()}>Cancel</button>
            </div>
        </div>
    </dialog>
}

export default Modal
