import dayjs from "dayjs";

export function timeLabel(time: string) {
  return dayjs(time).format("YYYY-MM-DD HH:mm").toString();
}
