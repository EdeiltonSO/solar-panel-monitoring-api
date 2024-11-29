import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository-interface'
import { UserNotFoundError } from '@/services/errors/user-not-found-error'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    return !user ? null : user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    return !user ? null : user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      validated_at: null,
      created_at: new Date(),
      maintenance_code: null,
      maintenance_code_created_at: null
    }

    this.items.push(user)

    return user
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const userIndex = this.items.findIndex((item) => item.id === id);

    if (userIndex === -1) {
        throw new UserNotFoundError();
    }

    const user = this.items[userIndex];

    const updatedUser = {
        ...user,
        ...data,
    };

    this.items[userIndex] = updatedUser as User;

    return updatedUser as User;
  }

  async validate(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
        throw new UserNotFoundError();
    }

    user.validated_at = new Date();
    return { validated_at: user.validated_at };
  }

  async changePassword(id: string, newPasswordHash: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
        throw new UserNotFoundError();
    }

    user.password_hash = newPasswordHash;

    return user;
  }

  async generateMaintenanceCode(id: string, maintenanceCode: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
        throw new UserNotFoundError();
    }

    user.maintenance_code = maintenanceCode;
    user.maintenance_code_created_at = new Date();
  }

  async remove(id: string) {
    const userIndex = this.items.findIndex((item) => item.id === id);

    if (userIndex === -1) {
        throw new UserNotFoundError();
    }

    this.items.splice(userIndex, 1);
  }
}