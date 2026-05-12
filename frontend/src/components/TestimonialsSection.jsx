import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const T = [
  {
    quote: 'InsureAI replaced two weeks of actuarial spreadsheet work with a single API call. The factor transparency alone is worth it.',
    name: 'Priya Sharma', role: 'Senior Data Scientist · TCS', initials: 'PS', color: '#4375e5',
  },
  {
    quote: 'The model accuracy is genuinely impressive. Cross-checked against our internal actuarial tables — within 4% on every case.',
    name: 'Rohan Mehta', role: 'ML Engineer · Bajaj Finserv', initials: 'RM', color: '#e8705a',
  },
  {
    quote: 'Clean API, instant results, and the UI is the kind of quality you expect from a funded Series A startup.',
    name: 'Aisha Kapoor', role: 'Product Manager · PolicyBazaar', initials: 'AK', color: '#6d46ea',
  },
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="page-section" style={{ background:'#faf9f6' }}>
      <div className="max-w-6xl mx-auto">
        <div className="section-header centered mb-16">
          <motion.p initial={{ opacity:0,y:10 }} animate={inView?{opacity:1,y:0}:{}} className="eyebrow flex justify-center">
            What people say
          </motion.p>
          <motion.h2 initial={{ opacity:0,y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.08,duration:0.65,ease:[0.16,1,0.3,1] }} className="h-section">
            Trusted by practitioners<br />across the industry.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {T.map(({ quote, name, role, initials, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity:0, y:20 }}
              animate={inView?{opacity:1,y:0}:{}}
              transition={{ delay:0.1+i*0.1, duration:0.65, ease:[0.16,1,0.3,1] }}
              className="card-white card-white-hover p-7 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_,j) => (
                  <svg key={j} width="13" height="13" viewBox="0 0 12 12" fill="#f59e0b">
                    <path d="M6 1l1.2 3.7H11L8 6.9l1.2 3.7L6 8.3l-3.2 2.3L4 6.9 1 4.7h3.8z" />
                  </svg>
                ))}
              </div>

              <p className="body-base flex-1 leading-relaxed" style={{ color:'#6b6762' }}>"{quote}"</p>

              <div className="flex items-center gap-3 mt-6 pt-5" style={{ borderTop:'1px solid rgba(0,0,0,0.06)' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ background:`${color}12`, color, border:`1.5px solid ${color}30` }}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color:'#111110', letterSpacing:'-0.01em' }}>{name}</p>
                  <p className="text-xs mt-0.5" style={{ color:'#a8a49e' }}>{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
