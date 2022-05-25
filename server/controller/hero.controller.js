import Superhero from "../db/models/superhero.model.js"
import {superheroSchema, idSchema, superheroUpdateSchema} from "./validation/superhero.schema.js"
import path from "path"
import fs from "fs"

const SuperheroController = {
    createSuperHero: async (req, res) => {
        try {
            await Superhero.sync()
            const {error, value} = superheroSchema.validate(req.body)
            if (!error) {
                const superhero = await Superhero.create(value)
                res.status(201).json(superhero)
            } else {
                res.status(400).json(error)
            }
        } catch (e) {
            res.status(500).json(e)
            console.error("createSuperHero error", e)
        }
    },
    getSuperHeroes: async (req, res) => {
        try {
            const allUsers = await Superhero.findAll()
            res.status(200).json(allUsers)
        } catch (e) {
            res.status(404).json(e)
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
                res.status(404).json(error)
            }
        } catch (e) {
            res.status(500).json(e)
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
                res.status(201).json(superhero)

            } else {
                res.status(403).json(error)
            }

        } catch (e) {
            res.status(500).json(e)
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
                res.status(200).json({message: `superhero with id:${value} has been deleted`})
            } else {
                res.status(400).json({message: error})
            }

        } catch (e) {
            res.status(500).json(e)
            console.error("deleteSuperHero error", e)
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

                res.status(201).json({message: filePaths})
            } else {
                res.status(401).json({message: "no images"})
            }
        } catch (e) {
            res.status(500).json(e)
            console.error("uploadSuperHeroImg error", e)
        }
    },
    deleteSuperheroImg: async (req, res) => {
        try {
            const id = req.params.id
            const pathsToDelete = req.params.paths.split(",")

            if (pathsToDelete.length && id) {

                pathsToDelete.forEach((file) => {
                    fs.unlink(path.resolve("static", "imgs", id, file), function (err) {
                        if (err) throw err;

                    });
                })
                res.status(200).json({message: "images was delete"})
            }

            fs.readdir(path.resolve("static", "imgs", id), (err, files) => {
                if (err) throw err;

                if (!files.length) {
                    fs.rmdir(path.resolve("static", "imgs", id), err => {
                        if (err) throw err;
                    });
                    res.status(200).json({message: `directory ${id} was deleted`})
                }
            })
        } catch (e) {
            res.status(500).json(e)
            console.error("deleteSuperheroImg error")
        }
    },
    deleteAllSuperheroImg: async (req, res) => {

        try {
            const id = req.params.id
            fs.readdir(path.resolve("static", "imgs", id), (err, files) => {
                if (err) {
                    res.status(200).json({message: "images deleted"})
                }
                if (!files) {

                    fs.rmdir(path.resolve("static", "imgs", id), err2 => {
                        if (err2) throw  err2
                    })
                    res.status(200).json({message: `directory was deleted `})
                } else {
                    files.forEach(file => {

                        fs.unlink(path.resolve("static", "imgs", id, file), err1 => {
                            if (err1) throw err1
                        })
                    })
                    fs.rmdir(path.resolve("static", "imgs", id), err2 => {

                        if (err2) throw  err2
                    })
                    res.status(200).json({message: `directory was deleted `})
                }


            })

        } catch (e) {
            res.status(500).json(e)
            console.error("deleteAllSuperheroImg error")
        }
    },
    getSuperheroesList: async (req, res) => {

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


            const superhero = await Superhero.findAndCountAll({
                limit: SIZE,
                offset: PAGE * SIZE

            })

            res.status(200).json({
                content: superhero.rows,
                totalPages: Math.ceil(superhero.count / SIZE)

            })
            console.log({
                content: superhero.rows,
                totalPages: Math.ceil(superhero.count / SIZE)

            })
        } catch (e) {
            res.status(500).json(e)
            console.error("getSuperheroesList error", e)
        }
    }
}
export default SuperheroController
