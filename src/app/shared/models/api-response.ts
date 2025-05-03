export type ApiResponse<T> = {
  [key: string]: {
    items: T[];
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  } 
}