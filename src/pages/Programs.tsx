import { AnimatedSection } from '../components/AnimatedSection';
import { Monitor, Dumbbell, Salad, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const programs = [
  {
    icon: Monitor,
    title: 'Online / Offline Weight Loss',
    description:
      'Our comprehensive weight loss program combines the flexibility of online coaching with the accountability of in-person sessions. Every client receives a personalized plan based on their body composition, lifestyle, and goals. We use evidence-based methods including caloric deficit planning, macro tracking, habit formation, and weekly progress reviews.',
    image: 'https://images.pexels.com/photos/416754/pexels-photo-416754.jpeg?auto=compress&w=800',
    features: ['Custom meal plans', 'Weekly progress tracking', 'Online support group', 'Monthly body analysis'],
  },
  {
    icon: Dumbbell,
    title: 'Personal Trainer',
    description:
      'Work directly with certified fitness professionals who design every workout specifically for you. Our personal training sessions focus on form, progression, and results. We assess your movement patterns, identify limitations, and build a program that makes you stronger and more confident.',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&w=800',
    features: ['1-on-1 coaching', 'Form correction', 'Progressive overload', 'Flexible scheduling'],
  },
  {
    icon: Salad,
    title: 'Personal Diet Plan',
    description:
      'Nutrition is the foundation of transformation. Our registered nutritionists create detailed meal plans that consider your preferences, allergies, cultural food habits, and metabolic profile. We teach sustainable eating patterns that you can maintain for life.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=800',
    features: ['Macro-balanced meals', 'Recipe library', 'Grocery guides', 'Monthly adjustments'],
  },
];

export default function Programs() {
  return (
    <div className="pt-24 pb-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Programs</h1>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Premium wellness services designed to deliver measurable results. Choose the path that fits your goals.
          </p>
        </AnimatedSection>

        <div className="flex flex-col gap-16">
          {programs.map((p, i) => (
            <AnimatedSection
              key={i}
              className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'md:grid-flow-dense' : ''}`}
            >
              <div className={i % 2 === 1 ? 'md:col-start-2' : ''}>
                <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center mb-5">
                  <p.icon size={24} className="text-mint" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{p.title}</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{p.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {p.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-mint" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="btn-primary">
                  Enquire Now <ArrowRight size={14} />
                </Link>
              </div>
              <div className={`rounded-2xl overflow-hidden h-72 border border-white/10 ${i % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}`}>
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
