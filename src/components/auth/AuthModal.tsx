import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  LogOut, 
  RotateCcw, 
  Award, 
  Check, 
  Github, 
  Mail, 
  AlertTriangle,
  Flame,
  Zap,
  CheckCircle2,
  ExternalLink,
  Lock,
  Loader2
} from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';
import { getFriendlyAuthErrorMessage } from '../../lib/authErrors';

interface AuthModalProps {
  onClose: () => void;
  onNavigateToLogin?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onNavigateToLogin }) => {
  const { 
    user, 
    firebaseUser,
    isAuthenticated,
    currentLevel, 
    xp, 
    progress, 
    signInWithGoogle,
    signInWithGithub,
    updateProfileName,
    logout, 
    resetProgress 
  } = useUniversity();

  const [name, setName] = useState(user.name);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      setActionLoading(true);
      await updateProfileName(name.trim());
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2000);
    } catch (err) {
      setAuthError(getFriendlyAuthErrorMessage(err));
    } finally {
      setActionLoading(false);
    }
  };

  const handleLinkOAuth = async (provider: 'Google' | 'GitHub') => {
    try {
      setAuthError(null);
      setActionLoading(true);
      if (provider === 'Google') {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2000);
    } catch (err) {
      setAuthError(getFriendlyAuthErrorMessage(err));
    } finally {
      setActionLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setActionLoading(true);
      await logout();
      onClose();
      if (onNavigateToLogin) {
        onNavigateToLogin();
      } else {
        window.history.pushState({}, '', '/login');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setActionLoading(true);
      await resetProgress();
      setConfirmReset(false);
      onClose();
    } catch (err) {
      console.error('Reset error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#131316] border border-[#242429] w-full max-w-md rounded-xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#242429] flex items-center justify-between bg-[#0A0A0B]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-[#E8A33D]/10 text-[#E8A33D] rounded border border-[#E8A33D]/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-[#EDEDEF]">
                Trench Operator Identity
              </h2>
              <span className="text-xs font-mono text-[#9A9AA3]">
                OPERATOR AUTHENTICATION & PROFILE
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-[#9A9AA3] hover:text-[#EDEDEF] text-sm font-mono p-1 rounded hover:bg-[#1A1A1E]"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-xs font-mono">
          {/* Active Operator Badge with live Firestore metrics */}
          <div className="bg-[#0A0A0B] border border-[#242429] p-3.5 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-10 h-10 rounded-full border border-[#3A3A42] bg-[#1A1A1E] object-cover"
              />
              <div>
                <div className="font-display font-bold text-[#EDEDEF] text-sm uppercase tracking-wide">
                  {user.name || 'SOLANA OPERATOR'}
                </div>
                <div className="text-[10px] text-[#E8A33D] font-mono font-medium">
                  {currentLevel.title.toUpperCase()}
                </div>
                <div className="text-[10px] text-[#9A9AA3] truncate max-w-[160px]">
                  {user.email}
                </div>
              </div>
            </div>

            <div className="text-right text-[11px] text-[#9A9AA3] space-y-0.5">
              <div className="flex items-center justify-end space-x-1 text-[#E8A33D] font-bold">
                <Zap className="w-3 h-3" />
                <span>{xp.toLocaleString()} XP</span>
              </div>
              <div className="flex items-center justify-end space-x-1 text-orange-400 font-medium text-[10px]">
                <Flame className="w-3 h-3" />
                <span>{progress.learningStreak}d Streak</span>
              </div>
              <div className="text-emerald-400 font-semibold text-[10px]">
                ● ACTIVE
              </div>
            </div>
          </div>

          {authError && (
            <div className="p-2.5 rounded bg-rose-950/40 border border-rose-800 text-rose-300 text-[11px]">
              {authError}
            </div>
          )}

          {/* Authentication Status Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#9A9AA3] uppercase tracking-wider block">
                AUTHENTICATION STATUS
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>{isAuthenticated ? 'VERIFIED FIREBASE' : 'UNAUTHENTICATED'}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => handleLinkOAuth('Google')}
                className="flex items-center justify-center space-x-2 bg-[#0A0A0B] hover:bg-[#1A1A1E] border border-[#242429] hover:border-[#3A3A42] py-2 px-3 rounded-lg text-[#EDEDEF] transition-colors disabled:opacity-50"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                <span>Google</span>
              </button>

              <button
                type="button"
                disabled={actionLoading}
                onClick={() => handleLinkOAuth('GitHub')}
                className="flex items-center justify-center space-x-2 bg-[#0A0A0B] hover:bg-[#1A1A1E] border border-[#242429] hover:border-[#3A3A42] py-2 px-3 rounded-lg text-[#EDEDEF] transition-colors disabled:opacity-50"
              >
                <Github className="w-4 h-4 text-[#EDEDEF]" />
                <span>GitHub</span>
              </button>
            </div>
          </div>

          {/* Operator Profile Call-Sign Edit */}
          <form onSubmit={handleSaveProfile} className="space-y-3 pt-1 border-t border-[#242429]">
            <span className="text-[10px] text-[#9A9AA3] uppercase tracking-wider block pt-2">
              OPERATOR IDENTITY
            </span>

            <div>
              <label className="text-[11px] text-[#9A9AA3] block mb-1">Display Call-sign / Handle</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={actionLoading}
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg p-2 text-[#EDEDEF] outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] text-[#9A9AA3] block mb-1">Email (Authenticated)</label>
              <input
                type="email"
                readOnly
                value={user.email}
                className="w-full bg-[#0A0A0B] border border-[#242429] text-[#9A9AA3] rounded-lg p-2 outline-none cursor-not-allowed"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {savedNotice ? (
                <span className="text-emerald-400 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Profile updated</span>
                </span>
              ) : <div />}

              <button
                type="submit"
                disabled={actionLoading}
                className="bg-[#E8A33D] hover:bg-amber-500 text-[#0A0A0B] font-bold px-3 py-1.5 rounded text-xs transition-colors flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
              >
                {actionLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>SAVE PROFILE</span>
              </button>
            </div>
          </form>

          {/* Sign Out Section */}
          <div className="pt-2 border-t border-[#242429]">
            {!confirmSignOut ? (
              <button
                type="button"
                onClick={() => setConfirmSignOut(true)}
                className="w-full flex items-center justify-center space-x-2 bg-[#1A1A1E] hover:bg-[#242429] border border-[#242429] text-[#EDEDEF] py-2 rounded-lg transition-colors text-xs font-mono font-medium cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-[#E8A33D]" />
                <span>SIGN OUT</span>
              </button>
            ) : (
              <div className="bg-[#1A1A1E] border border-[#242429] p-3 rounded-lg space-y-2">
                <div className="flex items-center space-x-1.5 text-[#EDEDEF] font-bold">
                  <LogOut className="w-4 h-4 text-[#E8A33D]" />
                  <span>CONFIRM DISCONNECT</span>
                </div>
                <p className="text-[10px] text-[#9A9AA3] leading-relaxed">
                  Sign out from this terminal? Your on-chain curriculum progress is securely saved in Cloud Firestore.
                </p>
                <div className="flex justify-end space-x-2 pt-1">
                  <button
                    onClick={() => setConfirmSignOut(false)}
                    className="px-2.5 py-1 text-[#9A9AA3] hover:text-[#EDEDEF]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSignOut}
                    disabled={actionLoading}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded font-bold cursor-pointer"
                  >
                    SIGN OUT
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reset Progress Section */}
          <div className="pt-2 border-t border-[#242429] space-y-2">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="w-full flex items-center justify-center space-x-1.5 bg-[#0A0A0B] hover:bg-rose-950/40 border border-[#242429] hover:border-rose-800 text-rose-400 py-1.5 rounded-lg transition-colors text-[10px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET CURRICULUM PROGRESS</span>
              </button>
            ) : (
              <div className="bg-rose-950/30 border border-rose-800/50 p-3 rounded-lg space-y-2">
                <div className="flex items-center space-x-1.5 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>CONFIRM FULL RESET</span>
                </div>
                <p className="text-[10px] text-[#EDEDEF] leading-relaxed">
                  This clears your completed lessons, quiz scores, and resets your level to Level 01.
                </p>
                <div className="flex justify-end space-x-2 pt-1">
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-2.5 py-1 text-[#9A9AA3] hover:text-[#EDEDEF]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded font-bold"
                  >
                    CONFIRM RESET
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
