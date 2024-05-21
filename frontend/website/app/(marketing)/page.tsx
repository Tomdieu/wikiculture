import Image from "next/image";
import Link from "next/link";
import Hero from "./_components/Hero";
import CulturalRegions from "./_components/CulturalRegions";
import Articles from "./_components/Articles";

export default function Home() {
  return (
    <>
    <Hero/>
    <CulturalRegions/>
    <Articles/>
    </>
  );
}
