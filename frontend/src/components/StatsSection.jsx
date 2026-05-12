import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const STATS = [
  { end: 50000, suffix: '+', label: 'Predictions Made',  note: 'and growing'      },
  { end: 94,    suffix: '%', label: 'Model Accuracy',     note: 'Gradient Boosting' },
  { end: 7,     suffix: '',  label: 'Input Features',     note: 'multi-variate'    },
  { end: 112,   suffix: 'ms',label: 'Avg. API Latency',   note: 'p95 response'     },
];

function Counter({ end, suffix, active }) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!active) return;
    const dur = 1400;
    const t0  = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * end));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [active, end]);

  return <><span className="data-mono">{val.toLocaleString()}</span>{suffix}</>;
}

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="bg-white py-0">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
        >
          {STATS.map(({ end, suffix, label, note }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              className="flex flex-col items-center text-center py-10 px-4"
              style={{
                borderRight: i < 3 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.06)' : 'none',
              }}
            >
              <p
                className="text-4xl lg:text-5xl font-light mb-1.5"
                style={{ fontFamily: '"DM Serif Display", serif', color: '#111110', letterSpacing: '-0.03em' }}
              >
                <Counter end={end} suffix={suffix} active={inView} />
              </p>
              <p className="text-sm font-medium mb-0.5" style={{ color: '#44403c' }}>{label}</p>
              <p className="text-xs" style={{ color: '#c0bdb7', letterSpacing: '0.04em' }}>{note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
