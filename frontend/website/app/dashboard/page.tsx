import { getSession } from "@/lib/getSession";
import React from "react";
import Image from "next/image";
import { Newspaper } from "lucide-react";
import TotalArticle from "./total-articles";
import { Card } from "@/components/ui/card";
import TotalUsers from "./_components/total-users";
import TotalArticles from "./_components/total-articles";
import TotalCulturalArea from "./_components/total-cultural-area";
import TotalRegions from "./_components/total-regions";
import TotalVillage from "./_components/total-villages";
import VisitorsPerPage from "@/components/charts/VisitorsPerPage";

type Props = {};

const Dashboard = async (props: Props) => {
  const session = await getSession();

  return (
    <div className="container mx-auto flex-1 flex flex-col space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-muted-foreground">
          Welcome Back! 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          Good evening!{" "}
          <span className="font-bold">{session?.user.username}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-2">
        <Card className="w-full p-5 lg:max-w-md flex h-full shadow-lg select-none">
          <div className=" rounded-md flex flex-1 space-y-10 flex-col">
            <div>
              <h2 className="text-3xl text-muted-foreground">
                {session?.user?.username}
              </h2>
              <p className="text-muted-foreground text-xs">
                {session?.user?.user_type !== "User"
                  ? session?.user?.user_type
                  : session?.user?.bio}
              </p>
            </div>
            <div className="flex items-center space-x-0.5">
              <TotalArticle />{" "}
              <span className="text-xs text-muted-foreground">
                Total Articles
              </span>
            </div>
          </div>
          <Newspaper />
        </Card>
        <VisitorsPerPage userId={session?.user.id} />
        {session && session.user.user_type !== "User" && (
          <>
            <TotalUsers />
            <TotalArticles />
            <TotalCulturalArea />
            <TotalRegions />
            <TotalVillage />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
