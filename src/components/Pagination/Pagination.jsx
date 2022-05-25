import css from "./css.module.css"

const Pagination = ({pages, onChangePage}) => {
    return (
        <ul className={css.list}>
            {
                new Array(pages)
                    .fill(pages)
                    .map((_, index) =>
                        <li
                            onClick={onChangePage(index)}
                            className={css.item}
                            key={index}
                        >
                            {index}
                        </li>)
            }
        </ul>
    )
}
export default Pagination