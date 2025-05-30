import { useState } from "react";
import './LanguageButton.css';

export default function LanguageButton() {
    const [lang, setLang] = useState('pl');
    const changeLanguage = (lang) => { 
        setLang(lang === 'pl' ? 'pl' : 'en');
        localStorage.setItem('lang', lang);
        window.dispatchEvent(new Event("storage")); // DODAJ TO!
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