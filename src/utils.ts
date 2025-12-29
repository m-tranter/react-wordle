
import { words } from "./six_letter_words.ts"

function getRandomIndex(arr: string[]): number {
  return Math.floor(Math.random() * arr.length)
}

export function getRandomWord(): string {
  return words[getRandomIndex(words)];
}

export const classes = (...strs: string[]) => {
  return strs.join(' ');
};

