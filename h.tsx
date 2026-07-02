import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import { Monitor, Dumbbell, Salad, ChevronRight, Star, MessageCircle, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useResults } from '../hooks/useResults';
import { useTestimonials } from '../hooks/useTestimonials';
import { useCourses } from '../hooks/useCourses';

const programs = [
  {
    icon: Monitor,
    title: 'Online / Offline Weight Loss',
    desc: 'A structured, science-backed program combining online sessions and in-person support to help you lose weight sustainably and keep it off.',
  },
  {
    icon: Dumbbell,
    title: 'Personal Trainer',
    desc: 'One-on-one training sessions tailored to your fitness level, goals, and schedule. Get dedicated attention from certified professionals.',
  },
  {
    icon: Salad,
    title: 'Personal Diet Plan',
    desc: 'Customized nutrition plans designed around your body type, preferences, and lifestyle to fuel your transformation journey.',
  },
];

export default function Home() {
  const { settings } = useSettings();
  const { results } = useResults(3);
  const { testimonials } = useTestimonials(3);
  const { courses } = useCourses();
  const hasCourses = courses.length > 0;
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    console.log("Results:", results);
    if (results.length > 0) {
      console.log("First Result:", results[0]);
    }
  }, [results]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="bg-dark-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">

      

       {/* Background Image */}
       <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')] bg-cover bg-center opacity-18 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-emerald-900/50 to-transparent" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse-slow animate-delay-200" />

{/* Dark Gradient Overlay */}
<div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 via-dark-900/70 to-dark-900/40" />

{/* Glow Effects */}
<div className="absolute top-20 right-20 w-96 h-96 bg-mint/10 rounded-full blur-3xl" />

<div className="absolute bottom-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        
        {/* Floating particles decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-mint/30 animate-float" />
          <div className="absolute top-40 right-20 w-1.5 h-1.5 rounded-full bg-emerald/30 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/4 w-2 h-2 rounded-full bg-mint/20 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-emerald/40 animate-float" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-slide-up">
            {/* Welcome tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-700/60 border border-mint/20 text-mint text-sm font-medium mb-6">
              <Sparkles size={16} />
              Welcome to Pragati Wellness Centre!
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
              A Step Towards<br />
              Your Healthy Lifestyle
            </h1>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
              Pragati Wellness Centre offers personalized fitness coaching, nutrition guidance, and dedicated support to help you achieve lasting results.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-mint">99.9%</p>
                <p className="text-xs text-white/50 mt-1">Health Score</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">1000+</p>
                <p className="text-xs text-white/50 mt-1">Wellness</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-xs text-white/50 mt-1">Yoga Centers</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={settings?.whatsapp_number ? `https://wa.me/${settings.whatsapp_number}` : '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={16} />
                Enquire/Join Now
              </a>
              <Link to="/programs" className="btn-secondary">
                Our Programs
              </Link>
            </div>
          </div>

          {/* Right content - Floating cards */}
          <div className="relative hidden md:block h-[500px]">
            {/* Main card - Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 z-20 animate-float-card">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/40 bg-dark-700 border border-white/10">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/3822169/pexels-photo-3822169.jpeg?auto=compress&w=600"
                    alt="Wellness"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-mint flex items-center justify-center">
                        <Star size={14} className="text-dark-900" />
                      </div>
                      <span className="text-white text-sm font-medium">Premium Wellness</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-dark-700">
                  <p className="text-white text-sm font-medium">Change your body</p>
                  <p className="text-white/50 text-xs mt-1">Change your life</p>
                </div>
              </div>
            </div>

            {/* Floating card - Top left */}
            <div className="absolute top-4 left-4 w-44 z-10 animate-float-card-reverse" style={{ animationDelay: '1s' }}>
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/30 bg-dark-600 border border-white/10">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&w=400"
                    alt="Fitness"
                    className="w-full h-28 object-cover"
                  />
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-mint flex items-center justify-center">
                    <Star size={12} className="text-dark-900" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-white text-xs font-medium">Change your health</p>
                </div>
              </div>
            </div>

            {/* Floating card - Bottom right */}
            <div className="absolute bottom-8 right-0 w-48 z-10 animate-float-card" style={{ animationDelay: '2s' }}>
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-black/30 bg-dark-600 border border-white/10">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=400"
                    alt="Nutrition"
                    className="w-full h-28 object-cover"
                  />
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-mint flex items-center justify-center">
                    <Star size={12} className="text-dark-900" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-white text-xs font-medium">Personalized Diet</p>
                </div>
              </div>
            </div>

            {/* Glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-mint/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="section-title mb-3">Our Programs</h2>
            <p className="section-subtitle">
              Premium wellness programs tailored to your unique goals.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <AnimatedSection key={i} className="card-glass p-6 hover:border-mint/30 hover:shadow-lg hover:shadow-mint/10 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center mb-5 group-hover:bg-dark-600 transition-colors">
                  <p.icon size={22} className="text-mint" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{p.desc}</p>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-1 text-sm font-medium text-mint hover:gap-2 transition-all"
                >
                  Learn More <ChevronRight size={14} />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding py-24 bg-emerald-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="section-title mb-3">Success Stories</h2>
            <p className="section-subtitle">Real transformations from real clients.</p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-6">
            {results.map((r) => (
              <AnimatedSection key={r.id} className="card-glass overflow-hidden hover:shadow-lg hover:shadow-mint/10 transition-all duration-300">
                <div className="grid grid-cols-2 h-44">
                  <div className="relative bg-dark-700">
                    {r.before_image ? (
                      <img src={r.before_image} alt="Before" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-dark-700">
                        <span className="text-xs text-white/30 font-medium">Before</span>
                      </div>
                    )}
                    <span className="absolute bottom-2 left-2 bg-dark-900/90 px-2 py-0.5 rounded-md text-xs font-medium text-white/70">Before</span>
                  </div>
                  <div className="relative bg-dark-700">
                    {r.after_image ? (
                      <img src={r.after_image} alt="After" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-dark-700">
                        <span className="text-xs text-white/30 font-medium">After</span>
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 bg-mint/90 px-2 py-0.5 rounded-md text-xs font-medium text-dark-900">After</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm font-semibold text-white">{r.client_name}</p>
                  <div className="flex items-center gap-3 mt-2">
                    {r.weight_lost && (
                      <span className="text-xs bg-dark-700 text-mint px-2 py-1 rounded-md font-medium">{r.weight_lost}</span>
                    )}
                    {r.duration && (
                      <span className="text-xs text-white/40">{r.duration}</span>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/results" className="btn-secondary">
              View All Results <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="section-title mb-3">Online Courses</h2>
            <p className="section-subtitle">Learn from anywhere, at your own pace.</p>
          </AnimatedSection>
          {hasCourses ? (
            <div className="grid md:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((c) => (
                <AnimatedSection key={c.id} className="card-glass overflow-hidden hover:shadow-lg hover:shadow-mint/10 transition-all duration-300">
                  <div className="h-44 bg-dark-700 relative">
                    {c.thumbnail ? (
                      <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-700 to-dark-800">
                        <BookOpen size={32} className="text-white/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-white mb-1">{c.title}</h3>
                    <p className="text-sm text-white/50 line-clamp-2 mb-3">{c.description}</p>
                    <Link to={`/courses/${c.id}`} className="text-sm font-medium text-mint hover:underline">
                      View Course
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection className="flex flex-col items-center py-16">
              <div className="w-20 h-20 rounded-2xl bg-dark-700 flex items-center justify-center mb-5">
                <BookOpen size={32} className="text-mint/30" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No Courses Available Yet</h3>
              <p className="text-sm text-white/50 text-center max-w-sm">
                Upcoming wellness courses will be added soon. Stay tuned!
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="section-title mb-3">What Our Clients Say</h2>
            <p className="section-subtitle">Honest feedback from people who transformed with us.</p>
          </AnimatedSection>
          {testimonials.length > 0 ? (
            <div className="relative max-w-2xl mx-auto">
              <div className="card-glass p-8 text-center">
                <div className="flex items-center justify-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < (testimonials[activeTestimonial]?.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}
                    />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                  "{testimonials[activeTestimonial]?.review_text}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  {testimonials[activeTestimonial]?.customer_photo ? (
                    <img src={testimonials[activeTestimonial].customer_photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-mint font-semibold text-sm">
                      {testimonials[activeTestimonial]?.customer_name?.[0] || 'C'}
                    </div>
                  )}
                  <p className="text-sm font-semibold text-white">{testimonials[activeTestimonial]?.customer_name}</p>
                </div>
              </div>
              {testimonials.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`h-2 rounded-full transition-all ${i === activeTestimonial ? 'bg-mint w-6' : 'bg-white/20 w-2'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-sm text-white/30 py-8">No testimonials yet.</div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <h2 className="section-title mb-3">Get In Touch</h2>
            <p className="section-subtitle">Ready to start your journey? Contact us today.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-10">
            <AnimatedSection className="card-glass p-8">
              <div className="flex flex-col gap-5">
                {settings?.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-0.5">Address</p>
                      <p className="text-sm text-white">{settings.address}</p>
                    </div>
                  </div>
                )}
                {settings?.phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="text-sm text-white">{settings.phone}</p>
                    </div>
                  </div>
                )}
                {settings?.email && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-0.5">Email</p>
                      <p className="text-sm text-white">{settings.email}</p>
                    </div>
                  </div>
                )}
                {settings?.whatsapp_number && (
                  <a
                    href={`https://wa.me/${settings.whatsapp_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-dark-600 text-white text-sm font-medium border border-mint/30 hover:bg-dark-500 transition-colors mt-2 w-fit"
                  >
                    <MessageCircle size={16} className="text-mint" />
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            </AnimatedSection>
            <AnimatedSection className="rounded-2xl overflow-hidden border border-white/10 h-64 md:h-auto">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.196096091947!2d75.35237197478864!3d19.916139681469232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdbbd1f8ab79abf%3A0xc6d6e5484fa7f1fd!2sPRAGATI%20wellness%20centre!5e0!3m2!1sen!2sin!4v1782561336252!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              />
            </AnimatedSection>
            <div>
                <section><img src="https:" alt="" /></section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
