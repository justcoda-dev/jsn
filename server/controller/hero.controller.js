import Superhero from "../db/models/superhero.model.js";
import {superheroSchema, idSchema, superheroUpdateSchema} from "./validation/superhero.schema.js";
import path from "path";
import fs from "fs";

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
            console.log(value)
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
                res.status(400).json({message: error})
            }

        } catch (e) {
            console.error("deleteSuperHero", e)
        }
    },
    uploadSuperHeroImg: async (req, res) => {
        const mkdirSync = (dirPath) => {
            try {
                fs.mkdirSync(dirPath)
            } catch (err) {
                if (err.code !== 'EEXIST') throw err
            }
        }

        try {
            const id = req.params.id;
            if (!req.files) {
                res.status(401).json({message: "no images"})
            }

            const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files]
            if (files.length) {
                mkdirSync(path.resolve("static", "imgs", id))
                const filePaths = files.map((file) => {
                    file.mv(`static/imgs/${id}/${file.name}`)
                    return `imgs/${id}/${file.name}`
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
        try {
            const id = req.params.id
            const pathsToDelete = req.params.paths.split(",")
            console.log(req.params.paths)
            if (pathsToDelete.length) {
                pathsToDelete.forEach((file) => {
                    fs.unlink(path.resolve("static", "imgs", id, file), function (err) {
                        if (err) throw err;

                    });
                })
            }

            fs.readdir(path.resolve("static", "imgs", id), (err, files) => {
                if (err) throw err;
                if (!files.length) {
                    fs.rmdir(path.resolve("static", "imgs", id), err => {
                        if (err) throw err;
                    });
                }
            })

            res.status(200).json({message: "images has been deleted"})
        } catch (e) {
            console.error("img delete error")
        }
    },
    deleteAllSuperheroImg: async (req, res) => {

        try {
            const id = req.params.id
            fs.readdir(path.resolve("static", "imgs", id), (err, files) => {
                if (err) throw err
                files.forEach(file => {
                    fs.unlink(path.resolve("static", "imgs", id, file), err1 => {
                        if (err1) throw err1
                    })
                })
                fs.rmdir(path.resolve("static", "imgs", id), err2 => {
                    if (err2) throw  err2
                    res.status(200).json({message: `directory ${id} was deleted `})
                })
            })
        } catch (e) {
            console.log("IMG DELETE ALL ERROR")
        }
    },
    getSuperheroesList: async (req, res) => {
        console.log('WORKS')
        try {
            const pageAsNumber = +req.query.page
            const sizeAsNumber = +req.query.size
            let PAGE = 0
            let SIZE = 10

            if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
                PAGE = pageAsNumber
            }
            if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
                SIZE = sizeAsNumber
            }

            console.log("SIZE", SIZE)
            console.log("PAGE", PAGE)
            const superhero = await Superhero.findAndCountAll({
                limit: SIZE,
                offset: PAGE * SIZE

            })
            console.log(superhero)
            res.status(200).json({
                content: superhero.rows,
                totalPages: Math.ceil(superhero.count / SIZE)

            })
        } catch (e) {

            res.status(400).json(e)
            console.log(e)
        }
    }
}
console.log()
export default SuperheroController;
