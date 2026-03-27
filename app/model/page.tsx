import ModelContainer from "@/components/interactive/ModelContainer";

export default function ModelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-20 bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="w-full max-w-4xl space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Predictive Heart Intelligence
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Enter your cardiovascular metrics for a decentralized swarm analysis.
          </p>
        </header>

        <ModelContainer />
      </main>
    </div>
  );
}
