# Dicionário do gitinho

Clonar projeto ```git clone [link do repo]``` <br>
Entrar na pasta ```cd [nome do repo]``` <br>
Abrir código no VS Code ```code .``` <br>
Entrar na branch ```git checkout [nome da branch]``` <br>
Criar branch  ```git checkout -b [nome da branch sem caracteres especiais]``` <br>
Adicionar mudanças remotamente ```git add -all``` <br>
Descrição do commit  ```git commit -m '[descrição do commit]'``` <br>
Enviar mudanças remotamente ```git push``` <br>

# Bem vindo ao tutorial do gitinho!

## Primeiro contato - Clonando e acessando o repositório localmente

1. Abra o prompt de comando no caminho desejado;
2. Digite o comando ```git clone [link do repo]```;
3. Digite ```cd [nome do repo]``` para entrar na pasta do repositório;
4. E por fim, digite ```code .``` para abrir o código no VS Code.

## Recebimento de tasks - Interação com as branches

1. Confira antes de tudo na parte inferior esquerda da tela do vscode ou na linha do prompt se está na branch **QA** (para navegar entre branches, use ```git checkout [nome da branch]```);<br>
2. Quando receber uma tarefa e completar ela, digite ```git checkout -b [nome da branch sem caracteres especiais]```
3. Ao estar dentro da sua branch, faça o básico de mandar suas alterações, como ```git add -all``` (ou ```git add .```) + ```git commit -m '[descrição do commit]'``` + ```git push```
OBS: Boas práticas envolvem utilizar um prefixo de acordo com sua tarefa no COMMIT, como diz na imagem abaixo. A utililização dele seria por exemplo: 'style/landing page'

![image](https://user-images.githubusercontent.com/110927737/216641612-d7be2c9b-e0d0-4ef0-989b-561868cf56c9.png)
