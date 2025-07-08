import type { FC } from "react";
import { useAppContext } from "../../contex/AppContext";

export const Item: FC<{string: {id: string, value: string}}> = ({string}) => {

    const {
        stringsSelected,
        handleClickItem,
        handleDeleteStringDoubleClick
    } = useAppContext()

    return <li
        key={`${string.id}-${string.value}`}
        className={`string-list__item ${stringsSelected.find((item) => item === string.id) && "selected"}`}
        onClick={() => handleClickItem(string)}
        onDoubleClick={() => handleDeleteStringDoubleClick(string.id)}
    >
        {string.value}
    </li>
}