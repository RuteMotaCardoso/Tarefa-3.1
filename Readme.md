Disponível em https://github.com/RuteMotaCardoso/Tarefa-3.1

# Tarefa 3.1

## Entregas
### 1ª Entrega
O objetivo foi integrar as duas novas entidades, **Voluntários** e **Membros da Comissão Científica**, na plataforma já existente, sendo para tal necessário aceder e visualizar o *back-office*.

### 2ª Entrega
O objetivo foi adicionar ao *back-office* as funcionalidades sugeridas de gestão de tarefas pessoais (nome, data, duração, descrição) que podem ser associadas a listas tipo (nome, cor). Tendo sido também recomendado a participação de outras pessoas nas tarefas para além do próprio utilizador, optou-se nesta implementação por criar uma Gestão de Tarefas de Voluntários, selecionando o voluntário responsável pela tarefa (através de um *select*/*drop-down*). 

Esta atualização resultou na criação de novas entradas no *back-office*: **Tarefas Voluntários** e **Tipos Tarefas**.
 Nos **Tipos Tarefas** destaca-se a associação de cor a um tipo de tarefa (também visível nas tarefas de voluntários). Nas **Tarefas Voluntários** destaca-se a possibilidade de marcar uma tarefa como concluída na gestão de tarefas, sendo a mesma apresentada de forma rasurada. Existe ainda a possibilidade de desmarcar a tarefa como concluída (através de um *toggle*). A seleção da data utilizou um *date-picker*, enquanto a escolha do tipo é realizada através de um *select*/*drop-down*.
Para ilustrar as novas opções no menu foi escolhido o ícone *check* ("fa fa-check-sqare"; Font Awesome: https://www.w3schools.com/icons/fontawesome_icons_form.asp).

Para os dois novos ecrãs foram ainda realizados os *mockups*. Quanto aos *Wireframes*, tratando-se também de uma estrutura de lista (à semelhança dos Voluntários e Membros da Comissão) e tendo adotado as sugestões de campos apresentados pelo professor, não vi necessidade de os elaborar.  

## Acesso à Página de Administração/*Back-office*
Procedi primeiro ao *download* do material complementar do livro adotado, que contém o código do *site WebConference*, com o objetivo de evoluir o mesmo, integrando duas novas entidades no *back-office* do *front-end*.

O acesso ao *back-office* do *site WebConference* é feito pelo *index.html* do *front-office*, através da opção de menu "Área Privada". Trata-se de uma janela de autenticação que reencaminha para a página *participantes.html* do *back-office* do *WebConference Admin*.

Desconhecendo as credenciais de autenticação, optei por desativar a janela de autenticação (alterando o código associado ao botão *Login* em *webconf.js*), encaminhando diretamente para a página *participantes.html*. Nestas circunstâncias, optei por implementar um *Logout* do *back-office* não funcional em termos de autenticação (apenas redireciona para o *index.html*).

As páginas do *back-office* não estão estruturadas de forma modular, sendo necessário copiar o cabeçalho e o menu lateral para todas as páginas que compõem o *back-office*, para permitir o acesso a todas as opções a partir de todas as páginas e para se ter a sensação de uniformidade, evitando fazer para já alterações estruturais no *site*. Desta forma,  adicionei as opções  "Comissão Científica" e "Voluntários" no menu de navegação lateral às páginas existentes (*participants.html* e *speakers.html*). De referir, que não existe a página dos *sponsors* no *back-office*. 

## Desenvolvimento da Especificação  das entidades  Voluntários e Membros da Comissão Científica do Web Conference
Comecei por analisar as páginas existentes (participantes e oradores), para me inteirar da forma de funcionamento e disposição dos elementos, e assim integrar as novas entidades respeitando a natureza do *site*.
O *layout* e as funcionalidades da página dos Oradores (*speakers.html* e *speakers.js*), serviram de base para a implementação das novas entidades.

## *Wireframe*
De seguida, procedi à elaboração do esboço inicial das páginas destinadas aos voluntários e membros da comissão científica, concretizados através da ferramenta *WireframePro* (*https://mockflow.com/apps/wireframepro/*).

A interface *WebConference* é do tipo responsive. Assim, não tendo experiência na construção de interfaces do tipo *responsive*, elaborei primeiro a versão *browser*, e verifiquei como a interface se comportava em termos de interface *mobile*, fazendo as devidas adaptações para dar uma resposta adequada a ambas as interfaces. Procurei que a designação dos campos fosse do mesmo tamanho para minimizar problemas de alinhamentos na interface *mobile*. O planeamento das interfaces, em termos de desenho, implementação e experimentação, revelou-se um processo iterativo e minucioso para atender tanto ao formato *browser* como ao *mobile*.

## Protótipo
Para a criação das novas páginas baseei-me na página *speaker.html* e *speaker.js,* fazendo as devidas adaptações às novas entidades. 

Para apresentação de dados fictícios de membros de comisssão científica e voluntários, criei um array com um conjunto de instâncias fixas (*json*), tanto no *voluntarios.js* como no *membros.js*.  Além disso, para permitir a visualização e experimentação das funcionalidades inserir, editar/alterar e remover, optei por manipular esses dados apenas em memória para ambas as entidades (poderia ter gravado estes dados para um ficheiro em disco, permitindo a persistência de informação entre sessões de *browser*).

Realizei ainda testes de navegação entre as páginas do *back-office*, e ao nível das novas entidades, em termos de manipulação de dados.

## *Mockup*
Para apresentar as propostas em forma de *mockup*, e existindo o ambiente gráfico e temático definido pelo *site*, aproveitei a imagem do tipo *browser* e *mobile*, do protótipo para criar os *mockups* solicitados. (*https://mockupbro.com/mockups/devices*)

## Estrutura da Entrega
A organização de pastas divide-se em três grupos, contendo a pasta *Front-end* o código do *site* (o original com as adaptações pontuais referidas anteriormente, bem como as novas entidades), a pasta *mockup* os *mockups* desenvolvidos e a pasta *wireframes* os esboços *WireFrame*.
