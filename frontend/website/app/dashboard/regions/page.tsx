"use client";
import React from "react";

// import RegionTable from "./_components/RegionTable";

import dynamic from "next/dynamic";

const RegionTable = dynamic(() => import("./_components/RegionTable"), {
  ssr: false,
});

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-full container mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Regions</h1>
      </div>
      <RegionTable />
    </div>
  );
};

export default page;
