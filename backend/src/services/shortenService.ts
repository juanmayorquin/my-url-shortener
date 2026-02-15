import { PrismaClient } from "@prisma/client/extension";
import { generateCode } from "../utils/generateCode.js";

const prisma = new PrismaClient();

export const ShortenService = {
  async create(targetUrl: string) {
    const code = generateCode(8);

    const record = await prisma.shortUrl.create({
      data: {
        code,
        targetUrl,
      },
    });
    return {
      code,
      shortUrl: `${process.env.BASE_URL}/${code}`,
      targetUrl: record.targetUrl,
    };
  },

  async getByCode(code: string) {
    const record = await prisma.shortUrl.findUnique({
      where: { code }
    });

    return record?.targetUrl || null;
  }
};
