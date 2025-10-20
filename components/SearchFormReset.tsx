// import React from "react";

// ("use client");

// function SearchFormReset() {
//   const reset = () => {
//     const form = document.querySelector(".search-form") as HTMLFormElement;
//     if (form) {
//       form.reset();
//     }
//     return <button type="reset" onClick={reset}></button>;
//   };
// }

// export default SearchFormReset;

"use client";

import Link from "next/link";
import React from "react";

function SearchFormReset() {
  const handleReset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };

  return (
    <>
      <button type="reset" onClick={handleReset}>
        Reset
      </button>
      <Link href="/" className="search-btn text-white"></Link>
    </>
  );
}

export default SearchFormReset;
