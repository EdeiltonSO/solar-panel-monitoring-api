export class DeviceAlreadyExistsError extends Error {
    constructor() {
      super('O dispositivo informado já está cadastrado.')
    }
  }