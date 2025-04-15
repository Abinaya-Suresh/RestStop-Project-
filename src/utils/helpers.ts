
/**
 * This file re-exports utility functions from more focused utility files
 * to maintain backward compatibility.
 */

// Re-export all functions from geo utilities
export { calculateDistance, formatDistance } from './geo-utils';

// Re-export all functions from time utilities
export { formatTime } from './time-utils';

// Re-export all functions from UI utilities
export { getCleanlinessColor } from './ui-utils';

// Re-export all functions from filter utilities
export { filterRestrooms } from './filter-utils';

// Re-export all functions from recommendation utilities
export { getRecommendations } from './recommendation-utils';

// Re-export all functions from chat utilities
export { generateChatResponse } from './chat-utils';
