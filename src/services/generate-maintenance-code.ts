import { UsersRepository } from '@/repositories/users-repository-interface'
import { UserNotFoundError } from './errors/user-not-found-error'
import { differenceInMilliseconds } from 'date-fns'
import { sendEmail } from '@/utils/sendEmail'
import { customAlphabet } from 'nanoid'
import { resetPasswordEmailTemplate } from '@/utils/email-templates/reset-password'

interface GenerateMaintenanceCodeServiceRequest {
  email: string
}

interface GenerateMaintenanceCodeServiceResponse {
  waiting_time?: number
}

export class GenerateMaintenanceCodeService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    email
  }: GenerateMaintenanceCodeServiceRequest): Promise<GenerateMaintenanceCodeServiceResponse> {
    let user = await this.usersRepository.findByEmail(email)
    if (!user) { throw new UserNotFoundError() }

    if (user.maintenance_code_created_at) {
      const TEN_MINUTES_IN_MILISSECONDS = 10 * 60 * 1000
      const diff = differenceInMilliseconds(new Date(), user.maintenance_code_created_at)

      if (diff < TEN_MINUTES_IN_MILISSECONDS) {
        return {
          waiting_time: TEN_MINUTES_IN_MILISSECONDS - diff
        }
      }
    }

    const nanoid = customAlphabet('1234567890', 6);
    const maintenance_code = nanoid()
    const maintenance_code_created_at = new Date()

    await this.usersRepository.generateMaintenanceCode(
      email,
      maintenance_code,
    )

    user = {
      ...user,
      maintenance_code,
      maintenance_code_created_at
    }

    sendEmail(user, 'Seu código de redefinição de senha  do Sistema de Monitoramento de Placas Solares', resetPasswordEmailTemplate(user))

    return {}
  }
}