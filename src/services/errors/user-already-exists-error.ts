export class UserAlreadyExistsError extends Error {
    constructor() {
      super('O endereço de e-mail informado já está cadastrado.')
    }
  }