'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowDown, Clock, Flame, Star, Dumbbell } from 'lucide-react';

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('duration');

  useEffect(() => {
    // API theke data load kora
    fetch('https://api.abcz.workers.dev/api/fitlog')
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data.data || data);
        setLoading(false);
      })
      .catch(() => {
        // Primary API fail korle alternative API call hobe
        fetch('https://api.api-store.workers.dev/api/fitlog')
          .then((res) => res.json())
          .then((altData) => {
            setWorkouts(altData.data || altData);
            setLoading(false);
          })
          .catch((err) => {
            console.error('Error fetching data:', err);
            setLoading(false);
          });
      });
  }, []);

  // Sort logic (Challenge requirement)
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === 'duration') return (parseInt(b.duration) || 0) - (parseInt(a.duration) || 0);
    if (sortBy === 'calories') return (parseInt(b.calories) || 0) - (parseInt(a.calories) || 0);
    if (sortBy === 'rating') return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
    return 0;
  });

  return (
    <div>
      {/* Hero / Banner Section */}
      <section className="border-b border-neutral-800 py-16 px-4 bg-[#14171d]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase">
              WORKOUT LIBRARY
            </span>
            <h1 className="text-4xl md:text-5xl font-black mt-3 leading-tight tracking-tight uppercase">
              TRAIN WITH INTENT. <br /> LOG EVERY SET.
            </h1>
            <p className="text-neutral-400 mt-4 text-sm leading-relaxed max-w-md">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <div className="mt-8">
              <a
                href="#library"
                className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded text-xs uppercase tracking-wider hover:opacity-90 transition"
              >
                <span>BROWSE WORKOUTS</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-sm aspect-video bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-20 h-20 text-neutral-700 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* The Library Section */}
      <section id="library" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-neutral-800 pb-4">
          <div>
            <h2 className="text-2xl font-black uppercase text-white tracking-wide">
              THE LIBRARY
            </h2>
            <p className="text-neutral-400 text-xs mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-xs uppercase font-semibold text-neutral-400">
              Sort By:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-900 border border-neutral-700 text-white text-xs rounded px-3 py-1.5 focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Loading State Animation */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-neutral-900 rounded-lg border border-neutral-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((lift) => (
              <Link
                key={lift.id}
                href={`/workout/${lift.id}`}
                className="group bg-[#151921] border border-neutral-800 rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#ccff00]/50 transition duration-200"
              >
                <div>
                  <div className="h-44 bg-neutral-900 overflow-hidden relative flex items-center justify-center">
                    {lift.image ? (
                      <img
                        src={lift.image}
                        alt={lift.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <Dumbbell className="w-10 h-10 text-neutral-700" />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex gap-1.5 flex-wrap mb-2">
                      {(lift.category || 'Fitness').split(',').map((cat, idx) => (
                        <span
                          key={idx}
                          className="bg-neutral-800 text-[10px] uppercase font-bold text-neutral-300 px-2 py-0.5 rounded"
                        >
                          {cat.trim()}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-white text-sm group-hover:text-[#ccff00] transition uppercase">
                      {lift.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">{lift.equipment}</p>
                  </div>
                </div>

                <div className="px-4 py-3 bg-[#11141a] border-t border-neutral-800/80 flex justify-between text-xs text-neutral-300 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#ccff00]" /> {lift.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-orange-400" /> {lift.calories}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {lift.rating}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}