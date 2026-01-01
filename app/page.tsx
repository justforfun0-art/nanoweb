'use client';

import { useState, useEffect } from 'react';
import InfluencerForm from '@/components/InfluencerForm';

import { sora } from "./fonts";
import { motion, useScroll, useTransform } from "framer-motion";

/* ============================================
   UTILITY COMPONENTS
============================================ */

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(target.replace(/\D/g, ''));

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

function TypingText({ words }: { words: string[] }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWord, words]);

  return (
    <span className="inline-block min-w-[200px] sm:min-w-[280px] md:min-w-[380px]">
      <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-transparent font-black">
        {currentText}
      </span>
      <span className="text-amber-400 animate-pulse">|</span>
    </span>
  );
}

/* ============================================
   SVG ICONS
============================================ */

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function MoneyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function PenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function WalletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z" />
    </svg>
  );
}

/* ============================================
   MAIN PAGE COMPONENT
============================================ */

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <main className="min-h-screen bg-[#0a0118] text-white relative">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0118] via-[#0f0520] to-[#0a0118]" />
      <div className="fixed inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)`
      }} />

      {/* Content wrapper */}
      <div className="relative z-10">
     {/* ==================== NAVIGATION ==================== */}
<nav className="fixed top-0 left-0 right-0 z-50 p-4">
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center justify-between px-6 py-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="NanoFluencer Logo"
  className="h-12 md:h-16 w-auto"
        />

        <span
          className={`
            hidden sm:block
            text-2xl md:text-3xl
            font-extrabold tracking-tight
            bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300
            bg-clip-text text-transparent
            animate-gradient
            ${sora.className}
          `}
        >
          NanoFluencer
        </span>
      </div>

      {/* Menu */}
      <div className="flex items-center gap-3">
        <a href="#features" className="hidden md:block px-4 py-2 text-sm text-white/60 hover:text-white">
          Features
        </a>
        <a href="#platforms" className="hidden md:block px-4 py-2 text-sm text-white/60 hover:text-white">
          Platforms
        </a>
        <a href="/admin" className="px-5 py-2.5 text-sm font-medium rounded-xl bg-white/10 hover:bg-white/20 border border-white/20">
          Admin
        </a>
      </div>

    </div>
  </div>
</nav>


        {/* ==================== HERO SECTION ==================== */}
        <motion.section 
          style={{ opacity: heroOpacity }}
          className="min-h-screen flex items-center justify-center px-6 pt-28 pb-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                India's #1 Micro-Influencer Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] tracking-tight"
            >
              <span className="block text-white mb-3">Turn Your</span>
              <span className="block mb-3">
                <TypingText words={['Influence', 'Content', 'Passion', 'Creativity']} />
              </span>
              <span className="text-white">Into </span>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Income</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
            >
              Connect with premium brands, monetize your content, and join{' '}
              <span className="text-white font-semibold">2,000+</span> nano-influencers already earning.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
            >
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500 rounded-2xl font-bold text-lg shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-105"
              >
                Start Earning Today →
              </button>
              <a
                href="#features"
                className="px-8 py-4 rounded-2xl font-semibold text-white/80 bg-white/5 border border-white/20 hover:bg-white/10 transition-all"
              >
                Learn More
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm text-white/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/40 to-pink-500/40 border-2 border-[#0a0118]" />
                  ))}
                </div>
                <span>10,000+ Influencers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★★★★★</span>
                <span>4.9/5</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-lg">✓</span>
                <span>Free to Join</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ==================== STATS SECTION ==================== */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {[
                { value: '2000', suffix: '+', label: 'Influencers', color: 'violet' },
                { value: '100', suffix: '+', label: 'Brands', color: 'pink' },
                { value: '20', suffix: 'L+', label: 'Earned (₹)', color: 'emerald' },
                { value: '98', suffix: '%', label: 'Satisfaction', color: 'orange' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`p-8 rounded-2xl text-center
                    ${stat.color === 'violet' ? 'bg-violet-500/10 border border-violet-500/30' : ''}
                    ${stat.color === 'pink' ? 'bg-pink-500/10 border border-pink-500/30' : ''}
                    ${stat.color === 'emerald' ? 'bg-emerald-500/10 border border-emerald-500/30' : ''}
                    ${stat.color === 'orange' ? 'bg-orange-500/10 border border-orange-500/30' : ''}
                  `}>
                    <div className={`text-4xl md:text-5xl font-black mb-2
                      ${stat.color === 'violet' ? 'text-violet-400' : ''}
                      ${stat.color === 'pink' ? 'text-pink-400' : ''}
                      ${stat.color === 'emerald' ? 'text-emerald-400' : ''}
                      ${stat.color === 'orange' ? 'text-orange-400' : ''}
                    `}>
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-white/50 text-sm font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FEATURES SECTION ==================== */}
        <section id="features" className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium mb-6">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
                <span className="text-white">Everything You Need to </span>
                <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Succeed</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
                The most powerful platform for nano and micro-influencers in India
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {[
                { icon: TargetIcon, title: 'Smart Matching', desc: 'AI-powered brand-influencer matching for perfect collaborations', color: 'violet' },
                { icon: MoneyIcon, title: 'Fair Pay', desc: 'Transparent pricing & instant payments directly to your account', color: 'emerald' },
                { icon: ChartIcon, title: 'Analytics', desc: 'Real-time performance insights to grow your influence', color: 'orange' },
                { icon: RocketIcon, title: 'Growth Tools', desc: 'Professional tools to scale your influence and reach', color: 'cyan' },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="h-full p-7 md:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6
                        ${feature.color === 'violet' ? 'bg-violet-500/20 border border-violet-500/30' : ''}
                        ${feature.color === 'emerald' ? 'bg-emerald-500/20 border border-emerald-500/30' : ''}
                        ${feature.color === 'orange' ? 'bg-orange-500/20 border border-orange-500/30' : ''}
                        ${feature.color === 'cyan' ? 'bg-cyan-500/20 border border-cyan-500/30' : ''}
                      `}>
                        <Icon className={`w-7 h-7
                          ${feature.color === 'violet' ? 'text-violet-400' : ''}
                          ${feature.color === 'emerald' ? 'text-emerald-400' : ''}
                          ${feature.color === 'orange' ? 'text-orange-400' : ''}
                          ${feature.color === 'cyan' ? 'text-cyan-400' : ''}
                        `} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-white/50 text-base leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== PLATFORMS SECTION ==================== */}
        <section id="platforms" className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-sm font-medium mb-6">
                Multi-Platform
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
                <span className="text-white">Connect Your </span>
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Platforms</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                Grow your presence across all major social networks
              </p>
            </div>

            {/* Platforms Grid */}
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {[
                { name: 'Instagram', icon: InstagramIcon, gradient: 'from-pink-500 to-purple-600', members: '8,000+' },
                { name: 'YouTube', icon: YoutubeIcon, gradient: 'from-red-500 to-red-600', members: '1,500+' },
                { name: 'Facebook', icon: FacebookIcon, gradient: 'from-blue-500 to-blue-600', members: '500+' },
              ].map((platform, i) => {
                const Icon = platform.icon;
                return (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-center transition-all">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
                      <p className="text-white/50 text-base mb-6">{platform.members} influencers</p>
                      <button className={`px-6 py-3 rounded-full bg-gradient-to-r ${platform.gradient} text-white text-sm font-semibold hover:opacity-90 transition-opacity`}>
                        Connect Now →
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== HOW IT WORKS SECTION ==================== */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-6">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black">
                <span className="text-white">Start Earning in </span>
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">3 Steps</span>
              </h2>
            </div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {[
                { num: '01', title: 'Sign Up Free', desc: 'Create your profile in just 2 minutes. No fees, no commitment.', icon: PenIcon, color: 'violet' },
                { num: '02', title: 'Get Matched', desc: 'Our AI matches you with brands that fit your niche and audience.', icon: UsersIcon, color: 'pink' },
                { num: '03', title: 'Earn Money', desc: 'Complete campaigns and receive instant payments to your account.', icon: WalletIcon, color: 'emerald' },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-center transition-all relative overflow-hidden">
                      {/* Step number background */}
                      <div className="absolute top-4 right-4 text-7xl font-black text-white/5">
                        {step.num}
                      </div>
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6
                        ${step.color === 'violet' ? 'bg-violet-500/20 border border-violet-500/30' : ''}
                        ${step.color === 'pink' ? 'bg-pink-500/20 border border-pink-500/30' : ''}
                        ${step.color === 'emerald' ? 'bg-emerald-500/20 border border-emerald-500/30' : ''}
                      `}>
                        <Icon className={`w-7 h-7
                          ${step.color === 'violet' ? 'text-violet-400' : ''}
                          ${step.color === 'pink' ? 'text-pink-400' : ''}
                          ${step.color === 'emerald' ? 'text-emerald-400' : ''}
                        `} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-white/50 text-base leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-pink-600 to-orange-500" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
              
              <div className="relative p-12 md:p-20 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                  Ready to Start Your
                  <br />
                  <span className="text-yellow-200">Influencer Journey?</span>
                </h2>
                <p className="text-lg md:text-xl text-white/80 mb-10 max-w-md mx-auto leading-relaxed">
                  Join thousands of influencers already earning. It's free to join!
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-10 py-5 bg-white text-violet-700 rounded-2xl font-bold text-lg shadow-xl hover:bg-yellow-100 transition-colors"
                >
                  Apply Now — It's Free →
                </button>
                <p className="text-white/60 text-sm mt-8">
                  No credit card required • Setup in 2 minutes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="py-20 md:py-24 px-6 border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-5">
                  <img
  src="/logo.png"
  alt="NanoFluencer Logo"
  className="h-10 w-auto"
/>
              <span
  className={`
    text-xl md:text-2xl
    font-extrabold tracking-tight
    bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300
    bg-clip-text text-transparent
    animate-gradient
    ${sora.className}
  `}
>
  NanoFluencer
</span>


                </div>
                <p className="text-white/40 text-base max-w-xs leading-relaxed">
                  India's premier platform connecting nano and micro-influencers with top brands.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-5">Platform</h4>
                <div className="space-y-4">
                  <a href="#features" className="block text-white/40 hover:text-white text-base transition-colors">Features</a>
                  <a href="#platforms" className="block text-white/40 hover:text-white text-base transition-colors">Platforms</a>
                  <a href="#" className="block text-white/40 hover:text-white text-base transition-colors">For Brands</a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-5">Legal</h4>
                <div className="space-y-4">
                  <a href="/privacy" className="block text-white/40 hover:text-white text-base transition-colors">Privacy Policy</a>
                  <a href="/terms" className="block text-white/40 hover:text-white text-base transition-colors">Terms of Service</a>
                  <a href="/contact" className="block text-white/40 hover:text-white text-base transition-colors">Contact Us</a>
                </div>
              </div>
            </div>
            
            <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
              <p className="text-white/30 text-base">© 2025 NanoFluencer.com</p>
              <div className="flex gap-4">
                {[InstagramIcon, YoutubeIcon, FacebookIcon].map((Icon, i) => (
                  <a key={i} href="#" className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ==================== FORM MODAL ==================== */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0420] rounded-2xl border border-white/10 shadow-2xl"
          >
            <div className="sticky top-0 bg-[#0d0420]/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex justify-between items-center z-10">
              <div>
                <h2 className="text-xl font-bold text-white">Join as Influencer</h2>
                <p className="text-white/50 text-sm">Fill out the form to get started</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all text-xl"
              >
                ×
              </button>
            </div>
            <InfluencerForm onSuccess={() => setShowForm(false)} />
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
