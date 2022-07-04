import { useEffect, useState } from "react";
import { DivProps } from "react-override-props";
import { UxButton } from "../UxButton";
import { UxInputField } from "../UxLessFields";

export type UxVerificationCodeProps = DivProps<{
  localKey: string;
  waitSecond?: number;
  name: string;
  className?: string;
  sendLabel?: string;
  placeholder?: string;
  "test-input-id"?: string;
  "test-button-id"?: string;
  /** 只有返回 true，才会继续执行倒计时 */
  onClick?: () => Promise<boolean>;
}>;

export function UxVerificationCode({
  className,
  name,
  onClick,
  localKey,
  "test-button-id": testButtonId,
  "test-input-id": testInputId,
  waitSecond = UxVerificationCode.options.waitSecond,
  sendLabel = "Send code",
  placeholder,
  ...rest
}: UxVerificationCodeProps) {
  const [waitNum, setWaitNum] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (waitNum > 0) {
      timeout = setTimeout(() => {
        setWaitNum(waitNum - 1);
      }, 1000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [waitNum]);

  useEffect(() => {
    const lastWait = localStorage.getItem(localKey);
    if (lastWait) {
      const lastTime = Number(lastWait);
      const processTime = Date.now() - lastTime;
      if (processTime < 1000 * waitSecond) {
        setWaitNum(parseInt(String((1000 * waitSecond - processTime) / 1000)));
      }
    }
  }, []);

  const startWait = async () => {
    if (waitNum > 0) {
      return;
    }
    if (onClick) {
      const goOn = await Promise.resolve(onClick());
      if (!goOn) {
        return;
      }
    }
    setWaitNum(waitSecond);
    localStorage.setItem(localKey, Date.now() + "");
  };

  return (
    <div className={["flex w-full flex-row", className].join(" ")} {...rest}>
      <UxInputField
        test-id={testInputId}
        type="number"
        // max={6}
        className="flex-1"
        notTip
        placeholder={placeholder}
        name={name}
      />
      <UxButton
        test-id={testButtonId}
        theme="secondary"
        type="button"
        className={["ml-4 w-48 flex-grow-0 truncate", waitNum ? "font-semibold opacity-70" : "text-base"].join(" ")}
        onClick={startWait}
      >
        {waitNum < 1 ? sendLabel : waitNum}
      </UxButton>
    </div>
  );
}

UxVerificationCode.options = {
  waitSecond: 60,
};
