import React, { useState } from 'react';
import { useUniversity } from '../../context/UniversityContext';
import { readApiJson } from '../../lib/api';
import { checkIsAdmin } from '../../types';
import { ShieldCheck, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';

const phases = [
  'FOUNDATION', 'MARKET READER', 'SOLANA OPERATOR', 'TRENCH SCOUT',
  'ON-CHAIN ANALYST', 'MEMECOIN STRATEGIST', 'WALLET INTELLIGENCE', 'FLOW & DEMAND',
  'ENTRY SYSTEMS', 'RISK MANAGEMENT', 'PSYCHOLOGY & EXECUTION', 'ADVANCED TRENCHLAB'
];

const go = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-[#EDEDEF] overflow-hidden">
      <section className="min-h-screen px-6 py-10 md:px-16 flex flex-col justify-center relative">
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(#242429_1px,transparent_1px),linear-gradient(90deg,#242429_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative max-w-5xl">
          <p className="font-mono text-xs text-[#E8A33D] tracking-[.3em]">TRENCHLAB / MARKET INTELLIGENCE LAB</p>
          <h1 className="text-5xl md:text-8xl font-display font-bold mt-6 tracking-tight">TRENCHLAB</h1>
          <p className="font-mono text-sm md:text-lg mt-2 text-[#9A9AA3]">THE MEMECOIN TRADING UNIVERSITY</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-14 leading-tight">
            READ THE FLOW.<br />
            RESPECT THE RISK.<br />
            <span className="text-[#E8A33D]">MASTER THE TRENCH.</span>
          </h2>
          <p className="max-w-2xl text-[#9A9AA3] mt-7">
            A structured trading university for learning Solana markets, liquidity, on-chain behavior, risk management, and a repeatable process.
          </p>
          <div className="flex gap-3 mt-9">
            <button onClick={() => go('/access')} className="bg-[#E8A33D] text-black px-5 py-3 font-mono font-bold text-sm rounded cursor-pointer">
              GET ACCESS
            </button>
            <button onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })} className="border border-[#3A3A42] px-5 py-3 font-mono text-sm rounded cursor-pointer">
              EXPLORE THE CURRICULUM
            </button>
          </div>
        </div>
      </section>
      <section id="curriculum" className="px-6 py-20 md:px-16 border-t border-[#242429]">
        <p className="font-mono text-[#E8A33D] text-xs">THE LAB</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-3">
          148 LESSONS. 12 PHASES.<br />ONE TRADING SYSTEM.
        </h2>
        <div className="grid md:grid-cols-3 gap-px bg-[#242429] mt-10">
          {phases.map((phase, index) => (
            <div key={phase} className="bg-[#131316] p-5 font-mono text-sm">
              <span className="text-[#E8A33D] mr-3">{String(index + 1).padStart(2, '0')}</span>{phase}
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 py-20 md:px-16 border-t border-[#242429]">
        <p className="font-mono text-[#E8A33D] text-xs">ACCESS</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-3">THE TRENCH IS NOT OPEN TO EVERYONE.</h2>
        <p className="max-w-xl text-[#9A9AA3] mt-5">TRENCHLAB is a private learning environment. Access is issued individually.</p>
        <button onClick={() => go('/access')} className="mt-7 bg-[#E8A33D] text-black px-5 py-3 font-mono font-bold text-sm rounded cursor-pointer">
          GET ACCESS
        </button>
      </section>
    </main>
  );
}

export function AccessPage() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText('Please I need access');
    setCopied(true);
  };
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-[#EDEDEF] flex items-center justify-center p-6">
      <div className="max-w-xl w-full border border-[#242429] bg-[#131316] p-8 rounded-xl">
        <p className="font-mono text-xs text-[#E8A33D]">TRENCHLAB ACCESS</p>
        <h1 className="font-display text-3xl font-bold mt-3">REQUEST ACCESS</h1>
        <p className="text-[#9A9AA3] mt-4">TRENCHLAB access is issued individually. Contact the operator to request your license.</p>
        <div className="grid gap-3 mt-7">
          <a href="https://discord.com/users/800500432077717504" target="_blank" rel="noreferrer" className="border border-[#3A3A42] p-3 font-mono text-sm rounded text-center hover:border-[#E8A33D] transition-colors">
            OPEN DISCORD
          </a>
          <a href="https://t.me/Kryptocreek" target="_blank" rel="noreferrer" className="border border-[#3A3A42] p-3 font-mono text-sm rounded text-center hover:border-[#E8A33D] transition-colors">
            OPEN TELEGRAM
          </a>
          <button onClick={copy} className="border border-[#E8A33D] text-[#E8A33D] p-3 font-mono text-sm rounded cursor-pointer hover:bg-[#E8A33D]/10 transition-colors">
            {copied ? 'MESSAGE COPIED' : 'COPY “Please I need access”'}
          </button>
        </div>
        <button onClick={() => go('/activate')} className="mt-8 text-[#E8A33D] font-mono text-sm cursor-pointer hover:underline">
          ALREADY HAVE A LICENSE? ACTIVATE LICENSE →
        </button>
      </div>
    </main>
  );
}

export function ActivatePage() {
  const { firebaseUser, user } = useUniversity();
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const isAdmin = checkIsAdmin(firebaseUser?.email);
  const accessExpiresAt = user?.accessExpiresAt ? new Date(user.accessExpiresAt).getTime() : null;
  const hasActiveLicense = user?.accessStatus === 'active' && (!accessExpiresAt || accessExpiresAt > Date.now());

  const activate = async () => {
    const token = await firebaseUser?.getIdToken();
    if (!token) return go('/login');
    const response = await fetch('/api/licenses/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ licenseKey: key })
    });
    const data = await readApiJson(response);
    if (data.success) {
      setMessage('ACCESS GRANTED - OPERATOR IDENTITY VERIFIED');
      window.location.assign('/dashboard');
      return;
    }
    setMessage(data.message || 'LICENSE ACTIVATION FAILED');
  };

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-[#EDEDEF] flex items-center justify-center p-6">
      <div className="max-w-xl w-full border border-[#242429] bg-[#131316] p-8 rounded-xl shadow-2xl">
        <p className="font-mono text-xs text-[#E8A33D] tracking-wider">OPERATOR ACCESS</p>
        <h1 className="font-display text-3xl font-bold mt-2">
          {isAdmin ? 'ADMINISTRATOR PRIVILEGES' : hasActiveLicense ? 'ACTIVE OPERATOR ACCESS' : 'ACTIVATE YOUR TRENCHLAB LICENSE'}
        </h1>

        {!firebaseUser ? (
          <div className="mt-6">
            <p className="text-[#9A9AA3] text-sm mb-6">Sign in with your operator credentials to activate or verify your license.</p>
            <button onClick={() => go('/login')} className="bg-[#E8A33D] text-black p-3 w-full font-mono font-bold rounded cursor-pointer hover:bg-[#E8A33D]/90 transition-colors">
              SIGN IN OR CREATE ACCOUNT
            </button>
          </div>
        ) : isAdmin ? (
          <div className="mt-6 space-y-5">
            <div className="p-4 bg-[#E8A33D]/10 border border-[#E8A33D]/40 rounded-lg">
              <div className="flex items-center gap-2 text-[#E8A33D] font-mono text-xs font-bold tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#E8A33D]" />
                ADMINISTRATOR SESSION RECOGNIZED
              </div>
              <p className="text-xs text-[#EDEDEF] mt-2 font-mono">
                Authenticated as <span className="text-[#E8A33D] font-bold">{firebaseUser.email}</span>
              </p>
              <p className="text-xs text-[#9A9AA3] mt-2 leading-relaxed">
                You have unrestricted administrative privileges. You do not need a student license key to access the curriculum, tools, or control centers.
              </p>
            </div>

            <button
              onClick={() => go('/dashboard')}
              className="bg-[#E8A33D] text-black p-3.5 w-full font-mono font-bold rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#E8A33D]/90 transition-colors shadow-[0_0_20px_rgba(232,163,61,0.2)]"
            >
              LAUNCH UNIVERSITY DASHBOARD
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-[#9A9AA3]">
              <button onClick={() => go('/admin/licenses')} className="hover:text-[#E8A33D] underline cursor-pointer">
                License Control
              </button>
              <button onClick={() => go('/admin/content-studio')} className="hover:text-[#E8A33D] underline cursor-pointer">
                Content Studio
              </button>
              <button onClick={() => setShowManualInput(!showManualInput)} className="hover:text-[#EDEDEF] underline cursor-pointer">
                {showManualInput ? 'Hide Key Test' : 'Test a Key'}
              </button>
            </div>

            {showManualInput && (
              <div className="pt-4 border-t border-[#242429] space-y-3">
                <p className="text-xs font-mono text-[#9A9AA3]">Manual License Key Testing:</p>
                <input
                  value={key}
                  onChange={event => setKey(event.target.value)}
                  placeholder="TLB-XXXX-XXXX-XXXX"
                  className="w-full p-3 bg-[#0A0A0B] border border-[#242429] font-mono rounded text-sm text-[#EDEDEF]"
                />
                <button
                  onClick={activate}
                  className="border border-[#E8A33D] text-[#E8A33D] p-2.5 w-full font-mono font-bold rounded text-xs hover:bg-[#E8A33D]/10 cursor-pointer"
                >
                  TEST ACTIVATE KEY
                </button>
                {message && <p className="font-mono text-xs text-[#E8A33D]">{message}</p>}
              </div>
            )}
          </div>
        ) : hasActiveLicense ? (
          <div className="mt-6 space-y-5">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ACTIVE LICENSE VERIFIED
              </div>
              <p className="text-xs text-[#EDEDEF] mt-2 font-mono">
                Authenticated as <span className="text-emerald-400 font-bold">{firebaseUser.email}</span>
              </p>
              <p className="text-xs text-[#9A9AA3] mt-2 leading-relaxed">
                Your operator license is currently active. You have complete access to all TrenchLab learning resources and tools.
              </p>
            </div>

            <button
              onClick={() => go('/dashboard')}
              className="bg-[#E8A33D] text-black p-3.5 w-full font-mono font-bold rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#E8A33D]/90 transition-colors shadow-[0_0_20px_rgba(232,163,61,0.2)]"
            >
              LAUNCH UNIVERSITY DASHBOARD
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-[#9A9AA3] text-sm">Authenticated as <span className="text-[#EDEDEF] font-mono">{firebaseUser.email}</span></p>
            <div className="mt-6">
              <label className="block font-mono text-xs text-[#9A9AA3] mb-2 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#E8A33D]" />
                ENTER OPERATOR KEY
              </label>
              <input
                value={key}
                onChange={event => setKey(event.target.value)}
                placeholder="TLB-XXXX-XXXX-XXXX"
                className="w-full p-3 bg-[#0A0A0B] border border-[#242429] font-mono rounded text-sm text-[#EDEDEF] focus:outline-none focus:border-[#E8A33D]"
              />
            </div>
            <button
              onClick={activate}
              className="mt-4 bg-[#E8A33D] text-black p-3.5 w-full font-mono font-bold rounded cursor-pointer hover:bg-[#E8A33D]/90 transition-colors"
            >
              ACTIVATE LICENSE
            </button>
            {message && <p className="mt-4 font-mono text-sm text-[#E8A33D]">{message}</p>}
            <p className="mt-6 text-xs text-[#9A9AA3] font-mono text-center">
              Don't have a license key?{' '}
              <button onClick={() => go('/access')} className="text-[#E8A33D] underline cursor-pointer">
                Request access here
              </button>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
