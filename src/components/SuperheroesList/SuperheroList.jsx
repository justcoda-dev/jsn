import css from "./css.module.css";
import {useEffect, useState} from "react";
import request from "../../api";
import SuperheroItem from "./SuperheroItem";

const SuperheroList = () => {
    const [heroes, setHeroes] = useState([])

    const getHeroes = async () => {
        const response = await request.get.superHeroes()
        setHeroes(response)
    }

    const deleteHandle = (id) => async () => {
        await request.delete.deleteSuperHero(id)
        const stayedHeroes = heroes.filter(hero => hero.id !== id)
        setHeroes([...stayedHeroes])
    }


    useEffect(() => {
        getHeroes()
    }, [])

    return (
        <ul className={css.list}>
            {
                heroes.length
                    ? heroes.map((superhero) =>
                        <SuperheroItem
                            deleteHandler={deleteHandle}
                            key={superhero.id}
                            superhero={superhero}
                        />)
                    : "No superheroes"
            }
        </ul>

    )
}
export default SuperheroList;