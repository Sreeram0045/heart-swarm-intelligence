import Link from "next/link";

export default function ModelExplanation() {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-20 bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 selection:bg-zinc-300 dark:selection:bg-zinc-700">
      <main className="w-full max-w-4xl space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">

        <header className="space-y-6 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-linear-to-br from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-500">
            Cardiology Intelligence Architecture
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A transparent look into the machine learning, heuristic safety layers, and MLOps infrastructure powering our diagnostic engine.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Machine Learning */}
          <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 transition-all hover:shadow-md">
            <h2 className="text-xl font-medium mb-3">1. Dimensionality Reduction & ML</h2>
            <p className="leading-relaxed text-sm text-zinc-600 dark:text-zinc-400">
              We utilize a <strong>Whale Optimization Algorithm (WOA)</strong> to aggressively filter clinical noise, narrowing 11 standard metrics down to the 5 most critical features. An optimized <strong>XGBoost</strong> model then evaluates this focused dataset to generate a mathematical probability of cardiovascular disease.
            </p>
          </div>

          {/* Card 2: Fuzzy Logic */}
          <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 transition-all hover:shadow-md">
            <h2 className="text-xl font-medium mb-3">2. Fuzzy Logic Safety Net</h2>
            <p className="leading-relaxed text-sm text-zinc-600 dark:text-zinc-400">
              Pure machine learning can miss dangerous edge cases. We pass the ML probabilities through a handcrafted <strong>Scikit-Fuzzy Logic</strong> engine. If a patient has an objectively safe ML score but clinically dangerous cholesterol levels, our heuristic safety net overrides the AI to issue a proactive warning.
            </p>
          </div>

          {/* Card 3: Cloud MLOps */}
          <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 transition-all hover:shadow-md">
            <h2 className="text-xl font-medium mb-3">3. Containerized MLOps</h2>
            <p className="leading-relaxed text-sm text-zinc-600 dark:text-zinc-400">
              Our inference engine is written in Python using <strong>FastAPI</strong> and secured with API key authentication. The entire mathematical environment is containerized via <strong>Docker</strong> and hosted on Render's cloud infrastructure, ensuring zero dependency conflicts and high-availability endpoints.
            </p>
          </div>

          {/* Card 4: LLM Synthesis */}
          <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 transition-all hover:shadow-md">
            <h2 className="text-xl font-medium mb-3">4. Generative AI Failover</h2>
            <p className="leading-relaxed text-sm text-zinc-600 dark:text-zinc-400">
              Raw data is routed to a Generative AI layer to draft a human-readable clinical summary. We utilize a highly resilient Circuit Breaker pattern: attempting communication with <strong>Gemini 3 Flash</strong> first, and seamlessly failing over to <strong>OpenRouter Stepfun step-3.5 flash</strong> if rate limits are exceeded.
            </p>
          </div>
        </section>

        <footer className="pt-12 flex justify-center border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href="/model"
            className="inline-flex h-14 items-center justify-center rounded-full bg-zinc-900 px-10 text-base font-medium text-zinc-50 transition-all hover:bg-zinc-800 hover:scale-105 active:scale-95 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-lg"
          >
            Launch Diagnostic Predictor
          </Link>
        </footer>
      </main>
    </div>
  );
}