import css from "./css.module.css"

const ButtonDelete = ({onClick, disabled, children}) => {

    return (
        <button onClick={onClick} className={css.delete} disabled={disabled}>{children || "x"}</button>
    )
}
export default ButtonDelete;