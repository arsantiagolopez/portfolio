import { createContext, useContext } from "react";

type SidebarContextValue = {
  registerItem: (id: string, el: HTMLButtonElement) => void;
  unregisterItem: (id: string) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "The SidebarItem component must be used within the Sidebar"
    );
  }
  return context;
}
