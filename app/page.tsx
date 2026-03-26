import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-20 bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="w-full max-w-2xl space-y-16">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            The Science of Heart Swarm
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            A deep dive into the technology powering our predictive intelligence.
          </p>
        </header>

        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-medium">Decentralized Intelligence</h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
              Our platform leverages swarm intelligence—a decentralized, self-organized system inspired by nature. 
              By analyzing vast datasets across multiple nodes, we can identify patterns that traditional models miss.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-medium">Predictive Heart Modeling</h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
              We utilize advanced neural networks to process cardiovascular data. Our models are trained on thousands 
              of clinical records to predict potential risks with high accuracy, focusing on preventative care.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-medium">AI Interpretation Layer</h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
              Raw data is just the beginning. Our secondary AI layer translates complex medical metrics into 
              human-readable insights, providing you with actionable advice rather than just numbers.
            </p>
          </div>
        </section>

        <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <Link 
            href="/api" 
            className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Go to Predictor
          </Link>
        </footer>
      </main>
    </div>
  );
}
