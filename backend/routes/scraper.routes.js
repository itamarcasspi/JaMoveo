import express from "express";
import {songList,linkToData} from "../controllers/scraper.controllers.js";

const router = express.Router();

router.get("/getSong" ,linkToData);
router.get("/songList",songList);


export default router;
    