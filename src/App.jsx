import React from 'react';
import Hero from './components/Hero';
import PasswordGenerator from './components/PasswordGenerator';
import Tips from './components/Tips';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white antialiased flex flex-col">
      <Hero />
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PasswordGenerator />
          </div>
          <div className="lg:col-span-1">
            <Tips />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
