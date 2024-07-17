import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../libs/axios";
import inventory from "../../libs/inventory";
import { CLIENT_ID } from "../../constants/Settings";

export function useStudyLevel() {
  return useQuery({
    queryKey: ["studyLevels"],
    queryFn: async () => {
      const res = await inventory.get("/dropdown/studylevel", {
        headers: {
          "fi-client-number": CLIENT_ID,
        },
      });
      const modifiedData = await res?.data?.data.map((item: any) => ({
        ...item,
        value: JSON.stringify(item.value), // Convert 'value' to string
      }));
      return modifiedData;
    },
    refetchOnWindowFocus: false,
  });
}
