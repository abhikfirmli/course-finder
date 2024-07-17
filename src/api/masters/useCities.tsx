import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";
import inventory from "../../libs/inventory";
import { CLIENT_ID } from "../../constants/Settings";

export function useCities(id: any) {
  return useQuery({
    queryKey: ["collegeStates"],
    queryFn: async () => {
      const res = await inventory.get(`/dropdown/cities/${id}/state`, {
        headers: {
          "fi-client-number": CLIENT_ID,
        },
      });
      return res;
    },
    refetchOnWindowFocus: false,
  });
}
