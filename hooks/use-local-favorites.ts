'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'rozi-atelier:favorites';
const CHANGE_EVENT = 'rozi-atelier:favorites-change';

function readFavorites(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function useLocalFavorites() {
  // Empty on the server and on the first client render prevents hydration drift.
  const [favorites, setFavorites] = useState<string[]>([]);
  const favoritesRef = useRef<string[]>([]);

  useEffect(() => {
    const initial = readFavorites();
    favoritesRef.current = initial;
    setFavorites(initial);

    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      const next = readFavorites();
      favoritesRef.current = next;
      setFavorites(next);
    }

    function handleChange(event: Event) {
      const detail = (event as CustomEvent<string[]>).detail;
      const next = Array.isArray(detail) ? detail : readFavorites();
      favoritesRef.current = next;
      setFavorites(next);
    }

    window.addEventListener('storage', handleStorage);
    window.addEventListener(CHANGE_EVENT, handleChange);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(CHANGE_EVENT, handleChange);
    };
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    const current = favoritesRef.current;
    const next = current.includes(id)
      ? current.filter((favorite) => favorite !== id)
      : [...current, id];

    favoritesRef.current = next;
    setFavorites(next);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // The in-memory state still provides a complete session experience.
    }

    window.dispatchEvent(new CustomEvent<string[]>(CHANGE_EVENT, { detail: next }));
  }, []);

  const clearFavorites = useCallback(() => {
    favoritesRef.current = [];
    setFavorites([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Keep the UI usable when storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent<string[]>(CHANGE_EVENT, { detail: [] }));
  }, []);

  return { favorites, toggleFavorite, clearFavorites };
}
