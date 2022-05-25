import {useState} from "react"

const useInputImage = () => {
    const [images, setImages] = useState(null)
    const [imagesValue, setImagesValue] = useState("")
    const [imagesArr, setImagesArr] = useState([])
    const handleChange = ({target: {files, value}}) => {
        setImagesValue(value)

        const arr = []
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i])

            arr.push(files[i].name)
        }

        setImages(formData)
        setImagesArr([...arr])
    }
    const clearImages = () => {
        setImages(null)
        setImagesValue("")
        setImagesArr([])
    }
    return {images, handleChange, clearImages, imagesValue, imagesArr}
}
export default useInputImage