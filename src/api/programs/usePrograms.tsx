import { useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";
import { CLIENT_ID } from "../../constants/Settings";

export function useGetPrograms({
  page,
  per_page,
  params,
}: {
  page: number;
  per_page: number;
  params?: any;
}) {
  return useQuery({
    queryKey: ["programs", page],
    queryFn: async () => {
      const { data } = await axios.get(`/public/program-finder`, {
        params: {
          page,
          per_page,
          ...params,
        },
        headers: {
          "fi-client-number": CLIENT_ID,
        },
      });
      return data;
    },
    // staleTime: 0,
    // gcTime: 0,
    refetchOnWindowFocus: false,
  });
}
