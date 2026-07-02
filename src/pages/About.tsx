import { AnimatedSection } from '../components/AnimatedSection';
import { Award, Heart, Target, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">About Pragati</h1>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            A wellness centre built on the belief that every person deserves expert guidance to live their healthiest life.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden h-80 border border-white/10">
              <img
                src="https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg?auto=compress&w=800"
                alt="Coach"
                className="w-full h-full object-cover"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-white mb-4">Meet the Coach</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              With over a decade of experience in fitness coaching, nutrition science, and behavior change, our lead coach has helped hundreds of clients achieve sustainable transformations. The approach is simple: no shortcuts, no gimmicks, only proven methods tailored to each individual.
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Certifications include ACE Personal Training, Precision Nutrition Level 2, and multiple specialized courses in corrective exercise and functional fitness.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="text-xs bg-dark-700 text-mint px-3 py-1.5 rounded-lg font-medium">10+ Years Experience</span>
              <span className="text-xs bg-dark-700 text-mint px-3 py-1.5 rounded-lg font-medium">500+ Clients</span>
              <span className="text-xs bg-dark-700 text-mint px-3 py-1.5 rounded-lg font-medium">Certified Professional</span>
            </div>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <AnimatedSection className="card-glass p-6">
            <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center mb-4">
              <Heart size={18} className="text-mint" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Our Mission</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              To make professional wellness guidance accessible, affordable, and effective for everyone who wants to change their life.
            </p>
          </AnimatedSection>
          <AnimatedSection className="card-glass p-6">
            <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center mb-4">
              <Target size={18} className="text-mint" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Our Vision</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              To become the most trusted wellness partner in the community, known for genuine care and measurable results.
            </p>
          </AnimatedSection>
          <AnimatedSection className="card-glass p-6">
            <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center mb-4">
              <Users size={18} className="text-mint" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Our Approach</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              We combine scientific fitness principles with personalized nutrition and ongoing accountability to create lasting change.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection className="card-glass p-8">
          <div className="flex items-center gap-3 mb-6">
            <Award size={24} className="text-mint" />
            <h3 className="text-lg font-semibold text-white">Certifications & Credentials</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'ACE Certified Personal Trainer',
              'Precision Nutrition Level 2 Coach',
              'Functional Movement Screen (FMS) Certified',
              'TRX Suspension Training Certified',
              'Kettlebell Training Specialist',
              'Corrective Exercise Specialist',
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                <div className="w-1.5 h-1.5 rounded-full bg-mint" />
                {cert}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
