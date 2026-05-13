"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      const data = await response.json();
      console.log(data);

      setSummary(data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">
          AI Text Summarizer
        </h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your article here..."
          className="w-full h-64 p-4 rounded-lg border border-zinc-800"
        />

        <button
          onClick={handleSummarize}
          disabled={loading}
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {summary && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">
              Summary
            </h2>

            <div className="p-5 rounded-lg border border-zinc-700 whitespace-pre-wrap">
              {summary}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
