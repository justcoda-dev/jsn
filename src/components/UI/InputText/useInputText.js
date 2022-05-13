import {useEffect, useState} from "react";

const useInputText = (initialStateText, initialStateValid, validation) => {

    const [value, setValue] = useState(initialStateText || "");
    const [textError, setTextError] = useState("");
    // const [valid, setValid] = useState(initialStateValid || true);

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
    // useEffect(() => {
    //     if (validation) {
    //         setTextError(validation(value))
    //         console.log(value)
    //     }
    // }, [value])
    return [value, handleChange, clearInput, textError, setValue];
}
export default useInputText