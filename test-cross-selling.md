Plan:
1. Create a `CrossSellingComponent` (standalone component).
2. Inside the component, fetch `destaques` using `fornecedores.getDestaques()` (this ensures they are active/vitrine/paid).
3. Filter the fetched `destaques` so we exclude the current vendor's category.
4. Shuffle and pick exactly 2 vendors.
5. Create the UI for `CrossSellingComponent`: Title "Complete seu Casamento", responsive grid (horizontal scroll on mobile `overflow-x-auto snap-x flex`, 2 columns on desktop `md:grid md:grid-cols-2`), cards with cover image (`aspect-video`), category badge, name (line-clamp-2), and CTA "Ver Perfil ->".
6. Import `CrossSellingComponent` into `FornecedorPageComponent` and add it at the bottom of the main content column (before `</div>` for `.lg:col-span-2`), using `@defer (on viewport) { <app-cross-selling [currentCategory]="fornecedor.categoria"></app-cross-selling> }` for lazy loading.
7. Run checks.
