import { useState } from "react";
import './LanguageButton.css';

export default function LanguageButton() {
    const [lang, setLang] = useState('pl');
    const changeLanguage = (lang) => { 
        setLang(lang === 'pl' ? 'pl' : 'en');
        localStorage.setItem('lang', lang);
    }
    return (
        <div className='lang-switch-containerIN'>
            <div className='lang-btn-containerIN'>
                <button 
                    className={`lang-btnIN${lang === 'pl' ? ' activeIN' : ''}`}
                    onClick={() => setLang('pl')}
                >PL</button>
                <button 
                    className={`lang-btnIN${lang === 'en' ? ' activeIN' : ''}`}
                    onClick={() => setLang('en')}
                >EN</button>
            </div>
        </div>
    );
}