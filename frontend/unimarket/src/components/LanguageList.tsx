import { useState } from "react";
import { Link } from "react-router-dom";
import { LANGUAGES } from "../constants/languages.constants";
import { Language } from "../interfaces/languages.interfaces";
import { useTranslation } from "react-i18next";

const LanguageList = ({ style = "text-white" }: { style: string }) => {
  const { i18n } = useTranslation();

  // Set the default language
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: "es",
    label: "Español",
    flag: "🇪🇸",
  });
  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.code);
    localStorage.setItem("i18nextLng", language.code);
  };

  return (
    <>
      <Link to="#" className={`selected-text ${style} text-sm py-8`}>
        {
          <>
            <p>
              {selectedLanguage.flag} {selectedLanguage.label}
            </p>
          </>
        }
      </Link>
      <ul className="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8">
        {LANGUAGES.map(({ code, label, flag }) => (
          <li key={code}>
            <Link
              to="#"
              className="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0"
              onClick={() => handleLanguageChange({ code, label, flag })}
            >
              <p>{flag}</p>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default LanguageList;
