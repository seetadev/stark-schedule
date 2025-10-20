import { ReactNode, useState } from "react";
import { Providers } from "./Providers";
// import Header from "./Header";
// import TabBar from "./TabBar";

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

const Layout = ({ children, isAuthenticated = false }: LayoutProps) => {
  if (!isAuthenticated) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 pb-16">
        <Providers>{children}</Providers>
      </main>
    </div>
  );
};

export default Layout;
