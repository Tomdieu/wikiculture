import {create} from "zustand"

type FilterType = {
    articleFilter:"newest"|"most_read"|"popular"|string;
    categoryFilter?:string;
    setAricleFilter:(filter:"newest"|"most_read"|"popular"|string)=>void;
    setCategory:(filter:string)=>void;
}

export const useExploreFilter = create<FilterType>((set)=>({
    articleFilter:"newest",
    categoryFilter:'',
    setAricleFilter:(filter)=>set({articleFilter:filter}),
    setCategory:(filter)=>set({categoryFilter:filter})
}))