Glucompita-23.06.25/App.tsx
↓
App.tsx

/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';
import AgentEdit from './components/AgentEdit';
import ControlTray from './components/console/control-tray/ControlTray';
import ErrorScreen from './components/demo/ErrorSreen';
import KeynoteCompanion from './components/demo/keynote-companion/KeynoteCompanion';
import Header from './components/Header';
import UserSettings from './components/UserSettings';
import LandingPage from './components/LandingPage'; // Import the new LandingPage component
import { LiveAPIProvider } from './contexts/LiveAPIContext';
import { useUI } from './lib/state'; // Removed useUser as it's not directly used here for now

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== 'string') {
  throw new Error(
    'Missing required environment variable: REACT_APP_GEMINI_API_KEY'
  );
}

/**
 * Main application component that provides a streaming interface for Live API.
 * Manages video streaming state and provides controls for webcam/screen capture.
 */
function App() {
  const { showUserConfig, showAgentEdit } = useUI();
  const [showLandingPage, setShowLandingPage] = useState(true);
  // Use the new logo URL.
  const logoSrc = "https://cdn.prod.website-files.com/62cd9366ec85a7c22af5bc6f/68597a073b57c1d9f1a5924e_Logo%20clinicas%20.png";


  const handleLandingComplete = () => {
    setShowLandingPage(false);
  };

  if (showLandingPage) {
    return <LandingPage onComplete={handleLandingComplete} logoSrc={logoSrc} />;
  }

  return (
    <div className="App">
      <LiveAPIProvider apiKey={API_KEY}>
        <ErrorScreen />
        <Header />

        {showUserConfig && <UserSettings />}
        {showAgentEdit && <AgentEdit />}
        <div className="streaming-console">
          <main>
            <div className="main-app-area">
              <KeynoteCompanion />
            </div>

            <ControlTray></ControlTray>
          </main>
        </div>
      </LiveAPIProvider>
      {/* Logo de Clínicas del Azúcar. */}
      <img src={logoSrc} alt="Clínicas del Azúcar Logo" className="app-logo" />
    </div>
  );
}

export default App;
