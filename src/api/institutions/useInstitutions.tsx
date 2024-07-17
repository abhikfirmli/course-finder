import { useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";
import { CLIENT_ID } from "../../constants/Settings";

export function useGetInstitutions({
  page,
  per_page,
  params,
}: {
  page: number;
  per_page: number;
  params?: any;
}) {
  return useQuery({
    queryKey: ["institutions", page],
    queryFn: async () => {
      const { data } = await axios.get(
        `/institutionsList?limit=${per_page}&page=${page}`,
        {
          params: {
            page,
            per_page,
            ...params,
          },
          headers: {
            "fi-client-number": CLIENT_ID,
          },
        }
      );
      return data;
    },
    // staleTime: 0,
    // gcTime: 0,
    refetchOnWindowFocus: false,
  });
}

export function useInstitutionDetail(id: any) {
  return useQuery({
    queryKey: ["institutionDetail"],
    queryFn: async () => {
      const { data } = await axios.get(
        `/inventory/institutionDetails/institutionId/${id}`
      );
      return data;
    },

    refetchOnWindowFocus: false,
  });
}
