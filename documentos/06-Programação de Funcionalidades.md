# Programação de Funcionalidades

### Landing Page

<figure>
  <figcaption>Figura 7 - Landing page</figcaption>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-pucalm/blob/main/documentos/img/landingPage.jpg"
</figure>

&emsp;Página de contato com o usuário como apresentação ao usuário, o convidando a explorar o conteúdo, sem necessidade de registro ou casastro

#### Requisito não funcional 

|ID      | Descrição               
|--------|-------------------------
| RNF-01 |  A aplicação deve ser responsiva para se adaptar a qualquer tipo de dispositivo.                     
| RNF-02 |  A aplicação deve respeitar as regras da LGPD (Lei Geral de Proteção de Dados Pessoais).                    
| RNF-03 |  A aplicação deve permitir que o usuário a utilize sem necessidade de treinamento.                      

#### Artefatos da funcionalidade

landing-page.html

style-lp.css


#### Estrutura de Dados

&emsp; <a href="../index.html"><button>EXPLORAR</button></a> 


#### Instruções de acesso

&emsp; O usuário somente necessita clicar no botão "explorar" para ter acesso às playlists


#### Responsáveis
Rafael Costa Souza, Gabriela Franklin Sá de Moura e Willams Andrade Lima

### Página inicial

<figure>
  <figcaption>Figura 9 - Página inicial</figcaption>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-pucalm/blob/main/documentos/img/paginaInicial.jpg"
</figure>

&emsp;Página de acesso ao conteúdo, lista de playlists e opção de escolher áudios para execução

#### Requisito funcional 

|ID         | Descrição               
|-----------|-------------------------
| RF-01 |  Os usuários devem ser capazes de explorar e escolher entre uma variedade de meditações guiadas e áudios disponíveis na plataforma.                     
| RF-02 |  Os usuários devem ser capazes de reproduzir os áudios através de um player.     

### Requisitos não Funcionais

|ID      | Descrição               
|--------|-------------------------
| RNF-01 |  A aplicação deve ser responsiva para se adaptar a qualquer tipo de dispositivo.                     
| RNF-02 |  A aplicação deve respeitar as regras da LGPD (Lei Geral de Proteção de Dados Pessoais).                    
| RNF-03 |  A aplicação deve permitir que o usuário a utilize sem necessidade de treinamento.    
                   
#### Artefatos da funcionalidade

audios.js
index.html
playlist.html
scripts.js
styles.css


#### Estrutura de Dados

<script type="module" src="./playlist.js"></script>


#### Instruções de acesso

&emsp; O usuário tem acessos às categorias e playlists, escolher e clicar no botão de play, que é um ícone clássico e conhecido para a função


#### Responsáveis
Lucas Campos de Abreu , Rafael Costa Souza, Camyla Gomes Soares Oliveira, Gabriel Coutinho Rolim, Gabriela Franklin Sá de Moura e Willams Andrade Lima

### Feedback

<figure>
  <figcaption>Figura 13 - Página de feedback </figcaption>
  <img src="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t7-pucalm/blob/main/documentos/img/paginaFeedback.png"
</figure>

&emsp;Página na qual o usuário pode relatar sua experiência acerca do aplicativo, assim como dúvidas e sugestões.

#### Requisito funcional 

|ID         | Descrição               
|-----------|-------------------------
| RF-03 |  Os usuários devem ser capazes de fornecer feedback sobre os áudios e meditações guiadas e a plataforma em geral.   


### Requisitos não Funcionais

|ID      | Descrição               
|--------|-------------------------
| RNF-01 |  A aplicação deve ser responsiva para se adaptar a qualquer tipo de dispositivo.                     
| RNF-02 |  A aplicação deve respeitar as regras da LGPD (Lei Geral de Proteção de Dados Pessoais).                    
| RNF-03 |  A aplicação deve permitir que o usuário a utilize sem necessidade de treinamento.                     

#### Artefatos da funcionalidade

feedback.html
index.html
scripts.js
styles.css


#### Estrutura de Dados

<form class="form" id="form" action="https://formspree.io/f/mleyzvob" method="POST"> 

#### Instruções de acesso

&emsp;Caso tenha interesse em compartilhar com os desenvolvedores sobre quaisquer assunto relacionado ao site, como experiências e sugestões, basta o usuário preencher, no mínimo, as opções obrigatórias e submeter através do botão de enviar.


#### Responsáveis
Lucas Campos de Abreu , Camyla Gomes Soares Oliveira, Gabriel Coutinho Rolim
