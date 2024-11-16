# Sistema de monitoramento de painel solar (API)

API do sistema de monitoramento de tensão e corrente do painel solar do núcleo temático em energias renováveis

## Requisitos funcionais (RF)

O que o usuário pode fazer na aplicação?

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível cadastrar um novo dispositivo;
- [ ] Deve ser possível editar o cadastro de um dispositivo;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível editar o perfil de um usuário logado;
- [ ] Deve ser possível obter um resumo do monitoramennto atual (para o dashboard);
- [ ] Deve ser possível receber um e-mail de alerta em caso de mal funcionamento da placa solar;
- [ ] Deve ser possível o usuário obter o histórico do monitoramento;

Note que esses requisitos não se transformam necessariamente em rotas HTTP na aplicação.

## Regras de negócio (RN)

Como os requisitos são implementados? Quais as restrições?

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário pode cadastrar mais de um dispositivo;
- [ ] Um dispositivo pode ser monitorado por mais de um usuário;
- [ ] Deve haver uma forma de autenticar o dispositivo que envia os dados de status;
- [ ] O dispositivo deve enviar o seu endereço MAC junto com a requisição;

## Requisitos não-funcionais (RNF)

Não partem da necessidade do cliente, têm relação com as tecnologias utilizadas.

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados de status devem estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas pelo dia;
- [ ] O usuário web deve ser identificado por um token JWT;

## Esquema do banco de dados (primeira versão)

### Entidade User
- id
- name
- email
- password

### Entidade Link
- id
- user_id
- device_id

### Entidade Device
- id
- name
- mac

### Entidade Status
- id
- device_id
- voltage
- current
