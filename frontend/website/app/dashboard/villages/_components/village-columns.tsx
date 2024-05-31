"use client"

import { VillageType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";


export const columns: ColumnDef<VillageType>[] = [
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => {
          const id = row.original.id;
          return (
            <Link
                aria-disabled
              href={`#`}
              className="font-bold text-sky-400 hover:underline"
            >
              {id}
            </Link>
          );
        },
      },
      {
        accessorKey: "name",
        header: "Name",
        cell({ row }) {
          const culturalArea = row.original;
          return (
            <span className="font-medium text-ellipsis overflow-hidden line-clamp-1">
              {culturalArea.name}
            </span>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell({ row }) {
          const culturalArea = row.original;
          return (
            <p className="font-medium text-ellipsis overflow-hidden line-clamp-1">
              {culturalArea.description}
            </p>
          );
        },
      },
      {
        accessorKey:"region.name",
        header:"Region",
        cell({row}){
            const village = row.original;
            return (
              <p className="font-medium text-ellipsis overflow-hidden line-clamp-1">
                {village.region.name}
              </p>
            ); 
        }
      },
      {
        accessorKey:"region.cultural_area.name",
        header:"Cultural Area",
        cell({row}){
            const village = row.original;
            return (
              <p className="font-medium text-ellipsis overflow-hidden line-clamp-1">
                {village.region.cultural_area.name}
              </p>
            ); 
        }
      }
]