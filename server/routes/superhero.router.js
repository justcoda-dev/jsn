import {Router} from "express";
import superheroController from "../controller/hero.controller.js";
import multer from "multer";

const router = new Router();

const upload = multer({dest: "../static/imgs/"})
router.post("/", superheroController.createSuperHero)
router.get("/", superheroController.getSuperHeroes)
router.get("/:id", superheroController.getOneSuperHero)
router.patch("/", superheroController.updateSuperHero)
router.delete("/:id", superheroController.deleteSuperHero)
router.post("/image", superheroController.uploadSuperHeroImg)
router.delete("/images", superheroController.deleteSuperheroImg)

export default router;