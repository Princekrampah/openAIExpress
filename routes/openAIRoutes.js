const router = require("express").Router();
const { getEdit, getImage } = require("../controllers/openAIControllers");

router.post("/", getEdit);
router.post("/generate-image", getImage)

module.exports = router;
