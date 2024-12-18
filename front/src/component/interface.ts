export interface Board {
  uid?: number;
  id: string | undefined ;
  title: string;
  content: string;
  author: string | undefined;
  hits: number;
  date?: string;
}

export interface chBoard {
  uid: number;
  title: string;
  content: string;
  date: string;
}

export interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string | null | Error;
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

export interface login {
  id : string,
  pw: string
}

export interface userState {
  user : user,
  loading: boolean;
  error: string | null | Error;
}


export interface user {
  id : string | undefined,
  pw?: string,
  name : string | undefined,
}