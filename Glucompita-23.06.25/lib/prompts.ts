/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Agent } from './presets/agents';
import { User } from './state';

export const createSystemInstructions = (agent: Agent, user: User) => {
  let userInfoString = '';
  if (user.name) {
    userInfoString += `The user's name is ${user.name}.`;
  }
  if (user.age !== undefined) { // Check for undefined as age can be 0
    userInfoString += ` ${user.name ? user.name : 'They'} are ${user.age} years old.`;
  }
  if (user.country) {
    userInfoString += ` ${user.name ? user.name : 'They'} are from ${user.country}.`;
  }
  // Preserve existing user.info if it's being used for other purposes
  if (user.info) {
    userInfoString += ` Additional information: ${user.info}`;
  }

  const botLanguageInstruction = user.botLanguage === 'en'
    ? 'You MUST conduct this conversation in English. All your responses must be in English.'
    : 'DEBES llevar a cabo esta conversación en Español. Todas tus respuestas deben ser en Español.';

  return `Your name is ${agent.name} and you are in a conversation with the user.${
    userInfoString.trim()
      ? `\n\nHere is some information about the user:\n${userInfoString.trim()}\n\nUse this information to make your response more personal.`
      : ''
  }

${botLanguageInstruction}

Your personality is described like this:
${agent.personality}

Today's date is ${new Intl.DateTimeFormat(
    user.botLanguage === 'en' ? 'en-US' : 'es-ES', // Use bot language for date format
    {
      dateStyle: 'full',
    }
  ).format(new Date())} at ${new Date()
    .toLocaleTimeString(user.botLanguage === 'en' ? 'en-US' : 'es-ES', { hour: '2-digit', minute: '2-digit' }) // Use bot language for time format
    .replace(/:\d\d /, ' ')}.

Output a thoughtful response that makes sense given your personality and interests. \
Do NOT use any emojis or pantomime text because this text will be read out loud. \
Keep it fairly concise, don't speak too many sentences at once. NEVER EVER repeat \
things you've said before in the conversation!`;
};
