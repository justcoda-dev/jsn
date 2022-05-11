import css from "./css.module.css"

const invalidStyle = {
    borderColor: "red"
}
const InputText = ({value, onChange, error, valid, defaultValue, placeholder}) => {

    return (
        <div className={css.inputWrapper}>
            <input
                type="text"
                className={css.input}
                style={valid ? null : invalidStyle}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
            />
            {valid ? null : <span className={css.error}>{error}</span>}
        </div>
    )
}
export default InputText