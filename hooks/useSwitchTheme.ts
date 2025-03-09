"use client";
import { useState } from "react";

const useSwitchTheme = () => {
  const [theme, setTheme] = useState("dark");

  return [theme, setTheme];
};
export default useSwitchTheme;
