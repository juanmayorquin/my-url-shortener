import "dotenv/config";
export declare const ShortenService: {
    create(targetUrl: string, customCode: string): Promise<{
        code: string;
        shortUrl: string;
        targetUrl: string;
    }>;
    getByCode(code: string): Promise<string | null>;
};
//# sourceMappingURL=shortenService.d.ts.map