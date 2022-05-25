import db from "../dataBase.js"
import {DataTypes} from "sequelize"


const Superhero = db.define('superhero', {
    nickname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    real_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origin_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    superpowers: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    catch_phrase: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }

}, {});
export default Superhero