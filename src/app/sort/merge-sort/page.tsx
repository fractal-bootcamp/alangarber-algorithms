"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const SortingVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [positions, setPositions] = useState<{ [key: number]: number }>({});
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
    setPositions(Object.fromEntries(parsedArray.map((_, i) => [i, 0])));
    setSorted(false);
  };

  const mergeSort = async (
    arr: number[],
    startIdx: number = 0,
  ): Promise<number[]> => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Move left half to the left and right half to the right
    setPositions((prev) => ({
      ...prev,
      ...Object.fromEntries(
        left.map((_, i) => [startIdx + i, prev[startIdx + i] - 50]),
      ),
      ...Object.fromEntries(
        right.map((_, i) => [
          startIdx + mid + i,
          prev[startIdx + mid + i] + 50,
        ]),
      ),
    }));

    await new Promise((res) => setTimeout(res, 500));

    const sortedLeft = await mergeSort(left, startIdx);
    const sortedRight = await mergeSort(right, startIdx + mid);
    const merged = merge(sortedLeft, sortedRight);

    // Bring merged elements back to the original position
    setPositions((prev) => ({
      ...prev,
      ...Object.fromEntries(merged.map((_, i) => [startIdx + i, 0])),
    }));

    await new Promise((res) => setTimeout(res, 500));

    return merged;
  };

  const merge = (left: number[], right: number[]): number[] => {
    const result: number[] = [];
    let i = 0,
      j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
  };

  const handleSort = async () => {
    if (!array.length) return;
    setSorted(false);

    const sortedArr = await mergeSort(array);
    setArray(sortedArr);
    setSorted(true);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Merge Sort</h1>

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

      <div className="relative flex justify-center mt-6 w-full">
        {array.map((num, idx) => (
          <motion.div
            key={idx}
            animate={{ x: positions[idx] }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 flex items-center justify-center border rounded text-lg text-black bg-gray-200 mx-2"
          >
            {num}
          </motion.div>
        ))}
      </div>

      {sorted && <p className="mt-4 text-green-600">Array is sorted!</p>}
    </div>
  );
};

export default SortingVisualizer;
