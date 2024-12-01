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
        const link = await this.linksRepository.findLinkBetweenUserIdAndDeviceId(user_id, device.id)

        if (!link) {
            throw new DeviceNotFoundError()
        }

        const updatedDevice = await this.devicesRepository.toggleEnabledStatus(device.id, device.enabled)

        return { device: updatedDevice }
    }
}
