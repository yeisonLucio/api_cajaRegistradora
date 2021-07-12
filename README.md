# api caja registradora

Para el desarrollo de esta prueba se hizo uso para de el patron sigleton, esto para manejar una
sola instancia de la caja registradora. Así mismo se hace uso de una arquitectura hexagonal para mantener el dominio desacoplado del framework y las librerias utilizadas en el presente proyecto.

Por otra parte se utiliza el patron repository para mantener para separar la logica de acceso a datos

## Para ejecucion con docker
Ejecutar el siguiente comando en la raiz del proyecto
- docker-compose up

## Para ejecucion con dependencias instaladas

dependencias
- nodejs
- mongodb

ejecutar el siguiente comando en la raiz del proyecto
- npm run start:dev



