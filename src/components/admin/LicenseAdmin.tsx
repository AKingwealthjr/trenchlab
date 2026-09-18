import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Ban, CheckCircle2, Copy, KeyRound, Loader2, PauseCircle, RefreshCw, RotateCcw } from 'lucide-react';
import { useUniversity } from '../../context/UniversityContext';
import { readApiJson } from '../../lib/api';

type LicenseStatus = 'available' | 'active' | 'suspended' | 'revoked' | 'expired';

interface LicenseRecord {
  id: string;
  keyPrefix?: string;
  status: LicenseStatus;
  assignedEmail?: string | null;
  assignedUid?: string | null;
  createdAt?: string;
  activatedAt?: string | null;
  expiresAt?: string | null;
  notes?: string;
}

interface AuditRecord {
  id: string;
  licenseId: string;
  action: string;
  actorEmail?: string | null;
  createdAt?: string;
  notes?: string;
}

const statusTone: Record<LicenseStatus, string> = {
  available: 'text-[#E8A33D] border-[#E8A33D]/30 bg-[#E8A33D]/10',
  active: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
  suspended: 'text-orange-300 border-orange-500/30 bg-orange-500/10',
  revoked: 'text-red-300 border-red-500/30 bg-red-500/10',
  expired: 'text-[#9A9AA3] border-[#3A3A42] bg-[#1C1C22]'
};

export const LicenseAdmin: React.FC = () => {
  const { firebaseUser } = useUniversity();
  const [licenses, setLicenses] = useState<LicenseRecord[]>([]);
  const [audit, setAudit] = useState<AuditRecord[]>([]);
  const [assignedEmail, setAssignedEmail] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [notes, setNotes] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState<string | null>(null);

  const adminFetch = useCallback(async (url: string, init: RequestInit = {}) => {
    const token = await firebaseUser?.getIdToken();
    return fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
  }, [firebaseUser]);

  const loadLicenses = useCallback(async () => {
    if (!firebaseUser) return;
    setLoading(true);
    const response = await adminFetch('/api/licenses/list');
    const data = await readApiJson(response);
    setLoading(false);
    if (!data.success) {
      setMessage(data.message || 'Unable to load licenses.');
      return;
    }
    setLicenses(Array.isArray(data.licenses) ? data.licenses as LicenseRecord[] : []);
    setAudit(Array.isArray(data.audit) ? data.audit as AuditRecord[] : []);
  }, [adminFetch, firebaseUser]);

  useEffect(() => {
    void loadLicenses();
  }, [loadLicenses]);

  const counts = useMemo(() => licenses.reduce<Record<string, number>>((acc, license) => {
    acc[license.status] = (acc[license.status] || 0) + 1;
    return acc;
  }, {}), [licenses]);

  const generateLicense = async () => {
    setWorking('generate');
    setMessage('');
    const response = await adminFetch('/api/licenses/generate', {
      method: 'POST',
      body: JSON.stringify({
        assignedEmail: assignedEmail.trim() || null,
        expiresAt: expiresAt || null,
        notes: notes.trim()
      })
    });
    const data = await readApiJson(response);
    setWorking(null);
    if (!data.success) {
      setMessage(data.message || 'License generation failed.');
      return;
    }
    const license = data.license as { key?: string } | undefined;
    setGeneratedKey(license?.key || '');
    setAssignedEmail('');
    setExpiresAt('');
    setNotes('');
    await loadLicenses();
  };

  const lifecycle = async (licenseId: string, action: 'suspend' | 'revoke' | 'reactivate') => {
    setWorking(`${action}:${licenseId}`);
    setMessage('');
    const response = await adminFetch(`/api/licenses/${action}`, {
      method: 'POST',
      body: JSON.stringify({ licenseId, reason: `${action} from admin panel` })
    });
    const data = await readApiJson(response);
    setWorking(null);
    if (!data.success) {
      setMessage(data.message || `${action} failed.`);
      return;
    }
    await loadLicenses();
  };

  const copyKey = async () => {
    if (!generatedKey) return;
    await navigator.clipboard.writeText(generatedKey);
    setMessage('Generated key copied. This is the only time the raw key is shown.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.24em] text-[#E8A33D]">SECURE LICENSE CONTROL</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-[#EDEDEF]">Operator Access Lifecycle</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#9A9AA3]">
            Generate activation keys, monitor bound operators, and revoke or restore access without exposing raw license keys.
          </p>
        </div>
        <button
          onClick={loadLicenses}
          className="inline-flex items-center justify-center gap-2 rounded border border-[#3A3A42] px-4 py-2 font-mono text-xs text-[#EDEDEF] hover:border-[#E8A33D]/60"
        >
          <RefreshCw className="h-4 w-4" />
          REFRESH
        </button>
      </div>

      {message && (
        <div className="flex items-center gap-2 rounded border border-[#E8A33D]/30 bg-[#E8A33D]/10 p-3 font-mono text-xs text-[#E8A33D]">
          <AlertTriangle className="h-4 w-4" />
          {message}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-4">
        {(['available', 'active', 'suspended', 'revoked'] as LicenseStatus[]).map(status => (
          <div key={status} className={`rounded border p-4 ${statusTone[status]}`}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em]">{status}</p>
            <p className="mt-2 font-display text-3xl font-bold">{counts[status] || 0}</p>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-[#242429] bg-[#131316] p-5">
        <div className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-[#E8A33D]" />
          <h2 className="font-display text-xl font-bold">Generate License</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_180px]">
          <input
            value={assignedEmail}
            onChange={event => setAssignedEmail(event.target.value)}
            placeholder="Assigned email, optional"
            className="rounded border border-[#242429] bg-[#0A0A0B] p-3 font-mono text-sm text-[#EDEDEF] outline-none focus:border-[#E8A33D]/60"
          />
          <input
            value={expiresAt}
            onChange={event => setExpiresAt(event.target.value)}
            type="date"
            className="rounded border border-[#242429] bg-[#0A0A0B] p-3 font-mono text-sm text-[#EDEDEF] outline-none focus:border-[#E8A33D]/60"
          />
          <textarea
            value={notes}
            onChange={event => setNotes(event.target.value)}
            placeholder="Internal notes, optional"
            className="min-h-24 rounded border border-[#242429] bg-[#0A0A0B] p-3 font-mono text-sm text-[#EDEDEF] outline-none focus:border-[#E8A33D]/60 md:col-span-2"
          />
        </div>
        <button
          onClick={generateLicense}
          disabled={working === 'generate'}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded bg-[#E8A33D] px-4 py-3 font-mono text-xs font-bold text-black disabled:opacity-60"
        >
          {working === 'generate' ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
          GENERATE KEY
        </button>
        {generatedKey && (
          <div className="mt-4 flex flex-col gap-3 rounded border border-[#E8A33D]/30 bg-[#E8A33D]/10 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#E8A33D]">RAW KEY - COPY NOW</p>
              <p className="mt-1 font-mono text-lg text-[#EDEDEF]">{generatedKey}</p>
            </div>
            <button onClick={copyKey} className="inline-flex items-center justify-center gap-2 rounded border border-[#E8A33D]/50 px-3 py-2 font-mono text-xs text-[#E8A33D]">
              <Copy className="h-4 w-4" />
              COPY
            </button>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-[#242429] bg-[#131316]">
        <div className="border-b border-[#242429] p-5">
          <h2 className="font-display text-xl font-bold">Licenses</h2>
        </div>
        {loading ? (
          <div className="flex items-center gap-2 p-5 font-mono text-sm text-[#9A9AA3]">
            <Loader2 className="h-4 w-4 animate-spin text-[#E8A33D]" />
            Loading licenses...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-[#242429] font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E8E98]">
                <tr>
                  <th className="px-5 py-3">Key</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Assigned</th>
                  <th className="px-5 py-3">Created</th>
                  <th className="px-5 py-3">Expires</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242429]">
                {licenses.map(license => (
                  <tr key={license.id} className="text-[#D5D5DB]">
                    <td className="px-5 py-4 font-mono">{license.keyPrefix || license.id.slice(0, 8)}...</td>
                    <td className="px-5 py-4">
                      <span className={`rounded border px-2 py-1 font-mono text-[10px] uppercase ${statusTone[license.status] || statusTone.available}`}>
                        {license.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">{license.assignedEmail || 'Unassigned'}</td>
                    <td className="px-5 py-4 font-mono text-xs text-[#9A9AA3]">{license.createdAt ? new Date(license.createdAt).toLocaleDateString() : '-'}</td>
                    <td className="px-5 py-4 font-mono text-xs text-[#9A9AA3]">{license.expiresAt || 'No expiry'}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {license.status !== 'suspended' && license.status !== 'revoked' && (
                          <button onClick={() => lifecycle(license.id, 'suspend')} className="inline-flex items-center gap-1 rounded border border-orange-500/30 px-2 py-1 font-mono text-[10px] text-orange-300">
                            <PauseCircle className="h-3 w-3" />
                            SUSPEND
                          </button>
                        )}
                        {license.status !== 'revoked' && (
                          <button onClick={() => lifecycle(license.id, 'revoke')} className="inline-flex items-center gap-1 rounded border border-red-500/30 px-2 py-1 font-mono text-[10px] text-red-300">
                            <Ban className="h-3 w-3" />
                            REVOKE
                          </button>
                        )}
                        {(license.status === 'suspended' || license.status === 'revoked') && (
                          <button onClick={() => lifecycle(license.id, 'reactivate')} className="inline-flex items-center gap-1 rounded border border-emerald-500/30 px-2 py-1 font-mono text-[10px] text-emerald-300">
                            <RotateCcw className="h-3 w-3" />
                            REACTIVATE
                          </button>
                        )}
                        {working?.endsWith(license.id) && <Loader2 className="h-4 w-4 animate-spin text-[#E8A33D]" />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-[#242429] bg-[#131316] p-5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[#E8A33D]" />
          <h2 className="font-display text-xl font-bold">Recent Audit</h2>
        </div>
        <div className="mt-4 space-y-2">
          {audit.length === 0 && <p className="font-mono text-xs text-[#8E8E98]">No audit events yet.</p>}
          {audit.slice(0, 12).map(event => (
            <div key={event.id} className="grid gap-1 rounded border border-[#242429] bg-[#0A0A0B] p-3 font-mono text-xs text-[#D5D5DB] md:grid-cols-[140px_1fr_180px]">
              <span className="uppercase text-[#E8A33D]">{event.action}</span>
              <span>{event.licenseId}</span>
              <span className="text-[#8E8E98]">{event.actorEmail || 'server'} {event.createdAt ? new Date(event.createdAt).toLocaleString() : ''}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
