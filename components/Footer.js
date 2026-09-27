import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#0d0f13] py-8 text-neutral-400 text-sm mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-bold tracking-wider">
          <Dumbbell className="text-[#ccff00] w-5 h-5" />
          <span>FITLOG</span>
        </div>
        <p className="text-center sm:text-right text-xs">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}