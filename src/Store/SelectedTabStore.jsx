import {create} from 'zustand'

const useSelectedTabStore = create((set) => ({
    tabId: null,
    setId: (id) => set((state) => ({ tabId: id })),
}));

export default useSelectedTabStore;
