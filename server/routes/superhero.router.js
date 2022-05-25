import {Router} from "express"
import superheroController from "../controller/hero.controller.js"


const router = new Router()

router.post("/", superheroController.createSuperHero)
router.get("/", superheroController.getSuperHeroes)
router.get("/list", superheroController.getSuperheroesList)
router.get("/:id", superheroController.getOneSuperHero)
router.patch("/", superheroController.updateSuperHero)
router.delete("/:id", superheroController.deleteSuperHero)
router.post("/image/:id", superheroController.uploadSuperHeroImg)
router.delete("/images/:id/:paths", superheroController.deleteSuperheroImg)
router.delete("/images/:id", superheroController.deleteAllSuperheroImg)

export default router