"use client"
import { getAllCategories } from '@/actions/articles'
import { getAllCulturalAreas } from '@/actions/cultural_areas'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useFilterStore } from '@/hooks/use-filter'
import { cn } from '@/lib/utils'
import { RegionListType, RegionType, VillageListType } from '@/types'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckIcon, Filter, FilterX, Loader, Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {}

const Sidebar = (props: Props) => {
  const filters = useFilterStore()

  const queryClient = useQueryClient()

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => filters.getCategories(),
  });
  const { data: cultural_areas, isLoading: isCulturalAreaLoading } = useQuery({
    queryKey: ["cultural-areas"],
    queryFn: () => filters.getCulturalAreas(),
  });

  const { data: regions, isLoading: isRegionLoading } = useQuery({
    queryKey: ["regions"],
    queryFn: () => filters.getRegions(),
    enabled: filters.cultural_areas.length > 0
  })

  const { data: villages, isLoading: isVillageLoading } = useQuery({
    queryKey: ["villages"],
    queryFn: () => filters.getVillages(),
    enabled: filters.regions.length > 0
  })

  const [isOpen, setIsOpen] = useState(false)



  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["regions"]
    })
  }, [filters.cultural_areas])


  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["villages"]
    })
  }, [filters.regions])

  return (
    <div className='min-h-full h-full flex flex-col space-y-2 p-3 sticky top-0 bottom-0 overflow-y-auto'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-bold flex items-center space-x-1'><Filter className='w-4 h-4' />Filter</h1>

        {filters.isToClear && (
          <div className='flex items-center space-x-1'>

            <div onClick={() => filters.clearFilter()} className="flex items-center space-x-1 rounded-full border px-1 py-1 text-muted-foreground select-none cursor-pointer">
              <FilterX className='w-4 h-4' />
              <span className='text-xs'>Clear Filter</span>
              <div className='rounded-full border w-5 h-5 flex items-center justify-center'>
                <X className='w-3 h-3' />

              </div>
            </div>
          </div>
        )}

      </div>

      <Separator />
      <div>
        <h1 className='font-bold'>Category</h1>
        <div className='flex flex-col space-y-1'>
          {isCategoriesLoading && (
            <>
              <Loader className='w-5 h-5 animate-spin' />
            </>
          )}
          {categories?.map((cat, index) => (
            <div key={index} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox id={cat.name} onCheckedChange={(checked) => {
                if (checked) {
                  filters.addCategory(cat.name)
                } else {
                  filters.removeCategory(cat.name)
                }
              }} checked={filters.categories.includes(cat.name)} />
              <label
                htmlFor={cat.name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 line-clamp-1 cursor-pointer"
              >
                {cat.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h1 className='font-bold'>Cultural Areas</h1>
        <div className='flex flex-col space-y-1'>
          {isCulturalAreaLoading && (
            <>
              <Loader className='w-5 h-5 animate-spin' />
            </>
          )}
          {cultural_areas?.map((cultural_area, index) => (
            <div key={index} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox id={cultural_area.name} checked={filters.cultural_areas.includes(cultural_area.name)} onCheckedChange={(checked) => {
                if (checked) {
                  filters.addCulturalArea(cultural_area.name)
                } else {
                  filters.removeCulturalArea(cultural_area.name)
                }
              }} />
              <label
                htmlFor={cultural_area.name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 line-clamp-1 cursor-pointer"
              >
                {cultural_area.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      {filters.cultural_areas.length > 0 && (
        <>
          <Separator />
          <div>
            <h1 className='font-bold'>Regions</h1>
            <div className='flex flex-col space-y-1'>
              {isRegionLoading && (
                <>
                  <Loader className='w-5 h-5 animate-spin' />
                </>
              )}
              {regions?.map((region, index) => (
                <div key={index} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox id={region.name} checked={filters.regions.includes(region.name)} onCheckedChange={(checked) => {
                    if (checked) {
                      filters.addRegion(region.name)
                    } else {
                      filters.removeRegion(region.name)
                    }
                  }} />
                  <label
                    htmlFor={region.name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 line-clamp-1 cursor-pointer"
                  >
                    {region.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {filters.regions.length > 0 && (
        <>
          <Separator />
          <div className='flex flex-col space-y-1'>
            <h1 className='font-bold'>Villages</h1>
            <div className='flex flex-col space-y-1 relative'>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between text-muted-foreground"
                    size={"sm"}
                    aria-expanded={isOpen}
                  >
                    Select Village
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-full p-0 max-h-[500px] overflow-auto">
                  <Command className='relative top-0 max-h-[400px] overflow-auto'>
                    <CommandInput
                      placeholder="Search a village..."
                      className="h-9"
                    />
                    <CommandEmpty>No village found.</CommandEmpty>
                    <CommandGroup forceMount value='villages' heading={`Villages (${villages?.length})`}>
                      {villages?.map((_village) => (
                        <CommandItem
                          key={_village.name}
                          value={_village.name}
                          onSelect={(currentValue) => {
                            setIsOpen(false)
                            if (!filters.villages.includes(_village.name)) {
                              filters.addVillage(_village.name)
                            } else {
                              filters.removeVillage(_village.name)
                            }
                          }}
                          className="text-xs sm:text-sm text-muted-foreground"
                        >
                          {_village.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              filters.villages.includes(_village.name)
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
              <div className='flex flex-wrap space-x-2 space-y-1'>
                {filters.villages?.map((village, index) => (
                  <div key={index} className="flex items-center space-x-2 rounded-full border px-2 py-1 text-muted-foreground select-none">
                    <span className='text-xs'>{village}</span>
                    <div className='border rounded-full p-1 cursor-pointer'>
                      <X className='w-3 h-3' onClick={() => filters.removeVillage(village)} />

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default Sidebar