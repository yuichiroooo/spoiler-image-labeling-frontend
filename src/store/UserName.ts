import { create } from 'zustand';

const useUserNameStore = create<{
    name: string;
    setName: (newName: string) => void;
}>((set) => ({
    name: "anonymous",
    setName: (newName: string) => set(() => ({ name: newName })),
}));

export default useUserNameStore;