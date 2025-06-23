/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';
import { Agent, GlucoCompita } from './presets/agents';

/**
 * User
 */
export type User = {
  name?: string;
  info?: string;
  age?: number;
  country?: string;
  botLanguage?: 'en' | 'es'; // Added botLanguage
};

export const useUser = create<
  {
    setName: (name: string) => void;
    setInfo: (info: string) => void;
    setAge: (age: number | undefined) => void;
    setCountry: (country: string) => void;
    setBotLanguage: (lang: 'en' | 'es') => void; // Added setBotLanguage
  } & User
>(set => ({
  name: '',
  info: '',
  age: undefined,
  country: '',
  botLanguage: 'es', // Default to Spanish
  setName: name => set({ name }),
  setInfo: info => set({ info }),
  setAge: age => set({ age }),
  setCountry: country => set({ country }),
  setBotLanguage: botLanguage => set({ botLanguage }), // Added setter
}));

/**
 * Agents
 */
function getAgentById(id: string) {
  const { availablePersonal, availablePresets } = useAgent.getState();
  return (
    availablePersonal.find(agent => agent.id === id) ||
    availablePresets.find(agent => agent.id === id)
  );
}

export const useAgent = create<{
  current: Agent;
  availablePresets: Agent[];
  availablePersonal: Agent[];
  setCurrent: (agent: Agent | string) => void;
  addAgent: (agent: Agent) => void;
  update: (agentId: string, adjustments: Partial<Agent>) => void;
}>(set => ({
  current: GlucoCompita,
  availablePresets: [GlucoCompita],
  availablePersonal: [],

  addAgent: (agent: Agent) => {
    set(state => ({
      availablePersonal: [...state.availablePersonal, agent],
      current: agent,
    }));
  },
  setCurrent: (agent: Agent | string) =>
    set({ current: typeof agent === 'string' ? getAgentById(agent) : agent }),
  update: (agentId: string, adjustments: Partial<Agent>) => {
    let agent = getAgentById(agentId);
    if (!agent) return;
    const updatedAgent = { ...agent, ...adjustments };
    set(state => ({
      availablePresets: state.availablePresets.map(a =>
        a.id === agentId ? updatedAgent : a
      ),
      availablePersonal: state.availablePersonal.map(a =>
        a.id === agentId ? updatedAgent : a
      ),
      current: state.current.id === agentId ? updatedAgent : state.current,
    }));
  },
}));

/**
 * UI
 */
export const useUI = create<{
  showUserConfig: boolean;
  setShowUserConfig: (show: boolean) => void;
  showAgentEdit: boolean;
  setShowAgentEdit: (show: boolean) => void;
}>(set => ({
  showUserConfig: false, // Changed default to false
  setShowUserConfig: (show: boolean) => set({ showUserConfig: show }),
  showAgentEdit: false,
  setShowAgentEdit: (show: boolean) => set({ showAgentEdit: show }),
}));
