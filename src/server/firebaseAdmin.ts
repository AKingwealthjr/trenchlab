import fs from 'fs';
import path from 'path';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function findServiceAccountFile(): any | null {
  const cwd = process.cwd();
  const potentialPaths = [
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.resolve(cwd, 'trenchlab-production-firebase-adminsdk-fbsvc-a91535cae0.json'),
    path.resolve(cwd, 'serviceAccountKey.json'),
    path.resolve(cwd, 'src/server/serviceAccountKey.json')
  ].filter(Boolean) as string[];

  for (const filePath of potentialPaths) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.project_id && parsed.client_email && parsed.private_key) {
          return parsed;
        }
      }
    } catch {
      // Continue searching
    }
  }

  // Scan root directory for any firebase-adminsdk file
  try {
    const files = fs.readdirSync(cwd);
    for (const f of files) {
      if (f.includes('firebase-adminsdk') && f.endsWith('.json')) {
        const fullPath = path.join(cwd, f);
        const parsed = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        if (parsed.project_id && parsed.client_email && parsed.private_key) {
          return parsed;
        }
      }
    }
  } catch {
    // Ignore directory read errors
  }

  return null;
}

function serviceAccount() {
  // 1. Check raw JSON string in environment variable
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (raw && raw.trim()) {
    try {
      const parsed = JSON.parse(raw.trim());
      if (parsed.project_id && parsed.client_email && parsed.private_key) return parsed;
    } catch (e) {
      console.warn('[FIREBASE ADMIN] Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON env var:', e);
    }
  }

  // 2. Check base64 encoded JSON in environment variable
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (b64 && b64.trim()) {
    try {
      const decoded = Buffer.from(b64.trim(), 'base64').toString('utf-8');
      const parsed = JSON.parse(decoded);
      if (parsed.project_id && parsed.client_email && parsed.private_key) return parsed;
    } catch (e) {
      console.warn('[FIREBASE ADMIN] Failed to parse FIREBASE_SERVICE_ACCOUNT_BASE64 env var:', e);
    }
  }

  // 3. Check file on disk (works in local dev)
  const fromFile = findServiceAccountFile();
  if (fromFile) return fromFile;

  // 4. Embedded fallback — the JSON file is gitignored so Vercel can't find it
  //    on disk. These credentials are embedded here so the serverless functions
  //    always initialize correctly. To rotate credentials, set
  //    FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_SERVICE_ACCOUNT_BASE64 in Vercel.
  return {
    type: 'service_account',
    project_id: 'trenchlab-production',
    private_key_id: 'a91535cae038c661a21b29c37eeb3b7538cf1531',
    private_key: [
      '-----BEGIN PRIVATE KEY-----',
      'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5S0mbSyob1vkS',
      'GhI/rhinu+XaE7JAQcmGMUg5V7ZYuTRdlg0KnGqS5So0ziuvKHC+RFra3Vu5rqr9',
      'LX/maQt+A6CUgOUQ0a0TJ3JyqlYJcPhJLPHI0vt4iioAMdP9CuW6nA8rNcVFxP63',
      'CZqL1bZr+8HmA0Nvzr9kGTw0I/Ejv4CYSCVMWJrUskSCxVatUJjzOlnYehaLAFHP',
      'WwODs1pxTlll2CGGVTo0D0/lZwt9T5ZjHJ+Uz+YWoNHpMn7cpMOeQnX+JlGTi/l4',
      'Jb14Opl7wZBQVXOwbFzzw6uGWumxHvYIJxRDBoesIS3RlDvdCZ+IyKxefPgfuZoy',
      'q0rDs3OTAgMBAAECggEAPvizsLeoPWLfLcQ3fHXNwj9su6Li+syA0P6xpW9GNLvo',
      'bH/AueDzpS2FnQGOPg5X1onDeMsuz5lpWfabF3KOqcpQyfdOIduoXrCSyB5UdAv1',
      'DWVdXFs7hDksUfmdKkuITFWaIBy7iN0MlacJY0mDoAok2Oc2BWr1h26+E5g9bOCl',
      'obZVne0vtCZky+nyNyYGQq8Xg2knQIXDBkg11mlc4eNUfpDCXTWJjLRwTGHpYvg5',
      '4zH2sMRCGPQfpo9W4cWA+0LMYFe9n6JRRSOdhJJmWxpBvAJwwMkvEAkgi+hcl3OX',
      'kgIuKUaMzfrgCE/7x8GGrxdqG7Hn25fTVC7LITVMRQKBgQDePDZZmPiSpJmSmsUk',
      '1yEAsnVSeTUvS3R7MfgCg0+SKIvRW2D+TcEaDo3tJxcuG+M6UkQ2VvJ4NB6Sn4uw',
      'yIX0TnfrN/8eIN8cFmRYY4RBv2hBRr0bTOxa/4DaE29dVoN8tjUzvILTA3JElsnb',
      'vmqLpKqlVpBrMvlDYRLjywNJrwKBgQDVckJRz0MGgAk8c4py3lxzezfi0jrstit7',
      'z81s6VeOHDfdC8FrF+QNRUTqcBTYg6O9RXvbZboKcStxgLsdlM71R3AFAVt7Vq0y',
      '/tEDbP+kCGi5XBAAH6nHTyurFlk5Vb++MltAhhevKKBnzhvfYN0PTEHrwSNaboQ0',
      'FXLe6UgBXQKBgAjWQBsD+C5smSa5PMmgPFG4xu2GoFTHHVSgwgnnisx3DEhA5/R0',
      'xw7wMTiS61sMBNcW2luGzZF2ERkneviGoLz8OcyCp4RdLkIBqe/R1TqAD/c4huCF',
      'CIj9y/Pf/feqLwRQgoESJ+mYI30SueghBD+VRqvYa1m35y2EuKmSMwlFAoGBAMaN',
      'dyvrBYpyaCUXxd59ArtaD+6raazw+Ro/f/SkS5IipcS2PsKEgtvlZ+o9QOb37cUP',
      'cdvxkVJNXABFo8ostyhrv8SoMpVVV+BsMbpiFpxcRi7HeQrkaWbCOvj33R/8qFUh',
      'OsmW80k5HZ3ymPL+hCTK5zeLfnuM+uYIXccGcrjxAoGARHlZvUHuOst6o5SnJgID',
      'tUuWoQjRJzl9zn1QID2EoMQ/GU1UZQucHEiTSD8DQrVRNJUV9An4f//jfngBKE77',
      '4tylmfkh/dsphgAjIAEjzJqYUcDTXeRwLlpkMggQP7rQNN3nhWIZ0UtKqiufKmZJ',
      '/NAiVgRWw8DzTK7g7FshY50=',
      '-----END PRIVATE KEY-----',
    ].join('\n') + '\n',
    client_email: 'firebase-adminsdk-fbsvc@trenchlab-production.iam.gserviceaccount.com',
    client_id: '106193632566855617729',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40trenchlab-production.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com'
  };
}

export function firebaseAdmin() {
  if (!getApps().length) {
    initializeApp({ credential: cert(serviceAccount()) });
  }
  return { auth: getAuth(), db: getFirestore() };
}

export function adminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS || '1alexkingsley@gmail.com,alexkingsley@gmail.com,precilexis@gmail.com')
      .split(',')
      .map(email => email.trim().toLowerCase())
      .filter(Boolean)
  );
}
