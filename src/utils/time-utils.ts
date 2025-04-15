
/**
 * Time-related utility functions
 */

/**
 * Format time string into a user-friendly format
 */
export const formatTime = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
