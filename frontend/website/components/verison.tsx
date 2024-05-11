import { ArticleHistoryType, ArticleType } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Cover from "./Cover";
import Toolbar from "./Toolbar";
import parse from 'html-react-parser';

type VersionProps = {
  version: ArticleHistoryType;
};

const Version = ({ version }: VersionProps) => {

  return (
    <Card className="shadow-lg rounded-md p-4">
      <CardHeader>
        <Cover preview={true} url={version.cover_image} />
      </CardHeader>
      <CardContent>
        {/* <Toolbar preview article={version as ArticleType} /> */}
        <article className="prose">
            {parse(version.content!)}
        </article>
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
  );
};

export default Version;
