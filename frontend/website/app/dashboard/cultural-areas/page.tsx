"use client";
import React from "react";
// import CulturalAreaTable from "./_components/CulturalAreaTable";

import dynamic from "next/dynamic";

const CulturalAreaTable = dynamic(() => import("./_components/CulturalAreaTable"), {
  ssr: false,
});

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-full container mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Cultural Areas</h1>
      </div>
      <CulturalAreaTable />
    </div>
  );
};

export default page;
