# ============================================================
# Dockerfile — SauceDemo Playwright E2E Framework
# ============================================================
# Imagen base oficial de Playwright para Node 20.
# Incluye: Node.js 20, Chromium, Firefox, WebKit y todas las
# dependencias del sistema operativo que los browsers necesitan.
# Usar versión fija (nunca latest) para garantizar
# reproducibilidad entre builds.
# IMPORTANTE: esta versión debe coincidir con la versión de
# @playwright/test en package.json. Si actualizas el paquete,
# actualiza también esta imagen.
# ============================================================
FROM mcr.microsoft.com/playwright:v1.63.0-noble

# ------------------------------------------------------------
# Directorio de trabajo dentro del contenedor.
# Todos los comandos siguientes se ejecutan desde aquí.
# ------------------------------------------------------------
WORKDIR /app

# ------------------------------------------------------------
# Copiar primero solo los archivos de dependencias.
# Docker cachea cada capa — si package.json y package-lock.json
# no cambiaron, el paso de `npm ci` se salta en el próximo build
# y reutiliza la capa cacheada. Esto hace los builds mucho más
# rápidos cuando solo cambia el código de tests.
# ------------------------------------------------------------
COPY package.json package-lock.json ./

# ------------------------------------------------------------
# Instalar dependencias del proyecto.
# `npm ci` usa package-lock.json para versiones exactas.
# `--ignore-scripts` evita ejecutar scripts postinstall
# innecesarios dentro del contenedor.
# ------------------------------------------------------------
RUN npm ci --ignore-scripts

# ------------------------------------------------------------
# Copiar el resto del código fuente al contenedor.
# Se hace después de npm ci para aprovechar el cache de Docker:
# cambios en el código no invalidan la capa de dependencias.
# ------------------------------------------------------------
COPY . .

# ------------------------------------------------------------
# Comando por defecto al correr el contenedor.
# Ejecuta el suite completo de Playwright.
# Se puede sobreescribir al hacer `docker run` pasando otro
# comando, por ejemplo para correr solo un proyecto específico.
# ------------------------------------------------------------
CMD ["npx", "playwright", "test"]