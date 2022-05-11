import css from "./css.module.css";
import {useLocation} from "react-router-dom";
import {useCallback, useEffect, useMemo, useState} from "react";
import request from "../../api";
import {HOST_URL} from "../../api";

const SuperheroDetails = () => {
    const [superhero, setSuperhero] = useState({});
    const [editedSuperhero, setEditedSuperhero] = useState({});
    const [show, setShow] = useState(false)
    const [pathsToDelete, setPathsToDelete] = useState([])

    const superheroKeys = useMemo(() => Object.keys(superhero).filter((item) => !["images", "id", "updatedAt", "createdAt"].includes(item)), [superhero])

    const superheroIsCome = useMemo(() => Object.keys(superhero).length, [superhero])
    const {state: {id}} = useLocation()

    const getSuperheroDetails = async (id) => {
        const response = await request.get.oneSuperHero(id)
        setSuperhero({...response})
    }
    const updateSuperheroDetails = async (data) => {
        await request.path.updateSuperHero(data)
        await getSuperheroDetails(id)
        if (pathsToDelete.length) {
            await request.delete.deleteImages(pathsToDelete)
        }
    }

    const inputHandler = useCallback((key) => ({target: {value}}) => {
        setEditedSuperhero({...editedSuperhero, [key]: value})
    }, [])
    const editHandler = useCallback(() => {
        setShow(true)
        setEditedSuperhero({...superhero})
    }, [superhero])
    const saveHandler = useCallback(() => {
        setShow(false)
        updateSuperheroDetails(editedSuperhero)

    }, [superhero, editedSuperhero])

    const deleteImg = useCallback((index, fileName) => () => {
            const imgs = [...editedSuperhero.images]
            const toDelete = imgs.splice(index, 1)
            setPathsToDelete([...pathsToDelete, ...toDelete])
            setEditedSuperhero({...editedSuperhero, images: imgs})
        }, [editedSuperhero.images]
    )
    const cancelHandler = () => {
        setShow(false)
    }
    useEffect(() => {
        getSuperheroDetails(id)
    }, [id])
    return (
        <> {superheroIsCome ? <div className={css.wrapper}>
            {JSON.stringify(editedSuperhero)}
            {
                !show ?
                    <div className={css.details}>
                        <div>
                            <img width="100px" height="100px" src={`${HOST_URL}${superhero.images[0]}`} alt=""/></div>
                        {
                            superheroKeys.map((item, index) =>
                                <div
                                    key={index}
                                    className={css.text}
                                >
                                    <div style={{fontSize: "20px", fontWeight: "400"}}>{item}:</div>
                                    <div>{superhero[item]}</div>
                                </div>)
                        }
                        <div className={css.image}>
                            <div>images</div>
                            <div>{superhero["images"].map((src, i) => <p key={i}>{src}</p>)}</div>
                        </div>

                        <button className={css.editBtn} onClick={editHandler}>edit</button>
                    </div>
                    : <div className={css.edit}>
                        {superheroKeys.map((item, index) =>
                            <div key={index}>
                                <span>{item}</span> <input
                                className={css.textInput}
                                onChange={inputHandler(item)}
                                defaultValue={superhero[item]}
                                type="text"
                            />
                            </div>)}
                        <div><span>images</span><input type="file"/>
                            <div className={css.image}>
                                <div>{editedSuperhero["images"].map((src, i) =>
                                    <p key={i}>{src}
                                        <button onClick={deleteImg(i, src)}>x</button>
                                    </p>)}</div>
                            </div>
                        </div>
                        <div className={css.buttonsBar}>
                            <button className={css.saveBtn} onClick={saveHandler}>save</button>
                            <button className={css.cancelBtn} onClick={cancelHandler}>cancel</button>
                        </div>
                    </div>
            }
        </div> : "No superhero"}</>

    )
}
export default SuperheroDetails;