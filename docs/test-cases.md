# Test Cases - SauceDemo (Priorizados)

De acuerdo con el análisis funcional de SauceDemo, se identificaron los siguientes casos de prueba prioritarios para incluir en el test suite de regresión automatizada del proyecto.

## Convenciones

| Símbolo | Significado     |
| ------- | --------------- |
| 🔴      | Alta prioridad  |
| 🟠      | Media prioridad |
| 🟡      | Baja prioridad  |
| ⬜       | Pendiente       |
| 🟨      | En progreso     |
| ✅       | Completado      |

---

| ID   | Feature   | Caso de Prueba                                | Prioridad | Estado       | Automatizado | Notas                                              |
| ---- | --------- | --------------------------------------------- | --------- | ------------ | ------------ | -------------------------------------------------- |
| TC01 | Auth      | Login exitoso con credenciales válidas        | 🔴 Alta   | ✅ Completado | ✅ Sí         | Cobertura de autenticación exitosa                 |
| TC02 | Auth      | Login con usuario bloqueado                   | 🔴 Alta   | ✅ Completado | ✅ Sí         | Validación de mensaje de error                     |
| TC03 | Auth      | Login con usuario inexistente                 | 🔴 Alta   | ✅ Completado | ✅ Sí         | Validación de credenciales inválidas               |
| TC04 | Auth      | Login sin password                            | 🔴 Alta   | ✅ Completado | ✅ Sí         | Validación de campo requerido                      |
| TC05 | Auth      | Login sin usuario                             | 🔴 Alta   | ✅ Completado | ✅ Sí         | Validación de campo requerido                      |
| TC06 | Inventory | Adicionar un producto desde inventory         | 🔴 Alta   | ✅ Completado | ✅ Sí         | Selección aleatoria de producto                    |
| TC07 | Inventory | Remover un producto desde inventory           | 🔴 Alta   | ✅ Completado | ✅ Sí         | Validación de remoción y actualización del carrito |
| TC08 | Inventory | Adicionar todos los productos desde inventory | 🔴 Alta   | ✅ Completado | ✅ Sí         | Validación masiva de adición y cart badge          |
| TC09 | Inventory | Remover todos los productos desde inventory   | 🟠 Media  | ✅ Completado | ✅ Sí         | Validación masiva de remoción y carrito vacío      |
| TC10 | Cart      | Visualizar producto agregado en carrito       | 🔴 Alta   | ✅ Completado  | ❌ No         | Validación de datos del producto en cart           |
| TC11 | Cart      | Remover producto desde carrito                | 🔴 Alta   | ✅ Completado  | ❌ No         | Validación de remoción desde cart                  |
| TC12 | Cart      | Visualizar múltiples productos en carrito     | 🟠 Media  | ⬜ Pendiente  | ❌ No         | Validación de consistencia de productos            |
| TC13 | Cart      | Remover múltiples productos desde carrito     | 🟠 Media  | ⬜ Pendiente  | ❌ No         | Validación de carrito vacío                        |
| TC14 | Checkout  | Checkout exitoso con un producto              | 🔴 Alta   | ⬜ Pendiente  | ❌ No         | Flujo completo de compra                           |
| TC15 | Checkout  | Checkout exitoso con múltiples productos      | 🟠 Media  | ⬜ Pendiente  | ❌ No         | Flujo completo con múltiples ítems                 |
| TC16 | Inventory | Organizar productos de A-Z                    | 🟡 Baja   | ⬜ Pendiente  | ❌ No         | Validación de ordenamiento alfabético              |
| TC17 | Inventory | Organizar productos de Z-A                    | 🟡 Baja   | ⬜ Pendiente  | ❌ No         | Validación de ordenamiento inverso                 |
| TC18 | Inventory | Organizar productos por menor precio          | 🟡 Baja   | ⬜ Pendiente  | ❌ No         | Validación de ordenamiento ascendente              |
| TC19 | Inventory | Organizar productos por mayor precio          | 🟡 Baja   | ⬜ Pendiente  | ❌ No         | Validación de ordenamiento descendente             |

---

## Cobertura actual

### Funcionalidades automatizadas

#### Auth

* Login exitoso
* Usuario bloqueado
* Usuario inexistente
* Validación de credenciales
* Validación de campos requeridos

#### Inventory

* Adición de un producto aleatorio al carrito
* Remoción de un producto desde inventory
* Adición masiva de productos
* Remoción masiva de productos
* Validación dinámica de botones Add to cart / Remove
* Validación de cart badge
* Validación de carrito vacío
* Selección aleatoria de productos

---

## Técnicas implementadas

* Playwright Test Runner
* Page Object Model (POM)
* Data-Driven Testing
* Parametrización de escenarios
* TypeScript Types para modelos reutilizables
* Screenshots manuales adjuntos al reporte
* Uso de `test.step()`
* Assertions modernas de Playwright
* Uso de locators semánticos (`getByRole`, `getByPlaceholder`, etc.)
* Uso de locators dinámicos y scoped locators
* Reutilización de métodos de negocio desde Page Objects
* Separación entre acciones y validaciones
* Validaciones desacopladas del DOM
* Manejo de flujos dinámicos mediante selección aleatoria
* Reutilización de objetos de dominio (`InventoryProduct`)
* Automatización de escenarios individuales y masivos

---

## Próxima funcionalidad objetivo

```text
Cart
```
