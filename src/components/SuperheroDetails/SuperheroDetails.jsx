import css from "./css.module.css"
import {useLocation} from "react-router-dom"
import {useCallback, useEffect, useMemo, useState} from "react"
import request from "../../api"
import {HOST_URL} from "../../api"
import DescriptionField from "../UI/DescriptionField/DescriptionField"
import InputText from "../UI/InputText/InputText"
import ButtonSubmit from "../UI/ButtonSubmit/ButtonSubmit"
import useInputText from "../UI/InputText/useInputText"
import {textInputValidate} from "../SuperheroCreate/validation"
import useInputImage from "../UI/InputImg/useInputImage"
import useButtonSubmit from "../UI/ButtonSubmit/useButtonSubmit"
import ImagesList from "../ImagesList/ImagesList"
import UserIcon from "../UI/UserIcon/UserIcon"
import InputImage from "../UI/InputImg/InputImage"


const SuperheroDetails = () => {
    const [superhero, setSuperhero] = useState({})

    const {
        value: nickname,
        handleChange: handleNickname,
        textError: nicknameError,
        setValue: setNickname
    } = useInputText({validation: textInputValidate})

    const {
        value: realName,
        handleChange: handleRealName,
        textError: realNameError,
        setValue: setRealName
    } = useInputText({validation: textInputValidate})

    const {
        value: originDescription,
        handleChange: handleOriginDescription,
        textError: originDescriptionError,
        setValue: setOriginDescription
    } = useInputText({validation: textInputValidate})

    const {
        value: superpowers,
        handleChange: handleSuperpowers,
        textError: superpowersError,
        setValue: setSuperpowers
    } = useInputText({validation: textInputValidate})

    const {
        value: catchPhrase,
        handleChange: handleCatchPhrase,
        textError: catchPhraseError,
        setValue: setCatchPhrase
    } = useInputText({validation: textInputValidate})

    const [imagesArrState, setImagesArrState] = useState([])
    const [imagesToDelete, setImagesToDelete] = useState([])

    const {images, handleChange, clearImages, imagesValue, imagesArr} = useInputImage()

    const {disabled, setDisabled} = useButtonSubmit()

    const [isLoaded, setIsLoaded] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const {state: {id}} = useLocation()

    const inputsStatus = useMemo(() => {
        return [nicknameError, realNameError, originDescriptionError, superpowersError, catchPhraseError].find(item => item)
    }, [nicknameError, realNameError, originDescriptionError, superpowersError, catchPhraseError])


    const stateIsChanged = useMemo(() => {
        return Object.values(superhero).join("") === Object.values({
            nickname,
            real_name: realName,
            origin_description: originDescription,
            superpowers,
            catch_phrase: catchPhrase,
            images: imagesArrState,
            imagesArr: imagesArr.length ? imagesArr : null
        }).join("")
    }, [nickname, realName, originDescription, superpowers, catchPhrase, superhero, imagesArrState, imagesArr])

    const getSuperheroDetails = useCallback(async (id) => {

        const {
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase,
            images
        } = await request.get.oneSuperHero(id)

        setIsLoaded(true)
        setSuperhero({nickname, real_name, origin_description, superpowers, catch_phrase, images})

        setNickname(nickname)
        setRealName(real_name)
        setOriginDescription(origin_description)
        setSuperpowers(superpowers)
        setCatchPhrase(catch_phrase)
        setImagesArrState([...images])

    }, [id])

    const editHandle = () => {
        setEditMode(true)
        setDisabled(true)
    }

    const saveHandle = useCallback(async () => {
        setEditMode(false)

        if (!stateIsChanged) {

            await request.patch.updateSuperHero({
                nickname: nickname,
                real_name: realName,
                origin_description: originDescription,
                superpowers: superpowers,
                catch_phrase: catchPhrase,
                images: [...imagesArrState, ...imagesArr],
                id
            })
        }

        if (images) {
            await request.upload.uploadSuperHeroImg(images, id);
        }
        if (imagesToDelete.length) {
            await request.delete.deleteImages(imagesToDelete, id)
            setImagesToDelete([])
        }
        await getSuperheroDetails(id)
        clearImages()

    }, [stateIsChanged, nickname, realName, originDescription, superpowers, catchPhrase, images, imagesToDelete, imagesArr])

    const addImagesHandle = useCallback((input) => {
        handleChange(input)
    }, [imagesArr])

    const deleteImageHandle = useCallback((index) => () => {

        setImagesToDelete([...imagesToDelete, ...imagesArrState.splice(index, 1)])
        setImagesArrState([...imagesArrState])
        console.log(imagesToDelete)
    }, [imagesToDelete, imagesArrState])

    const cancelHandle = () => {
        setEditMode(false)
        clearImages()

        setImagesArrState([...superhero.images])
        setImagesToDelete([])

        setNickname(superhero.nickname)
        setRealName(superhero.real_name)
        setOriginDescription(superhero.origin_description)
        setSuperpowers(superhero.superpowers)
        setCatchPhrase(superhero.catch_phrase)
    }


    useEffect(() => {
        getSuperheroDetails(id)
    }, [id])

    useEffect(() => {
        setDisabled(stateIsChanged)
        setDisabled(inputsStatus)
    }, [stateIsChanged, inputsStatus])


    return (
        <>
            {isLoaded
                ? <div className={css.listWrapper}>
                    <div className={css.iconWrapper}>
                        <UserIcon src={imagesArrState.length ? `${HOST_URL}imgs/${id}/${imagesArrState[0]}` : null}/>
                    </div>
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
                        <li className={css.item}>
                            <ImagesList
                                id={id}
                                deleteHandle={deleteImageHandle}
                                editMode={editMode}
                                imagesList={imagesArrState}
                            />
                            {
                                editMode
                                    ? <InputImage
                                        defaultValue={imagesValue}
                                        onChange={addImagesHandle}
                                    />
                                    : ""
                            }
                        </li>
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
export default SuperheroDetails