import InputText from "../UI/InputText/InputText";
import {useEffect, useState} from "react";
import useInputText from "../UI/InputText/useInputText";
import css from "../SuperheroCreate/style.module.css";

const MainPage = () => {
    const handleChange = (e) => {
        console.log(e.target.files)
    }
    return (

        <div>
            <input id="file-upload" onChange={handleChange} type="file" multiple/>
        </div>
    )
}
export default MainPage;