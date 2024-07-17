import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";
import inventory from "../../libs/inventory";
import { CLIENT_ID } from "../../constants/Settings";

export function useFeeRangeSlider() {
  return useQuery({
    queryKey: ["feeRangeSlider"],
    queryFn: async () => {
      const res = await inventory.get(`/rangeSlider`, {
        headers: {
          "fi-client-number": CLIENT_ID,
        },
      });
      return res?.data;
    },
    refetchOnWindowFocus: false,
  });
}
