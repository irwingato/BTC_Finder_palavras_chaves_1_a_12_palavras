import { generate as randomWords } from 'random-words';
import fs from 'fs';

const generateRandomWords = () => {
  const numWords = Math.floor(Math.random() * 12) + 1;
  const words = [];

  for (let i = 0; i < numWords; i++) {
    words.push(randomWords());
  }

  return words.join(' ');
};

const intervalId = setInterval(() => {
  const generatedWords = generateRandomWords();
  fs.appendFile('output.txt', `${generatedWords}\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}, 1000);

process.on('SIGINT', () => {
  clearInterval(intervalId);
  console.log('Geração de palavras interrompida.');
  process.exit();
});