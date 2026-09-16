/**
 * Formats Firebase authentication and permission error codes into clean,
 * human-readable terminal notices. Raw error codes are never exposed directly to the user.
 */
export function getFriendlyAuthErrorMessage(error: unknown): string {
  if (!error) return 'An unexpected authentication error occurred.';

  const errStr = typeof error === 'object' && error !== null && 'code' in error 
    ? String((error as { code: unknown }).code)
    : error instanceof Error ? error.message : String(error);

  // Specific Firebase Auth error code mappings
  if (errStr.includes('auth/invalid-email')) {
    return 'Invalid email format. Please check your credentials and try again.';
  }
  if (errStr.includes('auth/user-not-found')) {
    return 'No registered operator found with this email. Please verify or create an account.';
  }
  if (errStr.includes('auth/wrong-password')) {
    return 'Incorrect password. Check your credentials and try again, or reset your password.';
  }
  if (errStr.includes('auth/invalid-credential')) {
    return 'Authentication failed. Check your credentials and try again.';
  }
  if (errStr.includes('auth/email-already-in-use')) {
    return 'An operator account with this email already exists. Please sign in instead.';
  }
  if (errStr.includes('auth/weak-password')) {
    return 'Password security requirement not met. Must be at least 6 characters.';
  }
  if (errStr.includes('auth/popup-closed-by-user')) {
    return 'Authentication window closed before verification. Please try again.';
  }
  if (errStr.includes('auth/cancelled-popup-request')) {
    return 'Concurrent authentication attempt detected. Request reset.';
  }
  if (errStr.includes('auth/popup-blocked')) {
    return 'Popup window was blocked by browser. Please allow popups for authentication.';
  }
  if (errStr.includes('auth/unauthorized-domain')) {
    return 'Domain unauthorized: Add your deployment domain (e.g. thetrenchlab.vercel.app) to Firebase Console > Authentication > Settings > Authorized domains.';
  }
  if (errStr.includes('auth/network-request-failed')) {
    return 'Cross-origin storage blocked by browser: Chrome or Safari partitioned third-party cookies during popup. Please try clicking Google again (which will use direct redirect) or sign in with email.';
  }
  if (errStr.includes('auth/too-many-requests')) {
    return 'Too many consecutive attempts. Access temporarily throttled for security.';
  }
  if (errStr.includes('auth/operation-not-allowed')) {
    return 'GitHub OAuth is not yet enabled in your Firebase project. Enable GitHub in Firebase Console > Authentication > Sign-in method, or use Google or Email.';
  }
  if (errStr.includes('auth/account-exists-with-different-credential')) {
    return 'An account already exists with the same email using a different sign-in method.';
  }
  if (errStr.includes('permission-denied') || errStr.includes('Missing or insufficient permissions')) {
    return 'Unauthorized Firestore access. Security rules denied this operation.';
  }

  return 'Authentication failed. Check your credentials and try again.';
}
