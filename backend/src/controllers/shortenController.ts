import type { Request, Response } from "express";
import { ShortenService } from "../services/shortenService.js"; 

export async function createShortUrl(req: Request, res: Response) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const shortUrl = await ShortenService.create(url);
    return res.json(shortUrl);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function redirectToUrl(req: Request, res: Response) {
  const { code } = req.params;

  try {
    const target = await ShortenService.getByCode(code as string);

    if (!target) {
      return res.status(400).json({ error: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
