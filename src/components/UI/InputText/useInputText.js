import {useState} from "react";

const useInputText = (initialStateText, initialStateValid, validation) => {

    const [value, setValue] = useState(initialStateText || "");
    const [textError, setTextError] = useState("");
    const [valid, setValid] = useState(initialStateValid || true);

    const handleChange = ({target: {value}}) => {
        setValue(value)
        if (validation) {
            setTextError(validation(value))
        }
    };
    const clearInput = () => setValue("");
    return [value, handleChange, clearInput, textError, valid, setValid];
}
export default useInputText