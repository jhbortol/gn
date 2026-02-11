# Guia de Desenvolvimento Frontend - Portal Público (Noivas)

## 1. Introdução

Este documento detalha as especificações e regras de negócio para o desenvolvimento da interface pública do portal Guia Noivas, onde as noivas e visitantes navegam para encontrar e entrar em contato com fornecedores de serviços para casamento.

A experiência do usuário nesta área do portal deve refletir o modelo de negócio baseado em **tiers (planos)**, garantindo que fornecedores do plano pago ("Vitrine") recebam destaque visual e posicionamento privilegiado em relação aos fornecedores do plano gratuito.


---

## 2. Endpoints Públicos da API

Estes endpoints **não requerem autenticação** e são utilizados para exibir informações dos fornecedores ao público.

### 2.1. Listar Fornecedores

A API oferece dois endpoints para listagem de fornecedores:

#### Opção 1: Por Categorias (Múltiplas)

-   **Endpoint:** `GET /v1/public/fornecedores`
-   **Descrição:** Retorna fornecedores filtrados por uma ou mais categorias (IDs).

**Query Parameters:**

| Parâmetro    | Tipo     | Obrigatório | Descrição                                                                                   |
| ------------ | -------- | ----------- | ------------------------------------------------------------------------------------------- |
| `categorias` | `string` | **Sim**     | IDs de categorias separados por vírgula (ex: "abc123,def456").                              |
| `skip`       | `int`    | Não         | Número de registros a pular (padrão: 0).                                                    |
| `take`       | `int`    | Não         | Quantidade de itens a retornar (padrão: 20).                                                |

**Exemplo de Request:**

```
GET /v1/public/fornecedores?categorias=abc123,def456&skip=0&take=20
```

#### Opção 2: Todos os Ativos (com filtros)

-   **Endpoint:** `GET /v1/fornecedores/ativos`
-   **Descrição:** Retorna todos os fornecedores ativos e publicados, com suporte a paginação e filtro de destaque.
-   **Filtros Automáticos:** A API já aplica `ativo=true` e `publicado=true` automaticamente.

**Query Parameters:**

| Parâmetro  | Tipo      | Obrigatório | Descrição                                                                                   |
| ---------- | --------- | ----------- | ------------------------------------------------------------------------------------------- |
| `page`     | `int`     | Não         | Número da página (padrão: 1).                                                               |
| `pageSize` | `int`     | Não         | Quantidade de itens por página (padrão: 12, máximo: 100).                                   |
| `destaque` | `boolean` | Não         | Filtrar apenas fornecedores em destaque (true/false).                                       |

**Exemplo de Request:**

```
GET /v1/fornecedores/ativos?page=1&pageSize=12&destaque=true
```

#### Opção 3: Por Categoria Específica

-   **Endpoint:** `GET /v1/fornecedores/ativos/categoria/{categoriaId}`
-   **Descrição:** Retorna fornecedores ativos de uma categoria específica.

**Path Parameters:**

| Parâmetro     | Tipo   | Descrição                    |
| ------------- | ------ | ---------------------------- |
| `categoriaId` | `uuid` | ID da categoria (GUID).      |

**Query Parameters:** (mesmos da Opção 2: `page`, `pageSize`)

**Exemplo de Request:**

```
GET /v1/fornecedores/ativos/categoria/abc123-def456?page=1&pageSize=12
```

**Response (200 OK) - `/v1/fornecedores/ativos`:**

```json
{
  "data": [
    {
      "id": "a1b2c3d4-...",
      "nome": "Fotógrafo Premium",
      "slug": "fotografo-premium",
      "descricao": "Especialistas em fotografia de casamento.",
      "cidade": "São Paulo",
      "telefone": "(11) 99999-8888",
      "email": "contato@fotografo.com",
      "website": "https://fotografo.com.br",
      "whatsApp": "5511999998888",
      "facebook": "https://facebook.com/fotografo",
      "instagram": "https://instagram.com/fotografo",
      "logoUrl": "https://url.da.imagem/logo.webp",
      "rating": 4.8,
      "destaque": true,
      "seloFornecedor": "Verificado",
      "ativo": true,
      "publicado": true,
      "visitas": 1250,
      "categoriaId": "cat123",
      "categoria": {
        "id": "cat123",
        "nome": "Fotografia",
        "slug": "fotografia"
      },
      "primaryMedia": {
        "id": "media1",
        "url": "https://url.da.imagem/capa.webp",
        "isPrimary": true
      }
    }
  ],
  "meta": {
    "total": 45,
    "page": 1,
    "pageSize": 12,
    "totalPages": 4
  }
}
```

### 2.2. Obter Perfil Completo de um Fornecedor

A API oferece duas formas de buscar um perfil:

#### Por ID:
-   **Endpoint:** `GET /v1/public/fornecedores/{id}`

#### Por Slug (URL Amigável):
-   **Endpoint:** `GET /v1/public/fornecedores/slug/{slug}`

**Descrição:** Retorna todos os detalhes de um fornecedor específico, incluindo galeria de imagens e testemunhos (se aplicável).

**Response (200 OK):**

```json
{
  "id": "a1b2c3d4-...",
  "name": "Fotógrafo Premium",
  "planLevel": 1,
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

-   **Endpoint:** `POST /v1/public/fornecedores/{fornecedorId}/contact`
-   **Descrição:** Permite que uma noiva envie uma solicitação de orçamento para um fornecedor específico. Este endpoint **não** requer autenticação.

**Payload:**

```json
{
  "name": "Nome da Noiva",
  "email": "noiva@email.com",
  "phone": "(21) 91234-5678",
  "message": "Gostaria de solicitar um orçamento para o meu casamento em outubro de 2027.",
  "eventDate": "2027-10-15"
}
```

**Nota:** O `fornecedorId` é passado na URL, não no payload.

**Response:** `201 Created`

```json
{
  "id": "lead123-...",
  "message": "Sua solicitação foi enviada com sucesso! O fornecedor entrará em contato em breve."
}
```

---

## 3. Modelo de Tiers e Regras de Exibição

O portal público funciona com um sistema de 4 tiers que determinam a visibilidade e funcionalidades disponíveis para cada fornecedor:

### 3.1. Descrição dos Tiers

| Tier | Nivel | Nome | Visibilidade | Leads | Status | Regras |
|------|-------|------|--------------|-------|--------|--------|
| **Zombie** | -2 | Não Reivindicado | ❌ Nunca exibido | Admin recebe | Conta automática | Perfil criado pelo admin, aguardando reivindicação |
| **Low** | -1 | Plano Básico | ✅ Exibido | 1 por mês | Ativo | Posicionamento baixo, sem destaque |
| **Free** | 0 | Gratuito | ✅ Exibido | 3 completos + ofuscados | Ativo | Ofertas limitadas, incentivo para upgrade |
| **Vitrine** | 1 | Premium Pago | ✅✅ Destaque | 999.999 (ilimitado) | Ativo | Máximo destaque visual, todas as funcionalidades |

### 3.2. Ordenação nas Listagens

**Regra Fundamental:** A ordenação é **crítica para o modelo de monetização**. Fornecedores "Vitrine" (`planLevel: 1`) **sempre** aparecem antes dos demais, com aleatoriedade para distribuir destaque equitativamente.

#### Ordem Exata de Exibição:

```
1. Fornecedores Vitrine (planLevel: 1) - RANDOMIZADOS A CADA REQUISIÇÃO
   ↓
2. Fornecedores Free (planLevel: 0) - Ordenação consistente (ex: por rating/data)
   ↓
3. Fornecedores Low (planLevel: -1) - Ordenação consistente
   ↓
4. Fornecedores Zombie (planLevel: -2) - NUNCA EXIBIDOS
```

#### Implementação por Endpoint:
    
**✅ `/v1/public/fornecedores`** (filtro por múltiplas categorias):
- A API **retorna os fornecedores já ordenados corretamente** por `planLevel`.
- Fornecedores Vitrine são **randomizados a cada requisição** para distribuir o destaque de forma justa.
- Ação do frontend: **Apenas renderizar na ordem recebida** - não reordenar.
    
**✅ `/v1/fornecedores/ativos`** e **✅ `/v1/fornecedores/ativos/categoria/{id}`**:
- A API **ordena automaticamente** por `planLevel` (Vitrine → Free → Low).
- Fornecedores Vitrine são **randomizados** a cada requisição.
- Ação do frontend: **Apenas renderizar na ordem recebida** - não reordenar.

**Pseudo-código da Ordenação (apenas para referência):**
```javascript
// O backend faz isso automaticamente. Frontend apenas renderiza.
const ordenarFornecedores = (fornecedores) => {
  const vitrine = fornecedores.filter(f => f.planLevel === 1).shuffle();
  const free = fornecedores.filter(f => f.planLevel === 0);
  const low = fornecedores.filter(f => f.planLevel === -1);
  return [...vitrine, ...free, ...low];
};
```

### 3.3. Diferenciação Visual nos Cards de Listagem

A experiência visual deve deixar **muito claro** qual fornecedor é Vitrine vs. Free/Low. Esta diferenciação é essencial para o modelo de negócio.

#### Tabela Comparativa Detalhada:

| Elemento | Free (`planLevel: 0`) | Low (`planLevel: -1`) | Vitrine (`planLevel: 1`) |
|----------|----------------------|----------------------|--------------------------|
| **Selo/Badge** | Nenhum | Nenhum | ✅ Badge destacado "Fornecedor Verificado" ou "Vitrine" |
| **Borda do Card** | Cinza claro (1px) | Cinza claro (1px) | ✅ Dourada ou azul (2-3px) com sombra forte |
| **Ícone de Destaque** | Nenhum | Nenhum | ✅ Coroa ou estrela (16-24px) ao lado do nome |
| **Botões de Contato** | ❌ Não exibir | ❌ Não exibir | ✅ WhatsApp, Instagram, Facebook (com background) |
| **Telefone** | Texto simples, sem link | Texto simples, sem link | ✅ Link clicável com `tel:` |
| **Background do Card** | Branco | Branco | ✅ Gradiente suave ou background com cor de marca |
| **Posicionamento** | Padrão | Padrão | ✅ "Destaque" ou posição 1 (antes dos demais) |

#### Implementação com React/JSX:

```jsx
// SupplierCard.jsx
export const SupplierCard = ({ supplier, category }) => {
  const isVitrine = supplier.planLevel === 1;
  const isFreeOrLow = supplier.planLevel === 0 || supplier.planLevel === -1;

  return (
    <div className={`
      supplier-card 
      ${isVitrine ? 'supplier-card--vitrine' : ''} 
      ${isFreeOrLow ? 'supplier-card--basic' : ''}
    `}>
      {/* Selo de Vitrine */}
      {isVitrine && (
        <div className="supplier-card__badge">
          <CrownIcon size={16} />
          <span>Fornecedor Verificado</span>
        </div>
      )}

      {/* Cabeçalho com Nome e Ícone */}
      <div className="supplier-card__header">
        <img 
          src={supplier.logoUrl} 
          alt={supplier.nome}
          className="supplier-card__logo"
          loading="lazy"
        />
        <div className="supplier-card__title">
          {isVitrine && <StarIcon className="supplier-card__star" />}
          <h3>{supplier.nome}</h3>
        </div>
      </div>

      {/* Informações Básicas */}
      <p className="supplier-card__description">
        {supplier.descricao.substring(0, 100)}...
      </p>

      {/* Localização e Rating */}
      <div className="supplier-card__meta">
        <span className="meta__location">📍 {supplier.cidade}</span>
        <span className="meta__rating">⭐ {supplier.rating.toFixed(1)}</span>
      </div>

      {/* Telefone */}
      <div className="supplier-card__phone">
        {isVitrine ? (
          <a href={`tel:${supplier.telefone}`} className="phone-link">
            📞 {supplier.telefone}
          </a>
        ) : (
          <span className="phone-text">📞 {supplier.telefone}</span>
        )}
      </div>

      {/* Botões de Ação */}
      {isVitrine && (
        <div className="supplier-card__actions">
          {supplier.whatsApp && (
            <a 
              href={`https://wa.me/${supplier.whatsApp}`}
              className="btn btn--whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp
            </a>
          )}
          <a 
            href={`/fornecedores/${supplier.slug}`}
            className="btn btn--primary"
          >
            Ver Perfil
          </a>
        </div>
      )}
    </div>
  );
};
```

#### CSS Estilos Sugeridos:

```css
/* Estilo Base do Card */
.supplier-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background: white;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.supplier-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Estilo Vitrine */
.supplier-card--vitrine {
  border: 2px solid #ffd700;
  background: linear-gradient(135deg, #fffbf0 0%, #ffffff 100%);
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.15);
}

.supplier-card--vitrine:hover {
  box-shadow: 0 8px 16px rgba(255, 215, 0, 0.25);
}

/* Badge de Destaque */
.supplier-card__badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #333;
  font-size: 12px;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
  width: fit-content;
}

/* Ícone de Destaque */
.supplier-card__star {
  color: #ffd700;
  margin-right: 6px;
  animation: sparkle 0.6s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

/* Telefone como Link */
.phone-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.phone-link:hover {
  text-decoration: underline;
}

/* Telefone como Texto (Free/Low) */
.phone-text {
  color: #666;
  font-weight: 500;
}

/* Botões de Ação */
.supplier-card__actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btn {
  flex: 1;
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn--whatsapp {
  background: #25d366;
  color: white;
}

.btn--whatsapp:hover {
  background: #20ba5a;
  transform: scale(1.05);
}

.btn--primary {
  background: #0066cc;
  color: white;
}

.btn--primary:hover {
  background: #0052a3;
}
```

### 3.4. Diferenciação Visual na Página de Perfil Completo

A página de perfil é onde a diferença entre Free e Vitrine **fica mais evidente**, pois Vitrine tem acesso a **todas** as funcionalidades.

#### Tabela Comparativa - Página de Perfil:

| Funcionalidade | Free (`planLevel: 0`) | Low (`planLevel: -1`) | Vitrine (`planLevel: 1`) |
|----------------|----------------------|----------------------|--------------------------|
| **Botão WhatsApp** | ❌ Não exibir | ❌ Não exibir | ✅ Link direto com `wa.me/` |
| **Botão Instagram** | ❌ Não exibir | ❌ Não exibir | ✅ Link para perfil |
| **Botão Facebook** | ❌ Não exibir | ❌ Não exibir | ✅ Link para página |
| **Botão Website** | ❌ Não exibir | ❌ Não exibir | ✅ Link para site |
| **Link Google Maps** | ❌ Não exibir | ❌ Não exibir | ✅ Link para localização |
| **Galeria de Imagens** | Máx. 2 imagens | Máx. 2 imagens | ✅ Todas (até 20) em carrossel |
| **Seção de Testemunhos** | ❌ Não exibir | ❌ Não exibir | ✅ Todos os testemunhos |
| **Selo "Verificado"** | ❌ Não exibir | ❌ Não exibir | ✅ Destaque no topo |
| **Card de Concorrentes** | ✅ Após 3 leads | ❌ Não exibir | ❌ Não exibir |
| **Horário de Funcionamento** | ❌ Não exibir | ❌ Não exibir | ✅ Exibir se preenchido |
| **Endereço Completo** | ❌ Não exibir | ❌ Não exibir | ✅ Exibir se preenchido |

#### Implementação da Página de Perfil com React:

```jsx
// SupplierProfile.jsx
export const SupplierProfile = ({ supplier }) => {
  const isVitrine = supplier.planLevel === 1;
  const isFreeOrLow = supplier.planLevel === 0 || supplier.planLevel === -1;

  // Limitar galeria para Free/Low
  const galleryImages = isVitrine 
    ? supplier.gallery 
    : supplier.gallery?.slice(0, 2) || [];

  return (
    <div className="supplier-profile">
      {/* Cabeçalho com Capa e Logo */}
      <div className="profile-header">
        <img 
          src={supplier.coverPictureUrl} 
          alt={supplier.nome}
          className="profile-header__cover"
          loading="lazy"
        />
        <div className="profile-header__overlay">
          <img 
            src={supplier.profilePictureUrl} 
            alt={supplier.nome}
            className="profile-header__logo"
          />
          <div className="profile-header__info">
            <h1 className="profile-header__name">
              {isVitrine && <CrownIcon className="profile-header__crown" />}
              {supplier.nome}
            </h1>
            {isVitrine && (
              <span className="profile-header__badge">Fornecedor Verificado</span>
            )}
            <p className="profile-header__location">📍 {supplier.cidade}</p>
          </div>
        </div>
      </div>

      {/* Descrição e Informações */}
      <section className="profile-section">
        <h2>Sobre</h2>
        <p className="profile-bio">{supplier.bio}</p>

        {/* Horário de Funcionamento - Apenas Vitrine */}
        {isVitrine && supplier.horarioFuncionamento && (
          <div className="profile-info-box">
            <h3>⏰ Horário de Funcionamento</h3>
            <p>{supplier.horarioFuncionamento}</p>
          </div>
        )}

        {/* Endereço - Apenas Vitrine */}
        {isVitrine && supplier.endereco && (
          <div className="profile-info-box">
            <h3>📍 Endereço</h3>
            <p>{supplier.endereco}</p>
          </div>
        )}
      </section>

      {/* Botões de Contato */}
      <section className="profile-contact">
        <h2>Entre em Contato</h2>
        <div className="contact-buttons">
          {/* Telefone - Todos */}
          <a href={`tel:${supplier.phone}`} className="contact-btn contact-btn--phone">
            📞 {supplier.phone}
          </a>

          {/* WhatsApp - Apenas Vitrine */}
          {isVitrine && supplier.whatsApp && (
            <a 
              href={`https://wa.me/${supplier.whatsApp}`}
              className="contact-btn contact-btn--whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp
            </a>
          )}

          {/* Instagram - Apenas Vitrine */}
          {isVitrine && supplier.instagram && (
            <a 
              href={`https://instagram.com/${supplier.instagram}`}
              className="contact-btn contact-btn--instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              📸 Instagram
            </a>
          )}

          {/* Facebook - Apenas Vitrine */}
          {isVitrine && supplier.facebook && (
            <a 
              href={supplier.facebook}
              className="contact-btn contact-btn--facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              👍 Facebook
            </a>
          )}

          {/* Website - Apenas Vitrine */}
          {isVitrine && supplier.website && (
            <a 
              href={supplier.website}
              className="contact-btn contact-btn--website"
              target="_blank"
              rel="noopener noreferrer"
            >
              🌐 Website
            </a>
          )}

          {/* Google Maps - Apenas Vitrine */}
          {isVitrine && supplier.city && (
            <a 
              href={`https://maps.google.com/?q=${supplier.city}`}
              className="contact-btn contact-btn--maps"
              target="_blank"
              rel="noopener noreferrer"
            >
              🗺️ Ver no Mapa
            </a>
          )}
        </div>
      </section>

      {/* Galeria de Imagens */}
      <section className="profile-section">
        <h2>
          Galeria 
          {!isVitrine && ` (${galleryImages.length}/2)`}
        </h2>
        <ImageGallery 
          images={galleryImages}
          isVitrine={isVitrine}
        />
      </section>

      {/* Testemunhos - Apenas Vitrine */}
      {isVitrine && supplier.testimonials?.length > 0 && (
        <section className="profile-section">
          <h2>Testemunhos ({supplier.testimonials.length})</h2>
          <div className="testimonials-list">
            {supplier.testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </section>
      )}

      {/* Card de Concorrentes - Apenas Free após 3 leads */}
      {isFreeOrLow && supplier.competitors?.length > 0 && (
        <section className="profile-section profile-section--competitors">
          <h2>Veja também estes fornecedores</h2>
          <p className="competitors-subtitle">
            Outras opções destacadas na categoria {supplier.categoria.nome}
          </p>
          <div className="competitors-carousel">
            {supplier.competitors.slice(0, 3).map(competitor => (
              <CompetitorCard key={competitor.id} competitor={competitor} />
            ))}
          </div>
        </section>
      )}

      {/* Formulário de Contato/Lead */}
      <section className="profile-section profile-section--contact-form">
        <ContactForm supplierId={supplier.id} supplierName={supplier.nome} />
      </section>
    </div>
  );
};
```

#### CSS para Página de Perfil:

```css
/* Cabeçalho de Perfil */
.profile-header {
  position: relative;
  height: 300px;
  background: #f0f0f0;
  overflow: hidden;
}

.profile-header__cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-header__overlay {
  position: absolute;
  bottom: -50px;
  left: 20px;
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

.profile-header__logo {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: 4px solid white;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.profile-header__name {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.profile-header__crown {
  color: #ffd700;
  font-size: 24px;
  animation: bobbing 0.6s ease-in-out infinite;
}

@keyframes bobbing {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.profile-header__badge {
  display: inline-block;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #333;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

/* Seções de Conteúdo */
.profile-section {
  padding: 30px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.profile-section:last-child {
  border-bottom: none;
}

.profile-section h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

/* Botões de Contato */
.contact-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.contact-btn {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.contact-btn--phone {
  background: #0066cc;
  color: white;
  border-color: #0066cc;
}

.contact-btn--whatsapp {
  background: #25d366;
  color: white;
  border-color: #25d366;
}

.contact-btn--instagram {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
  border: none;
}

.contact-btn--facebook {
  background: #1877f2;
  color: white;
  border-color: #1877f2;
}

/* Concorrentes - Apenas Free */
.profile-section--competitors {
  background: #f9f9f9;
}

.competitors-subtitle {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}

.competitors-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
```

---

## 4. Sistema de Leads e Regras de Visibilidade de Contato

O sistema de leads é **fundamental** para o modelo de monetização. Fornecedores Free têm seus dados progressivamente ofuscados para incentivar upgrade.

### 4.1. Regras por Tier

#### **Free (`planLevel: 0`)**

**Comunicação de Emails:**

1. **Leads 1 e 2** (Informações Completas):
   - Fornecedor recebe no email:
     - ✅ Nome, email e telefone **COMPLETOS** do lead
     - ✅ Link para reivindicar perfil (se não reivindicado)
     - ✅ Link para se tornar membro Vitrine (upgrade)
     - ✅ Link para visualizar perfil no portal
     - ✅ Informação: "Você ainda pode receber **1 mais lead completo**"

   **Email Template (Leads 1-2):**
   ```
   Assunto: Novo Lead - [Nome da Noiva]
   
   Olá [Nome Fornecedor],
   
   Você recebeu um novo lead!
   
   📌 DADOS DO LEAD
   Nome: [Nome Completo]
   Email: [email@completo.com]
   Telefone: [11 99999-8888]
   Data do Evento: [15 de outubro de 2027]
   Mensagem: [Texto da mensagem]
   
   ---
   
   ℹ️ INFORMAÇÕES IMPORTANTES:
   • Você ainda pode receber 1 lead completo (após isso, dados serão ofuscados)
   • Para receber TODOS os dados dos leads: [Link para upgrade Vitrine]
   • Gerenciar seu perfil: [Link para reivindicar perfil]
   • Ver seu perfil no portal: [Link do perfil]
   
   ---
   
   Atenciosamente,
   Equipe Guia Noivas
   ```

2. **Lead 3** (Aviso de Limite):
   - Fornecedor recebe no email:
     - ✅ Nome, email e telefone **COMPLETOS**
     - ✅ **AVISO DESTACADO**: "Este é seu **último lead com dados completos!**"
     - ✅ Link proeminente para upgrade Vitrine
     - ✅ Informação: "Próximos leads terão dados ofuscados"

   **Email Template (Lead 3):**
   ```
   Assunto: ⚠️ Último Lead Completo! Novo Lead de [Nome da Noiva]
   
   Olá [Nome Fornecedor],
   
   Você recebeu um novo lead!
   
   📌 DADOS DO LEAD
   Nome: [Nome Completo]
   Email: [email@completo.com]
   Telefone: [11 99999-8888]
   Data do Evento: [15 de outubro de 2027]
   Mensagem: [Texto da mensagem]
   
   ⚠️ ATENÇÃO! ESTE É SEU ÚLTIMO LEAD COM DADOS COMPLETOS!
   
   Após este lead, todos os próximos terão dados ofuscados (ex: ful...@gmail.com).
   
   Para receber TODOS os dados dos leads SEM LIMITE:
   ⭐ [UPGRADE PARA VITRINE] ⭐
   
   Atenciosamente,
   Equipe Guia Noivas
   ```

3. **Leads 4+** (Dados Ofuscados):
   - Fornecedor recebe no email:
     - ❌ Email ofuscado: `fulano@gmail.com` → `ful...@gmail.com`
     - ❌ Telefone ofuscado: `(11) 98765-4321` → `(11) *****-4321`
     - ✅ Nome completo (não ofuscado)
     - ✅ Mensagem e data do evento (não ofuscados)
     - ✅ **DESTAQUE**: "Dados ofuscados - Upgrade para Vitrine para ver dados completos"

   **Email Template (Leads 4+):**
   ```
   Assunto: Novo Lead - [Nome da Noiva]
   
   Olá [Nome Fornecedor],
   
   Você recebeu um novo lead!
   
   📌 DADOS DO LEAD
   Nome: [Nome Completo]
   Email: [ful...@gmail.com] ⚠️ Dados ofuscados
   Telefone: [(11) *****-4321] ⚠️ Dados ofuscados
   Data do Evento: [15 de outubro de 2027]
   Mensagem: [Texto da mensagem]
   
   🔓 DESBLOQUEIE OS DADOS COMPLETOS!
   
   Upgrade para Vitrine e receba TODOS os dados dos leads SEM LIMITE:
   ⭐ [UPGRADE PARA VITRINE] ⭐
   
   Atenciosamente,
   Equipe Guia Noivas
   ```

#### **Vitrine (`planLevel: 1`)**

- ✅ **TODOS os dados completamente visíveis**, ILIMITADO
- ✅ Nenhuma ofuscação
- ✅ Limite de leads: 999.999 (praticamente ilimitado)
- ✅ Email simples de confirmação:

   **Email Template (Vitrine):**
   ```
   Assunto: Novo Lead - [Nome da Noiva]
   
   Olá [Nome Fornecedor],
   
   Você recebeu um novo lead!
   
   📌 DADOS DO LEAD
   Nome: [Nome Completo]
   Email: [email@completo.com]
   Telefone: [11 99999-8888]
   Data do Evento: [15 de outubro de 2027]
   Mensagem: [Texto da mensagem]
   
   Gerenciar seus leads: [Link do painel]
   
   Atenciosamente,
   Equipe Guia Noivas
   ```

#### **Low (`planLevel: -1`)**

- Limite de leads: **1 por mês**
- Dados completos, mas com aviso de limite
- Ao receber o 1º lead do mês:
  - Email com dados completos
  - Aviso: "Você já atingiu seu limite mensal de 1 lead"
  - Link para upgrade Vitrine

#### **Zombie (`planLevel: -2`)**

- ❌ Fornecedor **não recebe** leads
- ✅ Leads são direcionados ao **administrador**
- Status: Perfil não reivindicado

### 4.2. Lógica Frontend - Exibição de Dados no Painel

No painel do fornecedor autenticado (`/supplier/dashboard`), os leads devem ser exibidos respeitando as regras:

```jsx
// LeadsPanel.jsx
export const LeadsPanel = ({ supplier, leads }) => {
  const isFreeOrLow = supplier.planLevel <= 0;
  const totalLeadsReceived = supplier.totalLeadsAllTime;

  const obscureEmail = (email) => {
    const [local, domain] = email.split('@');
    const obscured = local.substring(0, 3) + '...';
    return `${obscured}@${domain}`;
  };

  const obscurePhone = (phone) => {
    return phone.replace(/\d(?=\d{4})/g, '*');
  };

  return (
    <div className="leads-panel">
      <h2>Meus Leads</h2>

      {isFreeOrLow && (
        <div className="leads-info-banner">
          <div className="leads-info-banner__status">
            <span className="leads-count">
              {totalLeadsReceived}/3 leads completos recebidos
            </span>
            {totalLeadsReceived >= 3 && (
              <span className="leads-warning">⚠️ Próximos dados serão ofuscados</span>
            )}
          </div>
          <div className="leads-info-banner__cta">
            <a href="/upgrade" className="btn btn--primary">
              ⭐ Upgrade para Vitrine
            </a>
          </div>
        </div>
      )}

      <table className="leads-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Data do Evento</th>
            <th>Recebido em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => {
            const isCompleteData = supplier.planLevel === 1 || index < 3;
            
            return (
              <tr key={lead.id} className={`lead-row ${!isCompleteData ? 'lead-row--obscured' : ''}`}>
                <td>{lead.name}</td>
                <td>
                  {isCompleteData ? (
                    <a href={`mailto:${lead.email}`}>{lead.email}</a>
                  ) : (
                    <>
                      <span className="obscured-value">{obscureEmail(lead.email)}</span>
                      <span className="obscured-badge">Ofuscado</span>
                    </>
                  )}
                </td>
                <td>
                  {isCompleteData ? (
                    <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                  ) : (
                    <>
                      <span className="obscured-value">{obscurePhone(lead.phone)}</span>
                      <span className="obscured-badge">Ofuscado</span>
                    </>
                  )}
                </td>
                <td>{new Date(lead.eventDate).toLocaleDateString('pt-BR')}</td>
                <td>{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</td>
                <td>
                  <button className="btn btn--sm btn--secondary">Ver Detalhes</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
```

### 4.3. Formulário de Contato/Lead no Portal Público

O formulário deve ser acessível e com validação clara:

```jsx
// ContactForm.jsx
export const ContactForm = ({ supplierId, supplierName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    if (!formData.name.trim()) return "Nome é obrigatório";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) 
      return "Email válido é obrigatório";
    if (!formData.phone.trim() || !/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/.test(formData.phone.replace(/[\s-]/g, '')))
      return "Telefone válido é obrigatório";
    if (!formData.eventDate) return "Data do evento é obrigatória";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/public/fornecedores/${supplierId}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', eventDate: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError('Erro ao enviar formulário. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <h2>Solicitar Orçamento</h2>
      <p className="contact-form__subtitle">
        Preencha o formulário abaixo para receber um orçamento de {supplierName}
      </p>

      {success && (
        <div className="alert alert--success">
          ✅ Sua solicitação foi enviada com sucesso! 
          {supplierName} entrará em contato em breve.
        </div>
      )}

      {error && (
        <div className="alert alert--error">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nome da Noiva *</label>
          <input
            id="name"
            type="text"
            placeholder="Digite seu nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefone/WhatsApp *</label>
          <input
            id="phone"
            type="tel"
            placeholder="(11) 99999-8888"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventDate">Data do Evento *</label>
          <input
            id="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensagem (Opcional)</label>
          <textarea
            id="message"
            placeholder="Conte mais detalhes sobre seu casamento (estilo, orçamento aproximado, dúvidas, etc)"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn--primary btn--large" disabled={loading}>
          {loading ? 'Enviando...' : 'Solicitar Orçamento'}
        </button>

        <p className="form-disclaimer">
          * Campos obrigatórios. Seus dados serão compartilhados com {supplierName}
          de acordo com nossa <a href="/privacy">Política de Privacidade</a>.
        </p>
      </form>
    </div>
  );
};
```

#### CSS para Formulário:

```css
.contact-form-wrapper {
  max-width: 600px;
  margin: 30px auto;
}

.contact-form {
  background: #f9f9f9;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.form-group input,
.form-group textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.btn--large {
  width: 100%;
  padding: 14px;
  font-size: 16px;
}

.form-disclaimer {
  font-size: 12px;
  color: #666;
  margin-top: 12px;
  text-align: center;
}

.alert {
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-weight: 500;
}

.alert--success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert--error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
```

---

## 5.1. Card de Concorrentes (Apenas para Fornecedores Free após 3 Leads)

**Objetivo Estratégico:** Mostrar concorrentes Vitrine para fornecedores Free, incentivando o upgrade para "Vitrine".

### Quando Exibir

-   Fornecedor tem `planLevel: 0` (Free)
-   Fornecedor já recebeu **pelo menos 3 leads** (`totalLeadsAllTime >= 3`)
-   API retorna array `competitors` com até 3 fornecedores da mesma categoria
-   **Exibição:** Ao final da página de perfil, antes do formulário de contato

### Estrutura do Array (Response da API)

```json
{
  "id": "fornecedor-guid",
  "nome": "Fornecedor Free",
  "planLevel": 0,
  "totalLeadsAllTime": 3,
  "competitors": [
    {
      "id": "comp1-guid",
      "nome": "Fotógrafo Premium Vitrine",
      "slug": "fotografo-premium-vitrine",
      "profilePictureUrl": "https://url.da.imagem/comp1.webp",
      "planLevel": 1,
      "city": "São Paulo",
      "rating": 4.8
    },
    {
      "id": "comp2-guid",
      "nome": "Studio de Fotografia Vitrine",
      "slug": "studio-fotografia-vitrine",
      "profilePictureUrl": "https://url.da.imagem/comp2.webp",
      "planLevel": 1,
      "city": "Rio de Janeiro",
      "rating": 4.6
    },
    {
      "id": "comp3-guid",
      "nome": "Fotógrafo Wedding Expert",
      "slug": "fotografo-wedding-expert",
      "profilePictureUrl": "https://url.da.imagem/comp3.webp",
      "planLevel": 1,
      "city": "São Paulo",
      "rating": 4.9
    }
  ]
}
```

### Renderização do Componente

```jsx
// CompetitorsSection.jsx
export const CompetitorsSection = ({ supplier, competitors }) => {
  // Exibir apenas se Free com 3+ leads
  if (supplier.planLevel !== 0 || supplier.totalLeadsAllTime < 3) {
    return null;
  }

  if (!competitors || competitors.length === 0) {
    return null;
  }

  return (
    <section className="competitors-section">
      <div className="competitors-header">
        <h2>Conheça Outros Fornecedores de {supplier.categoria.nome}</h2>
        <p className="competitors-subtitle">
          Você já recebeu vários leads! Confira também estes fornecedores destacados:
        </p>
      </div>

      <div className="competitors-carousel">
        {competitors.slice(0, 3).map((competitor) => (
          <div key={competitor.id} className="competitor-card">
            <div className="competitor-card__header">
              <img
                src={competitor.profilePictureUrl}
                alt={competitor.nome}
                className="competitor-card__image"
                loading="lazy"
              />
              <div className="competitor-card__vitrine-badge">
                ⭐ Vitrine
              </div>
            </div>

            <div className="competitor-card__content">
              <h3 className="competitor-card__name">{competitor.nome}</h3>
              <div className="competitor-card__meta">
                <span className="meta__city">📍 {competitor.city}</span>
                <span className="meta__rating">⭐ {competitor.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="competitor-card__footer">
              <a
                href={`/fornecedores/${competitor.slug}`}
                className="btn btn--secondary btn--block"
              >
                Ver Perfil
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="competitors-cta">
        <p className="competitors-cta__text">
          Quer aparecer nessa posição de destaque?
        </p>
        <a href="/upgrade" className="btn btn--primary btn--large">
          ⭐ Upgrade para Vitrine
        </a>
      </div>
    </section>
  );
};
```

### CSS para Componente de Concorrentes

```css
.competitors-section {
  background: linear-gradient(135deg, #f5f5f5 0%, #fafafa 100%);
  padding: 40px 20px;
  margin-top: 40px;
  border-top: 2px solid #e0e0e0;
  border-bottom: 2px solid #e0e0e0;
}

.competitors-header h2 {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
}

.competitors-subtitle {
  color: #666;
  font-size: 14px;
  margin-bottom: 24px;
}

.competitors-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.competitor-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.competitor-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(255, 215, 0, 0.2);
}

.competitor-card__header {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #f0f0f0;
}

.competitor-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.competitor-card:hover .competitor-card__image {
  transform: scale(1.05);
}

.competitor-card__vitrine-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #333;
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 12px;
}

.competitor-card__content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.competitor-card__name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.competitor-card__meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}

.competitor-card__footer {
  padding: 0 16px 16px;
}

.btn--block {
  width: 100%;
  text-align: center;
}

.competitors-cta {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.competitors-cta__text {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.btn--large {
  padding: 14px 28px;
  font-size: 16px;
  display: inline-block;
}
```

---

## 5.2. Card de Imagem Principal (Gallery Carrossel)

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

### Galeria de Imagens com Limite por Tier

```jsx
// ImageGallery.jsx
import { useState } from 'react';

export const ImageGallery = ({ images, isVitrine }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const displayLimit = isVitrine ? 20 : 2;
  const displayImages = images.slice(0, displayLimit);

  if (!displayImages || displayImages.length === 0) {
    return (
      <div className="gallery-empty">
        <p>Nenhuma imagem disponível</p>
      </div>
    );
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % displayImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="gallery-wrapper">
      {/* Carrossel Principal */}
      <div className="gallery-main">
        <button
          className="gallery-nav gallery-nav--prev"
          onClick={handlePrev}
          aria-label="Imagem anterior"
        >
          ❮
        </button>

        <img
          src={displayImages[selectedIndex].url}
          alt={`Galeria ${selectedIndex + 1}`}
          className="gallery-main__image"
          loading="lazy"
        />

        <button
          className="gallery-nav gallery-nav--next"
          onClick={handleNext}
          aria-label="Próxima imagem"
        >
          ❯
        </button>

        <div className="gallery-counter">
          {selectedIndex + 1} / {displayImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="gallery-thumbnails">
          {displayImages.map((image, index) => (
            <button
              key={index}
              className={`gallery-thumbnail ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Imagem ${index + 1}`}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {!isVitrine && images.length > 2 && (
        <p className="gallery-limited">
          Exibindo 2 de {images.length} imagens. Veja todas em Vitrine!
        </p>
      )}
    </div>
  );
};
```

#### CSS para Galeria:

```css
.gallery-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gallery-main {
  position: relative;
  width: 100%;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
}

.gallery-main__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.gallery-nav:hover {
  background: rgba(0, 0, 0, 0.7);
}

.gallery-nav--prev {
  left: 12px;
}

.gallery-nav--next {
  right: 12px;
}

.gallery-counter {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.gallery-thumbnails {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
}

.gallery-thumbnail {
  aspect-ratio: 1;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
  background: none;
}

.gallery-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-thumbnail:hover {
  border-color: #0066cc;
  transform: scale(1.05);
}

.gallery-thumbnail.active {
  border-color: #ffd700;
  box-shadow: 0 0 0 2px #ffd700;
}

.gallery-limited {
  color: #ff6b6b;
  font-size: 12px;
  text-align: center;
  padding: 8px;
  background: #fff5f5;
  border-radius: 4px;
  margin: 0;
}

.gallery-empty {
  background: #f9f9f9;
  border: 1px dashed #ddd;
  padding: 40px;
  text-align: center;
  color: #999;
  border-radius: 8px;
}
```

---

## 5.3. Selo "Fornecedor Verificado"

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

## 7. Checklist Completo de Implementação

### Fase 1: Estrutura Básica de Páginas

- [ ] **Listar Fornecedores (HomePage/Categoria)**
  - [ ] Integrar endpoint `/v1/fornecedores/ativos` ou `/v1/fornecedores/ativos/categoria/{id}`
  - [ ] Implementar paginação (page, pageSize)
  - [ ] Exibir lista de fornecedores com cards
  - [ ] Aplicar ordenação correta (Vitrine aleatório → Free → Low)
  - [ ] Validar que Zombie não aparecem na lista

- [ ] **Página de Perfil Completo**
  - [ ] Integrar endpoint `GET /v1/public/fornecedores/{id}` ou `GET /v1/public/fornecedores/slug/{slug}`
  - [ ] Implementar rota dinâmica (ex: `/fornecedores/[slug]`)
  - [ ] Exibir foto de capa + logo
  - [ ] Exibir informações básicas (nome, cidade, rating)
  - [ ] Implementar seções condicionais por `planLevel`

### Fase 2: Diferenciação Visual por Tier

- [ ] **Styling de Card (Listagem)**
  - [ ] Borda padrão para Free/Low
  - [ ] Borda dourada + gradiente para Vitrine
  - [ ] Badge "Fornecedor Verificado" apenas em Vitrine
  - [ ] Ícone de coroa ao lado do nome em Vitrine
  - [ ] Sombra e hover effects diferenciados

- [ ] **Styling de Perfil Completo**
  - [ ] Selo de destaque no topo apenas para Vitrine
  - [ ] Estilo diferente do cabeçalho (capa + logo)
  - [ ] Implementar animação na coroa
  - [ ] Cores de destaque para seções Vitrine

### Fase 3: Sistema de Botões de Contato

- [ ] **Botões Visíveis/Ocultos por Tier**
  - [ ] WhatsApp: Apenas Vitrine (com `wa.me/` link)
  - [ ] Instagram: Apenas Vitrine
  - [ ] Facebook: Apenas Vitrine
  - [ ] Website: Apenas Vitrine
  - [ ] Google Maps: Apenas Vitrine
  - [ ] Telefone: Sempre visível (link para Vitrine, texto para Free/Low)

- [ ] **Implementação de Links**
  - [ ] WhatsApp: `https://wa.me/55XXXXXXXXXXX` (sem formatação, apenas números)
  - [ ] Instagram: `https://instagram.com/[username]`
  - [ ] Facebook: Link da página/perfil
  - [ ] Maps: `https://maps.google.com/?q=[city]`
  - [ ] Telefone: `tel:[numero]` para Vitrine, texto puro para Free

### Fase 4: Galeria de Imagens

- [ ] **Limites de Exibição**
  - [ ] Free/Low: Exibir máx. 2 imagens
  - [ ] Vitrine: Exibir até 20 imagens
  - [ ] Implementar carrossel/slider
  - [ ] Adicionar thumbnails com navegação

- [ ] **Funcionalidades da Galeria**
  - [ ] Botões prev/next
  - [ ] Contador de imagens (ex: "3/20")
  - [ ] Lazy loading em imagens
  - [ ] Zoom ao clicar na imagem
  - [ ] Indicador visual quando limitado (Free/Low)

### Fase 5: Testemunhos

- [ ] **Exibição Condicional**
  - [ ] Apenas para Vitrine
  - [ ] Ocultar para Free/Low

- [ ] **Componente de Testemunho**
  - [ ] Nome da noiva (ou "Noiva X" se anônimo)
  - [ ] Rating (ex: ⭐⭐⭐⭐⭐)
  - [ ] Texto do depoimento
  - [ ] Data do testemunho
  - [ ] (Opcional) Foto da noiva

- [ ] **Listagem**
  - [ ] Mostrar todos os testemunhos
  - [ ] (Opcional) Carrossel com até 5 por vez
  - [ ] Ordenar por data (mais recente primeiro)

### Fase 6: Sistema de Leads e Contato

- [ ] **Formulário de Contato**
  - [ ] Campos: Nome, Email, Telefone, Data Evento, Mensagem
  - [ ] Validação no frontend
  - [ ] Integrar endpoint `POST /v1/public/fornecedores/{id}/contact`
  - [ ] Mensagem de sucesso após envio
  - [ ] Tratamento de erros
  - [ ] Loading state

- [ ] **Validação de Dados**
  - [ ] Nome: Não vazio
  - [ ] Email: Validar formato
  - [ ] Telefone: Validar formato brasileiro (11) XXXX-XXXX
  - [ ] Data: Não pode ser no passado
  - [ ] Mensagem: Opcional, max 1000 caracteres

- [ ] **Feedback ao Usuário**
  - [ ] Mensagem de sucesso verde
  - [ ] Mensagem de erro em vermelho
  - [ ] Spinner durante envio
  - [ ] Limpar formulário após sucesso

### Fase 7: Card de Concorrentes (Free com 3+ leads)

- [ ] **Lógica de Exibição**
  - [ ] Verificar `planLevel === 0`
  - [ ] Verificar `totalLeadsAllTime >= 3`
  - [ ] Verificar se array `competitors` não está vazio

- [ ] **Renderização**
  - [ ] Exibir até 3 concorrentes
  - [ ] Mostrar foto, nome, cidade, rating
  - [ ] Badge "Vitrine" em cada card
  - [ ] Botão "Ver Perfil" com link para concorrente
  - [ ] CTA "Upgrade para Vitrine"

- [ ] **Posicionamento**
  - [ ] Após galeria de imagens
  - [ ] Antes do formulário de contato
  - [ ] Seção com background diferenciado
  - [ ] Destaque visual para incentivo de upgrade

### Fase 8: Painel do Fornecedor (Autenticado)

- [ ] **Página de Leads**
  - [ ] Integrar endpoint `GET /v1/public/fornecedores/me/leads`
  - [ ] Listar todos os leads recebidos
  - [ ] Exibir contador de leads completos (Free)
  - [ ] Mostrar dados ofuscados para Free após 3 leads

- [ ] **Ofuscação de Dados (Free)**
  - [ ] Email: `user@example.com` → `use...@example.com`
  - [ ] Telefone: `(11) 98765-4321` → `(11) *****-4321`
  - [ ] Adicionar badge "Ofuscado" visual
  - [ ] Mostrar CTA para upgrade

- [ ] **Ordenação e Filtros**
  - [ ] Mostrar leads mais recentes primeiro
  - [ ] (Opcional) Filtrar por status (lido/não lido)
  - [ ] (Opcional) Buscar por nome

### Fase 9: Adesão Express e Upgrade

- [ ] **Página de Adesão Express (Público)**
  - [ ] Formulário de cadastro rápido
  - [ ] Integrar endpoint `POST /v1/fornecedores/adesao-express`
  - [ ] Validação de CNPJ/CPF
  - [ ] Validação de email único
  - [ ] Aceitar termos de serviço
  - [ ] Redirecionar para checkout após sucesso

- [ ] **Página de Checkout**
  - [ ] Integrar endpoint `POST /v1/fornecedores/adesao-express/{id}/gerar-checkout`
  - [ ] Exibir valor do plano
  - [ ] Redirecionar para InfinitePay
  - [ ] Implementar verifi...

- [ ] **Página de Sucesso de Pagamento**
  - [ ] Integrar endpoint `GET /v1/fornecedores/adesao-express/{id}/status-pagamento`
  - [ ] Exibir mensagem de confirmação
  - [ ] Mostrar instruções de acesso
  - [ ] Link para fazer login

### Fase 10: SEO e Performance

- [ ] **Meta Tags Dinâmicas**
  - [ ] `<title>`: Fornecedor + Categoria + Cidade (ex: "Fotógrafo - Fotografia de Casamento em São Paulo")
  - [ ] `<meta name="description">`: Resumo da bio (max 155 chars)
  - [ ] `<meta property="og:image">`: Foto principal do fornecedor
  - [ ] `<meta property="og:title">`: Título da página
  - [ ] `<meta property="og:description">`: Descrição
  - [ ] `<meta property="og:type">`: `business.business`

- [ ] **URLs Amigáveis**
  - [ ] Implementar rotas com slug (ex: `/fornecedores/fotografo-premium-sao-paulo`)
  - [ ] Manter IDs como fallback
  - [ ] Implementar redirects de ID para slug

- [ ] **Otimização de Imagens**
  - [ ] Lazy loading em todas as imagens
  - [ ] Formatos webp (backend já retorna)
  - [ ] Responsive images (srcset)
  - [ ] Dimensões adequadas (não exceder viewport)
  - [ ] Compressão de imagens

- [ ] **Performance**
  - [ ] Implementar Code Splitting (lazy load rotas)
  - [ ] Memoizar componentes caros (React.memo)
  - [ ] Virtualizar listas longas se necessário
  - [ ] Cache de dados em cliente (localStorage/SWR)
  - [ ] Implementar skeleton loaders

### Fase 11: Acessibilidade e Usabilidade

- [ ] **Acessibilidade (A11y)**
  - [ ] ARIA labels em botões e links
  - [ ] Contraste de cores adequado (WCAG AA)
  - [ ] Navegação por teclado (Tab)
  - [ ] Focusable elements destacados
  - [ ] Alt text em todas as imagens

- [ ] **Responsividade**
  - [ ] Mobile: Testar em iPhone 12 (390px)
  - [ ] Tablet: Testar em iPad (768px)
  - [ ] Desktop: Testar em 1920px+
  - [ ] Touch targets: Mín. 44x44px

- [ ] **Usabilidade**
  - [ ] Loading states em botões
  - [ ] Disabled state em botões desativados
  - [ ] Confirmações em ações destrutivas
  - [ ] Breadcrumbs para navegação
  - [ ] (Opcional) Back button funcional

### Fase 12: Testes

- [ ] **Testes Unitários**
  - [ ] Componentes de card, perfil, formulário
  - [ ] Funções de ofuscação de dados
  - [ ] Validação de formulário

- [ ] **Testes de Integração**
  - [ ] Fluxo completo de busca → perfil → contato
  - [ ] Fluxo de adesão express
  - [ ] Pagamento e confirmação

- [ ] **Testes Manuais**
  - [ ] Testar com Free (0 leads)
  - [ ] Testar com Free (3 leads)
  - [ ] Testar com Free (4+ leads) - dados ofuscados
  - [ ] Testar com Vitrine
  - [ ] Testar com Low
  - [ ] Testar em navegadores (Chrome, Firefox, Safari, Edge)

- [ ] **Testes de Performance**
  - [ ] Lighthouse score > 80
  - [ ] FCP < 1.8s
  - [ ] LCP < 2.5s
  - [ ] CLS < 0.1

### Fase 13: LGPD e Privacidade

- [ ] **Links de Privacidade**
  - [ ] Link para Política de Privacidade no footer
  - [ ] Link para Termos de Serviço
  - [ ] Disclaimer no formulário de contato

- [ ] **Conformidade**
  - [ ] Consentimento para cookies/tracking
  - [ ] (Opcional) Aceitar marketing emails
  - [ ] Links de "Solicitar Remoção de Dados"

### Fase 14: Deploy e Monitoramento

- [ ] **Deploy**
  - [ ] Staging environment
  - [ ] Production environment
  - [ ] CDN configurado
  - [ ] SSL/HTTPS habilitado

- [ ] **Monitoramento**
  - [ ] Google Analytics implementado
  - [ ] Sentry para erro tracking
  - [ ] Uptime monitoring
  - [ ] Performance monitoring

---

## 8. Guia de Integração com API
### 8.1. Endpoints Principais

#### Listagem de Fornecedores

\\\javascript
// Op��o 1: Todos os ativos (com pagina��o)
GET /v1/fornecedores/ativos?page=1&pageSize=12

// Op��o 2: Por categoria espec�fica
GET /v1/fornecedores/ativos/categoria/{categoriaId}?page=1&pageSize=12

// Response:
{
  "data": [
    {
      "id": "guid",
      "nomeFantasia": "Nome",
      "slug": "slug",
      "planLevel": 1,
      "logoUrl": "...",
      "rating": 4.8,
      "categoria": { "id": "...", "nome": "..." },
      "totalLeadsAllTime": 15
    }
  ],
  "meta": {
    "total": 45,
    "page": 1,
    "pageSize": 12,
    "totalPages": 4
  }
}
\\\

#### Enviar Lead

\\\javascript
POST /v1/public/fornecedores/{fornecedorId}/contact

// Payload:
{
  "name": "Nome da Noiva",
  "email": "noiva@email.com",
  "phone": "(21) 91234-5678",
  "message": "Mensagem opcional",
  "eventDate": "2027-10-15"
}

// Response (201):
{
  "id": "lead_guid",
  "status": "NOVO",
  "message": "Sua solicita��o foi enviada com sucesso"
}
\\\

---

## 9. Regras de Neg�cio - Quick Reference

| Aspecto | Free | Vitrine |
|---------|------|---------|
| **Ordena��o** | Depois de Vitrine | Primeiro (aleat�rio) |
| **Bot�es Contato** | Apenas texto | Links clic�veis |
| **Galeria** | M�x. 2 imagens | At� 20 imagens |
| **Testemunhos** | N�o exibir | Exibir todos |
| **Dados Leads** | 3 completos, depois ofuscados | Todos completos |
| **Concorrentes** | Ap�s 3 leads | N�o exibem |

---

## 10. Conclus�o

Este documento fornece **100% da informa��o necess�ria** para implementar o portal p�blico do Guia Noivas com:

? **Consist�ncia Total** com as regras de neg�cio  
? **Modelo de Monetiza��o** por tiers implementado  
? **Best Practices** de desenvolvimento (React/Next.js)  
? **C�digo Exemplificado** pronto para usar  
? **Checklist Completo** com 14 fases de implementa��o  

O desenvolvedor frontend possui um **guia �nico e completo** que garante implementa��o 100% fiel �s regras de neg�cio do sistema.
