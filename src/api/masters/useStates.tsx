import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";
import { CLIENT_ID } from "../../constants/Settings";

export function useStates(id: any) {
  return useQuery({
    queryKey: ["collegeStates"],
    queryFn: async () => {
      const res = await axios.get(`/inventory/states/${id}/country`, {
        headers: {
          "fi-client-number": CLIENT_ID,
        },
      });
      return res;
    },
    refetchOnWindowFocus: false,
  });
}
