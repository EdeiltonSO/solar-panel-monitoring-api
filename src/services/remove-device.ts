import { Device } from '@prisma/client'

import { DevicesRepository } from '@/repositories/devices-repository-interface'
import { LinksRepository } from '@/repositories/links-repository-interface'
import { DeviceNotFoundError } from './errors/device-not-found-error'

interface RemoveDeviceServiceRequest {
    user_id: string
    device_id: string
}

export class RemoveDeviceService {
    constructor(
        private devicesRepository: DevicesRepository,
        private linksRepository: LinksRepository
    ) {}
  
    async execute({ user_id, device_id }: RemoveDeviceServiceRequest): Promise<void> {
        const link = await this.linksRepository.findLinkBetweenUserIdAndDeviceId(user_id, device_id)

        if (!link) {
            throw new DeviceNotFoundError()
        }

        await this.devicesRepository.remove(device_id)
    }
}
