import css from "./css.module.css"
import EditImagesItem from "./EditImagesItem";

const EditImagesList = ({arrList}) => {
    return (
        <ul className={css.list}>
            {arrList.map((item, index) => <EditImagesItem itemSrc={item} key={index}/>)}
        </ul>
    )
}
export default EditImagesList;