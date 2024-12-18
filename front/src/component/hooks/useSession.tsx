import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axiosInstance';
import { user } from '../interface';

export default function useSession() {
    const { data: session } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
          const res = await axiosInstance.get<user>("http://localhost:8080/check-session");
          return res.data;
        },
      });

      return { session };
}
