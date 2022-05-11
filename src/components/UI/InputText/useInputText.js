import {useState} from "react";

const useInputText = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [valid, setValid] = useState(true);
    const handleChange = ({target: {value}}) => setValue(value);
    const clearInput = () => setValue("");
    return [value, handleChange, clearInput, error, setError, valid, setValid];
}
export default useInputText