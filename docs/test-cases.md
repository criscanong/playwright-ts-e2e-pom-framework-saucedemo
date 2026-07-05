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
| TC14 | Checkout | Checkout exitoso con un producto | 🔴 Alta | ⬜ Pendiente | ❌ No | Flujo completo de compra |
| TC15 | Checkout | Checkout exitoso con múltiples productos | 🟠 Media | ⬜ Pendiente | ❌ No | Flujo completo con múltiples productos |
| TC16 | Inventory | Organizar productos de A-Z | 🟡 Baja | ⬜ Pendiente | ❌ No | Validación de ordenamiento alfabético |
| TC17 | Inventory | Organizar productos de Z-A | 🟡 Baja | ⬜ Pendiente | ❌ No | Validación de ordenamiento inverso |
| TC18 | Inventory | Organizar productos por menor precio | 🟡 Baja | ⬜ Pendiente | ❌ No | Validación de ordenamiento ascendente |
| TC19 | Inventory | Organizar productos por mayor precio | 🟡 Baja | ⬜ Pendiente | ❌ No | Validación de ordenamiento descendente |

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

### Cart

- Navegación al carrito mediante componente compartido
- Visualización de un producto agregado
- Visualización de múltiples productos agregados
- Validación de nombre, descripción y precio de los productos
- Remoción individual de productos
- Remoción masiva de productos
- Validación de carrito vacío
- Validación de actualización del cart badge

---

## Técnicas implementadas

- Playwright Test Runner
- Page Object Model (POM)
- Component Object Model (HeaderComponent)
- Data-Driven Testing
- TypeScript Types para modelos reutilizables
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

---

## Estado del proyecto

| Métrica | Valor |
|---------|------:|
| Casos de prueba definidos | **19** |
| Casos automatizados | **13** |
| Casos pendientes | **6** |
| Cobertura de automatización | **68.4%** |

### Estado por funcionalidad

| Feature | Estado | Cobertura |
|---------|--------|-----------|
| ✅ Auth | Completa | 5 / 5 |
| ✅ Inventory | Completa | 4 / 4 |
| ✅ Cart | Completa | 4 / 4 |
| ⬜ Checkout | Pendiente | 0 / 2 |
| ⬜ Inventory - Sorting | Pendiente | 0 / 4 |

### Próxima funcionalidad objetivo

```text
Checkout
```

### Próximos casos de prueba

| Orden | ID | Caso |
|------:|----|------|
| 1 | TC14 | Checkout exitoso con un producto |
| 2 | TC15 | Checkout exitoso con múltiples productos |
| 3 | TC16 | Organizar productos de A-Z |
| 4 | TC17 | Organizar productos de Z-A |
| 5 | TC18 | Organizar productos por menor precio |
| 6 | TC19 | Organizar productos por mayor precio |