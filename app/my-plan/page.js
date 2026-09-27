'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useWorkout } from '@/context/WorkoutContext';
import { Check, X, Clock, Flame, Star, Dumbbell } from 'lucide-react';

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState('plan');
  const { plan, saved, removeFromPlan, removeFromSaved, toggleDone } = useWorkout();

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((sum, item) => sum + (parseInt(item.duration) || 0), 0);
  const totalCalories = plan.reduce((sum, item) => sum + (parseInt(item.calories) || 0), 0);

  const displayList = activeTab === 'plan' ? plan : saved;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black uppercase text-white">MY PLAN</h1>
      <p className="text-neutral-400 text-sm mt-1">Cap of five lifts for today. Finish them, then load more.</p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4 my-6">
        <div className="bg-[#181a20] border border-neutral-800 p-4 rounded text-center">
          <span className="text-xs text-neutral-400 uppercase font-semibold">Exercises</span>
          <p className="text-2xl font-bold mt-1 text-[#ccff00]">{totalExercises}</p>
        </div>
        <div className="bg-[#181a20] border border-neutral-800 p-4 rounded text-center">
          <span className="text-xs text-neutral-400 uppercase font-semibold">Minutes</span>
          <p className="text-2xl font-bold mt-1 text-white">{totalMinutes}</p>
        </div>
        <div className="bg-[#181a20] border border-neutral-800 p-4 rounded text-center">
          <span className="text-xs text-neutral-400 uppercase font-semibold">Calories</span>
          <p className="text-2xl font-bold mt-1 text-orange-400">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-800 gap-6 mb-6">
        <button
          onClick={() => setActiveTab('plan')}
          className={`pb-2 text-sm font-bold uppercase ${
            activeTab === 'plan' ? 'text-[#ccff00] border-b-2 border-[#ccff00]' : 'text-neutral-500'
          }`}
        >
          Today&apos;s Plan ({plan.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-2 text-sm font-bold uppercase ${
            activeTab === 'saved' ? 'text-[#ccff00] border-b-2 border-[#ccff00]' : 'text-neutral-500'
          }`}
        >
          Saved ({saved.length})
        </button>
      </div>

      {/* Cards List or Empty */}
      {displayList.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-neutral-800 rounded-lg">
          <h3 className="font-bold text-lg text-white">NOTHING HERE YET</h3>
          <p className="text-neutral-500 text-sm mt-1 mb-4">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="bg-[#ccff00] text-black font-bold px-4 py-2 rounded text-xs inline-block">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {displayList.map((item) => (
            <div
              key={item.id}
              className={`bg-[#181a20] border p-4 rounded flex items-center justify-between ${
                item.done ? 'border-green-600/50 opacity-60' : 'border-neutral-800'
              }`}
            >
              <div>
                <h4 className={`font-bold text-base uppercase text-white ${item.done ? 'line-through text-neutral-400' : ''}`}>
                  {item.name}
                </h4>
                <p className="text-xs text-neutral-400">{item.equipment}</p>
                <div className="flex gap-4 mt-2 text-xs text-neutral-400 font-medium">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#ccff00]" /> {item.duration}</span>
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" /> {item.calories}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {item.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link href={`/workout/${item.id}`} className="text-xs border border-neutral-700 px-3 py-1.5 rounded hover:bg-neutral-800 text-neutral-200">
                  View Details
                </Link>
                {activeTab === 'plan' && (
                  <button
                    onClick={() => toggleDone(item.id)}
                    className={`p-1.5 rounded border text-xs ${item.done ? 'bg-green-600 border-green-600 text-white' : 'border-neutral-700 text-neutral-300'}`}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => (activeTab === 'plan' ? removeFromPlan(item.id) : removeFromSaved(item.id))}
                  className="p-1.5 rounded border border-neutral-700 text-neutral-400 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}