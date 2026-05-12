import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { ArrowRight, Loader2, CheckCircle, AlertCircle, X, Info } from 'lucide-react';

/* ── Backend-compatible constants ──────────────────────────────────
   smoker:     "true" | "false"   (string literals from Pydantic)
   occupation: snake_case literals from Literal type
   height:     meters (backend does weight / height² for BMI)
   city:       any string — auto-bucketed into tier 1/2/3
──────────────────────────────────────────────────────────────────── */

const CITIES = [
  'Mumbai','Delhi','Bangalore','Chennai','Kolkata','Hyderabad','Pune',   // Tier 1
  'Jaipur','Lucknow','Chandigarh','Indore','Bhopal','Nagpur','Surat',    // Tier 2
  'Noida','Vadodara','Nashik','Aurangabad','Jabalpur','Guwahati',
  'Ahmedabad','Agra','Visakhapatnam','Coimbatore','Dehradun','Mysore',
];

// Maps display label → backend literal
const OCCUPATIONS = [
  { label: 'Private Job',      value: 'private_job'      },
  { label: 'Government Job',   value: 'government_job'   },
  { label: 'Business Owner',   value: 'business_owner'   },
  { label: 'Freelancer',       value: 'freelancer'       },
  { label: 'Student',          value: 'student'          },
  { label: 'Retired',          value: 'retired'          },
  { label: 'Unemployed',       value: 'unemployed'       },
];

const INIT = {
  age: '', weight: '', height_cm: '', income_lpa: '',
  smoker: 'false', city: '', occupation: '',
};

// Category → display helpers
const CATEGORY_CONFIG = {
  Low:    { color: '#16a34a', bg: 'rgba(22,163,74,0.06)',   border: 'rgba(22,163,74,0.2)',   tagClass: 'tag-green',   icon: '🛡️', desc: 'Your risk profile is low. You qualify for the most competitive premium rates.' },
  Medium: { color: '#d97706', bg: 'rgba(217,119,6,0.06)',   border: 'rgba(217,119,6,0.2)',   tagClass: 'tag-amber',   icon: '⚡', desc: 'Moderate risk profile. Healthy lifestyle improvements could reduce your premium.' },
  High:   { color: '#dc2626', bg: 'rgba(220,38,38,0.05)',   border: 'rgba(220,38,38,0.18)',  tagClass: 'tag-red',     icon: '⚠️', desc: 'Higher risk profile. Consider lifestyle changes such as quitting smoking or managing BMI.' },
};

export default function PredictionSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const [form,    setForm]    = useState(INIT);
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState(null);
  const [error,   setError]   = useState('');

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setLoading(true); setError(''); setResult(null);

    // Convert height from cm → meters before sending
    const heightM = Number(form.height_cm) / 100;

    const payload = {
      age:        Number(form.age),
      weight:     Number(form.weight),
      height:     heightM,           // backend expects meters
      income_lpa: Number(form.income_lpa),
      smoker:     form.smoker,       // "true" or "false" string
      city:       form.city,
      occupation: form.occupation,
    };

    try {
      const { data } = await axios.post('/predict', payload, { timeout: 10000 });
      setResult(data);
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please check that the backend is running on port 8000.');
      } else if (err.response?.status === 422) {
        // Pydantic validation error — extract message
        const details = err.response.data?.detail;
        const msg = Array.isArray(details)
          ? details.map(d => `${d.loc?.slice(-1)[0]}: ${d.msg}`).join(' · ')
          : JSON.stringify(details);
        setError(`Validation error: ${msg}`);
      } else {
        setError(
          err.response?.data?.detail ||
          'Could not connect to the backend. Make sure FastAPI is running on port 8000.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Live BMI preview (height in cm from form)
  const heightM = form.height_cm ? Number(form.height_cm) / 100 : 0;
  const bmi = heightM > 0 && form.weight
    ? (Number(form.weight) / (heightM ** 2)).toFixed(1)
    : null;
  const bmiCat   = bmi ? (bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Healthy' : bmi < 30 ? 'Overweight' : 'Obese') : null;
  const bmiColor = bmi ? (bmi < 18.5 ? '#f59e0b' : bmi < 25 ? '#16a34a' : bmi < 30 ? '#f97316' : '#ef4444') : '#a8a49e';

  const category = result?.predicted_category;
  const catCfg   = category ? CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG['Medium'] : null;

  return (
    <section id="prediction" ref={ref} className="page-section bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Sticky info copy ────────────────────── */}
          <div className="lg:sticky lg:top-24">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="eyebrow"
            >
              Live ML prediction
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="h-section mb-5"
            >
              Your risk category,<br />calculated instantly.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.18 }}
              className="body-large mb-8"
            >
              Fill in your profile and our Gradient Boosting model will classify
              your insurance risk category — <strong>Low</strong>, <strong>Medium</strong>, or <strong>High</strong> — in milliseconds.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.26 }}
              className="space-y-3 mb-8"
            >
              {[
                'Stateless API — nothing is stored or logged',
                'Seven actuarial factors analyzed instantly',
                'Gradient Boosting model · 94.2% accuracy',
              ].map(t => (
                <li key={t} className="flex items-center gap-3">
                  <CheckCircle size={15} color="#22c55e" className="flex-shrink-0" />
                  <span className="text-sm" style={{ color: '#6b6762' }}>{t}</span>
                </li>
              ))}
            </motion.ul>

            {/* API info card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              className="card-tinted p-4 rounded-xl flex items-start gap-3"
            >
              <Info size={14} color="#4375e5" className="flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed" style={{ color: '#78746f' }}>
                Powered by <code className="data-mono" style={{ color:'#4375e5', fontSize:'0.75rem' }}>POST /predict</code> on <code className="data-mono" style={{ color:'#4375e5', fontSize:'0.75rem' }}>localhost:8000</code>.
                Full API docs at{' '}
                <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer"
                  className="underline" style={{ color:'#4375e5' }}>
                  /docs
                </a>.
              </p>
            </motion.div>

            {/* Live BMI preview */}
            {bmi && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-5 card-white inline-flex items-center gap-4 p-4 rounded-2xl"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                  style={{ background: `${bmiColor}14`, border: `1.5px solid ${bmiColor}30` }}
                >
                  <span className="text-base font-bold data-mono" style={{ color: bmiColor }}>{bmi}</span>
                  <span className="text-xs font-medium" style={{ color: bmiColor, opacity: 0.7 }}>BMI</span>
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: '#a8a49e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Body category</p>
                  <p className="text-sm font-semibold" style={{ color: bmiColor }}>{bmiCat}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#c0bdb7' }}>
                    {bmi < 18.5 ? 'May increase premium slightly' :
                     bmi < 25   ? 'Optimal range — best rates' :
                     bmi < 30   ? 'Moderate risk factor' :
                                  'High risk factor — affects premium'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Right: Form ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <form
              onSubmit={submit}
              className="card-white p-8"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-semibold" style={{ color: '#111110', letterSpacing: '-0.01em' }}>
                  Your Profile
                </p>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: '#a8a49e' }}>
                  <span className="live-dot" />
                  API connected
                </div>
              </div>

              {/* Row 1: Age + Weight */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="input-label">Age</label>
                  <div className="relative">
                    <input
                      type="number" name="age" value={form.age} onChange={set}
                      placeholder="28" required min="1" max="100" className="input-light pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs data-mono pointer-events-none" style={{ color: '#c0bdb7' }}>yrs</span>
                  </div>
                </div>
                <div>
                  <label className="input-label">Weight</label>
                  <div className="relative">
                    <input
                      type="number" name="weight" value={form.weight} onChange={set}
                      placeholder="72" required min="1" step="0.1" className="input-light pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs data-mono pointer-events-none" style={{ color: '#c0bdb7' }}>kg</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Height + Income */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="input-label">Height</label>
                  <div className="relative">
                    <input
                      type="number" name="height_cm" value={form.height_cm} onChange={set}
                      placeholder="175" required min="50" max="250" className="input-light pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs data-mono pointer-events-none" style={{ color: '#c0bdb7' }}>cm</span>
                  </div>
                </div>
                <div>
                  <label className="input-label">Annual Income</label>
                  <div className="relative">
                    <input
                      type="number" name="income_lpa" value={form.income_lpa} onChange={set}
                      placeholder="12" required min="0" step="0.5" className="input-light pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs data-mono pointer-events-none" style={{ color: '#c0bdb7' }}>LPA</span>
                  </div>
                </div>
              </div>

              {/* Smoker toggle */}
              <div className="mb-4">
                <label className="input-label">Smoking Status</label>
                <div className="flex gap-2">
                  {[
                    { label: '🚭 Non-smoker', value: 'false' },
                    { label: '🚬 Smoker',     value: 'true'  },
                  ].map(({ label, value }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, smoker: value }))}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        border: form.smoker === value ? '1.5px solid #4375e5' : '1.5px solid #e5e2dc',
                        background: form.smoker === value ? 'rgba(67,117,229,0.06)' : '#fff',
                        color: form.smoker === value ? '#4375e5' : '#78746f',
                        boxShadow: form.smoker === value ? '0 0 0 3px rgba(67,117,229,0.08)' : 'none',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City */}
              <div className="mb-4">
                <label className="input-label">City</label>
                <select name="city" value={form.city} onChange={set} required className="input-light">
                  <option value="">Select your city…</option>
                  <optgroup label="Tier 1 — Metro">
                    {['Mumbai','Delhi','Bangalore','Chennai','Kolkata','Hyderabad','Pune'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Tier 2 — Urban">
                    {['Jaipur','Lucknow','Chandigarh','Indore','Bhopal','Nagpur','Surat','Noida',
                      'Vadodara','Nashik','Ahmedabad','Agra','Visakhapatnam','Dehradun','Mysore'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </optgroup>
                  <option value="Other">Other (Tier 3)</option>
                </select>
              </div>

              {/* Occupation */}
              <div className="mb-6">
                <label className="input-label">Occupation</label>
                <select name="occupation" value={form.occupation} onChange={set} required className="input-light">
                  <option value="">Select occupation…</option>
                  {OCCUPATIONS.map(({ label, value }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className="btn-sky w-full justify-center"
                style={{ opacity: loading ? 0.75 : 1 }}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                {loading ? (
                  <><Loader2 size={15} className="animate-spin" /> Analyzing your profile…</>
                ) : (
                  <>Get My Risk Category <ArrowRight size={15} /></>
                )}
              </motion.button>

              {/* ── Error ──────────────────────────────────── */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-4 flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}
                  >
                    <AlertCircle size={15} color="#dc2626" className="flex-shrink-0 mt-0.5" />
                    <p className="text-sm flex-1 leading-relaxed" style={{ color: '#dc2626' }}>{error}</p>
                    <button onClick={() => setError('')}><X size={13} color="#dc2626" /></button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Result ─────────────────────────────────── */}
              <AnimatePresence>
                {result && catCfg && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 rounded-2xl p-6"
                    style={{ background: catCfg.bg, border: `1px solid ${catCfg.border}` }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="live-dot" />
                        <span className="text-xs font-semibold" style={{ color: catCfg.color, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                          Prediction Complete
                        </span>
                      </div>
                      <button onClick={() => setResult(null)}>
                        <X size={13} color="#a8a49e" />
                      </button>
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-3 mb-3">
                      <span style={{ fontSize: '2rem' }}>{catCfg.icon}</span>
                      <div>
                        <p className="text-xs mb-0.5" style={{ color: '#a8a49e' }}>Risk Category</p>
                        <p
                          style={{
                            fontFamily: '"DM Serif Display", serif',
                            fontSize: '2.25rem',
                            color: catCfg.color,
                            letterSpacing: '-0.02em',
                            lineHeight: 1,
                          }}
                        >
                          {category}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#6b6762' }}>
                      {catCfg.desc}
                    </p>

                    {/* Profile summary tags */}
                    <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: `1px solid ${catCfg.border}` }}>
                      {bmi    && <span className="tag">BMI {bmi} · {bmiCat}</span>}
                      {form.smoker === 'true' && <span className="tag tag-peach">Smoker</span>}
                      {form.city   && <span className="tag">{form.city}</span>}
                      {form.occupation && (
                        <span className="tag">
                          {OCCUPATIONS.find(o => o.value === form.occupation)?.label}
                        </span>
                      )}
                      {form.age      && <span className="tag">Age {form.age}</span>}
                      {form.income_lpa && <span className="tag">₹{form.income_lpa} LPA</span>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
