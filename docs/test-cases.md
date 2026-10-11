# Test Cases - SauceDemo (Priorizados)

De acuerdo con el análisis funcional de SauceDemo, se identificaron los siguientes casos de prueba prioritarios para incluir en el test suite de regresión automatizada del proyecto.

## Convenciones

| Símbolo | Significado |
| ------- | ----------- |
| 🔴 | Alta prioridad |
| 🟠 | Media prioridad |
| 🟡 | Baja prioridad |
| ⬜ | Pendiente |
| 🟨 | En progreso |
| ✅ | Completado |

---

| ID | Feature | Caso de Prueba | Prioridad | Estado | Automatizado | Notas |
|----|---------|----------------|-----------|---------|---------------|-------|
| TC01 | Auth | Login exitoso con credenciales válidas | 🔴 Alta | ✅ Completado | ✅ Sí | Cobertura de autenticación exitosa |
| TC02 | Auth | Login con usuario bloqueado | 🔴 Alta | ✅ Completado | ✅ Sí | Validación de mensaje de error |
| TC03 | Auth | Login con usuario inexistente | 🔴 Alta | ✅ Completado | ✅ Sí | Validación de credenciales inválidas |
| TC04 | Auth | Login sin password | 🔴 Alta | ✅ Completado | ✅ Sí | Validación de campo requerido |
| TC05 | Auth | Login sin usuario | 🔴 Alta | ✅ Completado | ✅ Sí | Validación de campo requerido |
| TC06 | Inventory | Adicionar un producto desde inventory | 🔴 Alta | ✅ Completado | ✅ Sí | Selección aleatoria de producto |
| TC07 | Inventory | Remover un producto desde inventory | 🔴 Alta | ✅ Completado | ✅ Sí | Validación de remoción y actualización del carrito |
| TC08 | Inventory | Adicionar todos los productos desde inventory | 🔴 Alta | ✅ Completado | ✅ Sí | Validación masiva de adición y cart badge |
| TC09 | Inventory | Remover todos los productos desde inventory | 🟠 Media | ✅ Completado | ✅ Sí | Validación masiva de remoción y carrito vacío |
| TC10 | Cart | Visualizar producto agregado en carrito | 🔴 Alta | ✅ Completado | ✅ Sí | Validación de información del producto y botón Remove |
| TC11 | Cart | Remover producto desde carrito | 🔴 Alta | ✅ Completado | ✅ Sí | Validación de remoción y actualización del cart badge |
| TC12 | Cart | Visualizar múltiples productos en carrito | 🟠 Media | ✅ Completado | ✅ Sí | Validación de consistencia de todos los productos agregados |
| TC13 | Cart | Remover múltiples productos desde carrito | 🟠 Media | ✅ Completado | ✅ Sí | Validación de carrito vacío tras remover todos los productos |
| TC14 | Checkout | Checkout exitoso con un producto | 🔴 Alta | ✅ Completado | ✅ Sí | Flujo completo: info cliente → resumen → confirmación. Validación de subtotal, impuesto (8%) y total |
| TC15 | Checkout | Checkout exitoso con múltiples productos | 🟠 Media | ✅ Completado | ✅ Sí | Flujo completo con múltiples productos. Acumulación de precios con `reduce()`, validación de totales |
| TC16 | Inventory | Organizar productos de A-Z | 🟡 Baja | ✅ Completado | ✅ Sí | Validación de ordenamiento alfabético ascendente |
| TC17 | Inventory | Organizar productos de Z-A | 🟡 Baja | ✅ Completado | ✅ Sí | Validación de ordenamiento alfabético descendente |
| TC18 | Inventory | Organizar productos por menor precio | 🟡 Baja | ✅ Completado | ✅ Sí | Validación de ordenamiento de precios ascendente |
| TC19 | Inventory | Organizar productos por mayor precio | 🟡 Baja | ✅ Completado | ✅ Sí | Validación de ordenamiento de precios descendente |

---

## Cobertura actual

### Auth

- Login exitoso
- Login con usuario bloqueado
- Login con usuario inexistente
- Validación de credenciales
- Validación de campos requeridos

### Inventory

- Adición de un producto aleatorio al carrito
- Remoción de un producto desde inventory
- Adición masiva de productos
- Remoción masiva de productos
- Validación dinámica de botones **Add to cart / Remove**
- Validación de cart badge
- Validación de carrito vacío
- Selección aleatoria de productos
- Ordenamiento A-Z, Z-A, precio ascendente, precio descendente

### Cart

- Navegación al carrito mediante componente compartido
- Visualización de un producto agregado
- Visualización de múltiples productos agregados
- Validación de nombre, descripción y precio de los productos
- Remoción individual de productos
- Remoción masiva de productos
- Validación de carrito vacío
- Validación de actualización del cart badge

### Checkout

- Flujo completo de compra con un producto
- Flujo completo de compra con múltiples productos
- Llenado de información del cliente (nombre, apellido, código postal)
- Validación de subtotal, impuesto (8%) y total en resumen de orden
- Acumulación de precios con `Array.reduce()`
- Confirmación de orden exitosa
- Manejo de precisión decimal con `.toFixed(2)` + `parseFloat()`

---

## Técnicas implementadas

- Playwright Test Runner
- Page Object Model (POM)
- Component Object Model (HeaderComponent)
- Custom Fixtures (`test.extend<PageFixtures>()`) — inyección de page objects sin boilerplate
- `storageState` — sesión autenticada reutilizada entre tests sin re-login
- Proyecto `setup` en `playwright.config.ts` con `dependencies: ['setup']`
- Separación de proyecto auth (sin storageState) vs proyecto autenticado
- Data-Driven Testing
- TypeScript Types para modelos reutilizables (`InventoryProduct` con `productPrice: number`)
- Multi-step Page Objects para flujos complejos (`CheckoutStepOnePage`, `CheckoutStepTwoPage`, `CheckoutCompletePage`)
- Función utilitaria `parsePriceLabel()` — estilo point-free, pure function
- Manejo de precisión decimal con `.toFixed(2)` + `parseFloat()`
- Acumulación con `Array.reduce()` para totales multi-producto
- Screenshots manuales adjuntos al reporte
- Uso de `test.step()`
- Assertions modernas de Playwright
- Uso de locators semánticos (`getByRole`, `getByPlaceholder`, etc.)
- Uso de locators dinámicos y scoped locators
- Reutilización de métodos de negocio desde Page Objects
- Separación entre acciones y validaciones
- Validaciones desacopladas del DOM
- Manejo de flujos dinámicos mediante selección aleatoria
- Reutilización de objetos de dominio (`InventoryProduct`)
- Automatización de escenarios individuales y masivos
- Componentes reutilizables compartidos entre múltiples páginas
- Reportes duales: Playwright HTML Report + Allure Report

---

## Estado del proyecto

| Métrica | Valor |
|---------|------:|
| Casos de prueba definidos | **19** |
| Casos automatizados | **19** |
| Casos pendientes | **0** |
| Cobertura de automatización | **100%** |

### Estado por funcionalidad

| Feature | Estado | Cobertura |
|---------|--------|-----------|
| ✅ Auth | Completa | 5 / 5 |
| ✅ Inventory | Completa | 8 / 8 |
| ✅ Cart | Completa | 4 / 4 |
| ✅ Checkout | Completa | 2 / 2 |