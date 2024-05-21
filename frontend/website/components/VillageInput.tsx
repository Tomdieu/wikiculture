"use client";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { getCulturalAreas } from "@/actions/cultural_areas";
import { Skeleton } from "./ui/skeleton";
import {
  CulturalAreaListType,
  RegionListType,
  VillageListType,
  VillageType,
} from "@/types";
import { Label } from "./ui/label";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";

type Props = {
  village?: VillageType;
  onVillageSelected?: (village: VillageListType) => void;
  onChange?: (village?: VillageType) => void;
};

const VillageInput = ({
  village: articleVillage,
  onVillageSelected,
  onChange,
}: Props) => {
  const [isCulturalAreaOpen, setIsCulturalAreaOpen] = React.useState(false);
  const [isRegionOpen, setIsRegionOpen] = React.useState(false);
  const [isVillageOpen, setIsVillageOpen] = React.useState(false);

  const [culturalAreaList, setCulturalAreaList] = useState<
    CulturalAreaListType[]
  >([]);
  const [regionList, setRegionList] = useState<RegionListType[]>([]);
  const [villageList, setVillageList] = useState<VillageListType[]>([]);

  const [culturalArea, setCulturalArea] =
    React.useState<CulturalAreaListType>();
  const [region, setRegion] = React.useState<RegionListType>();
  const [village, setVillage] = React.useState<VillageListType>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cultural-areas"],
    queryFn: () => getCulturalAreas(),
  });

  useEffect(() => {
    if (data) {
      setCulturalAreaList(data);
    }
  }, [data]);

  useEffect(() => {
    if (culturalArea) {
      setRegionList(culturalArea.regions);
      if (culturalArea.id !== articleVillage?.region.cultural_area.id) {
        setVillage(undefined);
        setRegion(undefined);
      }
    }
  }, [culturalArea, onChange,articleVillage]);

  useEffect(() => {
    if (region) {
      setVillageList(region.villages);
      if (region.id !== articleVillage?.region.id) {
        setVillage(undefined);
      }
    }
  }, [region, onChange,articleVillage]);

  useEffect(() => {
    if (village && onVillageSelected) {
      onVillageSelected(village);
    }
  }, [village, onVillageSelected]);

  useEffect(() => {
    if (articleVillage) {
      const selectedCulturalArea = culturalAreaList.find(
        (_cultureArea) => articleVillage.region.cultural_area.id === _cultureArea.id
      );
      const selectedRegion = selectedCulturalArea?.regions.find(
        (_region) => articleVillage.region.id === _region.id
      );
      const selectedVillage = selectedRegion?.villages.find(
        (_village) => articleVillage.id === _village.id
      );

      setCulturalArea(selectedCulturalArea);
      setRegion(selectedRegion);
      setVillage(selectedVillage);
    }
  }, [articleVillage, culturalAreaList]);

  useEffect(() => {
    if (village && onChange && region && culturalArea) {
      const _region = _.omit(region, "villages");
      const _culturalArea = _.omit(culturalArea, "regions");

      const _village: VillageType = {
        ...village,
        region: {
          ..._region,
          cultural_area: {
            ..._culturalArea,
          },
        },
      };
      if (_village.id !== articleVillage?.id) {
        onChange(_village);
      }
    }
  }, [village, region, culturalArea, onChange]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="w-[20%] h-3" />
            <Skeleton className="w-full h-7" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <h1>Error</h1>;
  }

  if (data) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="grid grid-cols-1 space-y-1">
          <Label className="font-bold text-base">Cultural Area</Label>
          <Popover
            open={isCulturalAreaOpen}
            onOpenChange={setIsCulturalAreaOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={isCulturalAreaOpen}
                className="justify-between text-muted-foreground"
              >
                {culturalArea
                  ? culturalAreaList.find(
                      (_culturalArea) =>
                        _culturalArea.name === culturalArea?.name
                    )?.name
                  : "Select the cultural area..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search cultural area..."
                  className="h-9"
                />
                <CommandEmpty>No cultural area found.</CommandEmpty>
                <CommandGroup>
                  {culturalAreaList.map((_culturalArea) => (
                    <CommandItem
                      key={_culturalArea.name}
                      value={_culturalArea.name}
                      onSelect={(currentValue) => {
                        setCulturalArea(_culturalArea);
                        setIsCulturalAreaOpen(false);
                      }}
                      className="text-xs sm:text-sm text-muted-foreground"
                    >
                      {_culturalArea.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          culturalArea?.name === _culturalArea.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {culturalArea && (
          <div className="grid grid-cols-1 space-y-1">
            <Label className="font-bold text-base">Region</Label>
            <Popover open={isRegionOpen} onOpenChange={setIsRegionOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isRegionOpen}
                  className="justify-between text-muted-foreground"
                >
                  {region
                    ? regionList.find(
                        (_region) => _region.name === region?.name
                      )?.name
                    : "Select the region ..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search a region..."
                    className="h-9"
                  />
                  <CommandEmpty>No region found.</CommandEmpty>
                  <CommandGroup>
                    {regionList.map((_region) => (
                      <CommandItem
                        key={_region.name}
                        value={_region.name}
                        onSelect={(currentValue) => {
                          setRegion(_region);
                          setIsRegionOpen(false);
                        }}
                        className="text-xs sm:text-sm text-muted-foreground"
                      >
                        {_region.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            region?.name === _region.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}
        {region && (
          <div className="grid grid-cols-1 space-y-1">
            <Label className="font-bold text-base">Village</Label>
            <Popover open={isVillageOpen} onOpenChange={setIsVillageOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isVillageOpen}
                  className="justify-between text-muted-foreground"
                >
                  {village
                    ? villageList.find(
                        (_village) => _village.name === village?.name
                      )?.name
                    : "Select the village..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Search a village..."
                    className="h-9"
                  />
                  <CommandEmpty>No village found.</CommandEmpty>
                  <CommandGroup>
                    {villageList.map((_village) => (
                      <CommandItem
                        key={_village.name}
                        value={_village.name}
                        onSelect={(currentValue) => {
                          setVillage(_village);
                          setIsVillageOpen(false);
                        }}
                        className="text-xs sm:text-sm text-muted-foreground"
                      >
                        {_village.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            region?.name === _village.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default VillageInput;
