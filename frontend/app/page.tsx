"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      setResult(data.shortUrl);
    } catch (err) {
      setResult("Error generando URL");
    } finally {
      setCopied(false);
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <div className="max-w-2xl w-full mx-auto py-10 px-4 sm:px-6 md:px-8">
      <main className="flex flex-col gap-8 items-center text-base sm:text-lg">
        <h1 className="text-4xl sm:text-6xl font-bold text-center wrap-break-word">
          Mayo<span className="text-orange-600">dev</span>&apos;s URL Shortener
        </h1>
        <p className="text-neutral-400 text-center text-sm sm:text-base">
          A free, open-source URL shortener designed for personal and community
          projects. This lightweight, self-hosted tool transforms long, complex
          links into concise, shareable URLs, providing an essential, no-cost
          solution for link management, tracking, and improved user experience
          across all your web projects.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="form-url"
              className="text-base sm:text-lg text-neutral-300 font-medium group-hover:text-white group-hover:font-medium transition-all w-full"
            >
              URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <input
                type="text"
                id="form-url"
                placeholder="URL to be shortened"
                autoComplete="off"
                className="text-neutral-300 group-hover:text-white group-hover:font-medium placeholder:text-neutral-400 py-2 px-3 outline-none border border-neutral-500 focus:border-orange-600 leading-5 bg-neutral-900 rounded-lg appearance-none transition-all flex-1 min-w-0"
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                className="bg-orange-600 py-2 px-4 rounded-lg font-semibold hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-orange-700 w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? "Shortening" : "Shorten URL"}
              </button>
            </div>
          </div>
        </form>
        {result && (
          <div className="flex flex-col gap-2">
            <h4 className="text-base sm:text-lg text-neutral-300 font-medium group-hover:text-white group-hover:font-medium transition-all w-full">
              Short URL
            </h4>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="w-full text-center break-all bg-neutral-800 rounded-lg py-2 px-3 text-orange-500 font-semibold">
                {result}
              </div>

              <button
                className="bg-orange-600 py-2 px-4 rounded-lg font-semibold hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-orange-700 w-full sm:w-auto"
                onClick={copyToClipboard}
              >
                {!copied ? "Copy" : "Copied"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
