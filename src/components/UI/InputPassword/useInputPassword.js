import {useState} from "react";

const useInputPassword = (initialStatePassword, initialStateValid, validation) => {
    const [password, setPassword] = useState(initialStatePassword || "")

    const [textError, setTextError] = useState("")
    const handleChange = ({target: {value}}) => {
        setPassword(value)
        if (validation) {
            setTextError(validation(value))
        }
    };
    const clearInput = () => {
        setPassword("")
        setTextError("")
    };

    return {password, handleChange, clearInput, textError, setPassword}
}

export default useInputPassword