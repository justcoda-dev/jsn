import useInputText from "../UI/InputText/useInputText";
import css from "./style.module.css";
import request from "../../api";
import {useCallback} from "react";
import InputText from "../UI/InputText/InputText";
import InputImage from "../UI/InputImg/InputImage";
import useInputImage from "../UI/InputImg/useInputImage";


const SuperheroCreate = () => {

    const [nickname, handleNickname, clearNickname] = useInputText()
    const [real_name, handleRealName, clearRealName] = useInputText()
    const [origin_description, handleOriginDescription, clearOriginDescription] = useInputText()
    const [superpowers, handleSuperpowers, clearSuperpowers] = useInputText()
    const [catch_phrase, handleCatchPhrase, clearCatchPhrase] = useInputText()
    const [images, handleImages, clearImages] = useInputImage()

    const clearInputs = () => {
        clearNickname()
        clearRealName()
        clearOriginDescription()
        clearSuperpowers()
        clearCatchPhrase()
        clearImages()
    }

    const createHandler = useCallback(async () => {
        const imagesIsUpload = await request.upload.uploadSuperHeroImg(images);
        await request.post.createSuperHero({
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase,
            images: imagesIsUpload.message
        });
        clearInputs()
    }, [images, nickname, real_name, origin_description, superpowers, catch_phrase])

    return (
        <>
            <div className={css.form}>
                <InputText value={nickname} onChange={handleNickname} placeholder="nickname"/>
                <InputText value={real_name} onChange={handleRealName} placeholder="real name"/>
                <InputText value={origin_description} onChange={handleOriginDescription} placeholder="origin description"/>
                <InputText value={superpowers} onChange={handleSuperpowers} placeholder="super powers"/>
                <InputText value={catch_phrase} onChange={handleCatchPhrase} placeholder="catch phrase"/>
                <InputImage value={images} onChange={handleImages}/>
            </div>

            <button className={css.button} onClick={createHandler}>CREATE</button>
        </>
    )
}
export default SuperheroCreate;