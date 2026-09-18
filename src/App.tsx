import React, { useState, useEffect, useCallback } from 'react';
import { UniversityProvider, useUniversity } from './context/UniversityContext';
import { checkIsAdmin } from './types';
import { Header } from './components/layout/Header';
import { Sidebar, NavigationTab } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { CurriculumView } from './components/curriculum/CurriculumView';
import { PositionCalculator } from './components/calculator/PositionCalculator';
import { TradeJournal } from './components/journal/TradeJournal';
import { ChallengesView } from './components/challenges/ChallengesView';
import { ToolsView } from './components/tools/ToolsView';
import { GlossaryView } from './components/glossary/GlossaryView';
import { ContentStudio } from './components/admin/ContentStudio';
import { LicenseAdmin } from './components/admin/LicenseAdmin';
import { AuthModal } from './components/auth/AuthModal';
import { LoginPage } from './components/auth/LoginPage';
import { AccessPage, ActivatePage, LandingPage } from './components/public/PublicPages';
import { Menu, Terminal, Loader2 } from 'lucide-react';

function mapPathToTab(path: string): NavigationTab | 'login' | 'register' {
  const cleanPath = path.toLowerCase().replace(/\/$/, '') || '/dashboard';
  if (cleanPath === '/login') return 'login';
  if (cleanPath === '/register') return 'register';
  if (cleanPath === '/curriculum' || cleanPath.startsWith('/learn')) return 'curriculum';
  if (cleanPath === '/calculator') return 'calculator';
  if (cleanPath === '/journal') return 'journal';
  if (cleanPath === '/challenges') return 'challenges';
  if (cleanPath === '/tools') return 'tools';
  if (cleanPath === '/glossary') return 'glossary';
  if (cleanPath === '/admin/licenses') return 'admin-licenses';
  if (cleanPath === '/admin/content-studio' || cleanPath.startsWith('/admin')) return 'admin-content-studio';
  if (cleanPath === '/dashboard' || cleanPath === '/progress' || cleanPath === '/settings' || cleanPath === '') return 'dashboard';
  return 'dashboard';
}

function mapTabToPath(tab: NavigationTab): string {
  switch (tab) {
    case 'dashboard': return '/dashboard';
    case 'curriculum': return '/curriculum';
    case 'calculator': return '/calculator';
    case 'journal': return '/journal';
    case 'challenges': return '/challenges';
    case 'tools': return '/tools';
    case 'glossary': return '/glossary';
    case 'admin-content-studio': return '/admin/content-studio';
    case 'admin-licenses': return '/admin/licenses';
    default: return '/dashboard';
  }
}

function UniversityApp() {
  const { isAuthenticated, authLoading, firebaseUser, user } = useUniversity();
  const isAdmin = checkIsAdmin(firebaseUser?.email);
  const accessExpiresAt = user.accessExpiresAt ? new Date(user.accessExpiresAt).getTime() : null;
  const hasActiveLicense = user.accessStatus === 'active' && (!accessExpiresAt || accessExpiresAt > Date.now());

  const [activeTab, setActiveTab] = useState<NavigationTab>(() => {
    const initial = mapPathToTab(window.location.pathname);
    return (initial === 'login' || initial === 'register') ? 'dashboard' : initial;
  });

  const [authRoute, setAuthRoute] = useState<'login' | 'register' | null>(() => {
    const initial = mapPathToTab(window.location.pathname);
    return (initial === 'login' || initial === 'register') ? initial : null;
  });

  const [returnToTab, setReturnToTab] = useState<NavigationTab>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [publicPath, setPublicPath] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPublicPath(window.location.pathname);
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const route = mapPathToTab(window.location.pathname);
      if (route === 'login' || route === 'register') {
        setAuthRoute(route);
      } else {
        setAuthRoute(null);
        setActiveTab(route);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Protected Route enforcement: Redirect unauthenticated operators to /login
  useEffect(() => {
    if (authLoading) return;
    if (publicPath === '/' || publicPath === '/access') return;

    if ((isAdmin || hasActiveLicense) && publicPath === '/activate') {
      window.history.replaceState({}, '', '/dashboard');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    if (!isAuthenticated) {
      const currentRoute = mapPathToTab(window.location.pathname);
      if (currentRoute !== 'login' && currentRoute !== 'register') {
        setReturnToTab(currentRoute);
      }
      setAuthRoute(currentRoute === 'register' ? 'register' : 'login');
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.history.replaceState({}, '', '/login');
      }
    } else {
      // If user is authenticated and on /login or /register, redirect to dashboard
      const currentRoute = mapPathToTab(window.location.pathname);
      if (currentRoute === 'login' || currentRoute === 'register' || authRoute !== null) {
        const dest = returnToTab || 'dashboard';
        setAuthRoute(null);
        setActiveTab(dest);
        window.history.replaceState({}, '', mapTabToPath(dest));
      }
    }
  }, [isAuthenticated, authLoading, authRoute, returnToTab, publicPath]);

  useEffect(() => {
    if (authLoading || !isAuthenticated || isAdmin || hasActiveLicense) return;
    if (publicPath === '/' || publicPath === '/access' || publicPath === '/activate') return;
    setAuthRoute(null);
    window.history.replaceState({}, '', '/activate');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, [authLoading, isAuthenticated, isAdmin, hasActiveLicense, publicPath]);

  const handleNavigate = useCallback((tab: NavigationTab) => {
    setActiveTab(tab);
    setAuthRoute(null);
    const path = mapTabToPath(tab);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, []);

  const handleAuthSuccess = useCallback(() => {
    const dest = returnToTab || 'dashboard';
    setAuthRoute(null);
    setActiveTab(dest);
    window.history.replaceState({}, '', mapTabToPath(dest));
  }, [returnToTab]);

  // Loading State: Technical Terminal Splash
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-[#EDEDEF] flex flex-col items-center justify-center p-6 select-none font-mono">
        <div className="w-12 h-12 rounded-xl bg-[#131316] border border-[#E8A33D]/40 flex items-center justify-center text-[#E8A33D] font-bold text-lg mb-4 shadow-[0_0_25px_-5px_rgba(232,163,61,0.25)]">
          TL
        </div>
        <div className="flex items-center space-x-2 text-xs text-[#EDEDEF] tracking-wider mb-2">
          <Loader2 className="w-4 h-4 animate-spin text-[#E8A33D]" />
          <span>INITIALIZING TRENCHLAB OPERATOR SESSION...</span>
        </div>
        <span className="text-[10px] text-[#9A9AA3]">
          CONNECTING TO SOLANA ARCHIVE & CLOUD FIRESTORE
        </span>
      </div>
    );
  }

  if (publicPath === '/') return <LandingPage />;
  if (publicPath === '/access') return <AccessPage />;
  if (publicPath === '/activate') return <ActivatePage />;

  // Unauthenticated: Show dedicated /login or /register terminal view
  if (!isAuthenticated || authRoute !== null) {
    return (
      <LoginPage 
        initialMode={authRoute === 'register' ? 'register' : 'login'} 
        returnTo={returnToTab}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  if ((activeTab === 'admin-content-studio' || activeTab === 'admin-licenses') && !isAdmin) {
    window.history.replaceState({}, '', '/dashboard');
    return <div className="min-h-screen bg-[#0A0A0B] text-[#EDEDEF] flex items-center justify-center font-mono text-sm">ADMIN ACCESS REQUIRED</div>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#EDEDEF] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Bar */}
        <div className="lg:hidden h-14 bg-[#0D0D10] border-b border-[#242429] px-4 flex items-center justify-between sticky top-0 z-40">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 text-[#9A9AA3] hover:text-[#EDEDEF] rounded border border-[#242429] cursor-pointer"
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
            className="text-xs font-mono text-[#E8A33D] bg-[#1C1C22] px-2.5 py-1 rounded border border-[#242429] cursor-pointer"
          >
            PROFILE
          </button>
        </div>

        {/* Global Terminal Header */}
        <Header onOpenAuth={() => setAuthModalOpen(true)} />

        {/* Dynamic Route View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard onNavigate={handleNavigate} />
          )}

          {activeTab === 'curriculum' && (
            <CurriculumView />
          )}

          {activeTab === 'calculator' && (
            <PositionCalculator onNavigateToJournal={() => handleNavigate('journal')} />
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

          {activeTab === 'admin-content-studio' && (
            <ContentStudio />
          )}

          {activeTab === 'admin-licenses' && (
            <LicenseAdmin />
          )}
        </main>
      </div>

      {/* Auth / Profile Modal */}
      {authModalOpen && (
        <AuthModal 
          onClose={() => setAuthModalOpen(false)} 
          onNavigateToLogin={() => {
            setAuthModalOpen(false);
            setAuthRoute('login');
          }}
        />
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
