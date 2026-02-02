# Guia de Desenvolvimento Frontend - Portal Público (Noivas)

## 1. Introdução

Este documento detalha as especificações e regras de negócio para o desenvolvimento da interface pública do portal Guia Noivas, onde as noivas e visitantes navegam para encontrar e entrar em contato com fornecedores de serviços para casamento.

A experiência do usuário nesta área do portal deve refletir o modelo de negócio baseado em **tiers (planos)**, garantindo que fornecedores do plano pago ("Vitrine") recebam destaque visual e posicionamento privilegiado em relação aos fornecedores do plano gratuito.


---

## 2. Endpoints Públicos da API

Estes endpoints **não requerem autenticação** e são utilizados para exibir informações dos fornecedores ao público.

### 2.1. Listar Fornecedores por Categoria

-   **Endpoint:** `GET /v1/public/suppliers`
-   **Descrição:** Retorna a lista de fornecedores ativos, com suporte a filtros e paginação.

**Query Parameters:**

| Parâmetro   | Tipo     | Obrigatório | Descrição                                                                                   |
| ----------- | -------- | ----------- | ------------------------------------------------------------------------------------------- |
| `category`  | `string` | Não         | Filtra por categoria (ex: "Fotografia", "Buffet", "Decoração").                             |
| `city`      | `string` | Não         | Filtra por cidade (ex: "São Paulo", "Rio de Janeiro").                                      |
| `state`     | `string` | Não         | Filtra por estado (ex: "SP", "RJ").                                                         |
| `search`    | `string` | Não         | Busca por texto livre no nome do fornecedor.                                                |
| `page`      | `int`    | Não         | Número da página para paginação (padrão: 1).                                                |
| `pageSize`  | `int`    | Não         | Quantidade de itens por página (padrão: 20, máximo: 50).                                    |

**Exemplo de Request:**

```
GET /v1/public/suppliers?category=Fotografia&city=São Paulo&page=1&pageSize=20
```

**Response (200 OK):**

```json
{
  "items": [
    {
      "id": "a1b2c3d4-...",
      "name": "Fotógrafo Premium",
      "planLevel": 1,
      "city": "São Paulo",
      "state": "SP",
      "profilePictureUrl": "https://url.da.imagem/logo.webp",
      "coverPictureUrl": "https://url.da.imagem/capa.webp",
      "bio": "Especialistas em fotografia de casamento.",
      "phone": "(11) 99999-8888",
      "instagram": "https://instagram.com/fotografo",
      "facebook": "https://facebook.com/fotografo",
      "website": "https://fotografo.com.br"
    },
    {
      "id": "e5f6g7h8-...",
      "name": "Fotógrafo Básico",
      "planLevel": 0,
      "city": "São Paulo",
      "state": "SP",
      "profilePictureUrl": "https://url.da.imagem/logo2.webp",
      "coverPictureUrl": null,
      "bio": "Fotografia de casamento acessível.",
      "phone": "(11) 98888-7777",
      "instagram": null,
      "facebook": null,
      "website": null
    }
  ],
  "totalCount": 45,
  "page": 1,
  "pageSize": 20,
  "totalPages": 3
}
```

### 2.2. Obter Perfil Completo de um Fornecedor

-   **Endpoint:** `GET /v1/public/suppliers/{id}`
-   **Descrição:** Retorna todos os detalhes de um fornecedor específico, incluindo galeria de imagens e testemunhos (se aplicável).

**Response (200 OK):**

```json
{
  "id": "a1b2c3d4-...",
  "name": "Fotógrafo Premium",
  "planLevel": 2,
  "city": "São Paulo",
  "state": "SP",
  "profilePictureUrl": "https://url.da.imagem/logo.webp",
  "coverPictureUrl": "https://url.da.imagem/capa.webp",
  "bio": "Especialistas em fotografia de casamento com mais de 10 anos de experiência.",
  "phone": "(11) 99999-8888",
  "instagram": "https://instagram.com/fotografo",
  "facebook": "https://facebook.com/fotografo",
  "website": "https://fotografo.com.br",
  "gallery": [
    {
      "id": "img1",
      "url": "https://url.da.imagem/galeria1.webp",
      "isPrimary": true
    },
    {
      "id": "img2",
      "url": "https://url.da.imagem/galeria2.webp",
      "isPrimary": false
    }
  ],
  "testimonials": [
    {
      "id": "test1",
      "brideName": "Maria Silva",
      "rating": 5,
      "comment": "Trabalho impecável! Recomendo muito.",
      "createdAt": "2025-12-10T00:00:00"
    }
  ]
}
```

### 2.3. Enviar Lead (Solicitar Orçamento)

-   **Endpoint:** `POST /v1/public/leads`
-   **Descrição:** Permite que uma noiva envie uma solicitação de orçamento para um fornecedor. Este endpoint **não** requer autenticação.

**Payload:**

```json
{
  "supplierId": "a1b2c3d4-...",
  "name": "Nome da Noiva",
  "email": "noiva@email.com",
  "phone": "(21) 91234-5678",
  "message": "Gostaria de solicitar um orçamento para o meu casamento em outubro de 2027.",
  "eventDate": "2027-10-15"
}
```

**Response:** `201 Created`

```json
{
  "id": "lead123-...",
  "message": "Sua solicitação foi enviada com sucesso! O fornecedor entrará em contato em breve."
}
```

---

## 3. Regras de Ordenação e Exibição por Plano (Tier)

A principal regra de negócio do portal público é garantir que **fornecedores do plano "Vitrine" (pagos) tenham destaque visual e posicionamento privilegiado** em relação aos fornecedores do plano "Gratuito".

### 3.1. Ordenação nas Listagens

**Regra Fundamental:** Fornecedores "Vitrine" (`planLevel: 1`) **sempre** aparecem antes dos fornecedores "Gratuitos" (`planLevel: 0`) nas listagens de busca e categoria.

-   **Lógica de Ordenação:**
    1.  **Primeiro:** Todos os fornecedores com `planLevel: 1` (Vitrine), ordenados de forma aleatória ou por relevância.
    2.  **Depois:** Todos os fornecedores com `planLevel: 0` (Gratuito), ordenados de forma aleatória ou por relevância.
    3.  Fornecedores com `planLevel: -2` (Zombie) e `planLevel: -1` (Low) **não devem ser exibidos**, pois não estão ativos ou publicados.

-   **Implementação:** A API já retorna os dados ordenados corretamente. O frontend deve apenas renderizar a lista na ordem recebida.

### 3.2. Diferenciação Visual nos Cards de Listagem

Para tornar o destaque dos fornecedores "Vitrine" ainda mais evidente, o frontend deve aplicar estilos visuais diferenciados.

| Elemento                        | Plano Gratuito (`planLevel: 0`)                                  | Plano Vitrine (`planLevel: 1`)                                                                        |
| ------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Selo/Badge**                  | Sem selo.                                                        | Exibir um selo destacado, como "Fornecedor Verificado" ou "Vitrine", no canto superior do card.       |
| **Borda do Card**               | Borda padrão (ex: cinza claro).                                  | Borda destacada (ex: dourada, azul escuro, ou com sombra mais forte).                                |
| **Ícone de Estrela/Coroa**      | Sem ícone especial.                                              | Exibir um ícone de estrela, coroa ou outro símbolo de destaque ao lado do nome do fornecedor.         |
| **Botões de Contato no Card**   | Não exibir botões. Mostrar apenas o telefone como texto simples. | Exibir botões de ação rápida, como "WhatsApp" e "Ver Perfil", para facilitar o contato.              |

### 3.3. Diferenciação Visual na Página de Perfil Completo

A experiência de visualização do perfil também varia de acordo com o plano.

| Funcionalidade                  | Plano Gratuito (`planLevel: 0`)                                                                                                  | Plano Vitrine (`planLevel: 1`)                                                                                   |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Botões de Contato**           | **Não exibir** botões/links para WhatsApp, Instagram, Facebook e Google Maps. Exibir apenas o número de telefone como texto.     | Exibir todos os botões de contato (WhatsApp com link direto, Instagram, Facebook, site, link para Google Maps). |
| **Galeria de Imagens**          | Exibir até **2 imagens**.                                                                                                        | Exibir até **20 imagens** em galeria completa (carrossel ou grid).                                              |
| **Testemunhos**                 | **Não exibir** a seção de testemunhos.                                                                                           | Exibir a seção de testemunhos completa, se houver.                                                               |
| **Selo "Fornecedor Verificado"** | Não exibir.                                                                                                                      | Exibir um selo de destaque no topo do perfil.                                                                    |
| **Card de Concorrentes**        | **Após o fornecedor receber 3 leads**, a API pode retornar um array de até 3 fornecedores concorrentes da mesma categoria. O frontend deve renderizar um componente "Veja também estes fornecedores" no final do perfil. | Não exibe concorrentes.                                                                                          |

---

## 4. Fluxo de Envio de Lead (Pedir Orçamento)

### 4.1. Formulário de Contato

-   **Localização:** Presente na página de perfil completo de cada fornecedor.
-   **Campos do Formulário:**
    -   Nome da Noiva (obrigatório)
    -   E-mail (obrigatório, validar formato)
    -   Telefone (obrigatório, validar formato brasileiro)
    -   Mensagem (opcional, textarea)
    -   Data do Evento (obrigatório, date picker)

### 4.2. Validação e Envio

-   Valide todos os campos obrigatórios no frontend antes de enviar.
-   Utilize o endpoint `POST /v1/public/leads` para enviar a solicitação.
-   Exiba uma mensagem de sucesso após o envio bem-sucedido:
    > "Sua solicitação foi enviada com sucesso! O fornecedor entrará em contato em breve."

### 4.3. Tratamento de Erros

-   Se a API retornar um erro (ex: `400 Bad Request` por dados inválidos ou `500 Internal Server Error`), exiba uma mensagem amigável para o usuário:
    > "Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente mais tarde."

---

## 5. Renderização de Componentes Especiais

### 5.1. Card de Concorrentes (Apenas para Plano Gratuito)

-   **Contexto:** Quando um fornecedor gratuito já recebeu mais de 3 leads, a API pode incluir um array de fornecedores concorrentes no response do endpoint `GET /v1/public/suppliers/{id}`.
-   **Estrutura do Array (exemplo):**

```json
"competitors": [
  {
    "id": "comp1-...",
    "name": "Concorrente A",
    "profilePictureUrl": "https://url.da.imagem/comp1.webp",
    "planLevel": 1
  },
  {
    "id": "comp2-...",
    "name": "Concorrente B",
    "profilePictureUrl": "https://url.da.imagem/comp2.webp",
    "planLevel": 1
  }
]
```

-   **Renderização:**
    -   Se o array `competitors` estiver presente e não estiver vazio, renderize um componente no **final da página de perfil** (após a galeria e o formulário de contato).
    -   **Título sugerido:** "Veja também estes fornecedores da categoria [Nome da Categoria]"
    -   Exiba os cards dos concorrentes em formato horizontal (carrossel) ou em grid (até 3 itens).
    -   Cada card deve ter:
        -   Foto de perfil
        -   Nome do fornecedor
        -   Botão "Ver Perfil" que redireciona para a página de perfil completo do concorrente.

-   **Objetivo:** Esta funcionalidade incentiva o fornecedor gratuito a fazer upgrade para o plano "Vitrine", pois seu perfil estará exibindo concorrentes pagos para as noivas.

### 5.2. Selo "Fornecedor Verificado"

-   **Design:** Um ícone de selo ou badge com texto "Verificado" ou "Vitrine".
-   **Cores sugeridas:** Azul, dourado ou verde, para transmitir confiança e destaque.
-   **Localização:**
    -   **Nas listagens:** No canto superior direito do card.
    -   **No perfil completo:** Ao lado do nome do fornecedor, no topo da página.

---

## 6. SEO e Performance

### 6.1. Otimização de Imagens

-   Todas as imagens retornadas pela API já estão no formato `.webp`, otimizado para carregamento rápido.
-   Utilize lazy loading (`loading="lazy"`) nas tags `<img>` para melhorar a performance da página.

### 6.2. Meta Tags para SEO

-   Cada página de perfil de fornecedor deve ter meta tags dinâmicas:
    -   `<title>`: Nome do Fornecedor + Categoria + Cidade (ex: "Fotógrafo Premium - Fotografia de Casamento em São Paulo")
    -   `<meta name="description">`: Um resumo da `bio` do fornecedor (limitar a 155 caracteres).
    -   `<meta property="og:image">`: URL da `coverPictureUrl` ou `profilePictureUrl`.

### 6.3. Estrutura de URLs Amigáveis

-   Use slugs para URLs de perfil de fornecedor:
    -   **Exemplo:** `/fornecedores/fotografo-premium-sao-paulo` em vez de `/fornecedores?id=a1b2c3d4-...`

---

## 7. Resumo das Regras de Negócio para o Frontend

1.  **Ordenação:** Fornecedores "Vitrine" (`planLevel: 1`) sempre aparecem antes dos "Gratuitos" (`planLevel: 0`).
2.  **Botões de Contato:** Fornecedores "Gratuitos" não têm botões clicáveis (WhatsApp, redes sociais, Maps). Fornecedores "Vitrine" têm todos os botões.
3.  **Galeria:** Limitada a 2 imagens para "Gratuitos" e 20 para "Vitrine".
4.  **Testemunhos:** Não exibir para "Gratuitos", exibir para "Vitrine".
5.  **Concorrentes:** Exibir card de concorrentes apenas para fornecedores "Gratuitos" que já receberam mais de 3 leads.
6.  **Selo de Destaque:** Exibir apenas para fornecedores "Vitrine".

---

## 8. Checklist de Implementação

- [ ] Implementar a listagem de fornecedores com ordenação correta (Vitrine antes de Gratuito).
- [ ] Criar card de fornecedor com diferenciação visual por plano (selo, borda, ícone).
- [ ] Implementar a página de perfil completo do fornecedor.\\
- [ ] Aplicar as regras de exibição de botões de contato com base no `planLevel`.
- [ ] Renderizar galeria de imagens respeitando o limite do plano.
- [ ] Exibir/ocultar testemunhos com base no `planLevel`.
- [ ] Implementar o formulário de "Pedir Orçamento" e integrar com `POST /v1/public/leads`.
- [ ] Renderizar o componente de "Concorrentes" quando aplicável.
- [ ] Adicionar lazy loading nas imagens para otimização.
- [ ] Implementar meta tags dinâmicas para SEO em páginas de perfil.
- [ ] Testar a experiência do usuário em diferentes telas (desktop, tablet, mobile).

---

Este guia cobre todos os aspectos necessários para que o desenvolvedor frontend implemente o portal público do Guia Noivas de forma consistente com as regras de negócio e o modelo de monetização baseado em tiers.
