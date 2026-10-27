# De Olho em Brasília — página de interesse (MVP)

Página de pré-lançamento independente, hospedável no GitHub Pages na subpasta `/de-olho-em-brasilia/` deste repositório.

## Publicação

GitHub Pages já publica o site pessoal a partir da branch `main`/raiz. Estes arquivos vivem isolados na subpasta `de-olho-em-brasilia` para preservar o site existente. URL prevista:
https://diegoalphanogueira-commits.github.io/diego-metaforma/de-olho-em-brasilia/

## Captura de interessados

**Fluxo funcionando sem backend**: o formulário valida nome, WhatsApp com DDD, e-mail e consentimento; depois abre o WhatsApp com uma mensagem preenchida para o número comercial que já está publicado no site Diego Metaforma. O lead só é efetivamente enviado quando o visitante toca em **Enviar** no WhatsApp.

Não existe banco de leads neste MVP, nem cadastro automático, nem cobrança. Não afirmar que o usuário se cadastrou antes de enviar a mensagem.

Número de destino: no arquivo `script.js`, constante `phoneNumber`. Troque se desejar outro responsável.

## Próximo passo para automação

Quando houver um endpoint de captura próprio, trocar o encaminhamento por `POST /api/leads` no backend com consentimento, rate limiting, proteção anti-spam e armazenamento LGPD. Não colocar tokens secretos em JavaScript público. Alternativamente usar um provedor de formulários com credenciais configuradas pelo proprietário.

## Produto

As telas internas da plataforma são **demonstrações ilustrativas**, não usam dados legislativos ao vivo. Preço de R$ 14,90/mês é **hipótese a validar** e não existe cobrança/assinatura ativa. Não há vínculo com órgãos governamentais.
