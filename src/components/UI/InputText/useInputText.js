import {useState} from "react"

const useInputText = ({initialStateText, validation}) => {

    const [value, setValue] = useState(initialStateText || "")
    const [textError, setTextError] = useState("")

    const handleChange = ({target: {value}}) => {
        setValue(value)
        if (validation) {
            setTextError(validation(value))
        }
    };
    const clearInput = () => {
        setValue("")
        setTextError("")
    };

    return {value, handleChange, clearInput, textError, setValue}
}
export default useInputText