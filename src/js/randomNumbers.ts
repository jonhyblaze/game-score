import { avatars } from './avatars'

export function randomNumbers(): any {
  let randomNumberOne = Math.floor(Math.random() * avatars.length)
  let randomNumberTwo = Math.floor(Math.random() * avatars.length)
  if (randomNumberOne !== randomNumberTwo) {
    return [randomNumberOne, randomNumberTwo]
  } else return randomNumbers()
}
