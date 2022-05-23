import css from "./css.module.css"
import ImageItem from "./ImageItem"

const ImagesList = ({imagesList, editMode, deleteHandle, id}) => {
    return (
        <div className={css.wrapper}>
            {imagesList.map((src, index) =>
                <ImageItem
                    id={id}
                    deleteHandle={deleteHandle}
                    editMode={editMode}
                    key={index}
                    index={index}
                    src={src}
                />)}
        </div>
    )
}
export default ImagesList;