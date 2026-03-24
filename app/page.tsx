"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/extract`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setResult(data.message);
    setLoading(false);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>OCR App</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={handleUpload}>Extract Text</button>

      {loading && <p>Loading...</p>}

      {result && (
        <div>
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </main>
  );
}