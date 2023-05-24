import {create} from 'zustand'

const useDeletedStore = create((set) => ({
    deleteId: 0,
    deletedIdList: [],
    setId: (id) => set((state) => ({ deleteId: id })),
}));

export default useDeletedStore;
