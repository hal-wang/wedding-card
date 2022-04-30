import { defineStore } from 'pinia';
import { store } from '/@/store';

interface AppState {
  count: number;
}
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    count: 0,
  }),
  getters: {
    getCount(): number {
      return this.count;
    },
  },
  actions: {
    setCount(val: number) {
      this.count = val;
    },
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
