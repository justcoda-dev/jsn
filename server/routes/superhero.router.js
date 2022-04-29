const Router = require("express");
const router = new Router();
const userController = require("../controller/superHero.controller")

router.post("/", userController.createSuperHero)
router.get("/", userController.getSuperHeroes)
router.get("/:id", userController.getOneSuperHero)
router.patch("/", userController.updateSuperHero)
router.delete("/:id", userController.deleteSuperHero)
router.post("/image", userController.uploadSuperHeroImg)

module.exports = router;