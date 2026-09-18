import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Calculator, 
  BookOpenCheck, 
  Swords, 
  Wrench, 
  BookMarked,
  Award,
  ChevronRight,
  Shield,
  Layers,
  Tv,
  KeyRound
} from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';
import { checkIsAdmin } from '../../types';

export type NavigationTab = 
  | 'dashboard'
  | 'curriculum'
  | 'calculator'
  | 'journal'
  | 'challenges'
  | 'tools'
  | 'glossary'
  | 'admin-content-studio'
  | 'admin-licenses';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen
}) => {
  const { currentLevel, nextLevel, totalLessonsCompleted, progressPercentage, firebaseUser } = useUniversity();
  // Visibility is only a convenience; server endpoints independently enforce this allowlist.
  const isAdmin = checkIsAdmin(firebaseUser?.email);

  const navItems = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Terminal Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'curriculum' as NavigationTab,
      label: 'University Curriculum',
      icon: GraduationCap,
      badge: `${totalLessonsCompleted}/148`
    },
    {
      id: 'calculator' as NavigationTab,
      label: 'Position Calculator',
      icon: Calculator,
      badge: 'RISK'
    },
    {
      id: 'journal' as NavigationTab,
      label: 'Trade Journal',
      icon: BookOpenCheck,
      badge: null
    },
    {
      id: 'challenges' as NavigationTab,
      label: 'Practical Challenges',
      icon: Swords,
      badge: null
    },
    {
      id: 'tools' as NavigationTab,
      label: 'Tools Directory',
      icon: Wrench,
      badge: '12+'
    },
    {
      id: 'glossary' as NavigationTab,
      label: 'Trading Glossary',
      icon: BookMarked,
      badge: null
    },
    ...(isAdmin ? [{
      id: 'admin-content-studio' as NavigationTab,
      label: 'Content Studio',
      icon: Tv,
      badge: 'ADMIN'
    }, {
      id: 'admin-licenses' as NavigationTab,
      label: 'License Control',
      icon: KeyRound,
      badge: 'ADMIN'
    }] : [])
  ];

  const handleSelect = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-[#0D0D10] border-r border-[#242429] flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 border-b border-[#242429] px-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-[#E8A33D]/10 border border-[#E8A33D]/40 flex items-center justify-center text-[#E8A33D] font-mono font-bold text-sm shadow-[0_0_15px_rgba(232,163,61,0.15)]">
                TL
              </div>
              <div>
                <div className="font-display font-bold text-sm tracking-wider text-[#EDEDEF]">
                  TRENCHLAB
                </div>
                <div className="text-[10px] font-mono tracking-tight text-[#8E8E98]">
                  TRADING UNIVERSITY
                </div>
              </div>
            </div>

            {/* Mobile close */}
            <button 
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-[#8E8E98] hover:text-[#EDEDEF]"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono font-semibold tracking-wider text-[#8E8E98] uppercase">
              Core Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                    isActive 
                      ? 'bg-[#1C1C22] text-[#EDEDEF] border border-[#3A3A42]' 
                      : 'text-[#8E8E98] hover:text-[#EDEDEF] hover:bg-[#131316]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#E8A33D]' : 'text-[#8E8E98] group-hover:text-[#EDEDEF]'
                    }`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActive 
                        ? 'bg-[#E8A33D]/20 text-[#E8A33D] font-semibold' 
                        : 'bg-[#1C1C22] text-[#8E8E98]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Level Progression Footer Card */}
        <div className="p-4 border-t border-[#242429] bg-[#0A0A0B]">
          <div className="bg-[#131316] border border-[#242429] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-[#E8A33D]" />
                <span className="text-[11px] font-mono font-bold text-[#EDEDEF]">
                  {currentLevel.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#E8A33D]">
                {progressPercentage}%
              </span>
            </div>

            <div className="w-full bg-[#1C1C22] h-1.5 rounded-full overflow-hidden mb-2.5">
              <div 
                className="bg-gradient-to-r from-[#E8A33D] to-amber-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${Math.max(5, progressPercentage)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#8E8E98]">
              <span>Next: {nextLevel ? nextLevel.shortTitle : 'Mastery'}</span>
              <span>{totalLessonsCompleted} Completed</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
