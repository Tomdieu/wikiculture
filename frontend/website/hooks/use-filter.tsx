import { getAllCategories } from "@/actions/articles";
import { getAllCulturalAreas } from "@/actions/cultural_areas";
import { CategoryType, CulturalAreaListType, RegionListType, VillageListType } from "@/types";
import { create } from "zustand"
// import { createJSONStorage, persist } from "zustand/middleware";

type FilterStoreType = {
    categories: Array<string>;
    cultural_areas: Array<string>;
    regions: Array<string>;
    villages: Array<string>;
    isToClear: boolean;
    setCategories: (categories: Array<string>) => void;
    setCulturalAreas: (caculturalAreas: Array<string>) => void;
    setRegions: (regions: Array<string>) => void;
    setVillages: (villages: Array<string>) => void;
    addVillage: (village: string) => void;
    addRegion: (region: string) => void;
    addCulturalArea: (culturalArea: string) => void;
    addCategory: (category: string) => void;
    removeCategory: (category: string) => void;
    removeCulturalArea: (culturalArea: string) => void;
    removeRegion: (region: string) => void;
    removeVillage: (region: string) => void;
    getCategories: () => Promise<CategoryType[]>;
    getCulturalAreas: () => Promise<CulturalAreaListType[]>;
    getRegions: () => Promise<RegionListType[]>;
    getVillages: () => Promise<VillageListType[]>;
    getQueryParams: () => string;
    clearFilter: () => void;

}

export const useFilterStore = create<FilterStoreType>(
    (set, get) => ({
        isToClear: false,
        categories: [],
        cultural_areas: [],
        regions: [],
        villages: [],
        addCategory: (cat) => set((state) => ({ isToClear: true, categories: [...state.categories, cat] })),
        addCulturalArea: (cul) => set((state) => ({ isToClear: true, cultural_areas: [...state.cultural_areas, cul] })),
        addRegion: (reg) => set((state) => ({ isToClear: true, regions: [...state.regions, reg] })),
        addVillage: (village) => {
            const villages = get().villages
            const filteredVillages = villages.filter((_village) => village != _village)
            set((state) => ({ isToClear: true, villages: [...filteredVillages, village] }))
        },
        setCategories: (categories) => set({ isToClear: true, categories: categories }),
        setCulturalAreas: (culturalAreas) => set({ isToClear: true, cultural_areas: culturalAreas }),
        setRegions: (regions) => set({ isToClear: true, regions: regions }),
        setVillages: (villages) => set({ isToClear: true, villages: villages }),
        clearFilter: () => set({ isToClear: false, categories: [], cultural_areas: [], regions: [], villages: [] }),
        removeCategory: (cat) => {
            const categories = get().categories
            const filterCategories = categories.filter((_cat) => cat != _cat)
            set({ isToClear: filterCategories.length > 0, categories: filterCategories })
        },
        removeCulturalArea: (culturalArea) => {
            const cultural_areas = get().cultural_areas
            const filteredCulturalAreas = cultural_areas.filter((_cul) => culturalArea != _cul)
            set({ isToClear: filteredCulturalAreas.length > 0, cultural_areas: filteredCulturalAreas })
            if (filteredCulturalAreas.length === 0) {
                set({ regions: [], villages: [] })
            }
        },
        removeRegion: (region) => {
            const regions = get().regions
            const filteredRegions = regions.filter((_region) => region != _region)
            set({ isToClear: filteredRegions.length > 0, regions: filteredRegions })
            if (filteredRegions.length === 0) {
                set({ villages: [] })
            }
        },
        removeVillage: (village) => {
            const villages = get().villages
            const filteredVillages = villages.filter((_village) => village != _village)
            set({ isToClear: filteredVillages.length > 0, villages: filteredVillages })
        },
        getCategories: async () => {
            const categories = await getAllCategories()
            set({ isToClear: categories.length > 0 })
            return categories
        },
        getCulturalAreas: async () => {
            return await getAllCulturalAreas();
        },
        getRegions: async () => {
            const cultural_areas = await get().getCulturalAreas();
            const _cultural_areas = get().cultural_areas
            const culturalAreas = cultural_areas?.filter((culturalArea) => _cultural_areas.includes(culturalArea.name))
            const regionsList = culturalAreas?.map((cA) => cA.regions)
            const _regions: Array<RegionListType> = [];
            regionsList?.map((arr) => {
                arr.map((region) => {
                    _regions.push(region)
                })
            })
            return _regions;

        },
        getVillages: async () => {
            const regions = get().regions;
            const _regions = (await get().getRegions()).filter((_reg) => regions.includes(_reg.name))
            const villagesList = _regions.map((rG) => rG.villages)
            console.log({ villagesList })
            const _villages: Array<VillageListType> = [];
            villagesList.map((arr) => {
                arr.map((village) => {
                    _villages.push(village)
                })
            })
            return _villages;
        },
        getQueryParams: () => {

            // Initialize a new URLSearchParams object
            const params = new URLSearchParams();

            const categories_list = get().categories.join(',')
            const cultural_areas_list = get().cultural_areas.join(',')
            const regions_list = get().regions.join(',')
            const villages_list = get().villages.join(',')


            // Append parameters if they are not empty
            if (categories_list) {
                params.append('categories_list', categories_list);
            }
            if (cultural_areas_list) {
                params.append('cultural_areas_list', cultural_areas_list);
            }
            if (regions_list) {
                params.append('regions_list', regions_list);
            }
            if (villages_list) {
                params.append('villages_list', villages_list);
            }


            // Convert the parameters to a query string
            const query = params.toString();

            return query;
        }

    })
)