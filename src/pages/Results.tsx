import { AnimatedSection } from '../components/AnimatedSection';
import { useResults } from '../hooks/useResults';
import { Flame, Clock } from "lucide-react";

export default function Results() {
  const { results, loading } = useResults();

  return (
    <div className="pt-24 pb-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Transformation Results</h1>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Real people. Real results. See what is possible with dedicated guidance.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card-glass h-80 animate-pulse" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <AnimatedSection className="text-center py-20">
            <p className="text-white/40 text-sm">No results published yet. Check back soon.</p>
          </AnimatedSection>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {results.map((r) => (
        <AnimatedSection
        className="card-glass hover:shadow-lg hover:shadow-mint/10 transition-all duration-300 flex flex-col"
      >
                <div className="grid grid-cols-2 h-56 flex-shrink-0 overflow-hidden">
                  <div className="relative bg-dark-700">
                    {r.before_image ? (
                      <img src={r.before_image} alt="Before" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-dark-700">
                        <span className="text-xs text-white/30 font-medium">Before</span>
                      </div>
                    )}
                    <span className="absolute bottom-3 left-3 bg-dark-900/90 px-2.5 py-1 rounded-lg text-xs font-medium text-white/70">Before</span>
                  </div>
                  <div className="relative bg-dark-700">
                    {r.after_image ? (
                      <img src={r.after_image} alt="After" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-dark-700">
                        <span className="text-xs text-white/30 font-medium">After</span>
                      </div>
                    )}
                    <span className="absolute bottom-3 right-3 bg-mint/90 px-2.5 py-1 rounded-lg text-xs font-medium text-dark-900">After</span>
                  </div>
                </div>
                <div className="p-6 flex-1">
  <h3 className="text-lg font-bold text-white mb-4">
    {r.client_name}
  </h3>

  <div className="space-y-3">

    {r.weight_lost && (
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 text-white/60">
          <Flame size={16} className="text-orange-400" />

          <span>
            {r.transformation_type === "gain"
              ? "Weight Gain"
              : "Weight Loss"}
          </span>
        </div>

        <span className="text-mint font-semibold">
          {r.weight_lost}
        </span>
      </div>
    )}

    {r.duration && (
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 text-white/60">
          <Clock size={16} />
          <span>Duration</span>
        </div>

        <span className="text-white">
          {r.duration}
        </span>
      </div>
    )}

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
