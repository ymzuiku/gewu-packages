import { driverState } from "./driverState";

export function checkUseTest() {
  if (typeof window !== "undefined") {
    const search = new URLSearchParams(location.search);
    const url = location.href.split("#")[0];
    driverState.full = search.get("full") == "1" || search.get("full") == "1/";
    const testKey = search.get("test") || "";
    if (testKey == driverState.startKey || testKey == driverState.startKey + "/") {
      if (driverState.full) {
        history.replaceState("", "", url);
      }
      return true;
    }
  }
  return false;
}
