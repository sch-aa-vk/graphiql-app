import { useTranslation } from 'react-i18next';

function LanguageSelect() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <select className="language-select" onChange={handleLanguageChange}>
      <option className="language-select__option" value="en">
        EN
      </option>
      <option className="language-select__option" value="ru">
        RU
      </option>
    </select>
  );
}

export default LanguageSelect;
