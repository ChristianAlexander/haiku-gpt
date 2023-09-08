"use client";

import { useCompletion } from "ai/react";

export default function Home() {
  const { input, completion, handleSubmit, handleInputChange, isLoading } =
    useCompletion({ api: "/api/haiku" });

  return (
    <div className="my-8">
      <form className="grid grid-cols-1 mx-14 gap-y-8" onSubmit={handleSubmit}>
        <h1 className="text-xl">Haiku GPT</h1>
        <div>
          <label
            htmlFor="inspiration"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Inspire a Haiku
          </label>
          <div className="mt-2">
            <textarea
              rows={4}
              name="inspiration"
              id="inspiration"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Inspiration goes here…"
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Generate
          </button>
        </div>
        {completion && (
          <div className="p-8 border border-gray-200 rounded-md space-y-2">
            {completion.split("\n").map((line, i) => (
              <div key={i} className="text-3xl">
                {line}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
