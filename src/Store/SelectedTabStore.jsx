import {create} from 'zustand'

const useSelectedTabStore = create((set) => ({
    tabId: 1,
    setId: (id) => set((state) => ({ tabId: id })),
}));

export default useSelectedTabStore;
