export class SendingEmailError extends Error {
  constructor() {
    super('Um erro ocorreu ao enviar o e-mail.')
  }
}
