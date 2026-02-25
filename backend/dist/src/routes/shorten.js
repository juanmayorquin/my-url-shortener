import { Router } from "express";
import { createShortUrl, redirectToUrl } from "../controllers/shortenController.js";
const router = Router();
router.post("/shorten", createShortUrl);
router.get("/:code", redirectToUrl);
export default router;
//# sourceMappingURL=shorten.js.map