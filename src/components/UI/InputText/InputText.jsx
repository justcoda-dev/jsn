import css from "./css.module.css"

const invalidStyle = {
    borderColor: "#ff0000"
}
const InputText = ({value, onChange, error, defaultValue, placeholder}) => {

    return (
        <div className={css.inputWrapper}>
            <input
                type="text"
                className={css.input}
                style={!error ? null : invalidStyle}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
            />
            {!error ? null : <span className={css.error}>{error}</span>}
        </div>
    )
}
export default InputText