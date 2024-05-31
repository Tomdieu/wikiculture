"use client"
import React from 'react'
import { useTheme } from 'next-themes';
import {cn} from "@/lib/utils"

type Props = {}

const HeroImage = (props: Props) => {
    const { theme, setTheme } = useTheme();
  return (
    <img
    alt="Hero"
    className={cn("mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square",{
        "invert":theme==="dark"
    })}
    height="550"
    src="/cameroon.svg"
    width="550"
  />
  )
}

export default HeroImage