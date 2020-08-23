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
    let expectedLaunchPrompt = 'Seja Bem-Vindo! Você gostaria destrancar a porta? Checar o status? Ou trancar a porta?';
    let expectedLaunchReprompt = 'Por favor, diga trancar porta, checar status da minha porta, ou destravar para controlar sua porta.';
    return this.ask(expectedLaunchPrompt, expectedLaunchReprompt);
  },

  MyNameIsIntent() {
    this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
  },
});

module.exports = { app };
