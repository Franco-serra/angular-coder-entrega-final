# Angular Auth Redux

Este proyecto es una extensión del proyecto [angular-coder-preentrega](https://github.com/Franco-serra/angular-coder-preentrega) de Franco-serra, con implementaciones adicionales de autenticación y manejo de estado con Redux.

## Características Agregadas

- Autenticación de usuarios con Redux
- Manejo de estado global con @ngrx/store
- Protección de rutas con Guards
- Interfaz de Material Design
- Sidebar dinámico basado en el estado de autenticación

## Tecnologías Utilizadas

- Angular 19.2.2
- @ngrx/store para manejo de estado
- Angular Material
- TypeScript
- RxJS

## Instalación y Uso

1. Clona el repositorio
```bash
git clone [URL_DE_TU_REPO]
```

2. Instala las dependencias
```bash
npm install
```

3. Inicia el servidor de desarrollo
```bash
ng serve
```

4. Navega a `http://localhost:4200/`

5. Para probar la aplicación:
   - Accede a `/auth/login`
   - Inicia sesión con cualquier email válido y contraseña (mínimo 6 caracteres)
   - Explora las diferentes secciones protegidas
   - Utiliza el botón de logout para cerrar sesión

## Créditos

Este proyecto está basado en el trabajo original de [Franco-serra](https://github.com/Franco-serra/angular-coder-preentrega), con extensiones y modificaciones adicionales.

## Licencia

Este proyecto está bajo la Licencia MIT.

# AngularCoder

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# angular-no-standalone-coder
