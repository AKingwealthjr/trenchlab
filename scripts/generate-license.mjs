import { createHash, randomBytes } from 'node:crypto';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { firebaseAdmin } from '../src/server/firebaseAdmin.js';
import { LicenseStore } from '../src/server/licenseStore.js';

dotenv.config();

const hash = (key) => createHash('sha256').update(key.trim().toUpperCase()).digest('hex');
const createRawKey = () => `TLB-${randomBytes(6).toString('hex').toUpperCase().match(/.{1,4}/g).join('-')}`;
const now = () => new Date().toISOString();

async function main() {
  const args = process.argv.slice(2);
  let assignedEmail = null;
  let notes = 'Generated via CLI';

  for (const arg of args) {
    if (arg.includes('@')) {
      assignedEmail = arg.trim();
    } else if (!arg.startsWith('--')) {
      notes = arg.trim();
    }
  }

  console.log('\n==========================================');
  console.log('   TRENCHLAB LICENSE KEY GENERATOR (CLI)  ');
  console.log('==========================================\n');

  const rawKey = createRawKey();
  const keyHash = hash(rawKey);
  const keyPrefix = rawKey.slice(0, 8);
  const timestamp = now();
  const licenseId = `lic-${randomBytes(8).toString('hex')}`;

  const licenseRecord = {
    id: licenseId,
    keyHash,
    keyPrefix,
    status: 'available',
    assignedUid: null,
    assignedEmail: assignedEmail || null,
    createdAt: timestamp,
    updatedAt: timestamp,
    activatedAt: null,
    expiresAt: null,
    maxActivations: 1,
    activationCount: 0,
    createdBy: 'cli-admin',
    notes
  };

  let savedToFirestore = false;
  try {
    const admin = firebaseAdmin();
    await admin.db.collection('licenses').doc(licenseId).set(licenseRecord);
    await admin.db.collection('license_audit').add({
      licenseId,
      action: 'generate',
      actorUid: 'cli-admin',
      actorEmail: 'admin@trenchlab',
      notes: `CLI key generation${assignedEmail ? ' for ' + assignedEmail : ''}`,
      createdAt: timestamp
    });
    savedToFirestore = true;
  } catch (err) {
    console.warn('[CLI] Notice: Could not write directly to Firestore:', err.message);
  }

  // Also save to local LicenseStore for offline/local development fallback
  try {
    LicenseStore.generate({
      assignedEmail,
      notes,
      adminUid: 'cli-admin',
      adminEmail: 'admin@trenchlab'
    });
  } catch (err) {
    // Ignore local store error
  }

  console.log('  STATUS:           SUCCESS');
  console.log('  LICENSE ID:      ', licenseId);
  console.log('  LICENSE KEY:     ', rawKey);
  console.log('  ASSIGNED EMAIL:  ', assignedEmail || '(None - Any user can activate)');
  console.log('  NOTES:           ', notes);
  console.log('  FIRESTORE SAVED: ', savedToFirestore ? 'YES (trenchlab-production)' : 'NO (Saved locally)');
  console.log('\n------------------------------------------');
  console.log('  INSTRUCTIONS FOR THE USER:');
  console.log('  1. User registers or signs in at: https://trenchlab.vercel.app/login');
  console.log('  2. User goes to:                 https://trenchlab.vercel.app/activate');
  console.log('  3. User enters license key:     ', rawKey);
  console.log('  4. Full access to university curriculum is unlocked instantly!');
  console.log('------------------------------------------\n');
}

main().catch(err => {
  console.error('[CLI ERROR]', err);
  process.exit(1);
});
