import {useState} from "react";

const useInputImage = () => {
    const [images, setImages] = useState(null)
    const handleChange = ({target: {files}}) => {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i])
        }
        setImages(formData)
    }
    const clearImages = () => setImages(null)
    return [images, handleChange, clearImages]
}
export default useInputImage;