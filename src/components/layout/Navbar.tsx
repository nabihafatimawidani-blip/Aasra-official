'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ShieldCheck, 
  HeartHandshake, 
  Lock, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About AASRA', href: '/#about' },
  { name: 'Initiatives', href: '/#initiatives' },
  { name: 'Impact', href: '/#impact' },
  { name: 'Transparency', href: '/#transparency' },
  { name: 'Team', href: '/team' },
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Partners', href: '/partners' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const pathname = usePathname();

  // Handle hash scrolling when arriving from another page or on direct link
  useEffect(() => {
    const scrollToHash = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash;
        setCurrentHash(hash);
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        setCurrentHash('');
      }
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/') {
      if (pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        setCurrentHash('');
      }
      return;
    }

    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
          setCurrentHash('#' + targetId);
        }
      }
    }
  };

  const isLinkActive = (href: string) => {
    if (pathname === '/') {
      if (href.startsWith('/#')) {
        const targetHash = href.replace('/', '');
        return currentHash === targetHash;
      }
      if (href === '/') {
        return !currentHash || currentHash === '#home';
      }
      return false;
    }
    if (href.startsWith('/#')) {
      return false;
    }
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-brand-200/80 shadow-sm transition-all">
      {/* Institutional Top Bar */}
      <div className="bg-brand-900 text-brand-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-gold-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Official Organization Portal
            </span>
            <span className="text-brand-600 hidden sm:inline">•</span>
            <span className="text-brand-300 hidden sm:inline">
              Sreyas Institute of Engineering and Technology
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-brand-300">Audited & Transparent Student Body</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Official Brand Identity */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-lg bg-brand-900 text-white flex flex-col items-center justify-center border-2 border-brand-700 shadow-sm group-hover:border-gold-500 transition-colors">
              <span className="text-base font-black tracking-widest leading-none">आ</span>
              <span className="text-[9px] uppercase tracking-tighter text-gold-400 font-semibold mt-0.5">AASRA</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-brand-800">
                  AASRA
                </span>
                <span className="text-xs bg-brand-100 text-brand-800 font-semibold px-2 py-0.5 rounded-full border border-brand-200">
                  Welfare Initiative
                </span>
              </div>
              <span className="text-[11px] text-brand-600 font-medium tracking-normal leading-tight mt-0.5">
                Sreyas Institute of Engineering and Technology
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-800 bg-brand-50 font-semibold border-b-2 border-brand-700'
                      : 'text-brand-700 hover:text-brand-800 hover:bg-brand-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Action */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#get-involved"
              onClick={(e) => handleNavClick(e, '/#get-involved')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold text-white bg-brand-800 hover:bg-brand-900 shadow-sm hover:shadow transition-all border border-brand-900"
            >
              <HeartHandshake className="w-4 h-4 text-gold-400" />
              <span>Get Involved</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/#get-involved"
              onClick={(e) => handleNavClick(e, '/#get-involved')}
              className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-brand-800 rounded border border-brand-900"
            >
              <span>Join</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-800 hover:text-brand-900 hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-gold-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-brand-200 bg-white shadow-xl">
          <div className="px-4 pt-3 pb-6 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-brand-800 bg-brand-50 font-semibold border-l-4 border-brand-700'
                      : 'text-brand-700 hover:bg-brand-50 hover:text-brand-800'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-brand-400" />
                </Link>
              );
            })}

            <div className="pt-4 border-t border-brand-200 mt-2 space-y-2">
              <Link
                href="/#get-involved"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, '/#get-involved');
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md text-white bg-brand-800 font-semibold shadow-sm text-sm hover:bg-brand-900"
              >
                <HeartHandshake className="w-4 h-4 text-gold-400" />
                <span>Join / Volunteer / Support AASRA</span>
              </Link>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md text-brand-700 bg-brand-50 font-semibold shadow-sm text-sm hover:bg-brand-100 border border-brand-200"
              >
                <Lock className="w-3.5 h-3.5 text-brand-500" />
                <span>Council Admin Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
