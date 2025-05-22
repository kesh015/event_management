/**
 * Format a date string to a more readable format
 * @param dateString - Date in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "April 15, 2025")
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};