import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
        <div>
          © {new Date().getFullYear()} HoloPass • Built with React + Tailwind
        </div>
        <div className="flex items-center gap-3">
          <a className="hover:text-white transition" href="#">Privacy</a>
          <span className="opacity-30">•</span>
          <a className="hover:text-white transition" href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}
