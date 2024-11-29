import { User } from "@prisma/client";

export function resetPasswordEmailTemplate(user: User) {
  return (`<h1>Olá, ${user.name}!</h1>
  <br />
  <p>Seu código de redefinição de senha da conta é:</p>
  <br />
  <h1>${user.maintenance_code}</h1>`)
}