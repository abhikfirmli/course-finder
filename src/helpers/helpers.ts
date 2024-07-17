import dayjs from "dayjs";

export function format_date(date: string) {
  return dayjs(date).format("DD MMM, YYYY");
}

export function get_search_params(params: any) {
  const allSearchParams = Object.fromEntries([...params]);

  return allSearchParams;
}
