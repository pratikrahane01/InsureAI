import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  { q:'How accurate is the prediction model?', a:'Our Gradient Boosting model achieves 94.2% accuracy on held-out test data, validated through 5-fold cross-validation. It was trained on a curated dataset of real insurance records.' },
  { q:'Is my data stored or logged anywhere?', a:'No. The API is fully stateless. Your profile data is processed in memory and immediately discarded after the prediction is returned. Nothing is persisted.' },
  { q:'What factors affect the premium most?', a:'Smoking status has the highest impact (up to 2.4× multiplier), followed by BMI, age bracket, and city tier. Income and occupation provide secondary adjustments.' },
  { q:'Can I integrate this API into my own app?', a:'Yes. FastAPI exposes a standard REST endpoint at POST /predict with a simple JSON schema. Auto-generated OpenAPI docs are at /docs when the server is running.' },
  { q:'Which cities are supported?', a:'All major Indian metros: Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Lucknow, and more. City tier affects the risk coefficient.' },
  { q:'What technology powers the backend?', a:'The backend is FastAPI (Python) with a pre-trained Scikit-learn Gradient Boosting model serialized via joblib, running on Uvicorn with async request handling.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="page-section" style={{ background:'#faf9f6' }}>
      <div className="max-w-2xl mx-auto">
        <div className="section-header centered mb-14">
          <motion.p initial={{ opacity:0,y:10 }} animate={inView?{opacity:1,y:0}:{}} className="eyebrow flex justify-center">
            FAQs
          </motion.p>
          <motion.h2 initial={{ opacity:0,y:16 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.08,duration:0.65,ease:[0.16,1,0.3,1] }} className="h-section">
            Common questions,<br />honest answers.
          </motion.h2>
        </div>

        <div className="space-y-2">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity:0, y:14 }}
                animate={inView?{opacity:1,y:0}:{}}
                transition={{ delay:0.08+i*0.05, duration:0.55 }}
                className="card-white overflow-hidden"
                style={{ borderColor: isOpen ? 'rgba(67,117,229,0.2)' : 'rgba(0,0,0,0.06)', transition:'border-color 0.2s ease' }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-medium" style={{ color: isOpen ? '#111110' : '#44403c', letterSpacing:'-0.01em' }}>
                    {q}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background: isOpen ? 'rgba(67,117,229,0.08)' : '#f5f4f0',
                      border: `1px solid ${isOpen ? 'rgba(67,117,229,0.2)' : 'rgba(0,0,0,0.06)'}`,
                    }}
                  >
                    {isOpen ? <Minus size={12} color="#4375e5" /> : <Plus size={12} color="#a8a49e" />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:'auto', opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.28, ease:[0.4,0,0.2,1] }}
                    >
                      <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color:'#78746f', borderTop:'1px solid rgba(0,0,0,0.05)', paddingTop:'0.875rem' }}>
                        {a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
