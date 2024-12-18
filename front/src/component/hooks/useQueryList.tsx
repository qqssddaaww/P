import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { Board, param } from "../interface";

// List.tsx 에서 사용하는 react-query 커스텀 훅
export default function useQueryList(param: param) {
    const { data: size } = useQuery({
        queryKey: ["boards"],
        queryFn: async () => {
          const res = await axiosInstance.get<Board[]>(`http://localhost:8080/get-board`);
          return res.data.length;
        },
      });
      const { data: pagination } = useQuery({
        queryKey: ["pagination", param],
        queryFn: async () => {
          const res = await axiosInstance.get(`http://localhost:8080/page-board?page=${param.page - 1}&size=${param.size}`);
          return res.data;
        },
      });

      return { size, pagination }
}
