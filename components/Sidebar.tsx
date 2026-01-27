'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Layers, 
  Bell, 
  FileText, 
  Satellite,
  Search,
  Menu,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mountains } from '@/constants/data';

const Sidebar = () => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  const alertCount = mountains.filter(m => m.status === 'critical').length;
  
  const navItems = [
    { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/fleet', icon: Layers, label: 'Fleet Management' },
    { href: '/alerts', icon: Bell, label: 'Alert Center', badge: alertCount },
    { href: '/reporting', icon: FileText, label: 'Reporting' },
    { href: '/satellite', icon: Satellite, label: 'Satellite Health' },
  ];

  const filteredMountains = mountains.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-slate-900 hover:bg-slate-800 text-white border border-slate-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-72 bg-slate-900 border-r border-slate-800
        flex flex-col z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <Satellite className="h-8 w-8 text-emerald-500" />
            <div>
              <h1 className="text-xl font-bold text-white">MonitorGunung</h1>
              <p className="text-xs text-slate-400">Environmental Surveillance</p>
            </div>
          </div>
        </div>

        {/* Quick Search */}
        <div className="p-4 border-b border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search mountains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
            />
          </div>
          
          {searchQuery && filteredMountains.length > 0 && (
            <div className="mt-2 bg-slate-800 rounded-md p-2 max-h-40 overflow-y-auto">
              {filteredMountains.map((mountain) => (
                <Link
                  key={mountain.id}
                  href={`/mountain/${mountain.id}`}
                  onClick={() => {
                    setSearchQuery('');
                    setIsOpen(false);
                  }}
                  className="block px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-md"
                >
                  {mountain.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <div className="text-xs text-slate-400">
            <p>West Java Region</p>
            <p className="text-emerald-500">System Online</p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
