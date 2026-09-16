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
  AlertTriangle
} from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { user, currentLevel, xp, progress, login, logout, resetProgress } = useUniversity();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [confirmReset, setConfirmReset] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    login(name, email);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleOAuthSignIn = (provider: 'Google' | 'GitHub') => {
    login(
      provider === 'GitHub' ? 'GitHub Trencher' : 'Google Operator',
      provider === 'GitHub' ? 'git-operator@github.com' : 'operator@gmail.com',
      provider
    );
    onClose();
  };

  const handleReset = () => {
    resetProgress();
    setConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#131316] border border-[#242429] w-full max-w-md rounded-xl shadow-2xl overflow-hidden my-auto">
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
              <span className="text-xs font-mono text-[#8E8E98]">
                LMS Authentication & Progress Profile
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-[#8E8E98] hover:text-[#EDEDEF] text-sm font-mono p-1"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-xs font-mono">
          {/* Active Level Badge */}
          <div className="bg-[#0A0A0B] border border-[#242429] p-3.5 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-10 h-10 rounded-full border border-[#3A3A42]"
              />
              <div>
                <div className="font-display font-bold text-[#EDEDEF] text-sm">
                  {user.name}
                </div>
                <div className="text-[10px] text-[#E8A33D] font-mono">
                  {currentLevel.title}
                </div>
              </div>
            </div>

            <div className="text-right text-[11px] text-[#8E8E98]">
              <div>{xp} XP</div>
              <div className="text-emerald-400 font-semibold">Active</div>
            </div>
          </div>

          {/* Social Sign-in Options */}
          <div className="space-y-2">
            <span className="text-[10px] text-[#8E8E98] uppercase tracking-wider block">
              Quick Connect (Auth.js Session)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleOAuthSignIn('Google')}
                className="flex items-center justify-center space-x-2 bg-[#0A0A0B] hover:bg-[#1C1C22] border border-[#242429] hover:border-[#3A3A42] py-2 px-3 rounded-lg text-[#EDEDEF] transition-colors"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleOAuthSignIn('GitHub')}
                className="flex items-center justify-center space-x-2 bg-[#0A0A0B] hover:bg-[#1C1C22] border border-[#242429] hover:border-[#3A3A42] py-2 px-3 rounded-lg text-[#EDEDEF] transition-colors"
              >
                <Github className="w-4 h-4 text-[#EDEDEF]" />
                <span>GitHub</span>
              </button>
            </div>
          </div>

          {/* Custom Profile Edit */}
          <form onSubmit={handleSaveProfile} className="space-y-3 pt-1 border-t border-[#242429]">
            <span className="text-[10px] text-[#8E8E98] uppercase tracking-wider block pt-2">
              Operator Credentials
            </span>

            <div>
              <label className="text-[11px] text-[#8E8E98] block mb-1">Display Call-sign / Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg p-2 text-[#EDEDEF] outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] text-[#8E8E98] block mb-1">Email / Notification Handle</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-[#242429] focus:border-[#E8A33D] rounded-lg p-2 text-[#EDEDEF] outline-none"
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
                className="bg-[#E8A33D] hover:bg-amber-500 text-[#0A0A0B] font-bold px-3 py-1.5 rounded text-xs transition-colors"
              >
                SAVE PROFILE
              </button>
            </div>
          </form>

          {/* Reset Progress Section */}
          <div className="pt-2 border-t border-[#242429] space-y-2">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="w-full flex items-center justify-center space-x-1.5 bg-[#0A0A0B] hover:bg-rose-950/40 border border-[#242429] hover:border-rose-800 text-rose-400 py-2 rounded-lg transition-colors text-[11px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET ALL CURRICULUM PROGRESS</span>
              </button>
            ) : (
              <div className="bg-rose-950/30 border border-rose-800/50 p-3 rounded-lg space-y-2">
                <div className="flex items-center space-x-1.5 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>CONFIRM FULL RESET</span>
                </div>
                <p className="text-[10px] text-[#EDEDEF] leading-relaxed">
                  This clears your completed lessons, quiz scores, and reset your level to Level 01.
                </p>
                <div className="flex justify-end space-x-2 pt-1">
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-2.5 py-1 text-[#8E8E98] hover:text-[#EDEDEF]"
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
