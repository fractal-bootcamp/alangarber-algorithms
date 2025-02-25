"use client";

import React, { useState } from "react";

const LinearSearchPage = () => {
  const [array, setArray] = useState<number[]>([]);
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);

  const handleArraySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).array.value;

    const parsedArray = input
      .split(",")
      .map((num: string) => num.trim()) // Trim first
      .filter((num: string) => num !== "") // Remove empty strings
      .map((num: string) => parseInt(num, 10)); // Convert to numbers

    setArray(parsedArray);
    setHighlighted(null);
    setFoundIndex(null);
  };

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!array.length) return;

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const targetInput = formData.get("target") as string;
    const targetValue = parseInt(targetInput, 10);

    setHighlighted(null);
    setFoundIndex(null);

    // Function with step-by-step visualization
    async function animatedLinearSearch(arr: number[], term: number) {
      for (let idx = 0; idx < arr.length; idx++) {
        setHighlighted(idx); // Highlight current index
        await new Promise((res) => setTimeout(res, 500)); // Delay for visualization

        if (arr[idx] === term) {
          setFoundIndex(idx);
          return;
        }
      }

      setFoundIndex(-1); // Not found
    }

    // Start visualization
    await animatedLinearSearch(array, targetValue);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Linear Search</h1>

      {/* Form for entering array */}
      <form
        onSubmit={handleArraySubmit}
        className="mb-4 flex flex-col items-center"
      >
        <label className="mb-2">List of Numbers:</label>
        <input
          name="array"
          type="text"
          placeholder="e.g., 1, 3, 5, 7, 9"
          className="border px-4 py-2 rounded-md text-black"
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>

      {/* Form for searching element */}
      <form
        onSubmit={handleSearchSubmit}
        className="mb-4 flex flex-col items-center"
      >
        <label className="mb-2">Search for Element:</label>
        <input
          name="target"
          type="number"
          placeholder="Enter number"
          className="border px-4 py-2 rounded-md text-black"
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Search
        </button>
      </form>

      {/* Visual Representation */}
      <div className="flex gap-2 mt-6">
        {array.map((num, idx) => (
          <div
            key={idx}
            className={`w-12 h-12 flex items-center justify-center border rounded text-lg text-black ${
              highlighted === idx
                ? "bg-yellow-400"
                : foundIndex === idx
                  ? "bg-green-500"
                  : "bg-gray-200"
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {foundIndex !== null && (
        <p className="mt-4">
          {foundIndex === -1
            ? "Element not found."
            : `Element found at index ${foundIndex}.`}
        </p>
      )}
    </div>
  );
};

export default LinearSearchPage;
