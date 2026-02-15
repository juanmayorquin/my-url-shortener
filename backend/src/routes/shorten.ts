import { Router } from "express";
import { createShortUrl, redirectToUrl } from "../controllers/shortenController.js";


const router : Router = Router();

router.post("/shorten", createShortUrl);
router.get("/:code", redirectToUrl);

export default router;
