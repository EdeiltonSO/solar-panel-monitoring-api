export class DeviceNotEnabledError extends Error {
    constructor() {
      super('Dispositivo não habilitado.')
    }
  }