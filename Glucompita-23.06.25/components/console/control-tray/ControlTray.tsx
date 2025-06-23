/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
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

import cn from 'classnames';

import { memo, ReactNode, useEffect, useRef, useState } from 'react';
import { AudioRecorder } from '../../../lib/audio-recorder';

import { useLiveAPIContext } from '../../../contexts/LiveAPIContext';
import { useUI } from '@/lib/state';
// FIX: Import EventEmitter and AudioRecorderEventTypes if not already for casting (assuming AudioRecorder exports its event types or they are accessible)
import EventEmitter from 'eventemitter3';
// Assuming AudioRecorderEventTypes is exported or accessible, otherwise define/import appropriately.
// For this fix, we'll assume AudioRecorderEventTypes can be imported or derived if AudioRecorder is a typed EventEmitter.
// If AudioRecorder.ts defines `interface AudioRecorderEventTypes`, it needs to be exported or defined here.
// For now, let's assume it's available somehow for the cast to work.
// If not, one might need to use `Parameters<AudioRecorder['on']>[1]` etc. or define a local interface.
// Let's assume AudioRecorderEventTypes is available from lib/audio-recorder
// import { AudioRecorderEventTypes } from '../../../lib/audio-recorder'; // This import might be needed if not implicitly available

// A local definition for clarity if the type isn't easily importable or to avoid import if not strictly necessary by the problem setup
interface LocalAudioRecorderEventTypes {
  data: (data: string) => void;
  volume: (volume: number) => void;
}


export type ControlTrayProps = {
  children?: ReactNode;
};

function ControlTray({ children }: ControlTrayProps) {
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [muted, setMuted] = useState(false);
  const connectButtonRef = useRef<HTMLButtonElement>(null);

  const { showAgentEdit, showUserConfig } = useUI();
  const { client, connected, connect, disconnect } = useLiveAPIContext();

  // Stop the current agent if the user is editing the agent or user config
  useEffect(() => {
    if (showAgentEdit || showUserConfig) {
      if (connected) disconnect();
    }
  }, [showUserConfig, showAgentEdit, connected, disconnect]);

  useEffect(() => {
    if (!connected && connectButtonRef.current) {
      connectButtonRef.current.focus();
    }
  }, [connected]);

  useEffect(() => {
    const onData = (base64: string) => {
      client.sendRealtimeInput([
        {
          mimeType: 'audio/pcm;rate=16000',
          data: base64,
        },
      ]);
    };
    if (connected && !muted && audioRecorder) {
      // FIX: 'on' method should be correctly typed due to AudioRecorder extending EventEmitter<AudioRecorderEventTypes>
      // Applying cast to EventEmitter as seen in other parts of the codebase and separating chained call
      (audioRecorder as EventEmitter<LocalAudioRecorderEventTypes>).on('data', onData);
      audioRecorder.start();
    } else {
      audioRecorder.stop();
    }
    return () => {
      // FIX: 'off' method should be correctly typed
      // Applying cast to EventEmitter as seen in other parts of the codebase
      (audioRecorder as EventEmitter<LocalAudioRecorderEventTypes>).off('data', onData);
    };
  }, [connected, client, muted, audioRecorder]);

  return (
    <section className="control-tray">
      <nav className={cn('actions-nav', { disabled: !connected })}>
        <button
          className={cn('action-button mic-button')}
          onClick={() => setMuted(!muted)}
        >
          {!muted ? (
            <span className="material-symbols-outlined filled">mic</span>
          ) : (
            <span className="material-symbols-outlined filled">mic_off</span>
          )}
        </button>
        {children}
      </nav>

      <div className={cn('connection-container', { connected })}>
        <div className="connection-button-container">
          <button
            ref={connectButtonRef}
            className={cn('action-button connect-toggle', { connected })}
            onClick={connected ? disconnect : connect}
          >
            <span className="material-symbols-outlined filled">
              {connected ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>
        <span className="text-indicator">Streaming</span>
      </div>
    </section>
  );
}

export default memo(ControlTray);