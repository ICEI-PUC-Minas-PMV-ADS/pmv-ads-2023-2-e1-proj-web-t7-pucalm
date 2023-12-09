# Plano de Testes de Software

Foram programados 05 testes no software, o que incluem testes programados nos requisitos funcionais RF-01, RF-02 e RF-03, RF-04 e RF-05.

|Caso de Teste    | CT-01.01 - Explorar e escolher uma playlist |
|:---|:---|
| Requisitos Associados | RF-01 |
| Objetivo do Teste | Explorar múltiplas playlists e poder escolher de um deles. |
| Passos | <p>01. Acessar a [Landing Page](https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2023-2-e1-proj-web-t7-pucalm/codigo-fonte/static/html/landing-page.html) </p><p>02. No topo da página, clicar em _Explorar_.</p> <p>03. Clicar na playlist **Ansiedade**.</p> <p>04. Clicar em _Início_, na barra lateral esquerda.</p> <p>05. Clicar na playlist **Estresse**.</p> <p>06. Clicar em _Início_, na barra lateral esquerda.</p> <p>07. Clicar na playlist **Foco**.</p> <p>08. Clicar em _Início_, na barra lateral esquerda.</p> <p>09. Clicar na playlist **Meditação**.</p> <p>10. Clicar em _Início_, na barra lateral esquerda.</p> <p>11. Clicar na playlist **Relaxamento**.</p> <p></p> |
| Critérios de êxito | Uma lista de áudios deve ser exibida para cada playlist selecionada. Os áudios devem estar prontos para reprodução.|
| Responsável por elaborar o caso de Teste | Will Lima |

--------------------------------------------------------------------------------

|Caso de Teste    | CT-01.02 - Explorar e escolher uma playlist |
|:---|:---|
| Requisitos Associados | RF-01 |
| Objetivo do Teste | Explorar múltiplas playlists e poder escolher de um deles. |
| Passos | <p>01. Acessar a [Landing Page](https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2023-2-e1-proj-web-t7-pucalm/codigo-fonte/static/html/landing-page.html) </p><p>02. Na barra inferior da página, clicar em _Explorar_.</p> <p>03. Clicar na playlist **Ansiedade**.</p> <p>04. Clicar em _Início_, na barra lateral esquerda.</p> <p>05. Clicar na playlist **Estresse**.</p> <p>06. Clicar em _Início_, na barra lateral esquerda.</p> <p>07. Clicar na playlist **Foco**.</p> <p>08. Clicar em _Início_, na barra lateral esquerda.</p> <p>09. Clicar na playlist **Meditação**.</p> <p>10. Clicar em _Início_, na barra lateral esquerda.</p> <p>11. Clicar na playlist **Relaxamento**.</p> |
| Critérios de êxito | Uma lista de áudios deve ser exibida para cada playlist selecionada. Os áudios devem estar prontos para reprodução e serem adicionador ao histórico|
| Responsável por elaborar o caso de Teste | Will Lima |

--------------------------------------------------------------------------------

|Caso de Teste    | CT-02.01 - Reprodução de áudio com player |
|:---|:---|
| Requisitos Associados | RF-02 |
| Objetivo do Teste | Reproduzir um áudio escolhido fazendo uso do player de áudio |
| Passos | <p>01. A partir da [Página Inicial](https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2023-2-e1-proj-web-t7-pucalm/codigo-fonte/index.html), clicar em uma das cinco playlists (**Ansiedade, Estresse, Foco, Meditação ou Relaxamento**).</p> <p>02. A partir da lista de áudios da playlist selecionada, clicar sobre o áudio selecionado.</p> |
| Critérios de êxito | O aúdio selecionado inicia a reprodução. |
| Responsável por elaborar o caso de Teste | Will Lima |

--------------------------------------------------------------------------------

|Caso de Teste    | CT-02.02 - Reprodução de áudio com player |
|:---|:---|
| Requisitos Associados | RF-02 |
| Objetivo do Teste | Reproduzir um áudio fazendo uso do player da playlist |
| Passos | <p>01. A partir da [Página Inicial](https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2023-2-e1-proj-web-t7-pucalm/codigo-fonte/index.html), clicar em uma das cinco playlists (**Ansiedade, Estresse, Foco, Meditação ou Relaxamento**).</p> <p>02. Clicar no ícone (botão) _Player_, abaixo do nome da playlist selcionada.</p> <p>03. Após início da reprodução do áudio, clicar no botão _Pausa_ do player (barra inferior).</p> |
| Critérios de êxito | O primeiro áudio da playlist selecionada é reproduzido e a reprodução é pausada após o clique no botão de pausa. Adicionar o áudio à lista de histórico do usuário.|
| Responsável por elaborar o caso de Teste | Will Lima |

--------------------------------------------------------------------------------

|Caso de Teste    | CT-03 - Feedback |
|:---|:---|
| Requisitos Associados | RF-03 |
| Objetivo do Teste | Fornecer feedback |
| Passos | <p>01. A partir da [Página Inicial](https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2023-2-e1-proj-web-t7-pucalm/codigo-fonte/index.html).</p> <p>02. Na barra lateral esquerda, clicar em *Feedback*.</p> <p>03. Clicar no campo preenchível abaixo de _Nome (Obrigatório)_.</p> <p>04. Preencher com o nome que se identifica.</p> <p>05. Opcionalmente, clicar no campo digitável abaixo de _E-mail (Opcional)_.</p> <p>06. Opcional. Preencher com e-mail.</p> <p>07. Clicar no campo digitável abaixo de _Mensagem (Obrigatório)_.</p> <p>08. Escrever mensagem de feedback.</p> <p>09. Clicar no botão _Enviar_, que se encontra no final da página.</p> <p>10. Aguardar a mensagem de agradecimento pela submissão.</p>|
| Critérios de êxito | A tela de submissão de feedback é exibida com a mensagem:<p>"Thanks! The form was submitted successfully."</p>  |
| Responsável por elaborar o caso de Teste | Will Lima |

--------------------------------------------------------------------------------

|Caso de Teste    | CT-04 - Compartilhamento |
|:---|:---|
| Requisitos Associados | RF-04 |
| Objetivo do Teste | Compartilhamento da página da aplicação web |
| Passos | <p>01. A partir da [Página Inicial](https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2023-2-e1-proj-web-t7-pucalm/codigo-fonte/index.html), clicar no botão de compartilhamento no canto superior direito.</p> <p>02. Clicar em _Copiar_ para copiar o link de compartilhamento.</p> |
| Critérios de êxito | É exibido um pop-up com a indicação: <p>"Link copiado com sucesso!"</p> |
| Responsável pela elaborar do caso de Teste | Will Lima |


|Caso de Teste    | CT-05 - Filtragem de áudios |
|:---|:---|
| Requisitos Associados | RF-05 |
| Objetivo do Teste | Filtrar os áudios dentro de uma playlist |
| Passos | <p>01. A partir da [Página Inicial](https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2023-2-e1-proj-web-t7-pucalm/codigo-fonte/index.html), clicar em uma playlist.</p/> <p>02. No canto superior direito, abaixo da barra do topo, clicar na caixa de texto preenchível _O que você procura?_.</p> <p>03. Digitar um caractere alfabético ou trecho de palavra para busca.</p> |
| Critérios de êxito | Áudio (ou áudios) exibidos contém em seu nome o caractere, ou fragmento de palavra, digitado na busca. |
| Responsável pela elaborar do caso de Teste | Will Lima |

|Caso de Teste    | CT-06 - Histórico de áudios |
|:---|:---|
| Requisitos Associados | Requisito não-listado |
| Objetivo do Teste | Listar os áudios escutados pelo usuário |
| Passos | <p>01. A partir da [Página Inicial](https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2023-2-e1-proj-web-t7-pucalm/codigo-fonte/index.html).</p/> <p>02. No canto esquerdo, clicar na opção _Meu histórico_.</p> |
| Critérios de êxito | Deverá aparecer uma lista das últimas músicas executadas pelo usuário. |
| Responsável pela elaborar do caso de Teste | Will Lima |
