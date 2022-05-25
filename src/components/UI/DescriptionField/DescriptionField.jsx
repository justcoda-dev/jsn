import css from "./css.module.css"
import {firstLetterUp} from "../../../functions/stringFunctions"

const DescriptionField = ({name, text}) => {

    return (
        <>
            {
                name && text
                    ? <div className={css.field}>
                        <b><span className={css.name}>{firstLetterUp(name)}</span></b>
                        <span className={css.name}>{` : ${firstLetterUp(text)}`}</span>
                    </div>
                    : "no text"
            }
        </>
    )
}
export default DescriptionField