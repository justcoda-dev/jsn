import {textInputSchema} from "./validation";
import css from "./style.module.css"
import {useMemo, useRef, useState, useEffect} from "react";
import request from "../../api"
import {useCallback} from "react";

const initialState = {
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: "",
    catch_phrase: "",
    images: []
}
const SuperheroCreate = () => {

    const [state, setState] = useState(initialState)
    const [disable, setDisable] = useState(false)

    const superheroKeys = useMemo(() => Object.keys(initialState).filter(item => !["images", "id", "updatedAt", "createdAt"].includes(item), [state]))

    const {error: nicknameE} = textInputSchema.validate(state.nickname)
    const {error: real_nameE} = textInputSchema.validate(state.real_name)
    const {error: originDescriptionE} = textInputSchema.validate(state.origin_description)
    const {error: superPowersE} = textInputSchema.validate(state.superpowers)
    const {error: catchPhraseE} = textInputSchema.validate(state.catch_phrase)

    const fileInput = useRef()

    const uploadImg = useCallback(async () => {
        const formData = new FormData();

        for (let i = 0; i < fileInput.current.files.length; i++) {
            formData.append("files", fileInput.current.files[i])
        }
        const {message} = await request.upload.uploadSuperHeroImg(formData)
        return message
    }, [state])

    const textHandler = useCallback((key) => ({target: {value}}) => {
        setState({...state, [key]: value})
    }, [state])

    const createHandler = useCallback(async () => {
        const images = await uploadImg()
        await request.post.createSuperHero({...state, images: Array.isArray(images) ? images : []});
        setState({...initialState})
    }, [state])

    return (
        <>
            <div className={css.form}>
                <div className={css.inputWrapper}>
                    <input
                        type="text"
                        className={css.textInput}
                        value={state["nickname"]}
                        onChange={textHandler("nickname")}
                        placeholder="nickname"
                    />
                    <span>{nicknameE ? nicknameE.details[0].message : ''}</span>
                </div>
                <div className={css.inputWrapper}>
                    <input
                        type="text"
                        className={css.textInput}
                        value={state["real_name"]}
                        onChange={textHandler("real_name")}
                        placeholder="real_name"
                    />
                    <span>{real_nameE ? real_nameE.details[0].message : ''}</span>
                </div>
                <div className={css.inputWrapper}>
                    <input
                        type="text"
                        className={css.textInput}
                        value={state["origin_description"]}
                        onChange={textHandler("origin_description")}
                        placeholder="origin_description"
                    />
                    <span>{originDescriptionE ? originDescriptionE.details[0].message : ''}</span>
                </div>
                <div className={css.inputWrapper}>
                    <input
                        type="text"
                        className={css.textInput}
                        value={state["superpowers"]}
                        onChange={textHandler("superpowers")}
                        placeholder="superpowers"
                    />
                    <span>{superPowersE ? superPowersE.details[0].message : ''}</span>
                </div>
                <div className={css.inputWrapper}>
                    <input
                        type="text"
                        className={css.textInput}
                        value={state["catch_phrase"]}
                        onChange={textHandler("catch_phrase")}
                        placeholder="catch_phrase"
                    />
                    <span>{catchPhraseE ? catchPhraseE.details[0].message : ''}</span>
                </div>
                <input id="file-upload" className={css.fileInput} ref={fileInput} type="file" multiple/>
            </div>

            <button className={css.button} onClick={createHandler}>CREATE</button>
        </>
    )
}
export default SuperheroCreate;