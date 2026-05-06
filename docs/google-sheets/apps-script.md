# Google Sheets + Apps Script

Este script recebe o feedback do `/match` e salva uma linha em uma planilha do Google Sheets.

## 1. Criar a planilha

Crie uma planilha com a primeira aba chamada `Feedback`.

Na primeira linha, use estes cabeçalhos:

```txt
Data | Sessão | Likes | Dislikes | Sugestão | Votos JSON
```

## 2. Abrir Apps Script

Na planilha, vá em `Extensões > Apps Script` e cole:

```js
function getFeedbackSheet() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");

  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId).getSheetByName("Feedback");
  }

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (activeSpreadsheet) {
    return activeSpreadsheet.getSheetByName("Feedback");
  }

  throw new Error("Missing SPREADSHEET_ID or active spreadsheet binding");
}

function doPost(e) {
  const sheet = getFeedbackSheet();
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: "Missing post data" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const payload = JSON.parse(e.postData.contents);

  sheet.appendRow([
    payload.createdAt || new Date().toISOString(),
    payload.sessionId || "",
    Array.isArray(payload.likes) ? payload.likes.join(", ") : "",
    Array.isArray(payload.dislikes) ? payload.dislikes.join(", ") : "",
    payload.suggestion || "",
    JSON.stringify(payload.votes || {}),
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Publicar como Web App

Em `Implantar > Nova implantação`:

- Tipo: `App da Web`
- Executar como: `Eu`
- Quem pode acessar: `Qualquer pessoa`

Copie a URL gerada e configure no projeto:

```bash
NEXT_PUBLIC_FEEDBACK_ENDPOINT="URL_DO_WEB_APP"
```

Depois rode novamente:

```bash
npm run dev
```

## Observação

O site envia o payload como `text/plain` com `mode: "no-cors"` para evitar bloqueio de CORS no navegador. Por isso, o front assume sucesso quando a requisição é disparada sem erro de rede.

## Observação Importante

Não execute `doPost` manualmente no editor sem parâmetros. No Apps Script, isso gera `e === undefined`, porque `doPost` só recebe `postData` quando a URL do Web App é chamada de verdade.

Para testar, use:

- a URL publicada do Web App
- ou um helper separado, se quiser simular dados no editor

## Se a implantação estiver falhando

Se o Web App aparece como `Falha`, normalmente é por um destes motivos:

- o script não está vinculado à planilha e `getActiveSpreadsheet()` não existe
- a aba `Feedback` não existe ou está com outro nome
- o Web App foi publicado antes da última alteração e precisa de nova implantação

Se o script for standalone, faça assim:

1. Copie o ID da planilha.
2. No Apps Script, vá em `Configurações do projeto > Propriedades do script`.
3. Crie a propriedade `SPREADSHEET_ID` com o ID da planilha.
4. Reimplante o Web App.
