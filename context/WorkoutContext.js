'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  // LocalStorage theke data load kora
  useEffect(() => {
    const savedPlan = localStorage.getItem('fitlog_plan');
    const savedList = localStorage.getItem('fitlog_saved');
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedList) setSaved(JSON.parse(savedList));
  }, []);

  // Notun item add hole LocalStorage e update kora
  useEffect(() => {
    localStorage.setItem('fitlog_plan', JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem('fitlog_saved', JSON.stringify(saved));
  }, [saved]);

  // Plan e add kora (Cap: 5 items)
  const addToPlan = (workout) => {
    if (plan.length >= 5) {
      toast.error('Cap reached! You can only add up to 5 lifts.');
      return;
    }
    const alreadyExists = plan.some((item) => item.id === workout.id);
    if (alreadyExists) {
      toast.error('Already in your plan!');
      return;
    }
    setPlan([...plan, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  // Saved list e add kora
  const addToSaved = (workout) => {
    const alreadyExists = saved.some((item) => item.id === workout.id);
    if (alreadyExists) {
      toast.error('Already saved!');
      return;
    }
    setSaved([...saved, workout]);
    toast.success('Saved for later');
  };

  // Remove functions
  const removeFromPlan = (id) => {
    setPlan(plan.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((item) => item.id !== id));
    toast.success('Removed from saved lifts');
  };

  // Mark as Done toggle
  const toggleDone = (id) => {
    const updated = plan.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setPlan(updated);
    toast.success('Status updated!');
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => useContext(WorkoutContext);