import { Device } from '@prisma/client'

import { DevicesRepository } from '@/repositories/devices-repository-interface'
import { LinksRepository } from '@/repositories/links-repository-interface'
import { DeviceNotFoundError } from './errors/device-not-found-error'

interface UpdateDeviceServiceRequest {
    user_id: string
    device: {
        id: string
        name: string
    }
}

interface UpdateDeviceServiceResponse {
    device: Device
}

export class UpdateDeviceService {
    constructor(
        private devicesRepository: DevicesRepository,
        private linksRepository: LinksRepository
    ) {}
  
    async execute({ user_id, device }: UpdateDeviceServiceRequest): Promise<UpdateDeviceServiceResponse> {
        const link = await this.linksRepository.findLinkBetweenUserIdAndDeviceId(user_id, device.id)

        if (!link) {
            throw new DeviceNotFoundError()
        }

        const data = {
            name: device.name
        }

        const updatedDevice = await this.devicesRepository.update(device.id, data)

        return { device: updatedDevice }
    }
}
