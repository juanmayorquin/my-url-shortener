import { Router } from "express";
<<<<<<< HEAD
import { createShortUrl, redirectToUrl } from "../controllers/shortenController";
=======
import { createShortUrl, redirectToUrl } from "../controllers/shortenController.js";
>>>>>>> 2eb0761 (fix: update import paths to use .js extensions and adjust start script in package.json)


const router : Router = Router();

router.post("/shorten", createShortUrl);
router.get("/:code", redirectToUrl);

export default router;
