export interface Board {
    id?: number;
    title: string;
    content: string;
    author: string;
    hits?: number;
    date?: string;
  }

export interface BoardState {
    boards: Board[];
    loading: boolean;
    error: string | null;
  }

