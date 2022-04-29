import css from "./css.module.css"
import {Link, useLocation} from "react-router-dom";

const SuperheroItem = ({superhero, deleteHandler}) => {
    const superheroIsCome = Object.keys(superhero).length
    const location = useLocation()

    return (
        <>
            {superheroIsCome ? <div className={css.item}>
                {/*<div><img src={`http://localhost:5000/${superhero["images"][0]}`} alt=""/></div>*/}
                <Link className={css.link} to={`${location.pathname}/${superhero.id}`}
                      state={{id: superhero.id}}> {superhero["nickname"]}
                </Link>
                <button className={css.delete} onClick={deleteHandler(superhero.id)}>x</button>
            </div> : "Loading"}
        </>
    )
}
export default SuperheroItem;