import React from "react";
import MediaTable from "./_components/media-table";
import UploadFile from "./_components/upload";

type Props = {};

const MediaPage = (props: Props) => {
  return (
    <div className="w-full h-full container mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Media</h1>
        <UploadFile />
      </div>

      <MediaTable />
    </div>
  );
};

export default MediaPage;
