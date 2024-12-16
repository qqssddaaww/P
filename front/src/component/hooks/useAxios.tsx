import axios from "axios";

export default function useAxios(url: string) {
  const axoisGet = async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  return { axoisGet, }
}
