import * as React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header Section */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 hover:bg-white/90 hover:border-gray-200">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <img src="/logo.svg" alt="FlyExplorer" className="w-full h-full object-cover" />
              </div>
              <span className="text-3xl font-bold tracking-tight hover:tracking-wide transition-all">
                <a href="/">FlyExplorer</a>
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {['Conversation', 'Graph', 'Bounty', 'About'].map((item) => (
                <Link
                  key={item}
                  to={`/app/${item.toLowerCase()}`}
                  className="text-2xl font-medium text-gray-600 hover:text-black transition-all hover:scale-105"
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
            {/* Text Content */}
            <div className="md:w-1/2 space-y-10">
              <h1 className="text-7xl font-bold leading-tight tracking-tight">
                Explore Data
                <span className="block mt-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  With AI Agent
                </span>
              </h1>
              <p className="text-2xl text-gray-600 leading-relaxed">
                Discover insights and visualize connections with our advanced AI-powered explorer
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/app/conversation"
                  className="group relative px-8 py-4 bg-black text-white text-xl font-medium rounded-2xl 
                           transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-black/20 rounded-2xl transition-all 
                                group-hover:scale-105 group-hover:opacity-50"></div>
                </Link>
                <Link
                  to="/"
                  className="group px-8 py-4 text-xl font-medium rounded-2xl border-2 border-gray-200
                           transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* AI Visualization */}
            <div className="md:w-1/2">
              <div className="relative w-full aspect-square">
                {/* AI Visualization Container */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-96 h-96">
                    {/* Animated Rings */}
                    <div className="absolute inset-0 border-[8px] border-black/10 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-12 border-[6px] border-black/20 rounded-full animate-spin-reverse"></div>
                    <div className="absolute inset-24 border-[4px] border-black/30 rounded-full animate-pulse"></div>
                    {/* Center Element */}
                    <div className="absolute inset-32 bg-black rounded-full shadow-[0_0_60px_rgba(0,0,0,0.3)] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-600">
              © 2024 FlyExplorer.
            </div>
            <div className="flex space-x-8">
              {['Privacy Policy', 'Terms of Service'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
