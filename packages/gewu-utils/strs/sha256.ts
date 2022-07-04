import { createHmac } from "node:crypto";

let slat = "";

export function sha256(str: string) {
  if (!slat) {
    slat = process.env["slat"] || "";
  }
  return createHmac("sha256", slat).update(str).digest("hex");
}
