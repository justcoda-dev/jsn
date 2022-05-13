import css from "./css.module.css";
import {useLocation} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState, useRef} from "react";
import request from "../../api";
import {HOST_URL} from "../../api";
import DescriptionField from "../UI/DescriptionField/DescriptionField";
import InputText from "../UI/InputText/InputText";
import InputImage from "../UI/InputImg/InputImage";
import ButtonSubmit from "../UI/ButtonSubmit/ButtonSubmit";
import useInputText from "../UI/InputText/useInputText";
import {textInputValidate} from "../SuperheroCreate/validation";
import useInputImage from "../UI/InputImg/useInputImage";
import useButtonSubmit from "../UI/ButtonSubmit/useButtonSubmit";

const SuperheroDetails = () => {

    const [nickname, handleNickname, , nicknameError, setNickname] = useInputText("", true, textInputValidate)
    const [realName, handleRealName, , realNameError, setRealName] = useInputText("", true, textInputValidate)
    const [originDescription, handleOriginDescription, , originDescriptionError, setOriginDescription] = useInputText("", true, textInputValidate)
    const [superpowers, handleSuperpowers, , superpowersError, setSuperpowers] = useInputText("", true, textInputValidate)
    const [catchPhrase, handleCatchPhrase, , catchPhraseError, setCatchPhrase] = useInputText("", true, textInputValidate)
    const [images, handleImages, clearImages, imgValue] = useInputImage()

    const prevNickname = useRef(nickname);
    const prevRealName = useRef(realName);
    const prevOriginDescription = useRef(originDescription);
    const prevSuperpowers = useRef(superpowers);
    const prevCatchPhrase = useRef(catchPhrase);

    const [isLoaded, setIsLoaded] = useState(false)
    const [disabled, setDisabled] = useButtonSubmit()
    const [editMode, setEditMode] = useState(false)
    const {state: {id}} = useLocation()

    const inputsStatus = useMemo(() => {
        return !![nicknameError, realNameError, originDescriptionError, superpowersError, catchPhraseError].filter(item => item === "").length
    }, [nicknameError, realNameError, originDescriptionError, superpowersError, catchPhraseError])


    const stateIsChanged = useMemo(() => {
        return [nickname, realName, originDescription, superpowers, catchPhrase].join("")
            === [prevNickname, prevRealName, prevOriginDescription, prevSuperpowers, prevCatchPhrase].join("")
    }, [nickname, realName, originDescription, superpowers, catchPhrase])

    const getSuperheroDetails = async (id) => {
        const response = await request.get.oneSuperHero(id)
        if (Object.keys(response).length) {
            setIsLoaded(true)

            setNickname(response.nickname)
            setRealName(response.real_name)
            setOriginDescription(response.origin_description)
            setSuperpowers(response.superpowers)
            setCatchPhrase(response.catch_phrase)
        }

    }

    const editHandle = () => {
        setEditMode(true)
    }

    const saveHandle = () => {
        setEditMode(false)
        // console.log({nickname, realName, originDescription, superpowers, catchPhrase})
    }

    const cancelHandle = () => {
        setEditMode(false)
    }

    // CREATED ***************************
    useEffect(() => {
        getSuperheroDetails(id)

    }, [id])

    useEffect(() => {
        setDisabled(inputsStatus)
        console.log(stateIsChanged)
        // setDisabled(inputsStatus)

    }, [inputsStatus])

    useEffect(() => {
        prevNickname.current = nickname;
        prevRealName.current = realName;
        prevOriginDescription.current = originDescription;
        prevSuperpowers.current = superpowers;
        prevCatchPhrase.current = catchPhrase;
        console.log("works")
    }, [nickname, realName, originDescription, superpowers, catchPhrase])

    // ****************************************

    // const updateSuperheroDetails = async (data) => {
    // await request.path.updateSuperHero(data)
    // await getSuperheroDetails(id)
    //     if (pathsToDelete.length) {
    //         await request.delete.deleteImages(pathsToDelete)
    //     }
    // }


    return (
        <>
            {isLoaded
                ? <div className={css.listWrapper}>
                    <div>NOW:{nickname}, PREV: {prevNickname.current}</div>
                    <ul className={css.list}>
                        <li className={css.item}>{
                            editMode ? <InputText
                                    error={nicknameError}
                                    value={nickname}
                                    onChange={handleNickname}
                                    placeholder="nickname"/> :
                                <DescriptionField name="nickname" text={nickname}/>
                        }</li>

                        <li className={css.item}>{editMode ? <InputText
                            error={realNameError}
                            value={realName}
                            onChange={handleRealName}
                            placeholder="real name"
                        /> : <DescriptionField name="real name" text={realName}/>
                        }</li>

                        <li className={css.item}>{editMode ? <InputText
                            error={originDescriptionError}
                            value={originDescription}
                            onChange={handleOriginDescription}
                            placeholder="origin description"
                        /> : <DescriptionField name="origin description" text={originDescription}/>
                        }</li>

                        <li className={css.item}>{editMode ? <InputText
                            error={superpowersError}
                            value={superpowers}
                            onChange={handleSuperpowers}
                            placeholder="super powers"
                        /> : <DescriptionField name="super powers" text={superpowers}/>
                        }</li>

                        <li className={css.item}>{editMode ? <InputText
                            error={catchPhraseError}
                            value={catchPhrase}
                            onChange={handleCatchPhrase}
                            placeholder="catch phrase"
                        /> : <DescriptionField name="catch phrase" text={catchPhrase}/>
                        }</li>

                        <li className={css.item}>{editMode ? <InputImage/> : <DescriptionField/>}</li>
                    </ul>
                    <>
                        {
                            editMode
                                ? <>
                                    <ButtonSubmit disabled={disabled} onClick={saveHandle}>Save</ButtonSubmit>
                                    <ButtonSubmit onClick={cancelHandle}>Cancel</ButtonSubmit>
                                </>
                                : <ButtonSubmit onClick={editHandle}>Edit</ButtonSubmit>
                        }
                    </>
                </div>
                : "Loading"}
        </>

    )
}
export default SuperheroDetails;