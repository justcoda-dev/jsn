import css from "./css.module.css"

const UserIcon = ({src}) => {
    return (
        <>
            {
                src
                    ? <div
                        className={css.icon}
                        style={{backgroundImage:`url(${src})`}}
                    />
                    : <canvas
                        className={css.canvas}
                    />
            }
        </>
    )
}
export default UserIcon;