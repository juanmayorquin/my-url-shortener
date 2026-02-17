import { generateCode } from "../utils/generateCode.ts";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const ShortenService = {
  async create(targetUrl: string, customCode: string) {
    const code = customCode?.trim().toLowerCase() || generateCode(6);

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
      where: { code },
    });

    return record?.targetUrl || null;
  },
};
