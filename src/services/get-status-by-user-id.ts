import { Device, Status } from '@prisma/client';

import { StatusRepository } from '@/repositories/status-repository-interface';
import { DevicesRepository } from '@/repositories/devices-repository-interface';
import { DeviceNotFoundError } from './errors/device-not-found-error';

interface GetStatusByUserIdServiceRequest {
    user_id: string;
}

interface GetStatusByUserIdServiceResponse {
    device: Device;
    status: Status[];
}

export class GetStatusByUserIdService {
    constructor(
        private devicesRepository: DevicesRepository,
        private statusRepository: StatusRepository
    ) {}

    async execute({ user_id }: GetStatusByUserIdServiceRequest): Promise<GetStatusByUserIdServiceResponse[]> {
        const devices = await this.devicesRepository.findManyByUserId(user_id);

        if (!devices || devices.length === 0) {
            throw new DeviceNotFoundError();
        }

        const statusSortedByDevice = await Promise.all(
            devices.map(async (device) => {
                let status = await this.statusRepository.findManyByDeviceId(device.id);
                if (!status) {
                    status = [];
                }
                return { device, status };
            })
        );

        return statusSortedByDevice;
    }
}
