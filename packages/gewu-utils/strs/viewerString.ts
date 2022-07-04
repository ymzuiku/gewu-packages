// import { lang } from "@rightos/lang";
// import { hiddenSomeStrs } from "./hiddenSomeStrs";
// import { safeJsonParse } from "./safeJsonParse";

// export function viewerString(s: string | string[] | undefined): string {
//   if (typeof s === "boolean") {
//     return s ? "true" : "false";
//   }

//   if (!s) {
//     return "";
//   }
//   if (typeof s === "string") {
//     const obj = safeJsonParse(s);
//     if (obj) {
//       return obj.name;
//     }
//     if (s.length === 36 && s.indexOf("-") === 8) {
//       return hiddenSomeStrs(s);
//     }
//     return s;
//   }

//   if (Array.isArray(s)) {
//     let allNumber = true;
//     for (let i = 0; i < s.length; i++) {
//       const str = s[i];
//       if (isNaN(Number(str))) {
//         allNumber = false;
//         break;
//       }
//     }

//     if (allNumber) {
//       return `${lang.selected} ${s.length} ${lang.items}`;
//     }
//     return s.map(viewerString).filter(Boolean).join(", ");
//   }

//   return s;
// }

// export function viewerStringGetId(s: string): string {
//   const obj = safeJsonParse(s);
//   if (obj) {
//     return obj.id;
//   }
//   return s;
// }

// export function viewerStringGetIds(list: string[]): string[] {
//   return list.map(viewerStringGetId).filter(Boolean);
// }
