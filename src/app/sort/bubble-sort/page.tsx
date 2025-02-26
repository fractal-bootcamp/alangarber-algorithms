"use client";

import React, { useState } from "react";

const BubbleSortPage = () => {
  const [array, setArray] = useState<number[]>([]);
  const [highlighted, setHighlighted] = useState<{
    first: number | null;
    second: number | null;
  }>({
    first: null,
    second: null,
  });
  const [sorted, setSorted] = useState(false);

  const handleArraySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).array.value;

    const parsedArray = input
      .split(",")
      .map((num: string) => num.trim()) // Trim first
      .filter((num: string) => num !== "") // Remove empty strings
      .map((num: string) => parseInt(num, 10))
      .filter((num: number) => !isNaN(num)); // Convert to numbers

    setArray(parsedArray);
    setHighlighted({ first: null, second: null });
    setSorted(false);
  };

  const handleSort = async () => {
    if (!array.length) return;
    setSorted(false);

    const arr = [...array];
    const n = arr.length;
    let swapped: boolean;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - 1 - i; j++) {
        setHighlighted({ first: j, second: j + 1 }); // Highlight the pair being compared
        await new Promise((res) => setTimeout(res, 500)); // Delay for visualization

        if (arr[j] > arr[j + 1]) {
          // Swap if needed
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          setArray([...arr]); // Update state for visualization
          await new Promise((res) => setTimeout(res, 500)); // Delay for visualization
        }
      }

      if (!swapped) break; // Optimization: Stop if no swaps were made
    }

    setHighlighted({ first: null, second: null });
    setSorted(true);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Bubble Sort</h1>

      {/* Form for entering array */}
      <form
        onSubmit={handleArraySubmit}
        className="mb-4 flex flex-col items-center"
      >
        <label className="mb-2">List of Numbers:</label>
        <input
          name="array"
          type="text"
          placeholder="e.g., 5, 2, 9, 1, 6"
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

      {/* Button to start sorting */}
      <button
        onClick={handleSort}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        disabled={sorted || array.length === 0}
      >
        Start Sorting
      </button>

      {/* Visual Representation */}
      <div className="flex gap-2 mt-6">
        {array.map((num, idx) => (
          <div
            key={idx}
            className={`w-12 h-12 flex items-center justify-center border rounded text-lg text-black ${
              highlighted.first === idx || highlighted.second === idx
                ? "bg-yellow-400"
                : sorted
                  ? "bg-green-500"
                  : "bg-gray-200"
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {sorted && <p className="mt-4 text-green-600">Array is sorted!</p>}
    </div>
  );
};

export default BubbleSortPage;
