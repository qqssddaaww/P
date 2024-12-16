import { useLocation, useNavigate, useParams, useSearchParams } from "react-router";

export default function useRoute() {
    const navigate = useNavigate();
    // List.tsx 에서 필요한 페이지 번호
    const [ searchParams ] = useSearchParams();
    const page = searchParams.get("page");
    const param = {
      page: page ? Number(page) : 1,
      size: 15,
    };
    // View.tsx 에서 해당 게시판 일련번호가 필요함
    const { uid } = useParams();

    const { state } = useLocation();
    
  return { navigate , page, param, uid, state}
}
