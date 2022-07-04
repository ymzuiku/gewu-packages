export const clipboardWrite = async (text: string) => {
  if (location.href.indexOf("https") < 0) {
    console.warn("clipboard 必须使用 https");
  }
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    //
  }
};

export const clipboardRead = async (): Promise<string> => {
  if (location.href.indexOf("https") < 0) {
    console.warn("clipboard 必须使用 https");
  }
  try {
    const str = await navigator.clipboard.readText();
    return str;
  } catch (err) {
    return "";
  }
};
