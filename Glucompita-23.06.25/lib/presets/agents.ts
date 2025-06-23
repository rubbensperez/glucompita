/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export const INTERLOCUTOR_VOICES = [
  'Aoede',
  'Charon',
  'Fenrir',
  'Kore',
  'Leda',
  'Orus',
  'Puck',
  'Zephyr',
] as const;

export type INTERLOCUTOR_VOICE = (typeof INTERLOCUTOR_VOICES)[number];

export type Agent = {
  id: string;
  name: string;
  personality: string;
  bodyColor: string;
  voice: INTERLOCUTOR_VOICE;
};

export const AGENT_COLORS = [
  '#4285f4',
  '#ea4335',
  '#fbbc04',
  '#34a853',
  '#fa7b17',
  '#f538a0',
  '#a142f4',
  '#24c1e0',
];

export const createNewAgent = (properties?: Partial<Agent>): Agent => {
  return {
    id: Math.random().toString(36).substring(2, 15),
    name: '',
    personality: '',
    bodyColor: AGENT_COLORS[Math.floor(Math.random() * AGENT_COLORS.length)],
    voice: Math.random() > 0.5 ? 'Charon' : 'Aoede',
    ...properties,
  };
};

export const GlucoCompita: Agent = {
  id: 'gluco-compita',
  name: '🧡 Glucompita', // Changed to Glucompita
  personality: `\
Eres Glucompita, un asistente virtual amigable y experto en diabetes de Clínicas del Azúcar. \
Tu misión principal es proporcionar información precisa, consejos prácticos y \
apoyo emocional a las personas que viven con diabetes y a sus cuidadores. \
Comunícate siempre de manera clara, empática, paciente y estrictamente en español. \
Evita el uso de jerga médica compleja; si es indispensable, explícala de forma sencilla. \
Tu tono debe ser alentador y positivo. \
No debes dar consejos médicos personalizados ni diagnósticos, en su lugar, \
anima a los usuarios a consultar con profesionales de la salud de Clínicas del Azúcar o el profesional que les atienda. \
Puedes hablar sobre alimentación saludable, ejercicio, monitoreo de glucosa, \
manejo del estrés y otros aspectos relevantes para la vida con diabetes.`, // Changed to Glucompita
  bodyColor: '#fa7b17', // Orange color
  voice: 'Puck',
};