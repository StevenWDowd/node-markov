/** Textual markov chain generator. */

const _ = require("lodash");

class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  /**
   * Uses the instance's words array to generate an object whose keys are
   * the words and whose values are lists of words that follow the key in
   * the original text.
   */
  getChains() {
    // TODO: Refactor for efficiency. Frequency counter approach.
    const chainResults = {};
    for (const word of this.words) {
      const followerList = [];
      for (let i = 0; i < this.words.length; i++) {
        if (word === this.words[i]) {
          if (i <= this.words.length - 2) {
            followerList.push(this.words[i + 1]);
          } else {
            followerList.push(null);
          }
        }
        chainResults[word] = followerList;

      }
    }
    return chainResults;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  // - start at the first word in the input text
  // - find a random word from the following-words of that
  // - repeat until reaching the terminal null

  /**
   * Generates text using the chains on the Markov machine, stopping once it
   * hits a null value.
   */
  getText() {
    let current = this.words[0];
    let text = [];

    while (current) {
      text.push(current);
      current = _.sample(this.chains[current]);
    }

    return text.join(' ');
    //   let text = [];

    //   for (let current of this.words) {
    //     text.push(current, _.sample(this.chains[current]));
    //   }
    //   return text.join(' ');
  }

}

module.exports = {
  MarkovMachine
};
