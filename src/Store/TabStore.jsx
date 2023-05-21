import {create} from 'zustand'

export  const useTabStore = create((set) => ({
    current_tab: 1111111,
    name: "echarts-tab",
    setCurrentTab: (value) => set((state) => ({ current_tab: state.current_tab + value })),
    setName: (value) => set((state) => ({ name: value })),
}));

