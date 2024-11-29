export class PasswordsNotMatchError extends Error {
  constructor() {
    super('As senhas não conferem.')
  }
}