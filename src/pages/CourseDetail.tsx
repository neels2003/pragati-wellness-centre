import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseById } from '../hooks/useCourses';
import { useLessons } from '../hooks/useLessons';
import { AnimatedSection } from '../components/AnimatedSection';
import { BookOpen, ArrowLeft, PlayCircle, FileText } from 'lucide-react';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { course, loading: courseLoading } = useCourseById(id || '');
  const { lessons, loading: lessonsLoading } = useLessons(id || '');
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  useEffect(() => {
    if (lessons.length > 0) setActiveLesson(lessons[0].id);
  }, [lessons.length]);

  const selectedLesson = lessons.find((l) => l.id === activeLesson);

  if (courseLoading || !course) {
    return (
      <div className="pt-24 pb-20 max-w-6xl mx-auto px-6 bg-dark-900">
        <div className="h-8 w-40 bg-dark-700 rounded animate-pulse mb-4" />
        <div className="h-4 w-full bg-dark-700 rounded animate-pulse mb-6" />
        <div className="h-64 bg-dark-700 rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-mint transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Courses
        </button>

        <AnimatedSection className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-dark-700 flex items-center justify-center shrink-0">
              <BookOpen size={24} className="text-mint" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{course.title}</h1>
              {course.instructor_name && (
                <p className="text-sm text-white/50">Instructor: {course.instructor_name}</p>
              )}
            </div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-2xl">{course.description}</p>
        </AnimatedSection>

        {lessonsLoading ? (
          <div className="h-48 bg-dark-700 rounded-2xl animate-pulse" />
        ) : lessons.length === 0 ? (
          <AnimatedSection className="card-glass p-10 text-center">
            <BookOpen size={32} className="text-white/30 mx-auto mb-3" />
            <p className="text-sm text-white/40">No lessons available yet. Check back soon.</p>
          </AnimatedSection>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <AnimatedSection className="md:col-span-2">
<div className="bg-black rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
  {selectedLesson?.video_url ? (
    selectedLesson.video_url.includes("youtube.com") ||
    selectedLesson.video_url.includes("youtu.be") ? (

      <iframe
        className="w-full h-full"
        src={
          selectedLesson.video_url
            .replace("https://youtu.be/", "https://www.youtube.com/embed/")
            .replace("watch?v=", "embed/")
            .split("&")[0]
            .split("?si=")[0]
        }
        title={selectedLesson.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

    ) : (

      <video
        src={selectedLesson.video_url}
        controls
        className="w-full h-full"
        poster={course.thumbnail || undefined}
      >
        Your browser does not support the video tag.
      </video>

    )
  ) : (
    <div className="text-center p-8">
      <PlayCircle size={48} className="text-white/30 mx-auto mb-3" />
      <p className="text-sm text-white/40">
        No video for this lesson yet.
      </p>
    </div>
  )}
</div>
              <div className="mt-4">
                <h3 className="text-base font-semibold text-white mb-1">{selectedLesson?.title}</h3>
                {selectedLesson?.pdf_url && (
                  <a
                    href={selectedLesson.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-mint hover:underline mt-2"
                  >
                    <FileText size={14} /> Download Notes
                  </a>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection className="md:col-span-1">
              <div className="card-glass p-4">
                <h3 className="text-sm font-semibold text-white mb-3">{lessons.length} Lessons</h3>
                <div className="flex flex-col gap-2">
                  {lessons.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setActiveLesson(l.id)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors ${
                        activeLesson === l.id
                          ? 'bg-dark-700 text-mint font-medium'
                          : 'text-white/60 hover:bg-dark-700'
                      }`}
                    >
                      <PlayCircle size={14} className={activeLesson === l.id ? 'text-mint' : 'text-white/30'} />
                      <span className="truncate">{l.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        )}
      </div>
    </div>
  );
}
