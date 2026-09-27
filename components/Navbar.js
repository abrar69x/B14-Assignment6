'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell } from 'lucide-react';
import { useWorkout } from '@/context/WorkoutContext';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  return (
    <nav className="bg-[#15181e] border-b border-neutral-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-wider text-white">
          <Dumbbell className="text-[#ccff00] w-6 h-6" />
          <span>FIT<span className="text-[#ccff00]">LOG</span></span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 font-semibold text-sm">
          <Link
            href="/"
            className={pathname === '/' ? 'text-[#ccff00]' : 'text-neutral-400 hover:text-white transition'}
          >
            WORKOUT
          </Link>
          <Link
            href="/my-plan"
            className={pathname === '/my-plan' ? 'text-[#ccff00]' : 'text-neutral-400 hover:text-white transition'}
          >
            MY PLAN
          </Link>
        </div>

        {/* Counter Badges (Both link to /my-plan) */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-[#ccff00] text-black hover:opacity-90 transition"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] px-1.5 py-0.5 rounded-full text-[10px]">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border border-neutral-600 text-neutral-200 hover:border-neutral-400 transition"
          >
            <span>Saved</span>
            <span className="bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded-full text-[10px]">
              {saved.length}
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}