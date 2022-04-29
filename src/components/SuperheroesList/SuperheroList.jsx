import css from "./css.module.css";
import {useEffect, useState} from "react";
import request from "../../api";
import SuperheroItem from "./SuperheroItem";
import PaginatedItems from "../../hooks/Pagination"
import ReactPaginate from "react-paginate";

const SuperheroList = () => {
    const [heroes, setHeroes] = useState([])

    const getHeroes = async () => {
        const response = await request.get.superHeroes()
        setHeroes(response)
    }

    const deleteHandler = (id) => async () => {
        await request.delete.deleteSuperHero(id)
        const stayedHeroes = heroes.filter(hero => hero.id !== id)
        setHeroes([...stayedHeroes])
    }

    const {
        currentItems,
        handlePageClick,
        pageCount
    } = PaginatedItems(5, heroes)
    useEffect(() => {
        getHeroes()
    }, [])
    return (
        <div className={css.wrapper}>
            <div className={css.list}>
                {heroes.length ? currentItems.map((superhero) =>
                    <SuperheroItem
                        deleteHandler={deleteHandler}
                        key={superhero.id}
                        superhero={superhero}/>) : "No superheroes"
                }

            </div>
            <div className={css.paginationWrapper}>
                <ReactPaginate
                    className={css.pagination}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}/>
            </div>
        </div>
    )
}
export default SuperheroList;