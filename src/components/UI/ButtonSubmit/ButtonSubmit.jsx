import css from "./css.module.css"

const ButtonSubmit = ({onClick, children, disabled}) => {
    return (
        <button
            disabled={disabled}
            className={css.button}
            onClick={onClick}>
            {children || "submit"}
        </button>
    )
}
export default ButtonSubmit;