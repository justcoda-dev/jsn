import css from "./css.module.css"
import {useState} from "react"

const invalidStyle = {
    borderColor: "#ff0000"
}
const InputPassword = ({value, onChange, error, defaultValue, placeholder}) => {
    const [show, setShow] = useState(false)
    const type = (status) => {
        return {
            false: "text",
            true: "password"
        }[status]
    }
    const showPassword = () => {
        setShow(!show)
    }
    return (
        <div className={css.inputWrapper}>
            <input
                type={type(show)}
                className={css.input}
                style={!error ? null : invalidStyle}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                placeholder={placeholder}
            />
            <button className={css.button} onClick={showPassword}>{show ? "show" : "hide"}</button>
            {!error ? null : <span className={css.error}>{error}</span>}
        </div>
    )
}
export default InputPassword