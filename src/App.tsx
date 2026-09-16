import React, { useState } from 'react';
import { UniversityProvider } from './context/UniversityContext';
import { Header } from './components/layout/Header';
import { Sidebar, NavigationTab } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { CurriculumView } from './components/curriculum/CurriculumView';
import { PositionCalculator } from './components/calculator/PositionCalculator';
import { TradeJournal } from './components/journal/TradeJournal';
import { ChallengesView } from './components/challenges/ChallengesView';
import { ToolsView } from './components/tools/ToolsView';
import { GlossaryView } from './components/glossary/GlossaryView';
import { AuthModal } from './components/auth/AuthModal';
import { Menu } from 'lucide-react';

function UniversityApp() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#EDEDEF] flex">
      {/* Sidebar Component */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar trigger */}
        <div className="lg:hidden h-14 bg-[#0D0D10] border-b border-[#242429] px-4 flex items-center justify-between sticky top-0 z-40">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 text-[#8E8E98] hover:text-[#EDEDEF] rounded border border-[#242429]"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-[#E8A33D]/10 border border-[#E8A33D]/40 flex items-center justify-center text-[#E8A33D] font-mono font-bold text-xs">
              TL
            </div>
            <span className="font-display font-bold text-xs tracking-wider text-[#EDEDEF]">
              TRENCHLAB
            </span>
          </div>

          <button
            onClick={() => setAuthModalOpen(true)}
            className="text-xs font-mono text-[#E8A33D] bg-[#1C1C22] px-2.5 py-1 rounded border border-[#242429]"
          >
            PROFILE
          </button>
        </div>

        {/* Global Terminal Header */}
        <Header onOpenAuth={() => setAuthModalOpen(true)} />

        {/* Dynamic Route View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard onNavigate={setActiveTab} />
          )}

          {activeTab === 'curriculum' && (
            <CurriculumView />
          )}

          {activeTab === 'calculator' && (
            <PositionCalculator onNavigateToJournal={() => setActiveTab('journal')} />
          )}

          {activeTab === 'journal' && (
            <TradeJournal />
          )}

          {activeTab === 'challenges' && (
            <ChallengesView />
          )}

          {activeTab === 'tools' && (
            <ToolsView />
          )}

          {activeTab === 'glossary' && (
            <GlossaryView />
          )}
        </main>
      </div>

      {/* Auth / Profile Modal */}
      {authModalOpen && (
        <AuthModal onClose={() => setAuthModalOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <UniversityProvider>
      <UniversityApp />
    </UniversityProvider>
  );
}
