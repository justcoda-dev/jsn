const SuperheroCreate = () => {
    return (
        <form className="form" action="">
            <input type="text" placeholder="nickname"/>
            <input type="text" placeholder="real_name"/>
            <input type="text" placeholder="origin_description"/>
            <input type="text" placeholder="superpowers"/>
            <input type="text" placeholder="catch_phrase"/>
            <input type="file" multiple name="image"/>
            <button>CREATE</button>
        </form>

    )
}
export default SuperheroCreate;