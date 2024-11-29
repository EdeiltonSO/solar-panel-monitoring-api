import { Device } from '@prisma/client'

import { DevicesRepository } from '@/repositories/devices-repository-interface'
import { LinksRepository } from '@/repositories/links-repository-interface'
import { DeviceAlreadyExistsError } from './errors/device-already-exists-error'

interface AddDeviceServiceRequest {
    user_id: string
    device: {
        name: string
        mac: string
    }
}

interface AddDeviceServiceResponse {
    device: Device
}

export class AddDeviceService {
    constructor(
        private devicesRepository: DevicesRepository,
        private linksRepository: LinksRepository
    ) {}
  
    async execute({ user_id, device }: AddDeviceServiceRequest): Promise<AddDeviceServiceResponse> {
        const deviceWithSameMAC = await this.devicesRepository.findByMac(device.mac)

        if (deviceWithSameMAC) {
            throw new DeviceAlreadyExistsError()
        }

        const newDevice = await this.devicesRepository.create(device)

        await this.linksRepository.create({
            device_id: newDevice.id,
            user_id
        })

        return { device: newDevice }
    }
}
