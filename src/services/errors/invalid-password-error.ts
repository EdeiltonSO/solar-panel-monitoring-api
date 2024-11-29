export class InvalidPasswordError extends Error {
    constructor() {
      super('A senha informada está incorreta.')
    }
  }