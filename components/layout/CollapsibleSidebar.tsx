'use client';

import * as React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Layers,
  Bell,
  FileText,
  Satellite,
  Heart,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { mountains } from '@/constants/data';
import { cn } from '@/lib/utils';

// Sidebar Context for managing state
interface SidebarContextType {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};

interface CollapsibleSidebarProps {
  children?: React.ReactNode;
}

export function CollapsibleSidebar({ children }: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const alertCount = mountains.filter(m => m.status === 'critical').length;

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      // Auto-collapse on tablet
      if (width >= 768 && width < 1024) {
        setIsCollapsed(true);
      }
      
      // Close mobile drawer on resize to desktop
      if (width >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [pathname, isMobile]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const closeSidebar = () => setIsOpen(false);

  const navItems = [
    { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/fleet', icon: Layers, label: 'Fleet Management' },
    { href: '/alerts', icon: Bell, label: 'Alert Center', badge: alertCount },
    { href: '/reporting', icon: FileText, label: 'Reporting' },
    { href: '/satellite', icon: Satellite, label: 'Satellite Health' },
    { href: '/credits', icon: Heart, label: 'Credits & Support' },
  ];

  const filteredMountains = mountains.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarWidth = isCollapsed ? 'w-20' : 'w-72';
  const sidebarWidthPx = isCollapsed ? 80 : 288;

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isCollapsed,
        toggleSidebar,
        toggleCollapse,
        closeSidebar,
      }}
    >
      {/* Mobile Hamburger Menu */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-[60] bg-background shadow-lg"
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobile && !isOpen ? -sidebarWidthPx : 0,
          width: isMobile ? 288 : sidebarWidthPx,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className={cn(
          'fixed left-0 top-0 h-screen bg-card border-r border-border z-50',
          'flex flex-col',
          isMobile ? 'w-72' : sidebarWidth
        )}
      >
        {/* Logo & Collapse Button */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <motion.div
            animate={{ opacity: isCollapsed && !isMobile ? 0 : 1 }}
            className="flex items-center space-x-3"
          >
            <Satellite className="h-8 w-8 text-emerald-500 flex-shrink-0" />
            {(!isCollapsed || isMobile) && (
              <div>
                <h1 className="text-xl font-bold text-foreground">Mountain Guardian</h1>
                <p className="text-xs text-muted-foreground">Environmental Surveillance</p>
              </div>
            )}
          </motion.div>

          {/* Desktop Collapse Button */}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="flex-shrink-0"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Theme Toggle */}
        <div className="p-4 border-b border-border flex items-center justify-center">
          <ThemeToggle />
          {(!isCollapsed || isMobile) && (
            <span className="ml-2 text-sm text-muted-foreground">Theme</span>
          )}
        </div>

        {/* Search */}
        {(!isCollapsed || isMobile) && (
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mountains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {searchQuery && filteredMountains.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 bg-muted rounded-md p-2 max-h-40 overflow-y-auto"
              >
                {filteredMountains.map((mountain) => (
                  <Link
                    key={mountain.id}
                    href={`/mountain/${mountain.id}`}
                    onClick={() => setSearchQuery('')}
                    className="block px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                  >
                    {mountain.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        )}

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
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                      'group relative overflow-hidden',
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/20'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 rounded-lg"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon className="h-5 w-5 flex-shrink-0 relative z-10" />
                    {(!isCollapsed || isMobile) && (
                      <>
                        <span className="font-medium relative z-10">{item.label}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <Badge
                            variant="destructive"
                            className="ml-auto relative z-10"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {(!isCollapsed || isMobile) ? (
            <div className="text-xs text-muted-foreground">
              <p>West Java Region</p>
              <p className="text-emerald-500 flex items-center mt-1">
                <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse mr-2" />
                System Online
              </p>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content Wrapper */}
      <motion.div
        animate={{
          marginLeft: isMobile ? 0 : sidebarWidthPx,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </SidebarContext.Provider>
  );
}
