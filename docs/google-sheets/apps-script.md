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
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Feedback");
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
