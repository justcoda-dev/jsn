import css from "./css.module.css"

const InputImage = ({onChange}) => {
    // const formData = new FormData();
    // for (let i = 0; i < fileInput.current.files.length; i++) {
    //     formData.append("files", fileInput.current.files[i])
    // }
    // const {message} = await request.upload.uploadSuperHeroImg(formData)
    // return message
    return (
        <input onChange={onChange} className={css.inputImg} type="file" multiple/>
    )
}
export default InputImage;