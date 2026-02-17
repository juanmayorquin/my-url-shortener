"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLoading(false);
    }
  }

  return (
    <div className="w-2/3 m-auto py-20">
      <main className="flex flex-col gap-10 items-center text-lg">
        <h1 className="text-6xl font-bold">
          Mayo<span className="text-orange-600">dev</span>&apos;s URL Shortener
        </h1>
        <p className="text-neutral-400">
          A simple URL Shortener that you can use for your projects, for free. A
          simple URL Shortener that you can use for your projects, for free. A
          simple URL Shortener that you can use for your projects, for free. A
          simple URL Shortener that you can use for your projects, for free. A
          simple URL Shortener that you can use for your projects, for free.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="form-url"
              className="text-lg text-neutral-300 font-medium group-hover:text-white group-hover:font-medium transition-all w-full"
            >
              URL
            </label>
            <div className="flex gap-1 text-md">
              <input
                type="text"
                id="form-url"
                placeholder="URL to be shortened"
                autoComplete="off"
                className="text-neutral-300 group-hover:text-white group-hover:font-medium placeholder:text-neutral-400 py-2 px-3 outline-none border border-neutral-500 focus:border-orange-600 leading-5 bg-neutral-900 rounded-lg appearance-none transition-all"
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                className="bg-orange-600 p-4 w-max rounded-lg font-semibold hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-orange-700"
                disabled={loading}
              >
                {loading ? "Shortening" : "Shorten URL"}
              </button>
            </div>
          </div>
        </form>
        {result}
      </main>
    </div>
  );
}
