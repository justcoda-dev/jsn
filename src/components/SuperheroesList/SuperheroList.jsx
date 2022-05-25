import css from "./css.module.css";
import {useEffect, useState} from "react";
import request from "../../api";
import SuperheroItem from "./SuperheroItem";
import Pagination from "../Pagination/Pagination";

const SuperheroList = () => {
    const [heroes, setHeroes] = useState([])
    const [pages, setPages] = useState(0)

    const getHeroes = async () => {
        const {totalPages, content} = await request.get.getSuperheroesList(0, 5)

        setPages(totalPages)
        setHeroes(content)
    }

    const deleteHandle = (id) => async () => {
        await request.delete.deleteSuperHero(id)
        await request.delete.deleteAllImages(id)
        const stayedHeroes = heroes.filter(hero => hero.id !== id)
        setHeroes([...stayedHeroes])
    }

    const onChangePage = (index) => async () => {
        const superheroes = await request.get.getSuperheroesList(index, 5)
        setPages(superheroes.totalPages)
        setHeroes(superheroes.content)
    }

    useEffect(() => {
        getHeroes()
    }, [])

    return (
        <div>{
            heroes.length
                ? <div className={css.listWrapper}>
                    <ul className={css.list}>
                        {
                            heroes.map((superhero) =>
                                <SuperheroItem
                                    deleteHandler={deleteHandle}
                                    key={superhero.id}
                                    superhero={superhero}
                                />)
                        }
                    </ul>
                    <Pagination onChangePage={onChangePage} pages={pages}/>
                </div>
                : "no superheroes"
        }</div>

    )
}
export default SuperheroList;