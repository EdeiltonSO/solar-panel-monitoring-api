export class DeviceNotFoundError extends Error {
    constructor() {
      super('Dispositivo não encontrado.')
    }
  }