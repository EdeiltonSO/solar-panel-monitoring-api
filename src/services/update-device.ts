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
        const deviceToUpdate = await this.devicesRepository.findById(device.id)

        if (!deviceToUpdate) {
            throw new DeviceNotFoundError()
        }

        const links = await this.linksRepository.findManyByUserId(user_id)

        if (!links) {
            throw new DeviceNotFoundError()
        }

        let deviceBelongsToUser = false
        links.map((link) => {
            if (link.device_id === device.id) {
                deviceBelongsToUser = true
            }
        })

        if (!deviceBelongsToUser) {
            throw new DeviceNotFoundError()
        }

        const data = {
            name: device.name
        }

        const updatedDevice = await this.devicesRepository.update(device.id, data)

        return { device: updatedDevice }
    }
}
