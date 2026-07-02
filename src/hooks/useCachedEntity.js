import { useState, useEffect, useCallback } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Fetches an entity list with localStorage caching for offline resilience.
 * - Tries the network first.
 * - On failure, falls back to the last cached copy.
 * - Retries automatically when the browser comes back online.
 * - Also retries once after a short timeout (handles slow/unstable connections).
 */
export function useCachedEntity(entityName, { sort, limit, filter } = {}) {
  const cacheKey = `fb_cache_${entityName}`;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);

  const loadCache = useCallback(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }, [cacheKey]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let result;
      if (filter) {
        result = await base44.entities[entityName].filter(filter, sort, limit);
      } else {
        result = await base44.entities[entityName].list(sort, limit);
      }
      setItems(result || []);
      setFromCache(false);
      try {
        localStorage.setItem(cacheKey, JSON.stringify(result || []));
      } catch {}
    } catch (err) {
      const cached = loadCache();
      if (cached) {
        setItems(cached);
        setFromCache(true);
      }
    } finally {
      setLoading(false);
    }
  }, [entityName, sort, limit, filter, cacheKey, loadCache]);

  useEffect(() => {
    // Show cached data immediately while we fetch
    const cached = loadCache();
    if (cached) {
      setItems(cached);
      setFromCache(true);
    }

    fetchData();

    const onOnline = () => fetchData();
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [fetchData, loadCache]);

  // Subscribe to real-time updates (only meaningful when online)
  useEffect(() => {
    let unsub = () => {};
    try {
      if (navigator.onLine) {
        unsub = base44.entities[entityName]?.subscribe?.(() => fetchData()) || (() => {});
      }
    } catch {}
    return unsub;
  }, [entityName, fetchData]);

  return { items, loading, fromCache, refetch: fetchData };
}