
/**
 * UI helper utility functions
 */

/**
 * Get the appropriate color for a cleanliness score
 */
export const getCleanlinessColor = (score: number): string => {
  if (score >= 4.5) return 'bg-green-500';
  if (score >= 3.5) return 'bg-green-400';
  if (score >= 2.5) return 'bg-yellow-400';
  return 'bg-red-500';
};
