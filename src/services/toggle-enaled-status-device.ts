import { Device } from '@prisma/client'

import { DevicesRepository } from '@/repositories/devices-repository-interface'
import { LinksRepository } from '@/repositories/links-repository-interface'
import { DeviceNotFoundError } from './errors/device-not-found-error'

interface ToggleEnabledStatusDeviceServiceRequest {
    user_id: string
    device: {
        id: string
        enabled: boolean
    }
}

interface ToggleEnabledStatusDeviceServiceResponse {
    device: Device
}

export class ToggleEnabledStatusDeviceService {
    constructor(
        private devicesRepository: DevicesRepository,
        private linksRepository: LinksRepository
    ) {}
  
    async execute({ user_id, device }: ToggleEnabledStatusDeviceServiceRequest): Promise<ToggleEnabledStatusDeviceServiceResponse> {
        const deviceToToggleEnabledStatus = await this.devicesRepository.findById(device.id)

        if (!deviceToToggleEnabledStatus) {
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

        const updatedDevice = await this.devicesRepository.toggleEnabledStatus(device.id, device.enabled)

        return { device: updatedDevice }
    }
}
