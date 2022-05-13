import {useState} from "react";

const useInputImage = () => {
    const [images, setImages] = useState(null)
    const [imagesValue, setImagesValue] = useState("")
    const handleChange = ({target: {files, value}}) => {
        setImagesValue(value)
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i])
        }
        setImages(formData)
    }
    const clearImages = () => {
        setImages(null)
        setImagesValue("")
    }
    return [images, handleChange, clearImages, imagesValue]
}
export default useInputImage;