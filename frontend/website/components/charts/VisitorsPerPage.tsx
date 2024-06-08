"use client";
import { visitorsPerDay } from "@/actions/articles";
import { useQuery } from "@tanstack/react-query";
import { AreaChart } from "lucide-react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  userId?: string;
};

const VisitorsPerPage = ({ userId }: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles-visitors"],
    queryFn: () => visitorsPerDay(null, "", "", "7days", userId!),
    enabled: Boolean(userId !== undefined),
  });

  console.log({ data });

  return (
    <div className="shadow-lg border rounded-md h-full">
      <ResponsiveContainer width="100%" height={"100%"}>
        <LineChart
          data={data}
          // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <XAxis dataKey="date" tick={false}/> */}
          {/* <YAxis /> */}
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsPerPage;
