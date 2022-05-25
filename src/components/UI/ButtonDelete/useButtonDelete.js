import {useState} from "react"

const useButtonDelete = () => {
    const [disabled, setDisabled] = useState(false)
    return [disabled, setDisabled]
}
export default useButtonDelete