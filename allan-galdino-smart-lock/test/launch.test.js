'use strict';

const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');

jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant()]) {
  const testSuite = p.makeTestSuite();

  describe(`PLATFORM: ${p.constructor.name} INTENTS`, () => {
    test('should return a welcome message and ask for door instructions at "LAUNCH"', async () => {
      const conversation = testSuite.conversation();

      const launchRequest = await testSuite.requestBuilder.launch();
      const response = await conversation.send(launchRequest);

      expect(response.isAsk(expectedLaunchPrompt, expectedLaunchReprompt)).toBe(true);
    });
  });
}

let expectedLaunchPrompt = 'Seja Bem-Vindo! Você gostaria destrancar a porta? Checar o status? Ou trancar a porta?';
let expectedLaunchReprompt = 'Por favor, diga trancar porta, checar status da minha porta, ou destravar para controlar sua porta.';