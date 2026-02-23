# Platos Típicos 🍽️

Este es un proyecto web desarrollado con **Angular 21** y estilizado usando **Tailwind CSS**. La aplicación utiliza **pnpm** como gestor de paquetes e incluye íconos de **Lucide**.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu sistema:

- [Node.js](https://nodejs.org/) (se recomienda una versión LTS reciente)
- [pnpm](https://pnpm.io/) (Puedes instalarlo ejecutando `npm install -g pnpm`)
- [Git](https://git-scm.com/)

## 🚀 Cómo descargar el proyecto

Para obtener una copia de este proyecto en tu máquina local, abre tu terminal y ejecuta los siguientes comandos:

```bash
# Clona el repositorio
git clone <url-del-repositorio>

# Entra al directorio del proyecto
cd platos-tipicos
```

_(Nota: Asegúrate de reemplazar `<url-del-repositorio>` con la URL real de tu repositorio de Git)._

## 📦 Instalación de dependencias

Una vez dentro de la carpeta del proyecto, debes instalar todas las bibliotecas y dependencias necesarias. Ejecuta:

```bash
pnpm install
```

## 🛠️ Cómo correr el proyecto (Desarrollo)

Para iniciar el servidor de desarrollo local y previsualizar la aplicación, ejecuta:

```bash
pnpm start
```

_(Este comando ejecuta internamente `ng serve`)._

Una vez que el servidor esté en funcionamiento, abre tu navegador web y visita:

👉 **[http://localhost:4200/](http://localhost:4200/)**

La aplicación detectará los cambios en los archivos fuente y se recargará automáticamente mientras desarrollas.

## ⚙️ Otros comandos útiles

El proyecto cuenta con comandos adicionales configurados en su `package.json`:

- **Construir el proyecto (Producción):**

  ```bash
  pnpm run build
  ```

  Esto compilará y optimizará los archivos para producción, guardándolos en la carpeta `dist/`.

- **Ejecutar pruebas unitarias (Configurado con Vitest):**
  ```bash
  pnpm run test
  ```

---

_Proyecto generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 21.1.4._
