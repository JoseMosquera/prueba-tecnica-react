import { useAppContext } from "../../contex/AppContext";
import { Item } from "../item/item";

export const ItemList = () => {

    const {
        stringList,
    } = useAppContext()

    return <ul className='string-list__content'>
        {stringList.map((string) => {
            return <Item string={string} />
        })}
    </ul>
}