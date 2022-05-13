import css from "./css.module.css"
import {firstLetterUp} from "../../../functions/stringFunctions";
import {useMemo} from "react";

const DescriptionField = ({name, text}) => {

    // const nameFirstLetterUp = useMemo(() => firstLetterUp(name), [name])
    // const textUpper = useMemo(() => firstLetterUp(text), [text])

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
export default DescriptionField;