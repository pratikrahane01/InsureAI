import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const STEPS = [
  { n:'01', title:'Enter Profile',    desc:'Age, weight, height, income, smoking status, city, and occupation.' },
  { n:'02', title:'Model Inference',  desc:'Gradient Boosting processes your inputs through trained decision trees.' },
  { n:'03', title:'Risk Scoring',     desc:'Each factor is weighted to produce an individualized risk classification.' },
  { n:'04', title:'Premium Returned', desc:'Personalized annual premium delivered in under 150ms via REST API.' },
];

export default function HowItWorksSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="page-section bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="section-header centered mb-16">
          <motion.p initial={{ opacity:0,y:10 }} animate={inView?{opacity:1,y:0}:{}} className="eyebrow flex justify-center">
            How it works
          </motion.p>
          <motion.h2 initial={{ opacity:0,y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.08,duration:0.65,ease:[0.16,1,0.3,1] }} className="h-section">
            From profile to premium<br />in four simple steps.
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connector */}
          <div className="hidden lg:block absolute h-px" style={{ background:'#f0eeea', top:'1.75rem', left:'calc(12.5% + 1.75rem)', right:'calc(12.5% + 1.75rem)' }}>
            <motion.div
              initial={{ scaleX:0 }} animate={inView?{scaleX:1}:{}}
              transition={{ delay:0.5, duration:1.2, ease:[0.16,1,0.3,1] }}
              style={{ width:'100%', height:'100%', background:'linear-gradient(90deg, #4375e5, #7ca4f4)', transformOrigin:'left', opacity:0.35 }}
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {STEPS.map(({ n, title, desc }, i) => (
              <motion.div
                key={n}
                initial={{ opacity:0, y:20 }}
                animate={inView?{opacity:1,y:0}:{}}
                transition={{ delay:0.12+i*0.1, duration:0.65, ease:[0.16,1,0.3,1] }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative z-10"
                  style={{ background:'#fff', border:'1.5px solid rgba(67,117,229,0.15)', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}
                >
                  <span className="text-sm font-bold data-mono" style={{ color:'#4375e5' }}>{n}</span>
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ color:'#111110', letterSpacing:'-0.01em' }}>{title}</h3>
                <p className="body-base">{desc}</p>
                {i < 3 && (
                  <div className="lg:hidden w-px h-6 mt-4 ml-7" style={{ background:'rgba(67,117,229,0.2)' }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.8 }}
          className="ornament-line mt-16 text-xs"
        >
          Full ML pipeline · Python · Scikit-learn · FastAPI · React
        </motion.div>
      </div>
    </section>
  );
}
