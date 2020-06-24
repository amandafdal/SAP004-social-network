# SafeHome

## 1. Tema

O isolamento social decorrente da pandemia do Covid 19 pegou toda a sociedade moderna desprevinida. Não sabíamos que esse período poderia nós afetar de forma tão profunda. Aumento de ansiedade, problemas de sono e de alimentação são apenas alguns dos distúrbios causados pela quarentena, conforme mostram dados da NASA.

A SafeHome tem como objetivo fornecer apoio a pessoas confinadas durante a quarentena. Aqui, você pode postar dicas de como passar pelo período de isolamento, pedir dicas sobre diversos assuntos e, o mais importante, você perceberá que não esta sozinho!

***

## 2. Funcionalidades

Tendo em vista as histórias do usuário já pré-determinadas no início do projeto, as seguintes funcionalidades foram desenvolvidas na rede social:

#### Login
Assim que o usuário entra na aplicação, este pode **logar com sua conta já criada**, **logar com a sua conta do Google** ou **registrar uma nova conta** se este ainda não possuir uma.
O direcionamento para a página principal da aplicação só é permitido se houver usuário logado, tendo este apenas a possibilidade de acessar a página de login e de registro se não tiver sido autenticado. 

Ressalva-se ainda que se o usuário não preencher todos os campos solicitados corretamente, **será notificado o erro para este**, a fim de orientá-lo a preencher seus dados de forma compatível com o requerido.

#### Posts
O usuário pode postar mensagens motivacionais ou compartilhar suas experiências diárias, com a possibilidade de **editar esse post** depois que ele já tiver sido criado; **deletá-lo**, se assim o usuário julgar necessário; bem como **alterar a privacidade desse post**, sendo possível a sua visualização (se público) ou não (se privado).

É possível para este também visualizar os posts dos demais usuários da rede social de forma ordenada.

Dentro do template dos posts, é possível observar que as opções de alteração deste documento só são visíveis ao usuário responsável pela postagem, sendo os demais post identificados com o nome de quem postou, o conteudo dessa postagem e a possibilidade de **dar like**. Aqui, não é permitido ao usuário dar like em seu prórpio post, e aos demais usuários, é possível dar um like e dislike.

#### Perfil
Já devidamente logado na rede social, o usuário poderá **editar seu perfil**, tendo como opção mudar seu e-mail, seu nome e alterar senha. Também é possível **escrever uma "minibiografia"** que estará visível tanto na tela de perfil quanto na página principal do usuário. Importante lembrar que as informações não preenchidas durante a edição do perfil são descartadas, alterando apenas os campos em que o usuário efetivamente preencheu.

O usuário também pode selecionar sua **foto de perfil** bem como sua **imagem de capa de fundo**, que estarão presentes tanto em sua página de perfil como na sua página principal.

Tanto na tela de perfil como na tela principal, o usuário tem a possibilidade de fazer *logout* de sua conta, sendo este redirecionado para a tela de login.

## 3. Implementações Futuras

Tendo em vista uma melhor experiência do usuário, algumas funcionalidades tiveram seu desenvolvimento realocado para sprints futuras. Seriam estas:

- Comentários: O usuário terá a possibilidade de comentar post de outros usuários, bem como respoder comentários feitos em seus post. Esses comentários poderam ser editados e deletados conforme o necessário;

- Postagem de Imagem: O usuário poderá postar fotos, bem como outras imagens que este desejar;

- Posts do Usuário: Todos os posts do usuário (e somente estes)ficaram visíveis em sua página de perfil, para este manipula-los conforme a necessidade.