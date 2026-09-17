import React, { useState } from 'react';
import { 
  Terminal, 
  Shield, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';
import { getFriendlyAuthErrorMessage } from '../../lib/authErrors';

interface LoginPageProps {
  initialMode?: 'login' | 'register';
  onSuccess?: () => void;
  returnTo?: string;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  initialMode = 'login',
  onSuccess,
  returnTo = 'dashboard'
}) => {
  const { 
    signInWithGoogle, 
    signInWithGoogleRedirect,
    signInWithGithub, 
    signInWithEmail, 
    registerWithEmail, 
    resetPassword 
  } = useUniversity();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showGoogleHelp, setShowGoogleHelp] = useState(false);
  const [authenticatedSuccess, setAuthenticatedSuccess] = useState(false);

  // Clear messages when switching mode
  const switchMode = (newMode: 'login' | 'register' | 'forgot') => {
    setMode(newMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      await signInWithGoogle();
      triggerSuccessSequence();
    } catch (err) {
      setErrorMsg(getFriendlyAuthErrorMessage(err));
      setLoading(false);
    }
  };

  const handleGoogleDirectRedirect = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      await signInWithGoogleRedirect();
    } catch (err) {
      setErrorMsg(getFriendlyAuthErrorMessage(err));
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      await signInWithGithub();
      triggerSuccessSequence();
    } catch (err) {
      setErrorMsg(getFriendlyAuthErrorMessage(err));
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please provide a valid operator email address.');
      return;
    }

    if (mode === 'forgot') {
      try {
        setLoading(true);
        await resetPassword(email.trim());
        setSuccessMsg('Password reset instructions sent. Please check your inbox.');
        setLoading(false);
      } catch (err) {
        setErrorMsg(getFriendlyAuthErrorMessage(err));
        setLoading(false);
      }
      return;
    }

    if (!password) {
      setErrorMsg('Password cannot be empty.');
      return;
    }

    if (mode === 'register') {
      if (!displayName.trim()) {
        setErrorMsg('Please specify your operator display name or call-sign.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters in length.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Password confirmation does not match.');
        return;
      }

      try {
        setLoading(true);
        await registerWithEmail(email.trim(), password, displayName.trim());
        triggerSuccessSequence();
      } catch (err) {
        setErrorMsg(getFriendlyAuthErrorMessage(err));
        setLoading(false);
      }
    } else {
      // Login mode
      try {
        setLoading(true);
        await signInWithEmail(email.trim(), password);
        triggerSuccessSequence();
      } catch (err) {
        setErrorMsg(getFriendlyAuthErrorMessage(err));
        setLoading(false);
      }
    }
  };

  const triggerSuccessSequence = () => {
    setAuthenticatedSuccess(true);
    setLoading(false);
    setTimeout(() => {
      if (onSuccess) {
        onSuccess();
      }
    }, 1400);
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0B] text-[#EDEDEF] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans select-none">
      {/* Precision Terminal Matrix Grid Texture (Anti-Slop, No blobs) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #242429 1px, transparent 1px),
            linear-gradient(to bottom, #242429 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Subtle Radial Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#0A0A0B]/80 to-[#0A0A0B] pointer-events-none" />

      {/* Corner System Diagnostics */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center space-x-2 text-[11px] font-mono text-[#9A9AA3]">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="tracking-wider">SYSTEM ONLINE // PROTOCOL v2.4</span>
      </div>

      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:flex items-center space-x-3 text-[11px] font-mono text-[#9A9AA3]">
        <span className="px-2 py-0.5 rounded bg-[#131316] border border-[#242429]">SOLANA MAINNET</span>
        <span className="text-[#E8A33D]">TERMINAL SECURE</span>
      </div>

      {/* Authentication Card Container */}
      <div className="relative z-10 w-full max-w-[480px] my-8">
        {/* Terminal Header Branding */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="flex items-center justify-center space-x-2.5 mb-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1A1A1E] border border-[#E8A33D]/40 flex items-center justify-center text-[#E8A33D] font-mono font-bold text-sm shadow-[0_0_15px_-3px_rgba(232,163,61,0.2)]">
              TL
            </div>
            <span className="font-display font-black text-xl tracking-wider text-[#EDEDEF]">
              TRENCHLAB
            </span>
          </div>

          <span className="text-[11px] font-mono tracking-widest text-[#9A9AA3] uppercase">
            THE MEMECOIN TRADING UNIVERSITY
          </span>

          <div className="mt-2.5 inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-[#131316] border border-[#242429] text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>AUTHENTICATION GATEWAY</span>
          </div>
        </div>

        {/* The Card */}
        <div className="bg-[#131316] border border-[#242429] rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300">
          {/* Card Top Accent Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#E8A33D] to-transparent opacity-80" />

          {/* Success Access Granted Overlay */}
          {authenticatedSuccess ? (
            <div className="p-8 sm:p-10 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-mono font-black text-lg tracking-wider text-[#EDEDEF]">
                  ACCESS GRANTED
                </h3>
                <p className="font-mono text-xs text-emerald-400 tracking-wider">
                  OPERATOR IDENTITY VERIFIED
                </p>
              </div>

              <p className="text-xs font-mono text-[#9A9AA3] max-w-xs leading-relaxed">
                Loading encrypted terminal state and syncing progress with Solana blockchain network...
              </p>

              <div className="w-48 h-1 bg-[#1A1A1E] rounded-full overflow-hidden mt-4">
                <div className="h-full bg-[#E8A33D] animate-[indeterminate_1.5s_infinite_linear]" />
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              {/* Form Title & Subtitle */}
              <div className="mb-6">
                {mode === 'login' && (
                  <>
                    <h2 className="text-xl font-display font-bold text-[#EDEDEF] tracking-tight">
                      ENTER THE LAB.
                    </h2>
                    <p className="text-xs text-[#9A9AA3] font-mono mt-1">
                      Your training terminal is waiting.
                    </p>
                    <p className="text-xs text-[#9A9AA3] mt-2 leading-relaxed">
                      Build your knowledge. Track your progress. Learn to read the flow.
                    </p>
                  </>
                )}

                {mode === 'register' && (
                  <>
                    <h2 className="text-xl font-display font-bold text-[#EDEDEF] tracking-tight">
                      CREATE YOUR OPERATOR IDENTITY.
                    </h2>
                    <p className="text-xs text-[#9A9AA3] font-mono mt-1">
                      Start your progression through the TRENCHLAB curriculum.
                    </p>
                  </>
                )}

                {mode === 'forgot' && (
                  <>
                    <h2 className="text-xl font-display font-bold text-[#EDEDEF] tracking-tight">
                      RESET OPERATOR CREDENTIALS.
                    </h2>
                    <p className="text-xs text-[#9A9AA3] font-mono mt-1">
                      Enter your verified email to receive authorization reset link.
                    </p>
                  </>
                )}
              </div>

              {/* Error Notice */}
              {errorMsg && (
                <div className="mb-5 p-3.5 rounded-lg bg-rose-950/40 border border-rose-800/60 space-y-2 text-xs text-rose-200 animate-in fade-in">
                  <div className="flex items-start space-x-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="leading-relaxed font-sans">{errorMsg}</div>
                  </div>
                  
                  <div className="pt-1 flex flex-wrap items-center gap-2 border-t border-rose-900/50">
                    <button
                      type="button"
                      onClick={() => setShowGoogleHelp(!showGoogleHelp)}
                      className="text-[11px] font-mono text-[#E8A33D] hover:underline underline-offset-2 flex items-center space-x-1"
                    >
                      <span>{showGoogleHelp ? '▲ Hide setup instructions' : '▶ How to fix Google OAuth on Vercel'}</span>
                    </button>
                  </div>

                  {showGoogleHelp && (
                    <div className="p-3 bg-[#0A0A0B] rounded border border-[#242429] text-[11px] font-mono text-[#9A9AA3] space-y-2 text-left">
                      <div className="text-white font-semibold">2-Minute Google Cloud Console Fix:</div>
                      <ol className="list-decimal pl-4 space-y-1.5 leading-normal">
                        <li>
                          Open <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-[#E8A33D] underline">Google Cloud Console → Credentials</a> (Select project <code className="text-emerald-400">trenchlab-production</code>).
                        </li>
                        <li>
                          Click the <strong className="text-white">Web client (auto created by Google Service)</strong> under OAuth 2.0 Client IDs.
                        </li>
                        <li>
                          Under <strong className="text-white">Authorized JavaScript origins</strong>, click <strong className="text-white">+ ADD URI</strong> and paste:
                          <div className="mt-1 p-1.5 bg-[#141417] text-white rounded select-all border border-[#242429]">
                            https://thetrenchlab.vercel.app
                          </div>
                        </li>
                        <li>
                          Under <strong className="text-white">Authorized redirect URIs</strong>, ensure <strong className="text-[#E8A33D]">BOTH</strong> URIs are added:
                          <div className="mt-1.5 space-y-1">
                            <div className="p-1.5 bg-[#141417] text-white rounded select-all border border-[#242429]">
                              https://thetrenchlab.vercel.app/__/auth/handler
                            </div>
                            <div className="p-1.5 bg-[#141417] text-white rounded select-all border border-[#242429]">
                              https://thetrenchlab.vercel.app
                            </div>
                          </div>
                        </li>
                        <li>Click <strong className="text-white">Save</strong>. Changes apply in ~5 minutes!</li>
                      </ol>
                      <div className="text-emerald-400 text-[10px] pt-1">
                        Tip: You can register or sign in with Email & Password right below without waiting for Google setup.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Success Notice */}
              {successMsg && (
                <div className="mb-5 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 flex items-start space-x-2.5 text-xs text-emerald-200 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">{successMsg}</div>
                </div>
              )}

              {/* OAuth Providers */}
              {mode !== 'forgot' && (
                <div className="space-y-3 mb-6">
                  <span className="text-[10px] font-mono text-[#9A9AA3] uppercase tracking-wider block">
                    CONTINUE WITH
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Google Button */}
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleGoogleSignIn}
                      className="flex items-center justify-center space-x-2.5 py-2.5 px-4 rounded-lg bg-[#1A1A1E] hover:bg-[#242429] border border-[#242429] hover:border-[#3A3A42] text-[#EDEDEF] text-xs font-mono font-medium transition-all duration-150 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#EA4335"
                          d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                        />
                        <path
                          fill="#4285F4"
                          d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                        />
                      </svg>
                      <span>Google</span>
                    </button>

                    {/* GitHub Button */}
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleGithubSignIn}
                      className="flex items-center justify-center space-x-2.5 py-2.5 px-4 rounded-lg bg-[#1A1A1E] hover:bg-[#242429] border border-[#242429] hover:border-[#3A3A42] text-[#EDEDEF] text-xs font-mono font-medium transition-all duration-150 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4 fill-current text-[#EDEDEF]" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>GitHub</span>
                    </button>
                  </div>

                  <div className="text-center pt-0.5">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleGoogleDirectRedirect}
                      className="text-[11px] font-mono text-[#9A9AA3] hover:text-[#E8A33D] transition-colors underline underline-offset-4 decoration-[#242429] hover:decoration-[#E8A33D] disabled:opacity-50"
                    >
                      Having browser popup issues? Use direct Google redirect →
                    </button>
                  </div>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-[#242429]" />
                    <span className="flex-shrink mx-3 text-[10px] font-mono text-[#9A9AA3] uppercase">
                      OR
                    </span>
                    <div className="flex-grow border-t border-[#242429]" />
                  </div>
                </div>
              )}

              {/* Form Body */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#9A9AA3] mb-1.5">
                      DISPLAY NAME / CALL-SIGN
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        disabled={loading}
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        placeholder="e.g. TrenchSniper"
                        className="w-full bg-[#1A1A1E] border border-[#242429] focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D] rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#EDEDEF] placeholder-[#9A9AA3]/50 outline-none transition-colors"
                      />
                      <User className="w-4 h-4 text-[#9A9AA3] absolute left-3 top-3" />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#9A9AA3] mb-1.5">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      disabled={loading}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="operator@solana.trenchlab"
                      className="w-full bg-[#1A1A1E] border border-[#242429] focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D] rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#EDEDEF] placeholder-[#9A9AA3]/50 outline-none transition-colors"
                    />
                    <Mail className="w-4 h-4 text-[#9A9AA3] absolute left-3 top-3" />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#9A9AA3]">
                        PASSWORD
                      </label>
                      {mode === 'login' && (
                        <button
                          type="button"
                          onClick={() => switchMode('forgot')}
                          className="text-[10px] font-mono text-[#E8A33D] hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        disabled={loading}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-[#1A1A1E] border border-[#242429] focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D] rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#EDEDEF] placeholder-[#9A9AA3]/50 outline-none transition-colors"
                      />
                      <Lock className="w-4 h-4 text-[#9A9AA3] absolute left-3 top-3" />
                    </div>
                  </div>
                )}

                {mode === 'register' && (
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#9A9AA3] mb-1.5">
                      CONFIRM PASSWORD
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        disabled={loading}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-[#1A1A1E] border border-[#242429] focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D] rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#EDEDEF] placeholder-[#9A9AA3]/50 outline-none transition-colors"
                      />
                      <KeyRound className="w-4 h-4 text-[#9A9AA3] absolute left-3 top-3" />
                    </div>
                  </div>
                )}

                {/* Primary Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-[#E8A33D] hover:bg-[#d4902f] active:bg-[#c27f23] text-[#0A0A0B] font-mono font-bold py-2.5 px-4 rounded-lg text-xs transition-colors flex items-center justify-center space-x-2 shadow-[0_0_20px_-5px_rgba(232,163,61,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0A0A0B]" />
                      <span>AUTHENTICATING OPERATOR...</span>
                    </>
                  ) : mode === 'login' ? (
                    <>
                      <span>SIGN IN</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : mode === 'register' ? (
                    <>
                      <span>INITIALIZE OPERATOR</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>SEND RECOVERY DISPATCH</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Mode Switching Footer */}
              <div className="mt-6 pt-4 border-t border-[#242429] text-center">
                {mode === 'login' ? (
                  <p className="text-xs text-[#9A9AA3]">
                    New operator?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('register')}
                      className="text-[#E8A33D] hover:underline font-mono font-medium ml-1"
                    >
                      CREATE ACCOUNT
                    </button>
                  </p>
                ) : mode === 'register' ? (
                  <p className="text-xs text-[#9A9AA3]">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-[#E8A33D] hover:underline font-mono font-medium ml-1"
                    >
                      SIGN IN
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-[#9A9AA3]">
                    Remembered your password?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-[#E8A33D] hover:underline font-mono font-medium ml-1"
                    >
                      RETURN TO SIGN IN
                    </button>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-6 text-center text-[10px] font-mono text-[#9A9AA3]/60 space-y-1">
          <p>TRENCHLAB SECURE RESEARCH & EDUCATION ENVIRONMENT</p>
          <p>NON-CUSTODIAL &middot; NO RISK-FREE CLAIMS &middot; VERIFIED CURRICULUM</p>
        </div>
      </div>
    </div>
  );
};
