import { create } from 'zustand';

const useUserProgressStore = create<{
    progress: number;
    setProgress: (newProgress: number) => void;
}>((set) => ({
    progress: 0,
    setProgress: (newProgress: number) => set(() => ({ progress: newProgress })),
}));

export default useUserProgressStore;