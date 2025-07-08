import { useAppContext } from "../../contex/AppContext";

export const ItemList = () => {

    const {
        stringList,
        stringsSelected,
        handleClickItem,
        handleDeleteStringDoubleClick
    } = useAppContext()

    return <ul className='string-list__content'>
        {stringList.map((string) => {
            return <li
                key={`${string.id}-${string.value}`}
                className={`string-list__item ${stringsSelected.find((item) => item === string.id) && "selected"}`}
                onClick={() => handleClickItem(string)}
                onDoubleClick={() => handleDeleteStringDoubleClick(string.id)}
            >
                {string.value}
            </li>
        })}
    </ul>
}