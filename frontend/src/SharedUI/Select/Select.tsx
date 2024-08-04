import styles from "./Select.module.css";
import ArrowIcon from "../../icons/arrow.svg";
import { useState } from "react";
import RuFlag from "../../icons/ru.svg";
import EnFlag from "../../icons/en.svg";
import { useTranslation } from "react-i18next";

const options = [
  {
    value: "ru",
    label: (
      <div className={styles["language-option"]}>
        <img src={RuFlag} width={20} alt={""} />
        Русский
      </div>
    ),
  },
  {
    value: "en",
    label: (
      <div className={styles["language-option"]}>
        <img src={EnFlag} width={20} alt={""} />
        English
      </div>
    ),
  },
];

const Select = ({}) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[1]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    i18n.changeLanguage(option.value);
  };

  return (
    <div className={styles["select"]} onClick={toggleDropdown}>
      <p>Select language</p>
      <span>{selectedOption && selectedOption.label}</span>
      <img
        className={styles["arrow-icon"]}
        src={ArrowIcon}
        alt={""}
        width={25}
      />
      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
