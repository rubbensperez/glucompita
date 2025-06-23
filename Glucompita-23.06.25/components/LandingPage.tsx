/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { useUser } from '@/lib/state';

interface LandingPageProps {
  onComplete: () => void;
  logoSrc: string;
}

// Content is now in English, with checkmarks prepended and updated benefits
const pageText = {
  welcome: 'Welcome to Glucompita!',
  subWelcome: 'With him you’ll be able to:',
  benefit1: 'Get personalized suggestions to lower your glucose levels',
  benefit2: 'Receive tailored diet recommendations based on your habits',
  benefit3: 'Learn what to do when your sugar is too high or too low',
  benefit4: 'Stay motivated with small goals and health tips',
  benefit5: 'Chat with an assistant that truly understands diabetes care',
  cta: 'Click here and talk to him directly!',
  instruction: 'First, select the language in which Glucompita will advise you:',
  // botLanguageLabel: "Bot's preferred language:", // Removed this label
  botLanguageEnglish: 'English',
  botLanguageSpanish: 'Spanish',
  submitButton: 'Start Chatting with Glucompita',
};

export default function LandingPage({ onComplete, logoSrc }: LandingPageProps) {
  const [selectedBotLanguage, setSelectedBotLanguage] = useState<'en' | 'es'>('es'); // Default bot language
  const { setBotLanguage: setGlobalBotLanguage } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalBotLanguage(selectedBotLanguage);
    onComplete();
  };

  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <img src={logoSrc} alt="Clínicas del Azúcar Logo" className="landing-logo" />
        <h1>{pageText.welcome}</h1>
        <p className="sub-welcome">{pageText.subWelcome}</p>
        <ul className="benefits-list">
          <li><span className="benefit-checkmark">✓ </span>{pageText.benefit1}</li>
          <li><span className="benefit-checkmark">✓ </span>{pageText.benefit2}</li>
          <li><span className="benefit-checkmark">✓ </span>{pageText.benefit3}</li>
          <li><span className="benefit-checkmark">✓ </span>{pageText.benefit4}</li>
          <li><span className="benefit-checkmark">✓ </span>{pageText.benefit5}</li>
        </ul>
        <h2>{pageText.cta}</h2>
        <p>{pageText.instruction}</p>
        <form onSubmit={handleSubmit} className="landing-form" aria-labelledby="form-heading">
          <h3 id="form-heading" className="sr-only">Initial Setup</h3> {/* Screen reader text also in English */}
          <div className="form-group form-group-center">
            {/* The <label> element has been removed */}
            <select
              id="bot-language"
              value={selectedBotLanguage}
              onChange={(e) => setSelectedBotLanguage(e.target.value as 'en' | 'es')}
              aria-required="true"
              aria-label="Bot's communication language" // Added aria-label for accessibility
            >
              <option value="es">{pageText.botLanguageSpanish}</option>
              <option value="en">{pageText.botLanguageEnglish}</option>
            </select>
          </div>
          <button type="submit" className="submit-button primary">
            {pageText.submitButton}
          </button>
        </form>
      </div>
    </div>
  );
}