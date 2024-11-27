interface ApiResponse<T> {
    data: T | null;
    status: number;
    message :string; 
  }

  export default ApiResponse;