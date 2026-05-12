import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Zap, Activity, BarChart2, Lock, Globe } from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: 'ML-Powered Predictions',
    desc: 'Gradient Boosting model trained on thousands of real insurance records with cross-validated actuarial accuracy.',
    tag: 'tag-sky',
    tagText: 'Scikit-learn',
    accent: '#4375e5',
    accentBg: 'rgba(67,117,229,0.06)',
    size: 'large',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    desc: 'FastAPI delivers predictions in under 150ms. No queues, no delays.',
    tag: 'tag-peach',
    tagText: 'FastAPI',
    accent: '#e8705a',
    accentBg: 'rgba(232,112,90,0.06)',
    size: 'small',
  },
  {
    icon: Activity,
    title: 'Multi-Factor Analysis',
    desc: 'Seven actuarial inputs: age, BMI, smoking, city tier, income, occupation.',
    tag: 'tag-lavender',
    tagText: '7 factors',
    accent: '#6d46ea',
    accentBg: 'rgba(109,70,234,0.06)',
    size: 'small',
  },
  {
    icon: Lock,
    title: 'Fully Private',
    desc: 'Completely stateless API. No data persisted, no logs, no tracking. Your profile is yours.',
    tag: 'tag-green',
    tagText: 'Stateless',
    accent: '#16a34a',
    accentBg: 'rgba(22,163,74,0.06)',
    size: 'small',
  },
  {
    icon: BarChart2,
    title: 'Visual Analytics',
    desc: 'Interactive premium charts across demographics, occupations, and cities.',
    tag: 'tag-sky',
    tagText: 'React SVG',
    accent: '#4375e5',
    accentBg: 'rgba(67,117,229,0.06)',
    size: 'small',
  },
  {
    icon: Globe,
    title: 'City-Aware Pricing',
    desc: 'Metro, semi-urban, and rural tiers reflect real healthcare cost differentials across India.',
    tag: 'tag-peach',
    tagText: 'Geo-adjusted',
    accent: '#e8705a',
    accentBg: 'rgba(232,112,90,0.06)',
    size: 'small',
  },
];

export default function FeaturesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="features" className="page-section bg-soft" style={{ background: '#faf9f6' }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="section-header centered mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="eyebrow justify-center flex"
          >
            What we offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="h-section"
          >
            Accuracy you can trust.<br />Simplicity you'll love.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.18 }}
            className="body-large mt-4"
          >
            A full-stack ML pipeline built for precision, transparency, and speed.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Large featured card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 card-white card-white-hover p-8"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: FEATURES[0].accentBg }}
            >
              <Brain size={20} color={FEATURES[0].accent} strokeWidth={1.75} />
            </div>
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <h3 className="h-card">{FEATURES[0].title}</h3>
              <span className={`tag ${FEATURES[0].tag}`}>{FEATURES[0].tagText}</span>
            </div>
            <p className="body-large max-w-md">{FEATURES[0].desc}</p>

            {/* Mini visual: accuracy bar */}
            <div className="mt-8 p-5 rounded-xl" style={{ background: '#f7f5f1' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium" style={{ color: '#a8a49e', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Model performance</span>
                <span className="text-sm font-semibold data-mono" style={{ color: '#4375e5' }}>94.2%</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: '#e8e5e0' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: '94.2%' } : {}}
                  transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-2 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #4375e5, #7ca4f4)' }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs" style={{ color: '#c0bdb7' }}>
                <span>5-fold cross-validation</span>
                <span>Gradient Boosting</span>
              </div>
            </div>
          </motion.div>

          {/* Small cards — column 3 rows 1+2 */}
          <div className="flex flex-col gap-4">
            {FEATURES.slice(1, 3).map(({ icon: Icon, title, desc, tag, tagText, accent, accentBg }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="card-white card-white-hover p-6 flex-1"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accentBg }}>
                  <Icon size={17} color={accent} strokeWidth={1.75} />
                </div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-base font-semibold tracking-tight" style={{ color: '#111110', letterSpacing: '-0.01em' }}>{title}</h3>
                  <span className={`tag ${tag}`}>{tagText}</span>
                </div>
                <p className="body-base">{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom 3 cards */}
          {FEATURES.slice(3).map(({ icon: Icon, title, desc, tag, tagText, accent, accentBg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.07, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="card-white card-white-hover p-6"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: accentBg }}>
                <Icon size={17} color={accent} strokeWidth={1.75} />
              </div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-base font-semibold tracking-tight" style={{ color: '#111110', letterSpacing: '-0.01em' }}>{title}</h3>
                <span className={`tag ${tag}`}>{tagText}</span>
              </div>
              <p className="body-base">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
