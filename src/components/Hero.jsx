import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/50 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Futuristic identity • Holographic vibes
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            Generate strong passwords in one click
          </h1>
          <p className="mt-3 text-white/70 text-base sm:text-lg">
            A simple, delightful password generator with instant strength insights and copy-friendly actions.
          </p>
        </div>
      </div>
    </section>
  );
}
