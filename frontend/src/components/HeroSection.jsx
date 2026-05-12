import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Brain, Zap } from 'lucide-react';

/* ─── Words that morph ──────────────────────────────────────────── */
const WORDS = ['intelligent.', 'simplified.', 'personalized.', 'predictable.'];

/* ─── Floating background typography ───────────────────────────── */
const BG_WORDS = [
  { text: 'AI',         style: { top: '14%',  left: '3%',   fontSize: '6.5rem', animation: 'bgWordFloat1 14s ease-in-out infinite', animationDelay: '0s'   } },
  { text: 'Risk',       style: { top: '8%',   right: '4%',  fontSize: '4.5rem', animation: 'bgWordFloat2 18s ease-in-out infinite', animationDelay: '1.5s' } },
  { text: 'Premium',    style: { bottom: '18%',right: '2%', fontSize: '4rem',   animation: 'bgWordFloat3 16s ease-in-out infinite', animationDelay: '0.8s' } },
  { text: 'Protection', style: { bottom: '10%',left: '2%',  fontSize: '3.5rem', animation: 'bgWordFloat1 20s ease-in-out infinite', animationDelay: '2s'   } },
  { text: 'Analytics',  style: { top: '55%',  left: '1%',   fontSize: '3rem',   animation: 'bgWordFloat2 13s ease-in-out infinite', animationDelay: '0.4s' } },
  { text: 'Predict',    style: { top: '68%',  right: '1%',  fontSize: '3.5rem', animation: 'bgWordFloat3 17s ease-in-out infinite', animationDelay: '1.2s' } },
];

/* ─── Abstract Orb (SVG-based animated visual centerpiece) ──────── */
function AbstractOrb() {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        width: 420, height: 420,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
      }}
    >
      <svg width="420" height="420" viewBox="0 0 420 420" fill="none" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#4375e5" stopOpacity="0.08" />
            <stop offset="60%"  stopColor="#7ca4f4" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#e8705a" stopOpacity="0"    />
          </radialGradient>
          <radialGradient id="orbCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f0f4ff" stopOpacity="0.3" />
          </radialGradient>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Outer ambient glow */}
        <circle cx="210" cy="210" r="200" fill="url(#orbGrad)" className="orb-pulse" />

        {/* Rotating dashed ring 1 */}
        <g style={{ transformOrigin: '210px 210px' }} className="ring-spin">
          <circle cx="210" cy="210" r="158"
            stroke="#4375e5" strokeOpacity="0.12" strokeWidth="1"
            strokeDasharray="6 14" fill="none" />
        </g>

        {/* Rotating dashed ring 2 (reverse) */}
        <g style={{ transformOrigin: '210px 210px' }} className="ring-spin-r">
          <circle cx="210" cy="210" r="132"
            stroke="#e8705a" strokeOpacity="0.1" strokeWidth="1"
            strokeDasharray="4 18" fill="none" />
        </g>

        {/* Inner solid soft ring */}
        <circle cx="210" cy="210" r="108"
          stroke="rgba(67,117,229,0.07)" strokeWidth="1" fill="none" />

        {/* Core soft circle */}
        <circle cx="210" cy="210" r="78"
          fill="url(#orbCore)"
          style={{ filter: 'drop-shadow(0 4px 24px rgba(67,117,229,0.08))' }}
          className="orb-pulse"
        />

        {/* Accent dots on rings */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 210 + 158 * Math.cos(rad);
          const y = 210 + 158 * Math.sin(rad);
          return (
            <circle key={i} cx={x} cy={y} r="3"
              fill="#4375e5" fillOpacity={0.2 + i * 0.04} />
          );
        })}
        {[36, 108, 180, 252, 324].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 210 + 132 * Math.cos(rad);
          const y = 210 + 132 * Math.sin(rad);
          return (
            <circle key={i} cx={x} cy={y} r="2.5"
              fill="#e8705a" fillOpacity={0.18 + i * 0.03} />
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Floating metric widget ─────────────────────────────────────── */
function Widget({ children, style, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-light rounded-2xl absolute"
      style={{
        boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Word morph variants ────────────────────────────────────────── */
const morphVariants = {
  enter: {
    opacity: 0,
    filter: 'blur(14px)',
    y: 20,
    scale: 0.95,
  },
  center: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    filter: 'blur(14px)',
    y: -20,
    scale: 0.95,
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
  },
};

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const sectionRef = useRef(null);

  /* Word cycle — every 3.2 s */
  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 3200);
    return () => clearInterval(t);
  }, []);

  /* Mouse-follow soft light */
  const onMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  /* Sparkline for central card */
  const spark = [42, 55, 47, 63, 58, 72, 68, 81, 76, 88, 84, 96];
  const W = 140, H = 42;
  const max = 96, min = 42;
  const pts = spark.map((v, i) =>
    `${(i / (spark.length - 1)) * W},${H - ((v - min) / (max - min)) * H * 0.8 - 4}`
  ).join(' ');

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      onMouseMove={onMouseMove}
    >
      {/* ── Base gradient mesh ─────────────────────────── */}
      <div className="hero-mesh" />
      <div className="dot-grid" />

      {/* ── Mouse-follow ambient light ─────────────────── */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(67,117,229,0.07) 0%, rgba(232,112,90,0.03) 45%, transparent 70%)',
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.55s cubic-bezier(0.16,1,0.3,1), top 0.55s cubic-bezier(0.16,1,0.3,1)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── Floating background words ──────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {BG_WORDS.map(({ text, style }) => (
          <span key={text} className="bg-word" style={style}>{text}</span>
        ))}
      </div>

      {/* ── Main content ──────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: Editorial copy ───────────────────── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full"
              style={{ background: 'rgba(67,117,229,0.07)', border: '1px solid rgba(67,117,229,0.14)' }}
            >
              <span className="live-dot" />
              <span className="text-xs font-semibold" style={{ color: '#4375e5', letterSpacing: '0.04em' }}>
                AI · FastAPI · Scikit-learn
              </span>
            </motion.div>

            {/* Main headline + morphing word */}
            <div className="mb-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="h-display mb-0"
                style={{ lineHeight: 1.05 }}
              >
                Insurance,
              </motion.p>

              {/* Word morph container — fixed height so layout doesn't jump */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22, duration: 0.6 }}
                style={{
                  position: 'relative',
                  height: 'clamp(3rem, 5.5vw + 0.5rem, 5.2rem)',
                  overflow: 'hidden',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIdx}
                    variants={morphVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="h-display text-gradient-flow absolute left-0 top-0"
                    style={{ display: 'block', lineHeight: 1.05 }}
                  >
                    {WORDS[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.65 }}
              className="body-large mb-8 max-w-lg"
            >
              Enter your profile and receive a personalized insurance premium estimate
              in seconds — powered by a Gradient Boosting model trained on real actuarial data.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <motion.a
                href="#prediction"
                className="btn-sky"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                Try it free <ArrowRight size={15} />
              </motion.a>
              <motion.a
                href="#analytics"
                className="btn-outline"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                View analytics
              </motion.a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.52, duration: 0.7 }}
              className="flex flex-wrap items-center gap-6"
            >
              {[
                { icon: Brain,      label: 'Gradient Boosting' },
                { icon: Zap,        label: '< 150ms'           },
                { icon: Shield,     label: 'No data stored'    },
                { icon: TrendingUp, label: '94.2% accuracy'    },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon size={13} color="#c0bdb7" />
                  <span className="text-xs" style={{ color: '#a8a49e' }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Visual + floating dashboard ──────── */}
          <div className="relative hidden lg:flex items-center justify-center" style={{ height: 520 }}>

            {/* Abstract orb background */}
            <AbstractOrb />

            {/* Central premium card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 12 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="card-white relative z-10"
              style={{
                width: 290,
                padding: '1.75rem',
                boxShadow: '0 12px 48px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-medium" style={{ color: '#a8a49e', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                  Premium Estimate
                </span>
                <span className="tag tag-green text-xs">Live</span>
              </div>

              <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: '2.4rem', color: '#111110', letterSpacing: '-0.03em', lineHeight: 1 }} className="mb-1">
                ₹18,450
              </p>
              <p className="text-xs mb-5" style={{ color: '#a8a49e' }}>Annual · Standard risk</p>

              {/* Sparkline */}
              <div className="mb-4">
                <p className="text-xs mb-2" style={{ color: '#d0cdc5' }}>Accuracy trend</p>
                <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="spGrad2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="#4375e5" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#7ca4f4" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points={pts}
                    fill="none"
                    stroke="url(#spGrad2)"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Factor bars */}
              <div className="space-y-2.5">
                {[
                  { label: 'Age factor',  pct: 62, c: 'linear-gradient(90deg,#4375e5,#7ca4f4)' },
                  { label: 'Income band', pct: 78, c: 'linear-gradient(90deg,#9b8af4,#7ca4f4)' },
                  { label: 'BMI index',   pct: 44, c: '#e8e5e0' },
                ].map(({ label, pct, c }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs" style={{ color: '#a8a49e' }}>{label}</span>
                      <span className="text-xs data-mono" style={{ color: '#c0bdb7' }}>{pct}%</span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: '#f0eeea' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.9, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                        className="h-1 rounded-full"
                        style={{ background: c }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 mt-4 pt-4" style={{ borderTop: '1px solid #f0eeea' }}>
                <span className="live-dot" />
                <span className="text-xs" style={{ color: '#a8a49e' }}>94.2% confidence</span>
              </div>
            </motion.div>

            {/* Floating micro widgets */}
            <Widget delay={0.48} style={{ top: 22, left: -18, padding: '0.875rem 1.1rem', minWidth: 148 }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(67,117,229,0.09)' }}>
                  <Brain size={13} color="#4375e5" />
                </div>
                <div>
                  <p className="text-xs" style={{ color: '#a8a49e' }}>Accuracy</p>
                  <p className="text-sm font-semibold data-mono" style={{ color: '#4375e5' }}>94.2%</p>
                </div>
              </div>
            </Widget>

            <Widget delay={0.62} style={{ top: 36, right: -22, padding: '0.875rem 1.1rem', minWidth: 145 }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(232,112,90,0.09)' }}>
                  <Zap size={13} color="#e8705a" />
                </div>
                <div>
                  <p className="text-xs" style={{ color: '#a8a49e' }}>Latency</p>
                  <p className="text-sm font-semibold data-mono" style={{ color: '#e8705a' }}>112ms</p>
                </div>
              </div>
            </Widget>

            <Widget delay={0.76} style={{ bottom: 52, left: -8, padding: '0.875rem 1.1rem', minWidth: 150 }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(22,163,74,0.09)' }}>
                  <Shield size={13} color="#16a34a" />
                </div>
                <div>
                  <p className="text-xs" style={{ color: '#a8a49e' }}>Risk</p>
                  <p className="text-sm font-semibold" style={{ color: '#16a34a' }}>Standard</p>
                </div>
              </div>
            </Widget>

            <Widget delay={0.9} style={{ bottom: 58, right: -18, padding: '0.875rem 1.1rem', minWidth: 148 }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(155,138,244,0.09)' }}>
                  <TrendingUp size={13} color="#9b8af4" />
                </div>
                <div>
                  <p className="text-xs" style={{ color: '#a8a49e' }}>Predictions</p>
                  <p className="text-sm font-semibold data-mono" style={{ color: '#9b8af4' }}>50K+</p>
                </div>
              </div>
            </Widget>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, rgba(67,117,229,0.35), transparent)' }}
        />
        <span className="text-xs" style={{ color: '#c0bdb7', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
      </motion.div>
    </section>
  );
}
