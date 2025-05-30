import { useState, useEffect } from "react";
import './LanguageButton.css';

export default function LanguageButton() {
    useEffect(() => {
        if (!localStorage.getItem("lang")) {
            localStorage.setItem("lang", "pl");
        }
    }, []);
    const [lang, setLang] = useState(localStorage.getItem("lang") || "pl");
    const changeLanguage = (lang) => { 
        setLang(lang);
        localStorage.setItem('lang', lang);
        window.dispatchEvent(new Event("storage"));
    }
    return (
        <div className='lang-switch-containerIN'>
            <div className='lang-btn-containerIN'>
                <button 
                    className={`lang-btnIN${lang === 'pl' ? ' activeIN' : ''}`}
                    onClick={() => changeLanguage('pl')}
                >PL</button>
                <button 
                    className={`lang-btnIN${lang === 'en' ? ' activeIN' : ''}`}
                    onClick={() => changeLanguage('en')}
                >EN</button>
            </div>
        </div>
    );
}