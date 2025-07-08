import './App.css';
import Modal from './components/modal/modal';
import { useAppContext } from './contex/AppContext';

function App() {

  const {
    stringList,
    stringsSelected,
    handleClickItem,
    handleOpenModal,
    handleBackString,
    handleDeleteString,
    handleDeleteStringDoubleClick,
  } = useAppContext();

  return (
    <div className="app">
      <div className="app-content">
        <div className='string-list__container'>
          <div className='string-list__title'>String List</div>
          <div className='string-list__content'>
            {stringList.map((string) => {
              return <p
                key={`${string.id}-${string.value}`}
                  className={`string-list__item ${stringsSelected.find((item) => item === string.id) && "selected"}`}
                onClick={() => handleClickItem(string)}
                onDoubleClick={() => handleDeleteStringDoubleClick(string.id)}
              >
                {string.value}
              </p>
            })}
          </div>
          <div className='string-list__btnGroup'>
            <div className='string-list__btnContainer1'>
              <button className='string-list__backBtn' aria-label='undo last step' onClick={() => handleBackString()}>
                ↻
              </button>
              <button className='string-list__cancelBtn' aria-label='delete items' onClick={() => handleDeleteString()}>Delete</button>
            </div>
            <button className='string-list__addBtn' aria-label='open create item modal' onClick={() => handleOpenModal()}>Add Item</button>
          </div>
        </div>
      </div>

      <Modal />
    </div>
  );
}

export default App;
