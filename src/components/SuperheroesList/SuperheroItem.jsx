import css from "./css.module.css"
import {Link, useLocation} from "react-router-dom";
import {HOST_URL} from "../../api";
import ButtonDelete from "../UI/ButtonDelete/ButtonDelete";
import UserIcon from "../UI/UserIcon/UserIcon";
import {firstLetterUp} from "../../functions/stringFunctions";

const SuperheroItem = ({superhero, deleteHandler}) => {

    const location = useLocation()

    const imageSrc = superhero["images"].length ? `${HOST_URL}imgs/${superhero.id}/${superhero["images"][0]}` : null;

    return (

        <li className={css.item}>
            <div className={css.iconWrapper}><UserIcon src={imageSrc}/></div>
            <Link
                className={css.link}
                to={`${location.pathname}/${superhero.id}`}
                state={{id: superhero.id}}
            >
                {firstLetterUp(superhero["nickname"])}
            </Link>

            <ButtonDelete onClick={deleteHandler(superhero.id)}/>
        </li>


    )
}
export default SuperheroItem;