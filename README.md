# Sistema de monitoramento de painel solar (API)

API do sistema de monitoramento de tensão e corrente do painel solar do núcleo temático em energias renováveis

## Requisitos funcionais (RF)

O que o usuário pode fazer na aplicação?

- [x] Se cadastrar;
- [x] Se autenticar;
- [x] Validar a conta via e-mail;
- [x] Cadastrar um novo dispositivo;
- [x] Editar o cadastro de um dispositivo;
- [x] Remover um dispositivo;
- [x] Que o usuário obtenha uma lista com seus dispositivos cadastrados;
- [x] Ativar/desativar um dispositivo;
- [x] Obter o perfil de um usuário logado;
- [x] Editar o perfil de um usuário logado;
- [x] Que o usuário altere a própria senha;
- [x] Salvar os status enviados por um dispositivo;
- [ ] Obter os status por dispositivo;
- [ ] Obter os status por usuário (agrupados por dispositivo);
- [ ] Obter um resumo do monitoramento atual (para o dashboard);
- [ ] Receber um e-mail de alerta em caso de mal funcionamento da placa solar;
- [ ] Que o usuário obtenha o histórico do monitoramento;
- [ ] Enviar os registros de status antigos por email e apagar do banco;

Note que esses requisitos não se transformam necessariamente em rotas HTTP na aplicação.

## Regras de negócio (RN)

Como os requisitos são implementados? Quais as restrições?

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário pode cadastrar mais de um dispositivo;
- [ ] Um dispositivo pode ser monitorado por mais de um usuário;
- [x] Deve haver uma forma de autenticar o dispositivo que envia os dados de status;
- [x] O dispositivo deve enviar o seu endereço MAC junto com a requisição;

## Requisitos não-funcionais (RNF)

Não partem da necessidade do cliente, têm relação com as soluções tecnológicas utilizadas.

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados de status devem estar persistidos em um banco PostgreSQL;
- [ ] As listas de status devem ser obtidas com paginação;
- [x] O usuário web deve ser identificado por um token JWT;

## Esquema do banco de dados

### Entidade User
- id
- name
- email
- password
- validated_at
- created_at

### Entidade Device
- id
- name
- mac
- enabled
- created_at

### Entidade Link
- id
- user_id
- device_id
- created_at

### Entidade Status
- id
- device_id
- voltage
- current
- created_at
