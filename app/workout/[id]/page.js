'use client';

import { use, useState, useEffect } from 'react';
import { useWorkout } from '@/context/WorkoutContext';
import { Plus, Bookmark, Clock, Flame, Star, Dumbbell } from 'lucide-react';

export default function WorkoutDetails({ params }) {
  // Next.js params unwrap kora
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved } = useWorkout();

  useEffect(() => {
    // Single workout data fetch kora
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data.data || data);
        setLoading(false);
      })
      .catch(() => {
        // Backup API
        fetch(`https://api.api-store.workers.dev/api/fitlog/${id}`)
          .then((res) => res.json())
          .then((altData) => {
            setWorkout(altData.data || altData);
            setLoading(false);
          })
          .catch((err) => {
            console.error('Error fetching detail:', err);
            setLoading(false);
          });
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-neutral-400 text-sm">
        Loading workout details...
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-neutral-400">
        Workout not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Visual / Image */}
        <div className="bg-[#151921] border border-neutral-800 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
          {workout.image ? (
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Dumbbell className="w-28 h-28 text-neutral-700" />
          )}
        </div>

        {/* Right Side: Details & Actions */}
        <div>
          {/* Category Tags */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {(workout.category || 'General').split(',').map((cat, idx) => (
              <span
                key={idx}
                className="bg-neutral-800 text-xs uppercase font-bold text-[#ccff00] px-2.5 py-1 rounded"
              >
                {cat.trim()}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            {workout.name}
          </h1>

          <p className="mt-3 text-neutral-400 text-sm leading-relaxed">
            {workout.description || 'Focus on posture, form, and smooth eccentric control.'}
          </p>

          {/* Key Specs Table */}
          <div className="mt-8 border border-neutral-800 rounded-lg overflow-hidden bg-[#13161c]">
            {[
              ['EQUIPMENT', workout.equipment],
              ['DIFFICULTY', workout.difficulty || 'Intermediate'],
              ['SETS', workout.sets || '4'],
              ['REPS', workout.reps || '8-12'],
              ['DURATION', workout.duration],
              ['CALORIES', workout.calories],
              ['RATING', workout.rating],
            ].map(([label, val], idx) => (
              <div
                key={label}
                className={`flex justify-between px-4 py-2.5 text-xs ${
                  idx % 2 === 0 ? 'bg-transparent' : 'bg-neutral-900/40'
                } border-b border-neutral-800 last:border-0`}
              >
                <span className="text-neutral-500 font-bold uppercase">{label}</span>
                <span className="text-neutral-200 font-semibold">{val || 'N/A'}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2.5 text-sm text-neutral-400">
              <li className="flex gap-2">
                <span className="text-[#ccff00] font-bold">1.</span>
                <span>Set up your starting position with firm footing and grip.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#ccff00] font-bold">2.</span>
                <span>Engage core and maintain steady tension throughout the set.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#ccff00] font-bold">3.</span>
                <span>Perform the lift with power while keeping control.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#ccff00] font-bold">4.</span>
                <span>Lower slowly to the starting point to complete the rep.</span>
              </li>
            </ol>
          </div>

          {/* Call-to-action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => addToPlan(workout)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#ccff00] text-black font-bold text-xs uppercase py-3.5 rounded hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add to today&apos;s plan</span>
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="flex items-center justify-center gap-2 border border-neutral-700 text-white font-bold text-xs uppercase py-3.5 px-6 rounded hover:bg-neutral-800 transition"
            >
              <Bookmark className="w-4 h-4" />
              <span>Save for later</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}