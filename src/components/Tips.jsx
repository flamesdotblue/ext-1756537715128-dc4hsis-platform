import React from 'react';
import { CheckCircle2, KeyRound, ShieldCheck, EyeOff } from 'lucide-react';

export default function Tips() {
  const tips = [
    {
      icon: KeyRound,
      title: 'Use length over complexity',
      desc: 'Length boosts entropy the most. Aim for 14+ characters when possible.',
    },
    {
      icon: ShieldCheck,
      title: 'Unique per site',
      desc: 'Never reuse passwords. A breach on one site should not affect others.',
    },
    {
      icon: EyeOff,
      title: 'Avoid patterns',
      desc: 'Skip common phrases, keyboard walks, or personal info.',
    },
    {
      icon: CheckCircle2,
      title: 'Use a manager',
      desc: 'Store and autofill with a reputable password manager for convenience.',
    },
  ];

  return (
    <aside className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6">
      <div className="text-white/80 text-sm mb-3">Smart tips</div>
      <ul className="space-y-3">
        {tips.map((t, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-0.5 h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <t.icon className="h-4 w-4 text-cyan-300" />
            </div>
            <div>
              <div className="text-sm font-semibold">{t.title}</div>
              <div className="text-xs text-white/60">{t.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
