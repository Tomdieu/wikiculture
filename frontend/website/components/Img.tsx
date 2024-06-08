"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

const Img = ({ width, height, className }: Props) => {
  // const {theme} = useTheme()

  return (
    <Image
      src={"/wikiculture-favicon-color.svg"}
      alt={"logo"}
      width={width || 64}
      height={height || 64}
      className={className}
    />
  );
};

export default Img;
