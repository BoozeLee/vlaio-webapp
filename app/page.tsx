import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 font-sans">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-24 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            VLAIO Innovation Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            BakerStreet VLAIO Proof-of-Innovation (BVP-1) featuring
            neuromorphic autonomous agents and x402 payment settlement on Solana.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
          <Link
            href="/vlaio"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <div className="text-4xl mb-4">🧠</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              NeuroForge & TrendForge Demos
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Interactive demonstrations of neuromorphic AI agents and
              autonomous research workflows with x402 payment settlement.
            </p>
            <div className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
              Launch Demos →
            </div>
          </Link>

          <a
            href="https://github.com/BoozeLee/vlaio-webapp"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <div className="text-4xl mb-4">📖</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Source Code
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              View the repository on GitHub. Built with Next.js 16, React 19,
              TypeScript, and Tailwind CSS.
            </p>
            <div className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
              View on GitHub →
            </div>
          </a>
        </div>
      </main>

      <footer className="w-full text-center py-6 text-xs text-gray-400 dark:text-gray-500">
        VLAIO Innovation Demo · BakerStreet Ecosystem · BVP-1
      </footer>
    </div>
  );
}
