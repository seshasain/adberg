import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, FolderKanban, LogOut, Settings, ChevronDown, Wand2 } from 'lucide-react';
import { getTools, Tool } from '@/lib/toolService';

const mainNavItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/projects', icon: FolderKanban, label: 'Projects' },
];

export const Sidebar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [tools, setTools] = useState<Tool[]>([]);
  const [isToolsOpen, setIsToolsOpen] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      const { tools: fetchedTools } = await getTools();
      if (fetchedTools) {
        setTools(fetchedTools);
      }
    };
    fetchTools();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="/dashboard">
          medianode.ai
        </a>
        <ul className="mt-6">
          {mainNavItems.map((item) => (
            <li className="relative px-6 py-3" key={item.label}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                    isActive ? 'text-gray-800 dark:text-gray-100' : ''
                  }`
                }
              >
                {location.pathname === item.href && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                )}
                <item.icon className="w-5 h-5" />
                <span className="ml-4">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="px-6 mt-6">
          <button
            className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
            onClick={() => setIsToolsOpen(!isToolsOpen)}
          >
            <span className="inline-flex items-center">
              <Wand2 className="w-5 h-5" />
              <span className="ml-4">Tools</span>
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
          </button>
          {isToolsOpen && (
            <ul className="pl-6 mt-2 space-y-2 text-sm">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <NavLink
                    to={tool.path}
                    className={({ isActive }) =>
                      `px-2 py-1 transition-colors duration-150 block rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        isActive ? 'text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
                      }`
                    }
                  >
                    {tool.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
}; 