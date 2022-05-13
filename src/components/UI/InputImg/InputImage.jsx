import css from "./css.module.css"

const InputImage = ({onChange, value}) => {
    return (
        <input value={value} onChange={onChange} className={css.inputImg} type="file" multiple/>
    )
}
export default InputImage;