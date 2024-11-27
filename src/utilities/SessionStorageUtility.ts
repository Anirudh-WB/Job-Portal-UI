// SessionStorageUtils.ts

// Function to save session value by key
export const setSessionValue = (key: string, value: any): void => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving session value:", error);
    }
  };
  
  // Function to retrieve session value by key
  export const getSessionValue = <T>(key: string): T | undefined => {
    try {
      const serializedValue = sessionStorage.getItem(key);
      if (serializedValue === null) {
        return undefined;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error("Error retrieving session value:", error);
      return undefined;
    }
  };
  