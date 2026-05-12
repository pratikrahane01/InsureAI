import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TECH = [
  { name:'Python',         role:'Backend',    color:'#4375e5', note:'Core ML + API language' },
  { name:'Scikit-learn',   role:'ML Engine',  color:'#e8705a', note:'Gradient Boosting model' },
  { name:'FastAPI',        role:'REST API',   color:'#6d46ea', note:'Async high-perf endpoints' },
  { name:'React',          role:'Frontend',   color:'#4375e5', note:'Component-driven UI' },
  { name:'Tailwind CSS',   role:'Styling',    color:'#0891b2', note:'Utility-first design system' },
  { name:'Framer Motion',  role:'Animation',  color:'#e8705a', note:'Production-grade motion' },
  { name:'Vite',           role:'Build Tool', color:'#6d46ea', note:'Lightning-fast HMR' },
  { name:'Axios',          role:'HTTP',       color:'#16a34a', note:'API request handling' },
];

export default function TechStackSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="page-section bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="section-header centered mb-16">
          <motion.p initial={{ opacity:0,y:10 }} animate={inView?{opacity:1,y:0}:{}} className="eyebrow flex justify-center">
            Technology
          </motion.p>
          <motion.h2 initial={{ opacity:0,y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.08,duration:0.65,ease:[0.16,1,0.3,1] }} className="h-section">
            Built on a modern,<br />proven stack.
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {TECH.map(({ name, role, color, note }, i) => (
            <motion.div
              key={name}
              initial={{ opacity:0, y:16 }}
              animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay:0.08+i*0.06, duration:0.55, ease:[0.16,1,0.3,1] }}
              className="card-white card-white-hover p-5"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center mb-3 text-xs font-bold"
                style={{ background:`${color}10`, color, border:`1px solid ${color}20` }}
              >
                {name.slice(0,1)}
              </div>
              <p className="text-sm font-semibold mb-0.5" style={{ color:'#111110', letterSpacing:'-0.01em' }}>{name}</p>
              <p className="text-xs mb-2" style={{ color:`${color}cc`, fontWeight:500 }}>{role}</p>
              <p className="text-xs leading-relaxed" style={{ color:'#a8a49e' }}>{note}</p>
            </motion.div>
          ))}
        </div>

        {/* Architecture pill */}
        <motion.div
          initial={{ opacity:0, y:12 }}
          animate={inView?{opacity:1,y:0}:{}}
          transition={{ delay:0.6,duration:0.6 }}
          className="mt-8 card-tinted p-4 flex flex-wrap items-center justify-center gap-2 text-xs"
          style={{ color:'#78746f' }}
        >
          {['React UI','→','Vite / Proxy','→','FastAPI','→','Scikit-learn','→','JSON Response'].map((item,i) => (
            <span
              key={i}
              className={item === '→' ? 'text-stone-300' : 'tag'}
              style={item === '→' ? {} : {}}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
