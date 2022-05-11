import useInputText from "../UI/InputText/useInputText";
import css from "./style.module.css";
import request from "../../api";
import {useCallback, useEffect} from "react";
import InputText from "../UI/InputText/InputText";
import InputImage from "../UI/InputImg/InputImage";
import useInputImage from "../UI/InputImg/useInputImage";
import ButtonSubmit from "../UI/ButtonSubmit/ButtonSubmit";
import useButtonSubmit from "../UI/ButtonSubmit/useButtonSubmit";
import {textInputValidate} from "./validation";


const SuperheroCreate = () => {

    const [nickname, handleNickname, clearNickname, nicknameError] = useInputText("", true, textInputValidate)
    const [realName, handleRealName, clearRealName, realNameError] = useInputText("", true, textInputValidate)
    const [originDescription, handleOriginDescription, clearOriginDescription, originDescriptionError] = useInputText("", true, textInputValidate)
    const [superpowers, handleSuperpowers, clearSuperpowers, superpowersError] = useInputText("", true, textInputValidate)
    const [catchPhrase, handleCatchPhrase, clearCatchPhrase, catchPhraseError] = useInputText("", true, textInputValidate)
    const [images, handleImages, clearImages] = useInputImage()
    const [disabled, setDisabled] = useButtonSubmit()

    const clearInputs = () => {
        clearNickname()
        clearRealName()
        clearOriginDescription()
        clearSuperpowers()
        clearCatchPhrase()
        clearImages()
    }

    const inputsStatus = () => {
        return !![nicknameError, realNameError, originDescriptionError, superpowersError, catchPhraseError].filter(item => item !== null).length
    }

    const createHandler = useCallback(async () => {

        const {message} = await request.upload.uploadSuperHeroImg(images);

        await request.post.createSuperHero({
            nickname: nickname,
            real_name: realName,
            origin_description: originDescription,
            superpowers: superpowers,
            catch_phrase: catchPhrase,
            images: message
        });

        clearInputs()

    }, [images, nickname, realName, originDescription, superpowers, catchPhrase])

    useEffect(() => {

        setDisabled(inputsStatus)

    }, [nicknameError, realNameError, originDescriptionError, superpowersError, catchPhraseError])

    return (
        <>
            <div className={css.form}>
                <InputText
                    error={nicknameError}
                    value={nickname}
                    onChange={handleNickname}
                    placeholder="nickname"
                />
                <InputText
                    error={realNameError}
                    value={realName}
                    onChange={handleRealName}
                    placeholder="real name"
                />
                <InputText
                    error={originDescriptionError}
                    value={originDescription}
                    onChange={handleOriginDescription}
                    placeholder="origin description"
                />
                <InputText
                    error={superpowersError}
                    value={superpowers}
                    onChange={handleSuperpowers}
                    placeholder="super powers"
                />
                <InputText
                    error={catchPhraseError} value={catchPhrase} onChange={handleCatchPhrase}
                    placeholder="catch phrase"
                />
                <InputImage
                    value={images}
                    onChange={handleImages}
                />
            </div>
            <ButtonSubmit
                disabled={disabled}
                onClick={createHandler}
            >
                Create
            </ButtonSubmit>
        </>
    )
}
export default SuperheroCreate;