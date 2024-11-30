import { Device } from '@prisma/client'

import { DevicesRepository } from '@/repositories/devices-repository-interface'
import { LinksRepository } from '@/repositories/links-repository-interface'
import { DeviceNotFoundError } from './errors/device-not-found-error'

interface GetDevicesServiceRequest {
    user_id: string
}

interface GetDevicesServiceResponse {
    devices: Device[]
}

export class GetDevicesService {
    constructor(
        private devicesRepository: DevicesRepository,
    ) {}
  
    async execute({ user_id }: GetDevicesServiceRequest): Promise<GetDevicesServiceResponse> {
        const devices = await this.devicesRepository.findManyByUserId(user_id)

        if(!devices) {
            return { devices: [] }
        }

        return { devices }
    }
}
