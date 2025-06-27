import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="container px-6 mx-auto grid">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}; 