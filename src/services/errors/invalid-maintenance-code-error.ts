export class InvalidMaintenanceCodeError extends Error {
  constructor() {
    super('O código informado não é válido.')
  }
}