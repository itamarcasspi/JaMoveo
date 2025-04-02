import express from "express";
import { findSongs,getSong } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/getSong",getSong);
router.get("/findSongs",findSongs);


export default router;
    