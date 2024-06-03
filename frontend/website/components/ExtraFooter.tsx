"use client"
import React from "react";

type Props = {};

const ExtraFooter = (props: Props) => {
  return (
    <section className="min-h-[500px] w-full py-5 border-t">
      <div className="container mx-auto flex space-x-2 items-start">
        <div className="w-full md:w-4/12 space-y-2 h-full">
          <div>
            <h1 className="font-bold text-2xl">Wikiculture</h1>
          </div>
          <p className="text-sm">Description</p>
        </div>
        <div className="w-8/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h1 className="text-muted-foreground text-sm">Categories</h1>
          </div>
          <div>
            <h1 className="text-muted-foreground text-sm">Cultural Areas</h1>
          </div>
          <div>
            <h1 className="text-muted-foreground text-sm">Regions</h1>
          </div>
          <div>
            <h1 className="text-muted-foreground text-sm">Company</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraFooter;
