import { i18nLocal } from "gewu-i18n";
import { DOMAttributes } from "react";
import { UxGroup } from "../UxGroup";
import { UxModal } from "../UxModal";
import { UxOption } from "../UxOption";

export interface UxLanguageProps extends DOMAttributes<HTMLElement> {
  className?: string;
}

const langs = i18nLocal.languagesText;
const items = [
  { name: "en", label: langs.en },
  { name: "zh", label: langs.zh },
  { name: "cht", label: langs.cht },
  { name: "kor", label: langs.kor },
  { name: "fra", label: langs.fra },
  { name: "de", label: langs.de },
  { name: "jp", label: langs.jp },
  { name: "spa", label: langs.spa },
  { name: "ru", label: langs.ru },
  { name: "it", label: langs.it },
];

export function UxLanguage() {
  const language = i18nLocal.getLanguage();
  UxModal.Show({
    // ignoreMaskClose: true,
    render: ({ cancel }) => {
      return (
        <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center overflow-y-auto px-5">
          <UxGroup
            name="language"
            value={language}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(v: any) => {
              i18nLocal.setNowLanguage(v);
              cancel();
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }}
            className="bg-def pointer-events-auto relative flex  max-h-[calc(100vh-40px)] w-full  flex-col rounded-lg shadow-2xl"
            items={items}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {(item) => (
              <UxOption className="w-full py-2" {...item}>
                {item.label}
              </UxOption>
            )}
          </UxGroup>
        </div>
      );
    },
  });
}
