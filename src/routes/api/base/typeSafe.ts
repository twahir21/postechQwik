export interface CrudItem {
    id?: string | number;
  }
  
  export interface CrudResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
  }