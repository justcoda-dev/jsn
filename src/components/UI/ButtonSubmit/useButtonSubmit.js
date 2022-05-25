import {useState} from "react"

const useButtonSubmit = (initialState) => {
    const [disabled, setDisabled] = useState(initialState || false)
    return {disabled, setDisabled}
}
export default useButtonSubmit