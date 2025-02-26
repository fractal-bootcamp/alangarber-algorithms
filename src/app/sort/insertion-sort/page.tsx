"use client";

import React, { useState } from "react";

const InsertionSortPage = () => {
  const [array, setArray] = useState<number[]>([]);
  const [highlighted, setHighlighted] = useState<{
    current: number | null;
    target: number | null;
  }>({
    current: null,
    target: null,
  });
  const [movingElement, setMovingElement] = useState<{
    value: number | null;
    index: number | null;
  }>({
    value: null,
    index: null,
  });
  const [sorted, setSorted] = useState(false);

  const handleArraySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).array.value;

    const parsedArray = input
      .split(",")
      .map((num: string) => num.trim()) // Trim first
      .filter((num: string) => num !== "") // Remove empty strings
      .map((num: string) => parseInt(num, 10)); // Convert to numbers

    setArray(parsedArray);
    setHighlighted({ current: null, target: null });
    setMovingElement({ value: null, index: null });
    setSorted(false);
  };

  const handleSort = async () => {
    if (!array.length) return;
    setSorted(false);

    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;

      setHighlighted({ current: i, target: null });
      setMovingElement({ value: key, index: i });
      await new Promise((res) => setTimeout(res, 500));

      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j]; // Shift element right
        setArray([...arr]);
        setMovingElement({ value: key, index: j });
        setHighlighted({ current: i, target: j });

        await new Promise((res) => setTimeout(res, 500));
        j--;
      }

      arr[j + 1] = key; // Insert key in correct position
      setArray([...arr]);
      setMovingElement({ value: null, index: null });
      setHighlighted({ current: null, target: null });

      await new Promise((res) => setTimeout(res, 500));
    }

    setSorted(true);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Insertion Sort</h1>

      {/* Form for entering array */}
      <form
        onSubmit={handleArraySubmit}
        className="mb-4 flex flex-col items-center"
      >
        <label className="mb-2">List of Numbers:</label>
        <input
          name="array"
          type="text"
          placeholder="e.g., 8, 3, 6, 1, 4"
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
        {array.map((num, idx) => {
          const isMoving = movingElement.index === idx;

          return (
            <div
              key={idx}
              className={`w-12 h-12 flex items-center justify-center border rounded text-lg text-black ${
                highlighted.current === idx
                  ? "bg-yellow-400" // Current element being inserted
                  : highlighted.target === idx
                    ? "bg-blue-400" // Target position
                    : sorted
                      ? "bg-green-500" // Sorted state
                      : "bg-gray-200"
              }`}
            >
              {isMoving ? movingElement.value : num}
            </div>
          );
        })}
      </div>

      {sorted && <p className="mt-4 text-green-600">Array is sorted!</p>}
    </div>
  );
};

export default InsertionSortPage;
