import { Status } from '@prisma/client'

import { DevicesRepository } from '@/repositories/devices-repository-interface'
import { StatusRepository } from '@/repositories/status-repository-interface'
import { DeviceNotFoundError } from './errors/device-not-found-error'
import { DeviceNotEnabledError } from './errors/device-not-enabled-error'

interface AddStatusServiceRequest {
    device_mac: string
    status: {
        voltage: number
        current: number
    }
}

interface AddStatusServiceResponse {
    status: Status
}

export class AddStatusService {
    constructor(
        private devicesRepository: DevicesRepository,
        private statusRepository: StatusRepository
    ) {}

    async execute({ device_mac, status }: AddStatusServiceRequest): Promise<AddStatusServiceResponse> {
        const device = await this.devicesRepository.findByMac(device_mac)

        if (!device) {
            throw new DeviceNotFoundError()
        }

        if (!device.enabled) {
            throw new DeviceNotEnabledError()
        }

        const newStatus = await this.statusRepository.create({
            device_id: device.id,
            voltage: status.voltage,
            current: status.current
        })

        return { status: newStatus }
    }
}
