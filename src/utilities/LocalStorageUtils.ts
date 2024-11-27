// Function to save a value to localStorage by key
export const setStorageValue = (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving local value:", error);
    }
  };
  
  // Function to retrieve a value from localStorage by key
  export const getStorageValue = <T>(key: string): T | undefined => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return undefined;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error("Error retrieving local value:", error);
      return undefined;
    }
  };
  
  // Function to remove a value from localStorage by key
  export const removeStorageValue = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing local value:", error);
    }
  };
  
  // Function to clear all localStorage data
  export const clearLocalStorage = (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
  };
  