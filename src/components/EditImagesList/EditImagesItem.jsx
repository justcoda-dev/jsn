import css from "./css.module.css"
import ButtonDelete from "../UI/ButtonDelete/ButtonDelete"

const EditImagesItem = ({itemSrc}) => {
    return (
        <li className={css.item}>{itemSrc}<ButtonDelete/></li>
    )
}
export default EditImagesItem