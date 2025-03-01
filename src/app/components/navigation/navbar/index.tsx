import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  const [openDropdown, setOpenDropdown] = useState<"search" | "sort" | null>(
    null,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-20 bg-emerald-800 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Logo />
          <button
            type="button"
            className="inline-flex items-center md:hidden"
            onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
              />
            </svg>
          </button>
          <ul className="hidden md:flex gap-x-12 text-white items-center">
            {" "}
            {/* Increased gap for centering */}
            <li>
              <Link href="/path-finding">
                <p>Path-Finding</p>
              </Link>
            </li>
            {/* Search Dropdown */}
            <li className="relative dropdown">
              <button
                onClick={() =>
                  setOpenDropdown((prev) =>
                    prev === "search" ? null : "search",
                  )
                }
              >
                Search
              </button>
              {openDropdown === "search" && (
                <ul
                  className="absolute mt-2 w-48 bg-white text-black rounded-lg shadow-lg whitespace-nowrap
                              left-1/2 transform -translate-x-1/2 min-w-max max-w-xs overflow-hidden border border-gray-300"
                >
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/search/binary-search">Binary Search</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/search/breadth-first-search">
                      Breadth-First Search
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/search/depth-first-search">
                      Depth-First Search
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/search/linear-search">Linear Search</Link>
                  </li>
                </ul>
              )}
            </li>
            {/* Sort Dropdown */}
            <li className="relative dropdown">
              <button
                onClick={() =>
                  setOpenDropdown((prev) => (prev === "sort" ? null : "sort"))
                }
              >
                Sort
              </button>
              {openDropdown === "sort" && (
                <ul
                  className="absolute mt-2 w-48 bg-white text-black rounded-lg shadow-lg whitespace-nowrap
                              left-1/2 transform -translate-x-1/2 min-w-max max-w-xs overflow-hidden border border-gray-300"
                >
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/sort/bubble-sort">Bubble Sort</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/sort/insertion-sort">Insertion Sort</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/sort/merge-sort">Merge Sort</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/sort/quick-sort">Quick Sort</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/sort/selection-sort">Selection Sort</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
