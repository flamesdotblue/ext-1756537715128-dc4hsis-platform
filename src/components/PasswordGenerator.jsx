import React, { useMemo, useState } from 'react';
import { Copy, RefreshCw, Check, Shield, Lock } from 'lucide-react';

const DEFAULTS = {
  length: 16,
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
  excludeSimilar: true,
  noDuplicates: false,
};

const similarChars = new Set('Il1O0B8S5Z2');

function buildCharset(opts) {
  let chars = '';
  if (opts.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (opts.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (opts.numbers) chars += '0123456789';
  if (opts.symbols) chars += '!@#$%^&*()-_=+[]{};:,.?/~`|<>';
  if (opts.excludeSimilar) {
    chars = Array.from(chars)
      .filter((c) => !similarChars.has(c))
      .join('');
  }
  return chars;
}

function generatePassword(opts) {
  const charset = buildCharset(opts);
  if (!charset) return '';

  const length = Math.max(4, Math.min(128, opts.length || 16));

  // Ensure at least one character from each selected set
  const groups = [];
  if (opts.lowercase) groups.push('abcdefghijklmnopqrstuvwxyz');
  if (opts.uppercase) groups.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  if (opts.numbers) groups.push('0123456789');
  if (opts.symbols) groups.push('!@#$%^&*()-_=+[]{};:,.?/~`|<>');

  const filteredGroups = groups.map((g) =>
    opts.excludeSimilar ? Array.from(g).filter((c) => !similarChars.has(c)).join('') : g
  ).filter(Boolean);

  const out = [];
  // Seed with one from each group
  filteredGroups.forEach((g) => {
    out.push(g[Math.floor(Math.random() * g.length)]);
  });

  while (out.length < length) {
    const ch = charset[Math.floor(Math.random() * charset.length)];
    if (opts.noDuplicates && out.includes(ch)) continue;
    out.push(ch);
  }

  // Shuffle (Fisher–Yates)
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }

  return out.join('');
}

function estimateStrength(pw, opts) {
  if (!pw) return { score: 0, label: 'Very Weak', color: 'bg-red-500' };
  const charsetSize = buildCharset(opts).length || 1;
  const entropy = Math.log2(charsetSize) * pw.length; // bits

  // Simple scoring thresholds
  if (entropy < 40) return { score: 1, label: 'Weak', color: 'bg-orange-500' };
  if (entropy < 60) return { score: 2, label: 'Fair', color: 'bg-yellow-500' };
  if (entropy < 80) return { score: 3, label: 'Strong', color: 'bg-lime-500' };
  return { score: 4, label: 'Excellent', color: 'bg-emerald-500' };
}

function Range({ label, value, onChange, min = 4, max = 64 }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/80">{label}</span>
        <span className="text-sm font-medium tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-cyan-400"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange, hint }) {
  return (
    <label className="flex items-start gap-3 py-2 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1.5 h-4 w-4 rounded border-white/20 bg-transparent text-cyan-400 focus:ring-cyan-500"
      />
      <div>
        <div className="text-sm font-medium">{label}</div>
        {hint ? <div className="text-xs text-white/60 mt-0.5">{hint}</div> : null}
      </div>
    </label>
  );
}

export default function PasswordGenerator() {
  const [options, setOptions] = useState(DEFAULTS);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const strength = useMemo(() => estimateStrength(password, options), [password, options]);

  const regenerate = () => {
    if (!options.lowercase && !options.uppercase && !options.numbers && !options.symbols) {
      setPassword('');
      return;
    }
    setPassword(generatePassword(options));
    setCopied(false);
  };

  React.useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6">
      <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
        <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
          <Shield className="h-4 w-4 text-cyan-300" />
        </div>
        Secure Password Generator
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="space-y-4">
            <Range
              label="Length"
              value={options.length}
              onChange={(v) => setOptions((o) => ({ ...o, length: v }))}
              min={6}
              max={64}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Toggle
                label="Include lowercase (a–z)"
                checked={options.lowercase}
                onChange={(v) => setOptions((o) => ({ ...o, lowercase: v }))}
              />
              <Toggle
                label="Include uppercase (A–Z)"
                checked={options.uppercase}
                onChange={(v) => setOptions((o) => ({ ...o, uppercase: v }))}
              />
              <Toggle
                label="Include numbers (0–9)"
                checked={options.numbers}
                onChange={(v) => setOptions((o) => ({ ...o, numbers: v }))}
              />
              <Toggle
                label="Include symbols (!@#…)"
                checked={options.symbols}
                onChange={(v) => setOptions((o) => ({ ...o, symbols: v }))}
              />
              <Toggle
                label="Exclude similar-looking"
                hint="Avoid characters like I, l, 1, O, 0, S, 5, Z, 2"
                checked={options.excludeSimilar}
                onChange={(v) => setOptions((o) => ({ ...o, excludeSimilar: v }))}
              />
              <Toggle
                label="No duplicate characters"
                hint="Prevents repeating the same character"
                checked={options.noDuplicates}
                onChange={(v) => setOptions((o) => ({ ...o, noDuplicates: v }))}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="h-full rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Lock className="h-4 w-4 text-white/60" />
                Generated password
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={regenerate}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 transition"
                >
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </button>
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/90 hover:bg-cyan-400 text-black px-3 py-2 text-sm font-medium transition"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                readOnly
                value={password}
                className="w-full font-mono tracking-wider text-[15px] sm:text-base bg-black/40 border border-white/10 rounded-lg px-3 py-3 outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
              <div className="mt-3">
                <StrengthBar strength={strength} />
              </div>
            </div>

            <div className="text-xs text-white/60">
              Entropy-based estimate. Longer and more varied passwords are stronger.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StrengthBar({ strength }) {
  const levels = [0, 1, 2, 3, 4];
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white/80">Strength</span>
        <span className="text-sm font-medium">{strength.label}</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {levels.slice(0, 4).map((i) => (
          <div
            key={i}
            className={`h-2 rounded ${i < strength.score ? strength.color : 'bg-white/10'}`}
          />
        ))}
      </div>
    </div>
  );
}
