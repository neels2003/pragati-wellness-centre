import { AnimatedSection } from '../components/AnimatedSection';
import { useCourses } from '../hooks/useCourses';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const { courses, loading } = useCourses();

  return (
    <div className="pt-24 pb-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Wellness Courses</h1>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Expert-led courses to deepen your knowledge and practice.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card-glass h-80 animate-pulse" />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <AnimatedSection className="flex flex-col items-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-dark-700 flex items-center justify-center mb-5">
              <BookOpen size={32} className="text-mint/30" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Courses Available Yet</h3>
            <p className="text-sm text-white/50 text-center max-w-sm">
              Upcoming wellness courses will be added soon. Stay tuned!
            </p>
          </AnimatedSection>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((c) => (
              <AnimatedSection key={c.id} className="card-glass overflow-hidden hover:shadow-lg hover:shadow-mint/10 transition-all duration-300 flex flex-col">
                <div className="h-48 bg-dark-700 relative">
                  {c.thumbnail ? (
                    <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-700 to-dark-800">
                      <BookOpen size={36} className="text-white/20" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-semibold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">{c.description}</p>
                  <div className="flex items-center justify-between">
                    {c.instructor_name && (
                      <span className="text-xs text-white/40">By {c.instructor_name}</span>
                    )}
                    <Link
                      to={`/courses/${c.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-mint hover:gap-2 transition-all"
                    >
                      View Course <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
