'use strict';

const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');

jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant()]) {
  const testSuite = p.makeTestSuite();

  describe(`PLATFORM: ${p.constructor.name} INTENTS`, () => {
    test('should return LOCKED status at "LockIntent"', async () => {
      const conversation = testSuite.conversation();

      const lockRequest = await testSuite.requestBuilder.intent('LockIntent', { lockStatus: 'travar' });
      const response = await conversation.send(lockRequest);

      expect(response.isTell(expectedLockPrompt)).toBe(true);
    });
  });

  describe(`PLATFORM: ${p.constructor.name} INTENTS`, () => {
    test('should return UNLOCKED status at "LockIntent"', async () => {
      const conversation = testSuite.conversation();

      const lockRequest = await testSuite.requestBuilder.intent('LockIntent', { lockStatus: 'destravar' });
      const response = await conversation.send(lockRequest);

      expect(response.isTell(expectedUnlockPrompt)).toBe(true);
    });
  });
}

let expectedLockPrompt = 'Porta trancada!';
let expectedUnlockPrompt = 'Porta destrancada!';
