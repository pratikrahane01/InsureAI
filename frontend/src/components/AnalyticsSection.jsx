import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Users, Activity } from 'lucide-react';

function HBar({ data, active, accentColor = '#4375e5' }) {
  return (
    <div className="space-y-3">
      {data.map(({ label, value, pct }, i) => (
        <div key={label}>
          <div className="flex justify-between mb-1.5">
            <span className="text-xs" style={{ color: '#78746f' }}>{label}</span>
            <span className="text-xs data-mono font-medium" style={{ color: '#44403c' }}>
              ₹{value.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: '#f0eeea' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={active ? { width: `${pct}%` } : {}}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-1.5 rounded-full"
              style={{
                background: i === 0
                  ? `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`
                  : '#d4d0cb',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Donut({ pct, size = 120, color = '#4375e5', label = '', active }) {
  const R = (size / 2) * 0.75;
  const circ = 2 * Math.PI * R;
  const filled = (pct / 100) * circ;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={R} fill="none" stroke="#f0eeea" strokeWidth="10" />
      <motion.circle
        cx={size/2} cy={size/2} r={R}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circ}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: `${size/2}px ${size/2}px` }}
        initial={{ strokeDasharray: `0 ${circ}` }}
        animate={active ? { strokeDasharray: `${filled} ${circ}` } : {}}
        transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <text x={size/2} y={size/2 - 5} textAnchor="middle" fontFamily='"DM Serif Display", serif' fontSize={size * 0.18} fill="#111110">{pct}%</text>
      <text x={size/2} y={size/2 + 14} textAnchor="middle" fontSize={size * 0.085} fill="#a8a49e" letterSpacing="1">{label}</text>
    </svg>
  );
}

function Spark({ data, color = '#4375e5', active }) {
  const max = Math.max(...data), min = Math.min(...data);
  const W = 130, H = 44;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / (max - min || 1)) * H * 0.8 - 4}`).join(' ');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      {active && (
        <polyline
          points={pts}
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 500, strokeDashoffset: 500, animation: active ? 'dashDraw 1.4s ease forwards 0.3s' : 'none' }}
        />
      )}
    </svg>
  );
}

const AGE_DATA = [
  { label: '18–25', value: 12400, pct: 44 },
  { label: '26–35', value: 18600, pct: 66 },
  { label: '36–45', value: 26300, pct: 93 },
  { label: '46–55', value: 28100, pct: 100 },
  { label: '55+',   value: 24700, pct: 88  },
];
const OCC_DATA = [
  { label: 'Doctor',     value: 31200, pct: 100 },
  { label: 'Engineer',   value: 21400, pct: 69  },
  { label: 'Business',   value: 25600, pct: 82  },
  { label: 'Govt. Emp.', value: 17800, pct: 57  },
  { label: 'Freelancer', value: 19300, pct: 62  },
];
const SPARK_CITY   = [8400,10200,9600,12800,14200,13400,16200,15600,18400,19200,21400,20800];
const SPARK_SMOKER = [14200,15400,16800,16200,18400,19600,21200,22800,24600,26400,28200,31400];

export default function AnalyticsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="analytics" ref={ref} className="page-section" style={{ background: '#f7f5f1' }}>
      <div className="max-w-6xl mx-auto">
        <div className="section-header centered mb-16">
          <motion.p initial={{ opacity:0,y:10 }} animate={inView?{opacity:1,y:0}:{}} className="eyebrow flex justify-center">
            Market insights
          </motion.p>
          <motion.h2 initial={{ opacity:0,y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.08, duration:0.65, ease:[0.16,1,0.3,1] }} className="h-section">
            Premium benchmarks,<br />beautifully visualized.
          </motion.h2>
          <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.18 }} className="body-large mt-4">
            Understand how demographics drive insurance pricing across our dataset.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Age bar — 2 cols */}
          <motion.div
            initial={{ opacity:0,y:18 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.1,duration:0.6 }}
            className="card-white lg:col-span-2 p-7"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-semibold text-sm mb-0.5" style={{ color:'#111110' }}>Premium by Age Group</p>
                <p className="text-xs" style={{ color:'#a8a49e' }}>Average annual premium · INR</p>
              </div>
              <TrendingUp size={16} color="#4375e5" />
            </div>
            <HBar data={AGE_DATA} active={inView} />
          </motion.div>

          {/* Accuracy donut */}
          <motion.div
            initial={{ opacity:0,y:18 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.18,duration:0.6 }}
            className="card-white p-7 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-full">
              <p className="font-semibold text-sm mb-0.5" style={{ color:'#111110' }}>Model Accuracy</p>
              <p className="text-xs" style={{ color:'#a8a49e' }}>Held-out test set</p>
            </div>
            <Donut pct={94} label="ACCURACY" color="#4375e5" active={inView} />
            <div className="w-full grid grid-cols-2 gap-3">
              {[
                { l:'5-fold CV',   v:'✓', c:'#22c55e' },
                { l:'Train size',  v:'10K+', c:'#4375e5' },
                { l:'Features',    v:'7',  c:'#6d46ea' },
                { l:'Estimators',  v:'200', c:'#e8705a' },
              ].map(({ l, v, c }) => (
                <div key={l} className="p-2.5 rounded-lg text-center" style={{ background:'#f7f5f1' }}>
                  <p className="text-xs" style={{ color:'#a8a49e' }}>{l}</p>
                  <p className="text-sm font-semibold data-mono mt-0.5" style={{ color:c }}>{v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Occupation */}
          <motion.div
            initial={{ opacity:0,y:18 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.22,duration:0.6 }}
            className="card-white p-7"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-semibold text-sm mb-0.5" style={{ color:'#111110' }}>By Occupation</p>
                <p className="text-xs" style={{ color:'#a8a49e' }}>Annual avg · INR</p>
              </div>
              <Users size={16} color="#6d46ea" />
            </div>
            <HBar data={OCC_DATA} active={inView} accentColor="#6d46ea" />
          </motion.div>

          {/* City sparkline */}
          <motion.div
            initial={{ opacity:0,y:18 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.28,duration:0.6 }}
            className="card-white p-7"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-sm mb-0.5" style={{ color:'#111110' }}>Urban Trend</p>
                <p className="text-xs" style={{ color:'#a8a49e' }}>Metro cities · 12mo</p>
              </div>
              <Activity size={16} color="#4375e5" />
            </div>
            <Spark data={SPARK_CITY} active={inView} />
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-light" style={{ fontFamily:'"DM Serif Display",serif', color:'#111110', letterSpacing:'-0.03em' }}>+22.4%</span>
              <span className="text-xs" style={{ color:'#a8a49e' }}>YoY growth</span>
            </div>
          </motion.div>

          {/* Smoker sparkline */}
          <motion.div
            initial={{ opacity:0,y:18 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.34,duration:0.6 }}
            className="card-white p-7"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-sm mb-0.5" style={{ color:'#111110' }}>Smoker Premium</p>
                <p className="text-xs" style={{ color:'#a8a49e' }}>Risk-adjusted · 12mo</p>
              </div>
              <Activity size={16} color="#e8705a" />
            </div>
            <Spark data={SPARK_SMOKER} color="#e8705a" active={inView} />
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-light" style={{ fontFamily:'"DM Serif Display",serif', color:'#111110', letterSpacing:'-0.03em' }}>2.4×</span>
              <span className="text-xs" style={{ color:'#a8a49e' }}>vs non-smoker</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
