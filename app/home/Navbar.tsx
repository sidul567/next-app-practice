import { ThemeToggler } from "@/components/ThemeToggler";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div>ShadCn</div>
      <ThemeToggler />
    </div>
  );
};

export default Navbar;
