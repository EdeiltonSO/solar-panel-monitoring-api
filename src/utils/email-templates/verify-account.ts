import { User } from "@prisma/client";

export async function verifyAccountEmailTemplate(user: User) {

  return (`<h1>Olá, ${user.name}!</h1>
  <br />
  <p>Seu código de verificação da conta é:</p>
  <br />
  <h1>${user.maintenance_code}</h1>`)
}