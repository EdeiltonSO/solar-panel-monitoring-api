import { Status } from '@prisma/client'

import { StatusRepository } from '@/repositories/status-repository-interface'
import { LinksRepository } from '@/repositories/links-repository-interface'
import { DeviceNotFoundError } from './errors/device-not-found-error'

interface GetStatusByDeviceIdServiceRequest {
    device_id: string
    user_id: string
}

interface GetStatusByDeviceIdServiceResponse {
    status: Status[]
}

export class GetStatusByDeviceIdService {
    constructor(
        private linksRepository: LinksRepository,
        private statusRepository: StatusRepository
    ) {}

    async execute({ device_id, user_id }: GetStatusByDeviceIdServiceRequest): Promise<GetStatusByDeviceIdServiceResponse> {
        const link = await this.linksRepository.findLinkBetweenUserIdAndDeviceId(user_id, device_id)

        if (!link) {
            throw new DeviceNotFoundError()
        }

        const status = await this.statusRepository.findManyByDeviceId(device_id)

        if (!status) {
            return { status: [] }
        }

        return { status }
    }
}
