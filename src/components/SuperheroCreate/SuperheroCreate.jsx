import useInputText from "../UI/InputText/useInputText";
import css from "./style.module.css";
import request from "../../api";
import {useCallback, useEffect, useMemo} from "react";
import InputText from "../UI/InputText/InputText";
import InputImage from "../UI/InputImg/InputImage";
import useInputImage from "../UI/InputImg/useInputImage";
import ButtonSubmit from "../UI/ButtonSubmit/ButtonSubmit";
import useButtonSubmit from "../UI/ButtonSubmit/useButtonSubmit";
import {textInputValidate} from "./validation";


const SuperheroCreate = () => {

    const {
        value: nickname,
        handleChange: handleNickname,
        clearInput: clearNickname,
        textError: nicknameError
    } = useInputText("", true, textInputValidate)
    const {
        value: realName,
        handleChange: handleRealName,
        clearInput: clearRealName,
        textError: realNameError
    } = useInputText("", true, textInputValidate)
    const {
        value: originDescription,
        handleChange: handleOriginDescription,
        clearInput: clearOriginDescription,
        textError: originDescriptionError
    } = useInputText("", true, textInputValidate)
    const {
        value: superpowers,
        handleChange: handleSuperpowers,
        clearInput: clearSuperpowers,
        textError: superpowersError
    } = useInputText("", true, textInputValidate)
    const {
        value: catchPhrase,
        handleChange: handleCatchPhrase,
        clearInput: clearCatchPhrase,
        textError: catchPhraseError
    } = useInputText("", true, textInputValidate)

    const {images, handleChange, clearImages, imagesValue, imagesArr} = useInputImage()

    const {disabled, setDisabled} = useButtonSubmit()

    const clearInputs = () => {
        clearNickname()
        clearRealName()
        clearOriginDescription()
        clearSuperpowers()
        clearCatchPhrase()
        clearImages()
    }

    const inputsStatus = useMemo(() => {
        return !![nicknameError, realNameError, originDescriptionError, superpowersError, catchPhraseError].filter(item => item === "").length
    }, [nicknameError, realNameError, originDescriptionError, superpowersError, catchPhraseError])

    const createHandle = useCallback(async () => {

        const {id} = await request.post.createSuperHero({
            nickname: nickname,
            real_name: realName,
            origin_description: originDescription,
            superpowers: superpowers,
            catch_phrase: catchPhrase,
            images: imagesArr
        });

    await request.upload.uploadSuperHeroImg(images, id);
        clearInputs()

    }, [images, nickname, realName, originDescription, superpowers, catchPhrase])


    useEffect(() => {
        setDisabled(inputsStatus)
    }, [inputsStatus])


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
                    error={catchPhraseError}
                    value={catchPhrase}
                    onChange={handleCatchPhrase}
                    placeholder="catch phrase"
                />
                <InputImage
                    value={imagesValue}
                    onChange={handleChange}
                />
            </div>
            <ButtonSubmit
                disabled={disabled}
                onClick={createHandle}
            >
                Create
            </ButtonSubmit>
        </>
    )
}
export default SuperheroCreate;