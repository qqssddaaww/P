// hooks/useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { login } from "../interface";

export default function useLogInOut() {

  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      await axiosInstance.get("http://localhost:8080/logout");
    },

    onSuccess: () => {
      // 'session' 쿼리를 무효화하여 재패칭 트리거
      queryClient.invalidateQueries({
       queryKey: ['session'], 
      });
    },
    onError: (error: Error) => {
      console.error("로그아웃 실패:", error);
    },
  });

//  로그인 리턴값이 없기때문에 mutation으로 생성
  const { mutate: login } = useMutation({
    mutationFn: async (login: login) => {
      await axiosInstance.post("http://localhost:8080/login", login);
    },

    onSuccess: () => {
      // 로그인을 하여 session의 재패칭
      queryClient.invalidateQueries({
       queryKey: ['session'], 
      });
    },
    onError: (error: Error) => {
      console.error("로그인 실패:", error);
    },
  });



  return { logout, login }
}
