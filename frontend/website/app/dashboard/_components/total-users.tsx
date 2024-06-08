"use client";
import CountUp from 'react-countup';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUsers } from '@/actions/users';
import { Card } from '@/components/ui/card';
import { User } from 'lucide-react'

type Props = {
    className?: string
};

const TotalUsers = ({ className }: Props) => {
    const { data, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
    });

    if (isLoading) {
        return <Card className="w-full p-5 lg:max-w-md flex  shadow-lg select-none h-full">
        <div className='rounded-md flex flex-1 space-y-10 flex-col'>
        <div>
            <Skeleton className="w-[40%] h-10"/>
        </div>
        <div className="flex items-center space-x-0.5">
        <Skeleton className="w-[50%] h-8"/>
        </div>
    </div>
    <Skeleton className="w-10 h-10"/>
    </Card>
    }

    return (
        <Card className="w-full p-5 lg:max-w-md flex  shadow-lg select-none h-full">
            <div className=' rounded-md flex flex-1 space-y-10 flex-col'>
                <div>
                    <h2 className="text-3xl text-muted-foreground">Users</h2>
                    <p className='text-muted-foreground text-xs'></p>
                </div>
                <div className="flex items-center space-x-0.5">
                    <span className={cn("text-xl", className)}><CountUp end={data?.count!} /> </span> <span className="text-xs text-muted-foreground">Total Users</span>
                </div>
            </div>
            <  User />
        </Card>
    )

};

export default TotalUsers;
