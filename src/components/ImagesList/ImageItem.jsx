import css from "./css.module.css"
import {HOST_URL} from "../../api"
import ButtonDelete from "../UI/ButtonDelete/ButtonDelete"


const ImageItem = ({src, editMode, index, deleteHandle, id}) => {
    return (
        <>
            {
                editMode
                    ? <div className={css.imageItemWrapper}>
                        <div
                            className={css.imageItem}
                            style={{backgroundImage: `url(${HOST_URL}imgs/${id}/${src})`}}
                        />
                        <ButtonDelete onClick={deleteHandle(index)}>
                            delete
                        </ButtonDelete>
                    </div>
                    : <div
                        className={css.imageItem}
                        style={{backgroundImage: `url(${HOST_URL}imgs/${id}/${src})`}}
                    />
            }
        </>
    )
}
export default ImageItem