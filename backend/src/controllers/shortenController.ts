import type { Request, Response } from "express";
<<<<<<< HEAD
import { ShortenService } from "../services/shortenService";
=======
import { ShortenService } from "../services/shortenService.js";
>>>>>>> 2eb0761 (fix: update import paths to use .js extensions and adjust start script in package.json)
import { Prisma } from "@prisma/client";

export async function createShortUrl(req: Request, res: Response) {
  const { url, code } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const shortUrl = await ShortenService.create(url, code);
    return res.json(shortUrl);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({error: "Custom code already exists. Try a different one"})
    }
    return res.status(500).json({ error: `Internal server error.` });
  }
}

export async function redirectToUrl(req: Request, res: Response) {
  const { code } = req.params;
  try {
    const target = await ShortenService.getByCode(code as string);

    if (!target) {
      return res.status(404).json({ error: "Not found" });
    }
    return res.json(target);
  } catch (error) {
    return res.status(500).json({ error: `Internal server error.` });
  }
}
