import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Johnny Test',
      email: 'test@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  }),

  it('should not be able to register with same email twice', async () => {  
    const email = 'test@example.com'
  
    await sut.execute({
      name: 'Johnny Test',
      email,
      password: '123456',
    })
  
    await expect(() =>
      sut.execute({
        name: 'Johnny Test',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  }),

  it('should be able to register', async () => {  
    const { user } = await sut.execute({
      name: 'Johnny Test',
      email: 'test@example.com',
      password: '123456',
    })
  
    expect(user.id).toEqual(expect.any(String))
  })
})