// "use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

const LogoIcon = () => {
  const url = "wikiculture-favicon-color.svg";
  return <Image src={`${url}`} width={100} height={100} alt="Logo" className="w-9 h-9" />;
};

export default LogoIcon;
