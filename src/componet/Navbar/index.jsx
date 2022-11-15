import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex gap-5 items-center">
      <Link href="/" className="font-semibold   ">
        Upload
      </Link>
      <Link href="/retrieve" className="font-semibold">
        Retrieve
      </Link>
    </div>
  );
};

export default Navbar;
