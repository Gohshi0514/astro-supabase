import React, { useState } from "react";

export interface GuestbookEntry {
  name: string;
  message: string;
}

const fetchGuestbookEntries = async (entry?: GuestbookEntry) => {
  const res = await fetch("/api/guestbook", {
    method: entry ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: entry ? JSON.stringify(entry) : null,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  return await res.json();
};

export function Reviews({ reviews }: { reviews: GuestbookEntry[] }) {
  const [data, setData] = useState<GuestbookEntry[]>(reviews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async (entry?: GuestbookEntry) => {
    setLoading(true);
    setError(null);
    try {
      const newEntries = await fetchGuestbookEntries(entry);
      setData((prev) => [...newEntries, ...prev]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const name = formData.get("name")?.toString();
    const message = formData.get("message")?.toString();

    if (!name || !message) return;

    await refetch({ name, message });
    formElement.reset();
  };

  return (
    <div className="max-w-3xl w-full">
      {error && <div>Something went wrong: {error}</div>}
      <form
        onSubmit={onSubmitHandler}
        className="block border bg-blue-100 border-blue-300 rounded-md p-6 dark:bg-blue-950 dark:border-blue-800"
      >
        <div>
          <label
            className="block mb-1 font-medium dark:text-zinc-300 text-zinc-900 text-sm"
            htmlFor="name"
          >
            ニックネーム
          </label>
          <input
            id="name"
            type="text"
            placeholder="太郎"
            required
            name="name"
            className="w-full block rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
          />
        </div>
        <div className="mt-3">
          <label
            className="block mb-1 font-medium dark:text-zinc-300 text-zinc-900 text-sm"
            htmlFor="message"
          >
            メッセージ
          </label>
          <input
            id="message"
            type="text"
            className="w-full block rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
            placeholder="ここにメッセージを入力してください"
            required
            name="message"
          />
        </div>
        <button
          className="w-full dark:bg-zinc-100 bg-zinc-900 border-zinc-900 py-1.5 border dark:border-zinc-100 rounded-md mt-4 dark:text-zinc-900 text-zinc-100 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? "送信中..." : "送信"}
        </button>
      </form>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {data.map((review, index) => (
          <li
            key={index}
            className="p-4 border rounded-md bg-white dark:bg-zinc-800 dark:border-zinc-700"
          >
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {review.name}
            </p>
            <p className="mt-1">{review.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
