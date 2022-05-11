import {useState} from "react";

const useButtonSubmit = () => {
    const [disabled, setDisabled] = useState( false)
    return [disabled, setDisabled]
}
export default useButtonSubmit