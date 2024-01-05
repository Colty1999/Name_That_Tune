import { useSyncExternalStore } from "react";

export function useStorageState(props: { state: string }) {
  const { state } = props;
  const setStorageState = (newValue: string) => {
    window.localStorage.setItem(state, newValue);
    window.dispatchEvent(new StorageEvent("storage", { key: state, newValue }));
  };

  const getSnapshot = () => localStorage.getItem(state);

  const subscribe = (listener: () => void) => {
    window.addEventListener("storage", listener);
    return () => void window.removeEventListener("storage", listener);
  };

  const store = useSyncExternalStore(subscribe, getSnapshot);

  return {store, setStorageState} as const;
}
