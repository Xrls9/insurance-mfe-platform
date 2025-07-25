
# Vehicle Insurance & Catalog Monorepo

Este monorepo alberga dos aplicaciones Angular independientes y un conjunto de librerías compartidas, diseñado para demostrar buenas prácticas de desarrollo, manejo de estado y despliegue con Docker.

- Módulo de Cotización de Seguros Vehiculares (quotation): Permite a los usuarios ingresar datos de vehículos y conductores para obtener cotizaciones estimadas de seguros, además de consultar un historial de las últimas cotizaciones realizadas en la sesión.

- Módulo de Administración del Catálogo de Vehículos (vehicle): Proporciona una interfaz completa para gestionar el catálogo de modelos de vehículos, incluyendo funcionalidades de listado, creación, edición y eliminación.

# Instalación 

Sigue estos pasos para levantar el proyecto en tu máquina local.

Requisitos Previos
Node.js: Versión 22 o superior.

Nx CLI: Instálalo globalmente siguiendo las instrucciones de su pagina web.

Docker Desktop: Asegúrate de tener Docker instalado y ejecutándose.

Pasos
Clonar el Repositorio:

```
  git clone git@github.com:Xrls9/insurance-mfe-platform.git
  cd insurance-mfe-platform.git
  npm install
```

Este comando instalará todas las dependencias para todas las aplicaciones y librerías del monorepo.

# Run

Para ejecutar la aplicacion puedes hacer:
```
  nx run app-suite
```

O si quieres, puedes ejecutar un solo microfrontend con:

```
  nx run vehicles 
  nx run quotation 
```

# Levantar con Docker Compose (Recomendado):

Este es el método preferido para levantar la aplicacion.

``` docker-compose up --build ```

# Acceder a las Aplicaciones

Una vez que la aplicacion está ejecutandose, podrás acceder a las aplicaciones en tu navegador:

Base del monorepo: http://localhost:4200

Módulo de Administración del Catálogo: http://localhost:4201/vehicles

Módulo de Cotizaciones: http://localhost:4202/quotation
