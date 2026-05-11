# Test Cases - SauceDemo (Priorizados)

De acuerdo con el análisis funcional de :contentReference[oaicite:0]{index=0}, se identificaron los siguientes casos de prueba prioritarios para incluir en el test suite de regresión automatizada del proyecto.

## Convenciones

| Símbolo | Significado |
|---|---|
| 🔴 | Alta prioridad |
| 🟠 | Media prioridad |
| 🟡 | Baja prioridad |
| ⬜ | Pendiente |
| 🟨 | En progreso |
| ✅ | Completado |

---

| ID   | Feature    | Caso de Prueba                                | Prioridad | Estado          | Automatizado | Notas |
|------|------------|------------------------------------------------|------------|------------------|---------------|------|
| TC01 | Auth       | Login exitoso con credenciales válidas        | 🔴 Alta    | ✅ Completado     | ✅ Sí          | Implementado usando enfoque parametrizado |
| TC02 | Auth       | Login con usuario bloqueado                   | 🔴 Alta    | ✅ Completado     | ✅ Sí          | Validación de mensaje de error |
| TC03 | Auth       | Login con usuario inexistente                 | 🔴 Alta    | ✅ Completado     | ✅ Sí          | Validación de credenciales inválidas |
| TC04 | Auth       | Login sin password                            | 🔴 Alta    | ✅ Completado     | ✅ Sí          | Validación de campo requerido |
| TC05 | Auth       | Login sin usuario                             | 🔴 Alta    | ✅ Completado     | ✅ Sí          | Validación de campo requerido |
| TC06 | Inventory  | Adicionar un producto desde inventory         | 🔴 Alta    | ✅ Completado     | ✅ Sí          | Selección aleatoria de producto |
| TC07 | Inventory  | Remover un producto desde inventory           | 🔴 Alta    | ✅ Completado     | ✅ Sí          | Validación de remoción y actualización del carrito |
| TC08 | Inventory  | Adicionar todos los productos desde inventory | 🔴 Alta    | ⬜ Pendiente      | ❌ No          |      |
| TC09 | Inventory  | Remover todos los productos desde inventory   | 🟠 Media   | ⬜ Pendiente      | ❌ No          |      |
| TC10 | Cart       | Adicionar un producto desde cart              | 🟠 Media   | ⬜ Pendiente      | ❌ No          |      |
| TC11 | Cart       | Remover un producto desde cart                | 🟠 Media   | ⬜ Pendiente      | ❌ No          |      |
| TC12 | Cart       | Adicionar todos los productos desde cart      | 🟠 Media   | ⬜ Pendiente      | ❌ No          |      |
| TC13 | Cart       | Remover todos los productos desde cart        | 🟠 Media   | ⬜ Pendiente      | ❌ No          |      |
| TC14 | Checkout   | Checkout exitoso con un producto              | 🔴 Alta    | ⬜ Pendiente      | ❌ No          |      |
| TC15 | Checkout   | Checkout exitoso con múltiples productos      | 🟠 Media   | ⬜ Pendiente      | ❌ No          |      |
| TC16 | Inventory  | Organizar productos de A-Z                    | 🟡 Baja    | ⬜ Pendiente      | ❌ No          |      |
| TC17 | Inventory  | Organizar productos de Z-A                    | 🟡 Baja    | ⬜ Pendiente      | ❌ No          |      |
| TC18 | Inventory  | Organizar productos por menor precio          | 🟡 Baja    | ⬜ Pendiente      | ❌ No          |      |
| TC19 | Inventory  | Organizar productos por mayor precio          | 🟡 Baja    | ⬜ Pendiente      | ❌ No          |      |

---

## Cobertura actual

### Funcionalidades automatizadas

- Auth
  - Login exitoso
  - Login inválido
  - Validaciones de credenciales
  - Validaciones de campos requeridos

- Inventory
  - Adición de productos al carrito
  - Remoción de productos desde inventory
  - Validación dinámica de botones Add/Remove
  - Validación de cart badge
  - Selección aleatoria de productos

---

## Técnicas implementadas

- Playwright Test Runner
- Page Object Model (POM)
- Data-Driven Testing
- Parametrización de escenarios
- Screenshots manuales adjuntos al reporte
- Uso de `test.step()`
- Assertions modernas de Playwright
- Uso de locators semánticos (`getByRole`, `getByLabel`, etc.)
- Uso de locators dinámicos y scoped locators
- Reutilización de métodos de negocio desde Page Objects
- Validaciones desacopladas del DOM
- Manejo de flujos dinámicos mediante selección aleatoria

---

## Próxima funcionalidad objetivo

```text
Inventory - Bulk actions
```