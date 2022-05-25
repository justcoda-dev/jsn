import {Sequelize} from "sequelize"

const sequelize = new Sequelize('jsn_postgres', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
})

const start = async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
start()
export default sequelize