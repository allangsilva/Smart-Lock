'use strict';

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

app.use(
  new Alexa(),
  new GoogleAssistant(),
  new JovoDebugger(),
  new FileDb()
);

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  LAUNCH() {
    return this.toIntent('HelloIntent')
  },

  HelloIntent() {
    this.$speech.addText('Seja Bem-Vindo! Você gostaria destrancar a porta? Checar o status? Ou trancar a porta?');
    this.$reprompt.addText('Por favor, diga trancar porta, checar status da minha porta, ou destravar para controlar sua porta.');
    return this.ask(this.$speech, this.$reprompt);
  },

  LockIntent() {

    const expectedLockPrompt = 'Porta trancada!';
    const expectedUnlockPrompt = 'Porta destrancada!';
    const lockStatus = this.$inputs.lockStatus.value;

    if( lockStatus === "travar" ) {
      this.$speech.addText(expectedLockPrompt);
    } else {
      this.$speech.addText(expectedUnlockPrompt);
    }

    this.tell(this.$speech);
  },
});

module.exports = { app };
