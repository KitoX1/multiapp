declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare interface MenuItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

declare type SidebarContextType = {
  isSidebarOpened: boolean | null;
  setIsSidebarOpened: React.Dispatch<React.SetStateAction<boolean>> | null;
} | null;
