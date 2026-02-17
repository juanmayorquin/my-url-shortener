import type { Request, Response } from "express";
import { ShortenService } from "../services/shortenService.ts";
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
  console.log("Searching for code:", code);
  try {
    const target = await ShortenService.getByCode(code as string);
    console.log("Found target:", target);

    if (!target) {
      return res.status(404).json({ error: "Not found" });
    }
    
    // Ensure URL has protocol
    const url = target.startsWith("http://") || target.startsWith("https://")
      ? target
      : `https://${target}`;
    
    return res.json({url});
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: `Internal server error.` });
  }
}
