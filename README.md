
# Projeto barbearias FRONT END

## Para inicar o projeto

Para rodar é necessário ter o NODE-JS instalado em sua máquina e ter o back-end baixado e rodando.

O back end está nesse repositório https://github.com/henrique-da-silva-costa/portifolio-back.

Após isso, no terminal rode npm start, caso apareça um erro relacionado a essa pasta src\sdk\pagseguro.js, rode npm audit fix no terminal.

Esse erro acontece porque a API do PagSeguro não tem um suporte muito bom para o ReactJS, sendo assim da esse erro.

## DESCRIÇÃO

Esse projeto é um sistema voltado para barbearias.

Nesse sistema você pode criar um usuário master (barbeiro) e assim você consegue cadastrar barbearias e administrá-las como, por exemplo, modificar, excluir e adicionar serviços e horários a suas barbearias cadastradas pelo seu usuário.

E você também pode criar um usuário comum(cliente) que pode fazer a reserva nas barbearias disponíveis, que são as que tem horários e serviços cadastrados.

Nesse sistema na parte de fazer a reserva tem uma integração de pagamento usando a API do PagSeguro, mas não está homologada, sendo assim faz o pagamento, mas não é pago realmente só é aprovado dentro do ambiente do PagSeguro que eu tenho acesso.

## TELAS

### Login

![Captura de Tela (41)](https://github.com/user-attachments/assets/23463bb7-b51b-481b-8d4a-c152fbc03972)

Tela de login de usuário normal 

### Home - Pagina principal

![Captura de Tela (63)](https://github.com/user-attachments/assets/2ee10c86-0479-4eb6-b932-fe5f7a9cca00)

Essa tela lista todas as barbearias disponíveis e tem um filtro por CEP, Estado e cidade

E também aqui você pode ir para a página de agendamento clicando no botão AGENDAR HORÁRIO.

### Reserva - horário/serviço

![Captura de Tela (64)](https://github.com/user-attachments/assets/ef9dbda7-e0d7-48f2-8734-f42d00f3c76d)

![Captura de Tela (65)](https://github.com/user-attachments/assets/56e635f8-e44f-411a-8438-4392adf21d96)

Nessas telas você pode ver os horários e serviços disponíveis para reserva

### Reserva

![Captura de Tela (67)](https://github.com/user-attachments/assets/ed66ab13-691e-4ef3-93be-4fd5e95e9613)

Nessa mesma tela, ao clicar no botão AGENDAR HORÁRIO, você pode fazer o agendamento do seu horário.

### Pagamento - cartão/pix

![Captura de Tela (68)](https://github.com/user-attachments/assets/bfaecc55-dc81-4386-ab94-249dcb36d28c)

Nessa tela é onde você pode realizar o pagamento

### Login barbeiro

![Captura de Tela (42)](https://github.com/user-attachments/assets/ec8625dc-2c7c-4ed0-b5f0-76aa52d28eb9)

Tela de login do usuário master que é o Barbeiro

### Barbearias

![Captura de Tela (43)](https://github.com/user-attachments/assets/fc0bad1a-e821-4d12-93fc-40133cd9021d)

Nessa tela lista todas a barbearias do usuário barbeiro que está logado

### Cadastrar
![Captura de Tela (49)](https://github.com/user-attachments/assets/8bca2049-6d23-4c3f-9667-347ec1e9a516)

Na mesma tela de Barbearias, ao clicar no botão cadastrar barbearia, você pode cadastrar uma barbearia.

### Editar
![Captura de Tela (50)](https://github.com/user-attachments/assets/cf8cd22d-abe2-4fc0-acaf-89364fff71b1)

Na mesma tela de barbearias ao clicar no botão editar, você pode editar uma barbearia

### Excluir
![Captura de Tela (72)](https://github.com/user-attachments/assets/1c6e9814-219c-47f1-b475-6557e1ca6bdc)

Na mesma tela de barbearias ao clicar no botão excluir você pode excluir uma barbearia

### Reservas

![Captura de Tela (46)](https://github.com/user-attachments/assets/aadf62eb-d552-4e96-a2ee-ac0f8884f266)

Ao clicar no botão reserva, você vai para a tela de reservas e essa tela lista todas as reservas da barbearia que você clicou e você pode editar e excluir as reservas feitas.

### Ver mais - horário/serviço
![Captura de Tela (51)](https://github.com/user-attachments/assets/016dc08a-270e-4227-9b7e-9e81a01a8c19)

![Captura de Tela (52)](https://github.com/user-attachments/assets/c7ae9907-baaa-421e-a4db-4dabc2461f40)

Essa tela lista todos os horários e serviços da barbearia que você clicou.

### Ver mais - horário/serviço - cadastrar
![Captura de Tela (55)](https://github.com/user-attachments/assets/7815f072-0591-4679-b7e5-dc0be7a09fa6)
![Captura de Tela (53)](https://github.com/user-attachments/assets/85e5d5da-5ed7-4f93-8545-fe3299315444)

Nessa mesma tela, ao clicar no botão cadastrar você pode cadastrar um serviço ou horário

### Ver mais - horário/serviço - editar
![Captura de Tela (57)](https://github.com/user-attachments/assets/5775772c-52ed-42fd-be28-fdb0b5e9de7e)
![Captura de Tela (58)](https://github.com/user-attachments/assets/7ea1d93d-205a-4b72-8f34-6f1fbd5084ec)

Nessa mesma tela, ao clicar no botão editar você pode editar um serviço ou horário

### Ver mais - horário/serviço - excluir
![Captura de Tela (62)](https://github.com/user-attachments/assets/e257eb6e-d445-4bc8-8574-33a72d27f088)
![Captura de Tela (61)](https://github.com/user-attachments/assets/4ba957d6-934b-437e-a007-d9ccc23c70c3)

Nessa mesma tela, ao clicar no botão excluir você pode excluir um serviço ou horário



