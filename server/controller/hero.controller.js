import Superhero from "../db/models/superhero.model.js";
import {superheroSchema, idSchema, superheroUpdateSchema} from "./validation/superhero.schema.js";

const SuperheroController = {
    createSuperHero: async (req, res) => {
        try {
            await Superhero.sync()
            const {error, value} = superheroSchema.validate(req.body)
            if (!error) {
                const superhero = await Superhero.create(value)
                res.status(200).json(superhero)
            } else {
                res.status(403).json(error)
            }
        } catch (e) {
            console.error("createSuperHero error", e)
        }
    },
    getSuperHeroes: async (req, res) => {
        try {
            const allUsers = await Superhero.findAll()
            res.status(200).json(allUsers)
        } catch (e) {
            console.error("getSuperHeroes error", e)
        }
    },
    getOneSuperHero: async (req, res) => {
        try {
            const {value, error} = idSchema.validate(req.params.id)
            if (!error) {
                const superhero = await Superhero.findOne({where: {id: value}})
                res.status(200).json(superhero)
            } else {
                res.status(403).json(error)
            }
        } catch (e) {
            console.error("getOneSuperHero error", e)
        }

    },
    updateSuperHero: async (req, res) => {
        try {

            const {error, value} = superheroUpdateSchema.validate(req.body)

            if (!error) {
                const superhero = await Superhero.update(
                    value,
                    {
                        where: {
                            id: value.id,
                        },
                    }
                )
                res.status(200).json(superhero)

            } else {
                res.status(403).json(error)
            }

        } catch (e) {
            console.error("updateSuperHero error", e)
        }
    },
    deleteSuperHero: async (req, res) => {
        try {
            const {error, value} = idSchema.validate(req.params.id)
            if (!error) {
                await Superhero.destroy({
                    where: {
                        id: value,
                    },
                })
                res.status(202).json({message: `superhero with id:${value} has been deleted`})
            } else {
                res.status(400).json({message: e})
            }

        } catch (e) {
            console.error("deleteSuperHero", e)
        }
    },
    uploadSuperHeroImg: async (req, res) => {
        try {
            if (!req.files) {
                res.status(401).json({message: "no images"})
            }
            const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files]
            if (files.length) {
                const filePaths = files.map((file) => {
                    file.mv(`static/imgs/${file.name}`)
                    return `imgs/${file.name}`
                })
                res.status(200).json({message: filePaths})
            } else {
                res.status(401).json({message: "no images"})
            }
        } catch (e) {
            console.error("upload img error", e)
        }
    },
    deleteSuperheroImg: async (req, res) => {
        console.log('WORK DELETEING')
        try {
            const arrPaths = req.body
            console.log(arrPaths)
            res.status(200).json({message:"has been deleted"})
        } catch (e) {
            console.error("img delete error")
        }
    }
}
export default SuperheroController;
