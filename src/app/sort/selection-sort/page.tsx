"use client";

import React, { useState } from "react";

const SelectionSortPage = () => {
  const [array, setArray] = useState<number[]>([]);
  const [highlighted, setHighlighted] = useState<{
    current: number | null;
    min: number | null;
  }>({
    current: null,
    min: null,
  });
  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const [sorted, setSorted] = useState(false);

  const handleArraySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).array.value;

    const parsedArray = input
      .split(",")
      .map((num: string) => num.trim())
      .filter((num: string) => num !== "")
      .map((num: string) => parseInt(num, 10))
      .filter((num: number) => !isNaN(num));

    setArray(parsedArray);
    setSortedArray([]);
    setHighlighted({ current: null, min: null });
    setSorted(false);
  };

  const handleSort = async () => {
    if (!array.length) return;
    setSorted(false);

    const arr = [...array];
    const sortedArr: number[] = [];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      setHighlighted({ current: i, min: minIdx });
      await new Promise((res) => setTimeout(res, 500));

      for (let j = i + 1; j < n; j++) {
        setHighlighted({ current: j, min: minIdx });
        await new Promise((res) => setTimeout(res, 500));

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setHighlighted({ current: j, min: minIdx });
          await new Promise((res) => setTimeout(res, 500));
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        await new Promise((res) => setTimeout(res, 500));
      }

      sortedArr.push(arr[i]);
      setSortedArray([...sortedArr]);
      await new Promise((res) => setTimeout(res, 500));
    }

    setHighlighted({ current: null, min: null });
    setSorted(true);
    setTimeout(() => {
      setArray([...sortedArr]);
      setSortedArray([]);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Selection Sort</h1>

      <form
        onSubmit={handleArraySubmit}
        className="mb-4 flex flex-col items-center"
      >
        <label className="mb-2">List of Numbers:</label>
        <input
          name="array"
          type="text"
          placeholder="e.g., 7, 4, 2, 9, 5"
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

      <button
        onClick={handleSort}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        disabled={sorted || array.length === 0}
      >
        Start Sorting
      </button>

      <div className="flex gap-2 mt-6">
        {array.map((num, idx) => (
          <div
            key={idx}
            className={`w-12 h-12 flex items-center justify-center border rounded text-lg text-black ${
              highlighted.current === idx
                ? "bg-yellow-400"
                : highlighted.min === idx
                  ? "bg-red-400"
                  : "bg-gray-200"
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Sorted Elements Row */}
      <div className="flex gap-2 mt-6">
        {sortedArray.map((num, idx) => (
          <div
            key={idx}
            className="w-12 h-12 flex items-center justify-center border rounded text-lg text-white bg-green-500"
          >
            {num}
          </div>
        ))}
      </div>

      {sorted && <p className="mt-4 text-green-600">Array is sorted!</p>}
    </div>
  );
};

export default SelectionSortPage;
