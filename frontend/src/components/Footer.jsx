import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ExternalLink } from 'lucide-react';

const LINKS = [
  { title:'Platform', items:[
    { l:'Prediction API', h:'#prediction' },
    { l:'Analytics',      h:'#analytics'  },
    { l:'Features',       h:'#features'   },
    { l:'How It Works',   h:'#home'        },
  ]},
  { title:'Resources', items:[
    { l:'FastAPI Docs',   h:'https://insureai-iku3.onrender.com/docs', ext:true },
    { l:'Scikit-learn',   h:'https://scikit-learn.org',  ext:true },
    { l:'Framer Motion',  h:'https://www.framer.com/motion/', ext:true },
    { l:'Vite',           h:'https://vitejs.dev',        ext:true },
  ]},
];

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <footer ref={ref} style={{ background:'#f5f4f0', borderTop:'1px solid rgba(0,0,0,0.06)' }}>
      {/* CTA Banner */}
      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={inView?{opacity:1,y:0}:{}}
        transition={{ duration:0.75, ease:[0.16,1,0.3,1] }}
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <div
          className="rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background:'linear-gradient(135deg, rgba(67,117,229,0.05) 0%, rgba(124,164,244,0.08) 50%, rgba(232,112,90,0.04) 100%)',
            border:'1px solid rgba(67,117,229,0.1)',
          }}
        >
          {/* Soft bg blobs */}
          <div style={{ position:'absolute', top:'-30%', left:'10%', width:300, height:200, background:'radial-gradient(ellipse, rgba(67,117,229,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:'-20%', right:'10%', width:250, height:180, background:'radial-gradient(ellipse, rgba(232,112,90,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />

          <p className="eyebrow justify-center flex mb-4">Get started now</p>
          <h2 className="h-section mb-5">
            Your premium estimate<br />is one click away.
          </h2>
          <p className="body-large mb-8 max-w-md mx-auto">
            No sign-up. No waiting. Enter your profile and get a personalized insurance premium estimate instantly.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#prediction" className="btn-sky">
              Calculate Premium <ArrowRight size={15} />
            </a>
            <a href="https://insureai-iku3.onrender.com/docs" target="_blank" rel="noreferrer" className="btn-outline">
              API Docs <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-3 gap-10 py-10" style={{ borderTop:'1px solid rgba(0,0,0,0.06)' }}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'linear-gradient(135deg,#4375e5,#6b96f5)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L13 5V11L8 14L3 11V5L8 2Z" fill="white" fillOpacity="0.9" />
                  <path d="M8 5L10.6 6.5V9.5L8 11L5.4 9.5V6.5L8 5Z" fill="white" />
                </svg>
              </div>
              <span className="font-semibold text-sm" style={{ color:'#111110', letterSpacing:'-0.02em' }}>InsureAI</span>
            </div>
            <p className="body-base max-w-xs mb-4">
              Machine learning meets actuarial science. Personalized premium predictions in milliseconds.
            </p>
            <div className="flex items-center gap-1.5 text-xs" style={{ color:'#a8a49e' }}>
              <span className="live-dot" />
              API operational · v1.0.0
            </div>
          </div>

          {LINKS.map(({ title, items }) => (
            <div key={title}>
              <p className="text-xs font-semibold mb-4" style={{ color:'#a8a49e', letterSpacing:'0.1em', textTransform:'uppercase' }}>{title}</p>
              <ul className="space-y-2.5">
                {items.map(({ l, h, ext }) => (
                  <li key={l}>
                    <a href={h} target={ext?'_blank':undefined} rel={ext?'noreferrer':undefined}
                      className="text-sm inline-flex items-center gap-1 transition-colors"
                      style={{ color:'#78746f' }}
                      onMouseEnter={e => e.currentTarget.style.color='#111110'}
                      onMouseLeave={e => e.currentTarget.style.color='#78746f'}
                    >
                      {l}{ext && <ExternalLink size={10} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6" style={{ borderTop:'1px solid rgba(0,0,0,0.05)' }}>
          <p className="text-xs" style={{ color:'#c0bdb7' }}>© 2025 InsureAI · Built as a portfolio ML project.</p>
          <p className="text-xs" style={{ color:'#c0bdb7' }}>React · FastAPI · Scikit-learn · Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
