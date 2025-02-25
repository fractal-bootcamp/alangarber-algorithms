// "use client";

// import React, { useState } from "react";
// import { binarySearch } from "@/algorithms/search/binary-search"; // Import the correct algorithm

// const BinarySearchPage = () => {
//   const [array, setArray] = useState<number[]>([]);
//   const [target, setTarget] = useState<number | null>(null);
//   const [highlighted, setHighlighted] = useState<number | null>(null);
//   const [searching, setSearching] = useState(false);
//   const [foundIndex, setFoundIndex] = useState<number | null>(null);

//   const handleArraySubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const input = (event.target as HTMLFormElement).array.value;
//     const parsedArray = input.split(",").map((num) => parseInt(num.trim(), 10));
//     setArray(parsedArray);
//     setHighlighted(null);
//     setFoundIndex(null);
//   };

//   const handleSearchSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!array.length) return;
//     const targetValue = parseInt((event.target as HTMLFormElement).target.value, 10);
//     setTarget(targetValue);
//     setHighlighted(null);
//     setFoundIndex(null);
//     setSearching(true);

//     const updateHighlight = (index: number) => setHighlighted(index);

//     const index = await binarySearch(array, targetValue, updateHighlight);
//     setFoundIndex(index);
//     setSearching(false);
//   };

//   return (
//     <div className="flex flex-col items-center mt-10">
//       <h1 className="text-2xl font-bold mb-4">Binary Search</h1>

//       {/* Form for entering array */}
//       <form onSubmit={handleArraySubmit} className="mb-4 flex flex-col items-center">
//         <label className="mb-2">Paste in Array:</label>
//         <input
//           name="array"
//           type="text"
//           placeholder="e.g., 1, 3, 5, 7, 9"
//           className="border px-4 py-2 rounded-md"
//           required
//         />
//         <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
//           Submit
//         </button>
//       </form>

//       {/* Form for searching element */}
//       <form onSubmit={handleSearchSubmit} className="mb-4 flex flex-col items-center">
//         <label className="mb-2">Search for Element:</label>
//         <input
//           name="target"
//           type="number"
//           placeholder="Enter number"
//           className="border px-4 py-2 rounded-md"
//           required
//         />
//         <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
//           Search
//         </button>
//       </form>

//       {/* Visual Representation */}
//       <div className="flex gap-2 mt-6">
//         {array.map((num, idx) => (
//           <div
//             key={idx}
//             className={`w-12 h-12 flex items-center justify-center border rounded text-lg ${
//               highlighted === idx ? "bg-yellow-400" : foundIndex === idx ? "bg-green-500" : "bg-gray-200"
//             }`}
//           >
//             {num}
//           </div>
//         ))}
//       </div>

//       {foundIndex !== null && (
//         <p className="mt-4">
//           {foundIndex === -1 ? "Element not found." : `Element found at index ${foundIndex}.`}
//         </p>
//       )}
//     </div>
//   );
// };

// export default BinarySearchPage;
