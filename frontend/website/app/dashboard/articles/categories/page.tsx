import React from "react";
import CategoryTable from "./_components/categories-table";
import { AddCategory } from "./_components/add-category";

type Props = {};

const CategoriesPage = (props: Props) => {
  return (
    <div className="w-full h-full container mx-auto">
      <div className="flex items-center justify-between py-3 space-y-2">
        <h1 className="text-2xl font-bold">Categories</h1>
        <AddCategory/>
      </div>
      <CategoryTable />
    </div>
  );
};

export default CategoriesPage;
