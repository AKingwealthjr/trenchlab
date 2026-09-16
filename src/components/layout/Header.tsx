import React from 'react';
import { 
  Zap, 
  Flame, 
  Award, 
  ShieldCheck, 
  User, 
  LogOut, 
  Activity,
  Terminal
} from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';

interface HeaderProps {
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth }) => {
  const { user, currentLevel, xp, progress, logout } = useUniversity();

  return (
    <header className="h-16 border-b border-[#242429] bg-[#0A0A0B]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Network & Terminal Status */}
      <div className="flex items-center space-x-3 sm:space-x-6 text-xs font-mono">
        <div className="flex items-center space-x-2 bg-[#131316] border border-[#242429] px-2.5 py-1 rounded">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[#8E8E98] hidden sm:inline">NETWORK:</span>
          <span className="text-[#EDEDEF] font-medium">SOLANA MAINNET</span>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-[#8E8E98]">
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>TPS:</span>
            <span className="text-[#EDEDEF]">2,482</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#E8A33D]" />
            <span>BASE FEE:</span>
            <span className="text-[#EDEDEF]">0.000005 SOL</span>
          </div>
        </div>
      </div>

      {/* User Status, Streak & Profile */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Learning Streak */}
        <div 
          className="flex items-center space-x-1.5 bg-[#131316] border border-[#242429] px-2.5 py-1 rounded text-xs font-mono"
          title="Daily Learning Streak"
        >
          <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400/20" />
          <span className="text-[#EDEDEF] font-semibold">{progress.learningStreak}d</span>
          <span className="text-[#8E8E98] hidden sm:inline">STREAK</span>
        </div>

        {/* XP Badge */}
        <div 
          className="flex items-center space-x-1.5 bg-[#131316] border border-[#242429] px-2.5 py-1 rounded text-xs font-mono"
          title="Total Experience Points"
        >
          <Zap className="w-3.5 h-3.5 text-[#E8A33D]" />
          <span className="text-[#E8A33D] font-bold">{xp.toLocaleString()}</span>
          <span className="text-[#8E8E98] hidden sm:inline">XP</span>
        </div>

        {/* Level Badge */}
        <div 
          className="hidden lg:flex items-center space-x-1.5 bg-[#E8A33D]/10 border border-[#E8A33D]/30 text-[#E8A33D] px-2.5 py-1 rounded text-xs font-mono font-medium"
        >
          <Award className="w-3.5 h-3.5" />
          <span>{currentLevel.badge}</span>
          <span className="text-[#8E8E98]">|</span>
          <span className="text-[#EDEDEF]">{currentLevel.shortTitle}</span>
        </div>

        {/* Account / Profile Button */}
        <div className="relative flex items-center space-x-2">
          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-2 bg-[#131316] hover:bg-[#1C1C22] border border-[#242429] hover:border-[#3A3A42] px-2.5 py-1 rounded transition-colors text-xs"
            title="Account Settings"
          >
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-5 h-5 rounded-full object-cover border border-[#3A3A42]" 
            />
            <span className="text-[#EDEDEF] font-medium max-w-[90px] truncate hidden sm:inline">
              {user.name}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
