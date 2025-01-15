const express = require("express")
const path=require("path")

const router = express.Router();

router.use((req, res, next) => {
    req.app.set("views", path.join(__dirname, "../../views/Home"));
    next();
});

const {getHome,getAboutUs,getViewDetails,postSearchProperties}=require("../../controllers/Home/homeController")
router.get("/",getHome)
router.get("/aboutus",getAboutUs)
router.get("/viewdetails",getViewDetails)
router.post("/searchproperties",postSearchProperties)


module.exports = router