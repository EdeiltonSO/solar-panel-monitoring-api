import { Device } from '@prisma/client'

import { DevicesRepository } from '@/repositories/devices-repository-interface'
import { LinksRepository } from '@/repositories/links-repository-interface'
import { DeviceNotFoundError } from './errors/device-not-found-error'

interface RemoveDeviceServiceRequest {
    user_id: string
    device_id: string
}

// interface RemoveDeviceServiceResponse {
//     device: Device
// }

export class RemoveDeviceService {
    constructor(
        private devicesRepository: DevicesRepository,
        private linksRepository: LinksRepository
    ) {}
  
    async execute({ user_id, device_id }: RemoveDeviceServiceRequest): Promise<void> {
        const deviceToRemove = await this.devicesRepository.findById(device_id)

        if (!deviceToRemove) {
            throw new DeviceNotFoundError()
        }

        const links = await this.linksRepository.findManyByUserId(user_id)

        if (!links) {
            throw new DeviceNotFoundError()
        }

        let deviceBelongsToUser = false
        links.map((link) => {
            if (link.device_id === device_id) {
                deviceBelongsToUser = true
            }
        })

        if (!deviceBelongsToUser) {
            throw new DeviceNotFoundError()
        }

        await this.devicesRepository.remove(device_id)
    }
}
