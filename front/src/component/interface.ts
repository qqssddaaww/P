export interface Board {
  id?: number;
  title: string;
  content: string;
  author: string;
  hits: number;
  date?: string;
}

export interface chBoard {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string | null | Error;
  size: number;
}

export interface Props {
  totalItems: number; // 데이터 총 갯수
  itemCountPerPage: number; // 페이지 당 보여줄 데이터 개수
  pageCount: number; // 보여줄 페이지 개수
  currentPage: number; // 현재 페이지
}

export interface param {
  page: number;
  size: number;
}
