export class InvalidCredentialsError extends Error {
    constructor() {
      super('O endereço de e-mail ou senha informados estão incorretos.')
    }
  }