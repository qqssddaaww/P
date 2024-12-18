import useSWR from "swr"
import axiosInstance from "../../utils/axiosInstance";

const fetcher = (url : string) => axiosInstance.get(url).then((res) => res.data);

interface FetchResult<T> {
    data : T;
    isLoading : boolean;
    error : string;
}

export default function useFetch<T>(url: string): FetchResult<T> {
    const { data , error } = useSWR(url, fetcher);
    const isLoading = error && !data;

    return { 
        data, 
        isLoading, 
        error: error?.message || "" };
}
