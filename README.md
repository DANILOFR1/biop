# BioPlan - Aplicativo de Coleta de Dados Biológicos

## Sobre o Aplicativo
O BioPlan é um aplicativo web projetado para auxiliar na coleta e gerenciamento de dados biológicos em campo. Ele permite registrar observações de espécies, suas abundâncias e localizações geográficas, funcionando tanto online quanto offline após instalado.

## Principais Funcionalidades

### 1. Gerenciamento de Projetos
- **Criar Projetos**: Crie diferentes projetos para organizar suas coletas
- **Selecionar Projetos**: Alterne entre projetos existentes
- **Excluir Projetos**: Remova projetos que não são mais necessários

### 2. Coleta de Dados
- **Registro de Espécies**: 
  - Digite o nome da espécie com sugestões automáticas
  - Adicione novas espécies que não estão na lista
  - Sistema de autocompletar para facilitar a entrada de dados

- **Dados Quantitativos**:
  - Registre a abundância (quantidade) de cada espécie
  - Adicione observações e notas sobre o registro

- **Captura de Localização**:
  - GPS automático com indicador de precisão
  - Entrada manual de coordenadas
  - Integração com Google Maps
  - Suporte para áreas sem sinal GPS

### 3. Gerenciamento de Espécies
- **Cadastro de Espécies**:
  - Adicione espécies manualmente
  - Importe listas de espécies de arquivos Excel, CSV ou TXT
  - Remova espécies da lista

- **Importação em Massa**:
  - Suporte para arquivos Excel (.xlsx, .xls)
  - Suporte para arquivos CSV
  - Método alternativo via TXT para dispositivos com limitações
  - Aguardar Carregar a planilha quando pedir o UPLOAD.

### 4. Visualização e Edição de Dados
- **Lista de Registros**:
  - Visualize todos os dados coletados
  - Edite registros existentes
  - Exclua registros individuais

- **Informações Detalhadas**:
  - Data e hora da coleta
  - Coordenadas geográficas
  - Precisão da localização
  - Método de captura da localização (GPS ou Manual)

### 5. Exportação de Dados
- **Formato Excel**:
  - Exportação completa dos dados em formato .xlsx
  - Planilhas organizadas com todas as informações

- **Formato CSV**:
  - Opção alternativa de exportação em CSV
  - Compatível com diversos programas de planilha

### 6. Funcionalidades Offline
- **Instalação como Aplicativo (PWA)**:
  - O BioPlan é um aplicativo web progressivo (PWA) que pode ser instalado no seu dispositivo
  - Após instalado, funciona offline e salva dados localmente
  - Acesso rápido direto da tela inicial do seu dispositivo

#### Como Instalar o BioPlan no seu Dispositivo

**Opção 1 - Samsung Internet (Recomendado para dispositivos Samsung)**:
1. Abra o site no Samsung Internet
2. Toque no menu (três linhas ☰)
3. Toque em "Adicionar página à" → "Tela inicial"
4. Na janela que aparecer, toque em "Instalar"
5. O aplicativo será instalado e aparecerá na sua tela inicial

**Opção 2 - Google Chrome**:
1. Abra o site no Chrome
2. Toque no menu (três pontos ⋮)
3. Role até encontrar "Adicionar à tela inicial"
4. Confirme a adição
5. O app será adicionado à tela inicial

**Nota**: Em alguns dispositivos Samsung usando Chrome, pode aparecer apenas como atalho. Para instalação completa como app, recomendamos usar o Samsung Internet.

### 7. Recursos Adicionais
- **Diagnóstico**:
  - Sistema de log para rastreamento de problemas
  - Mensagens de status para feedback ao usuário

- **Ajuda Integrada**:
  - Instruções para problemas de GPS
  - Guia para uso do Google Maps
  - Dicas de uso em várias situações

## Como Citar
RANGEL, Danilo Freitas. WebApp BioPlan. 2025. Disponível em: <https://danilofr1.github.io/biop/>. Acesso em: DATA MES. ANO.

## Suporte ao Projeto
Se o aplicativo foi útil para seu trabalho, considere fazer uma doação via Pix:
- Chave: 3c37c492-cebe-4927-b7db-68b004b67c99

## Dicas de Uso
1. **Antes de Começar**:
   - Crie um projeto para organizar seus dados
   - Cadastre ou importe as espécies que serão observadas

2. **Durante a Coleta**:
   - Certifique-se de que o GPS está ativo
   - Aguarde boa precisão do GPS antes de salvar
   - Faça anotações detalhadas nas observações

3. **Ao Finalizar**:
   - Exporte seus dados regularmente
   - Mantenha um backup dos arquivos exportados
   - Verifique os dados exportados

4. **Problemas Comuns**:
   - Se o GPS não funcionar, use entrada manual
   - Em caso de erro na importação de espécies, tente o método alternativo
   - Para melhor precisão, aguarde alguns segundos antes de salvar a localização 