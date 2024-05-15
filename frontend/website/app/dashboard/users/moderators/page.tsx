import React from "react";
import ModeratorTable from "./ModeratorTable";

type Props = {};

const ModeratorPage = (props: Props) => {
  return (
    <div className="w-full h-full container mx-auto">
      <h1 className="font-bold text-2xl">Moderators</h1>
      <ModeratorTable />
    </div>
  );
};

export default ModeratorPage;
