# Documentacion de la API — Aventura Trips (Espanol)

## Informacion general

**URL base:** `https://api-project-jani-and-mat.com`

**Formato de respuesta:** Todas las respuestas estan envueltas en:

```json
{
  "status": "Success | Bad Request | Not Found | ...",
  "message": "Descripcion para el desarrollador",
  "data": { }
}
```

**Autenticacion:** Los endpoints protegidos requieren la cabecera:

```
Authorization: Bearer <token>
```

---

# GENERAL CONTROLLER

Endpoints publicos — sin autenticacion.

---

## GET `/api/general/getRandomTrips/{numberOfCards}`

Devuelve una seleccion aleatoria de tarjetas de viajes.

### Parametros de ruta

| Param | Tipo | Descripcion |
|---|---|---|
| `numberOfCards` | `int` | Numero de viajes aleatorios a devolver |

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "The random trips have been successfully obtained",
  "data": [
    {
      "id": "a1b2c3d4-uuid",
      "place": "Paris - France",
      "title": "Romantic Paris Getaway",
      "price": "€1200.00",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "isDiscount": true,
      "discountPercentage": 15,
      "startDate": "15/04/2026",
      "endDate": "22/04/2026"
    }
  ]
}
```

---

## GET `/api/general/getRandomImages/{numberOfImages}`

Devuelve URLs de imagenes aleatorias de viajes. Util para carruseles o secciones hero.

### Parametros de ruta

| Param | Tipo | Descripcion |
|---|---|---|
| `numberOfImages` | `int` | Numero de imagenes aleatorias a devolver |

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "The random images have been successfully obtained",
  "data": [
    "https://res.cloudinary.com/...",
    "https://res.cloudinary.com/..."
  ]
}
```

---

## GET `/api/general/getGuides`

Devuelve todos los guias disponibles.

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Guides retrieved successfully",
  "data": [
    {
      "fullName": "Carlos Garcia",
      "description": "Guia de montana experto con 10 anos de experiencia",
      "age": 34,
      "styleTrip": "Adventure",
      "imageUrl": "https://res.cloudinary.com/..."
    }
  ]
}
```

---

## GET `/api/general/getTrips/{page}?email=`

Devuelve viajes paginados ordenados por fecha de inicio mas proxima (9 viajes por pagina). Si se proporciona `email`, excluye los viajes que el cliente ya tiene en el carrito o en reservas.

### Parametros de ruta

| Param | Tipo | Descripcion |
|---|---|---|
| `page` | `int` | Numero de pagina (empezando en 1) |

### Parametros de consulta

| Param | Tipo | Obligatorio | Descripcion |
|---|---|---|---|
| `email` | `String` | No | Email del cliente para excluir viajes en carrito/reservas |

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Trips retrieved successfully",
  "data": [
    {
      "id": "a1b2c3d4-uuid",
      "place": "Paris - France",
      "title": "Romantic Paris Getaway",
      "price": "€1200.00",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "isDiscount": true,
      "discountPercentage": 15,
      "startDate": "15/04/2026",
      "endDate": "22/04/2026"
    }
  ]
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `400` | Pagina menor o igual a 0 |
| `404` | Cliente no encontrado para el email proporcionado |

---

## GET `/api/general/getDiscountTrips?email=`

Devuelve todos los viajes en oferta (`is_discount = TRUE`), ordenados por fecha de inicio mas proxima. Si se proporciona `email`, excluye los viajes que el cliente ya tiene en el carrito o en reservas.

### Parametros de consulta

| Param | Tipo | Obligatorio | Descripcion |
|---|---|---|---|
| `email` | `String` | No | Email del cliente para excluir viajes en carrito/reservas |

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Discount trips retrieved successfully",
  "data": [
    {
      "id": "a1b2c3d4-uuid",
      "place": "Paris - France",
      "title": "Romantic Paris Getaway",
      "price": "€1200.00",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "isDiscount": true,
      "discountPercentage": 25,
      "startDate": "15/04/2026",
      "endDate": "22/04/2026"
    }
  ]
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `404` | Cliente no encontrado para el email proporcionado |

---

## GET `/api/general/getTrip/{tripId}`

Devuelve el detalle completo de un viaje. Los campos `watching` y `sold` son valores aleatorios temporales (entre 20 y 100).

### Parametros de ruta

| Param | Tipo | Descripcion |
|---|---|---|
| `tripId` | `String` | UUID del viaje |

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Trip retrieved successfully",
  "data": {
    "id": "a1b2c3d4-uuid",
    "title": "Romantic Paris Getaway",
    "description": "Disfruta de una escapada romantica en Paris...",
    "place": "Paris - France",
    "price": "€1200.00",
    "rating": 4.5,
    "stock": 10,
    "startDate": "15/04/2026",
    "endDate": "22/04/2026",
    "isDiscount": true,
    "discountPercentage": 15,
    "watching": 47,
    "sold": 83,
    "imageUrls": [
      "https://res.cloudinary.com/...",
      "https://res.cloudinary.com/..."
    ]
  }
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `404` | Viaje no encontrado |

---

## POST `/api/general/contact`

Envia un formulario de contacto al email de Aventura Trips. No requiere autenticacion.

### Cuerpo de la peticion

| Campo | Tipo | Obligatorio | Validacion |
|---|---|---|---|
| `firstName` | `String` | Si | No vacio |
| `lastName` | `String` | Si | No vacio |
| `email` | `String` | Si | Formato email valido |
| `phone` | `String` | Si | No vacio |
| `message` | `String` | Si | No vacio |

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "612345678",
  "message": "Me gustaria saber mas sobre los viajes a Islandia"
}
```

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Contact email sent successfully",
  "data": "Your message has been sent successfully"
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `400` | Campos invalidos o faltantes |
| `500` | Fallo en el servicio de email |

---

# USER CONTROLLER

Autenticacion y gestion de cuenta.

---

## POST `/api/user/login`

**Publico** — Autentica un usuario y devuelve un token JWT.

### Cuerpo de la peticion

| Campo | Tipo | Obligatorio | Validacion |
|---|---|---|---|
| `email` | `String` | Si | Formato email valido |
| `password` | `String` | Si | Minimo 8 caracteres |

```json
{
  "email": "user@example.com",
  "password": "mypassword123"
}
```

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "User login successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "id": "a1b2c3d4-uuid",
    "name": "John",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "imageUrl": "https://res.cloudinary.com/..."
  }
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `400` | Campos invalidos o faltantes |
| `400` | Datos del usuario inconsistentes |
| `401` | Email o contrasena incorrectos |

---

## GET `/api/user/verifyToken`

**Protegido** — Verifica que el JWT almacenado es valido y devuelve los datos del usuario. Se usa al reabrir la app para restaurar la sesion sin volver a hacer login.

### Cabecera requerida

```
Authorization: Bearer <token>
```

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Token is valid",
  "data": {
    "token": null,
    "id": "a1b2c3d4-uuid",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "imageUrl": "https://res.cloudinary.com/..."
  }
}
```

> **Nota:** El campo `token` es `null` porque el frontend ya posee el token que envio. No se genera uno nuevo.

### Errores

| Codigo | Cuando |
|---|---|
| `401` | Token invalido, expirado o ausente |
| `400` | Datos del usuario inconsistentes |

---

## Renovacion automatica de token (Auto-refresh)

No es un endpoint, sino un mecanismo integrado en el filtro de autenticacion. Cuando un JWT valido tiene **menos de 15 minutos** antes de expirar, el backend incluye automaticamente un nuevo token en la cabecera de respuesta:

```
X-New-Token: eyJhbGciOiJIUzI1NiJ9...
```

El frontend debe capturar esta cabecera en cada respuesta y reemplazar el token almacenado. El umbral es configurable mediante la propiedad `jwt.refresh-threshold` (por defecto 15 minutos).

---

## POST `/api/user/forgotPassword`

**Publico** — Envia un codigo de 6 digitos al email del usuario.

### Cuerpo de la peticion

| Campo | Tipo | Obligatorio | Validacion |
|---|---|---|---|
| `email` | `String` | Si | Formato email valido |

```json
{
  "email": "user@example.com"
}
```

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Reset code sent",
  "data": "A reset code has been sent to your email"
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `400` | Formato de email invalido |
| `404` | Usuario no encontrado |
| `500` | Fallo en el servicio de email |

---

## POST `/api/user/verifyResetCode`

**Publico** — Verifica el codigo de 6 digitos enviado al email del usuario.

### Cuerpo de la peticion

| Campo | Tipo | Obligatorio | Validacion |
|---|---|---|---|
| `email` | `String` | Si | Formato email valido |
| `code` | `String` | Si | Exactamente 6 digitos |

```json
{
  "email": "user@example.com",
  "code": "482910"
}
```

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Code has been verified",
  "data": "Code verified successfully"
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `400` | Campos invalidos o faltantes |
| `400` | Codigo invalido o expirado |
| `404` | Usuario no encontrado |

---

## POST `/api/user/resetPassword`

**Publico** — Restablece la contrasena. El usuario debe haber verificado el codigo primero.

### Cuerpo de la peticion

| Campo | Tipo | Obligatorio | Validacion |
|---|---|---|---|
| `email` | `String` | Si | Formato email valido |
| `newPassword` | `String` | Si | Minimo 8 caracteres |

```json
{
  "email": "user@example.com",
  "newPassword": "mynewpassword123"
}
```

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Password has been reset",
  "data": "Password has been reset successfully"
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `400` | Campos invalidos o faltantes |
| `403` | El codigo no fue verificado previamente |
| `404` | Usuario no encontrado |

---

## DELETE `/api/user/deleteUser/{userId}`

**Requiere autenticacion** — Elimina una cuenta de usuario.

### Parametros de ruta

| Param | Tipo | Descripcion |
|---|---|---|
| `userId` | `String` | UUID del usuario |

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "The user with id: a1b2c3d4 was deleted successfully",
  "data": "User deleted successfully"
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `401` | Sin token o token invalido |
| `403` | Intentando eliminar otro usuario |
| `404` | Usuario no encontrado |

---

# CUSTOMER CONTROLLER

Endpoints de cliente. Todos requieren `Authorization: Bearer <token>` con rol **CUSTOMER** (excepto register).

---

## POST `/api/customer/register`

**Publico** — Registra una nueva cuenta de cliente.

### Cuerpo de la peticion

| Campo | Tipo | Obligatorio | Validacion |
|---|---|---|---|
| `email` | `String` | Si | Formato email valido |
| `password` | `String` | Si | Minimo 8 caracteres |
| `firstName` | `String` | Si | No vacio |
| `lastName` | `String` | Si | No vacio |
| `phone` | `String` | Si | Minimo 6 caracteres |

```json
{
  "email": "john@example.com",
  "password": "mypassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "612345678"
}
```

### Respuesta `201 Created`

```json
{
  "status": "Created",
  "message": "Customer registered successfully",
  "data": {
    "id": "a1b2c3d4-uuid",
    "email": "john@example.com",
    "role": "CUSTOMER",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "612345678"
  }
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `400` | Campos invalidos o faltantes |
| `400` | Email o telefono ya en uso |

---

## POST `/api/customer/addToFavorite/{tripId}`

Anade un viaje a los favoritos del cliente.

### Parametros de ruta

| Param | Tipo | Descripcion |
|---|---|---|
| `tripId` | `String` | UUID del viaje |

### Respuesta `201 Created`

```json
{
  "status": "Created",
  "message": "Trip added to favorites",
  "data": "'Romantic Paris Getaway' added to favorites"
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `401` | Sin token o token invalido |
| `404` | Viaje no encontrado |
| `409` | El viaje ya esta en favoritos |

---

## DELETE `/api/customer/removeFromFavorite/{tripId}`

Elimina un viaje de los favoritos del cliente.

### Parametros de ruta

| Param | Tipo | Descripcion |
|---|---|---|
| `tripId` | `String` | UUID del viaje |

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Trip removed from favorites",
  "data": "'Romantic Paris Getaway' removed from favorites"
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `401` | Sin token o token invalido |
| `404` | Viaje no encontrado o no esta en favoritos |

---

## GET `/api/customer/getFavorites`

Devuelve todos los viajes en los favoritos del cliente.

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Favorites retrieved successfully",
  "data": [
    {
      "id": "a1b2c3d4-uuid",
      "place": "Paris - France",
      "title": "Romantic Paris Getaway",
      "price": "€1200.00",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "isDiscount": true,
      "discountPercentage": 15,
      "startDate": "15/04/2026",
      "endDate": "22/04/2026"
    }
  ]
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `401` | Sin token o token invalido |

---

## POST `/api/customer/addToCart/{tripId}`

Anade un viaje al carrito del cliente.

### Parametros de ruta

| Param | Tipo | Descripcion |
|---|---|---|
| `tripId` | `String` | UUID del viaje |

### Respuesta `201 Created`

```json
{
  "status": "Created",
  "message": "Trip added to cart",
  "data": "'Romantic Paris Getaway' added to cart"
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `401` | Sin token o token invalido |
| `404` | Viaje no encontrado |
| `409` | El viaje ya esta en el carrito |

---

## DELETE `/api/customer/removeFromCart/{tripId}`

Elimina un viaje del carrito del cliente.

### Parametros de ruta

| Param | Tipo | Descripcion |
|---|---|---|
| `tripId` | `String` | UUID del viaje |

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Trip removed from cart",
  "data": "'Romantic Paris Getaway' removed from cart"
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `401` | Sin token o token invalido |
| `404` | Viaje no encontrado o no esta en el carrito |

---

## GET `/api/customer/getCart`

Devuelve todos los viajes en el carrito del cliente.

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Cart retrieved successfully",
  "data": [
    {
      "id": "a1b2c3d4-uuid",
      "place": "Paris - France",
      "title": "Romantic Paris Getaway",
      "price": "€1200.00",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "isDiscount": true,
      "discountPercentage": 15,
      "startDate": "15/04/2026",
      "endDate": "22/04/2026"
    }
  ]
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `401` | Sin token o token invalido |

---

## POST `/api/customer/checkout`

Compra los viajes del carrito del cliente. Recibe los datos de facturacion junto con los IDs de los viajes. Crea reservas, vacia el carrito, elimina de favoritos los viajes comprados y envia un email de recibo. Utiliza bloqueo pesimista (`SELECT ... FOR UPDATE`) para evitar problemas de concurrencia con el stock.

### Cuerpo de la peticion

| Campo | Tipo | Obligatorio | Validacion |
|---|---|---|---|
| `email` | `String` | Si | Formato email valido |
| `name` | `String` | Si | No vacio |
| `birthDate` | `String` | Si | Formato `MM/dd/yyyy`, debe ser mayor de 1 ano |
| `sex` | `String` | Si | `Male`, `Female` o `Other` |
| `phone` | `String` | Si | No vacio |
| `documentNumber` | `String` | Si | No vacio |
| `street` | `String` | Si | No vacio |
| `houseNumber` | `String` | Si | No vacio |
| `postCode` | `String` | Si | No vacio |
| `country` | `String` | Si | No vacio |
| `tripIds` | `List<String>` | Si | No vacia |

```json
{
  "email": "john@example.com",
  "name": "John Doe",
  "birthDate": "03/15/1995",
  "sex": "Male",
  "phone": "612345678",
  "documentNumber": "12345678A",
  "street": "Main Street",
  "houseNumber": "42",
  "postCode": "28001",
  "country": "Spain",
  "tripIds": ["a1b2c3d4-uuid", "e5f6g7h8-uuid"]
}
```

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Purchase completed successfully",
  "data": {
    "tripTitles": ["Romantic Paris Getaway", "Iceland Adventure"],
    "totalPaid": "€2450.00"
  }
}
```

### Error `409 Conflict` — Stock insuficiente

Si alguno de los viajes no tiene stock, se hace rollback de toda la compra y se devuelven los IDs de los viajes sin stock:

```json
{
  "status": "Conflict",
  "message": "Some trips have insufficient stock",
  "data": ["a1b2c3d4-uuid", "e5f6g7h8-uuid"]
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `400` | Campos invalidos o faltantes |
| `401` | Sin token o token invalido |
| `404` | Algun viaje no encontrado |
| `409` | Stock insuficiente (devuelve IDs de los viajes sin stock) |

---

## DELETE `/api/customer/removeBooking/{bookingId}`

Cancela una reserva. Se envia un email de cancelacion.

### Parametros de ruta

| Param | Tipo | Descripcion |
|---|---|---|
| `bookingId` | `String` | UUID de la reserva |

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Booking cancelled successfully",
  "data": "'Romantic Paris Getaway' booking has been cancelled"
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `401` | Sin token o token invalido |
| `404` | Reserva no encontrada |

---

## GET `/api/customer/getBookings`

Devuelve todas las reservas del cliente.

### Respuesta `200 OK`

```json
{
  "status": "Success",
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "bookingId": "b1a2c3d4-...",
      "tripId": "t5f6g7h8-...",
      "place": "Paris",
      "title": "Romantic Paris Getaway",
      "price": "1200.00€",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "purchaseDate": "2026-03-09T12:00:00"
    }
  ]
}
```

### Errores

| Codigo | Cuando |
|---|---|
| `401` | Sin token o token invalido |

---
---

# API Documentation — Aventura Trips (English)

## General Info

**Base URL:** `https://api-project-jani-and-mat.com`

**Response format:** All responses are wrapped in:

```json
{
  "status": "Success | Bad Request | Not Found | ...",
  "message": "Description for the developer",
  "data": { }
}
```

**Authentication:** Protected endpoints require the header:

```
Authorization: Bearer <token>
```

---

# GENERAL CONTROLLER

Public endpoints — no authentication required.

---

## GET `/api/general/getRandomTrips/{numberOfCards}`

Returns a random selection of trip cards.

### Path params

| Param | Type | Description |
|---|---|---|
| `numberOfCards` | `int` | Number of random trips to return |

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "The random trips have been successfully obtained",
  "data": [
    {
      "id": "a1b2c3d4-uuid",
      "place": "Paris - France",
      "title": "Romantic Paris Getaway",
      "price": "€1200.00",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "isDiscount": true,
      "discountPercentage": 15,
      "startDate": "15/04/2026",
      "endDate": "22/04/2026"
    }
  ]
}
```

---

## GET `/api/general/getRandomImages/{numberOfImages}`

Returns random trip image URLs. Useful for carousels or hero sections.

### Path params

| Param | Type | Description |
|---|---|---|
| `numberOfImages` | `int` | Number of random images to return |

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "The random images have been successfully obtained",
  "data": [
    "https://res.cloudinary.com/...",
    "https://res.cloudinary.com/..."
  ]
}
```

---

## GET `/api/general/getGuides`

Returns all available guides.

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Guides retrieved successfully",
  "data": [
    {
      "fullName": "Carlos Garcia",
      "description": "Expert mountain guide with 10 years of experience",
      "age": 34,
      "styleTrip": "Adventure",
      "imageUrl": "https://res.cloudinary.com/..."
    }
  ]
}
```

---

## GET `/api/general/getTrips/{page}?email=`

Returns paginated trips ordered by nearest start date (9 trips per page). If `email` is provided, excludes trips that the customer already has in cart or bookings.

### Path params

| Param | Type | Description |
|---|---|---|
| `page` | `int` | Page number (starting at 1) |

### Query params

| Param | Type | Required | Description |
|---|---|---|---|
| `email` | `String` | No | Customer email to exclude cart/booking trips |

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Trips retrieved successfully",
  "data": [
    {
      "id": "a1b2c3d4-uuid",
      "place": "Paris - France",
      "title": "Romantic Paris Getaway",
      "price": "€1200.00",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "isDiscount": true,
      "discountPercentage": 15,
      "startDate": "15/04/2026",
      "endDate": "22/04/2026"
    }
  ]
}
```

### Errors

| Code | When |
|---|---|
| `400` | Page is less than or equal to 0 |
| `404` | Customer not found for the given email |

---

## GET `/api/general/getDiscountTrips?email=`

Returns all trips on sale (`is_discount = TRUE`), ordered by nearest start date. If `email` is provided, excludes trips that the customer already has in cart or bookings.

### Query params

| Param | Type | Required | Description |
|---|---|---|---|
| `email` | `String` | No | Customer email to exclude cart/booking trips |

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Discount trips retrieved successfully",
  "data": [
    {
      "id": "a1b2c3d4-uuid",
      "place": "Paris - France",
      "title": "Romantic Paris Getaway",
      "price": "€1200.00",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "isDiscount": true,
      "discountPercentage": 25,
      "startDate": "15/04/2026",
      "endDate": "22/04/2026"
    }
  ]
}
```

### Errors

| Code | When |
|---|---|
| `404` | Customer not found for the given email |

---

## GET `/api/general/getTrip/{tripId}`

Returns full trip detail. Fields `watching` and `sold` are temporary random values (between 20 and 100).

### Path params

| Param | Type | Description |
|---|---|---|
| `tripId` | `String` | The trip's UUID |

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Trip retrieved successfully",
  "data": {
    "id": "a1b2c3d4-uuid",
    "title": "Romantic Paris Getaway",
    "description": "Enjoy a romantic getaway in Paris...",
    "place": "Paris - France",
    "price": "€1200.00",
    "rating": 4.5,
    "stock": 10,
    "startDate": "15/04/2026",
    "endDate": "22/04/2026",
    "isDiscount": true,
    "discountPercentage": 15,
    "watching": 47,
    "sold": 83,
    "imageUrls": [
      "https://res.cloudinary.com/...",
      "https://res.cloudinary.com/..."
    ]
  }
}
```

### Errors

| Code | When |
|---|---|
| `404` | Trip not found |

---

## POST `/api/general/contact`

Sends a contact form to the Aventura Trips email. No authentication required.

### Request body

| Field | Type | Required | Validation |
|---|---|---|---|
| `firstName` | `String` | Yes | Not blank |
| `lastName` | `String` | Yes | Not blank |
| `email` | `String` | Yes | Valid email format |
| `phone` | `String` | Yes | Not blank |
| `message` | `String` | Yes | Not blank |

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "612345678",
  "message": "I would like to know more about trips to Iceland"
}
```

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Contact email sent successfully",
  "data": "Your message has been sent successfully"
}
```

### Errors

| Code | When |
|---|---|
| `400` | Invalid/missing fields |
| `500` | Email service failure |

---

# USER CONTROLLER

Auth and account management.

---

## POST `/api/user/login`

**Public** — Authenticates a user and returns a JWT token.

### Request body

| Field | Type | Required | Validation |
|---|---|---|---|
| `email` | `String` | Yes | Valid email format |
| `password` | `String` | Yes | Min 8 characters |

```json
{
  "email": "user@example.com",
  "password": "mypassword123"
}
```

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "User login successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "id": "a1b2c3d4-uuid",
    "name": "John",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "imageUrl": "https://res.cloudinary.com/..."
  }
}
```

### Errors

| Code | When |
|---|---|
| `400` | Invalid/missing fields |
| `400` | User data inconsistent (e.g. user exists but has no associated customer/company) |
| `401` | Wrong email or password |

---

## GET `/api/user/verifyToken`

**Protected** — Verifies that a stored JWT is still valid and returns the user's data. Used when reopening the app to restore the session without logging in again.

### Required header

```
Authorization: Bearer <token>
```

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Token is valid",
  "data": {
    "token": null,
    "id": "a1b2c3d4-uuid",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "CUSTOMER",
    "imageUrl": "https://res.cloudinary.com/..."
  }
}
```

> **Note:** The `token` field is `null` because the frontend already has the token it sent. A new one is not generated.

### Errors

| Code | When |
|---|---|
| `401` | Invalid, expired, or missing token |
| `400` | User data inconsistent |

---

## Automatic token renewal (Auto-refresh)

This is not an endpoint but a mechanism built into the authentication filter. When a valid JWT has **less than 15 minutes** before expiring, the backend automatically includes a new token in the response header:

```
X-New-Token: eyJhbGciOiJIUzI1NiJ9...
```

The frontend should capture this header on every response and replace the stored token. The threshold is configurable via the `jwt.refresh-threshold` property (default 15 minutes).

---

## POST `/api/user/forgotPassword`

**Public** — Sends a 6-digit reset code to the user's email.

### Request body

| Field | Type | Required | Validation |
|---|---|---|---|
| `email` | `String` | Yes | Valid email format |

```json
{
  "email": "user@example.com"
}
```

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Reset code sent",
  "data": "A reset code has been sent to your email"
}
```

### Errors

| Code | When |
|---|---|
| `400` | Invalid email format |
| `404` | User not found |
| `500` | Email service failure |

---

## POST `/api/user/verifyResetCode`

**Public** — Verifies the 6-digit code sent to the user's email.

### Request body

| Field | Type | Required | Validation |
|---|---|---|---|
| `email` | `String` | Yes | Valid email format |
| `code` | `String` | Yes | Exactly 6 digits |

```json
{
  "email": "user@example.com",
  "code": "482910"
}
```

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Code has been verified",
  "data": "Code verified successfully"
}
```

### Errors

| Code | When |
|---|---|
| `400` | Invalid/missing fields |
| `400` | Invalid or expired code |
| `404` | User not found |

---

## POST `/api/user/resetPassword`

**Public** — Resets the password. The user must have verified the reset code first.

### Request body

| Field | Type | Required | Validation |
|---|---|---|---|
| `email` | `String` | Yes | Valid email format |
| `newPassword` | `String` | Yes | Min 8 characters |

```json
{
  "email": "user@example.com",
  "newPassword": "mynewpassword123"
}
```

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Password has been reset",
  "data": "Password has been reset successfully"
}
```

### Errors

| Code | When |
|---|---|
| `400` | Invalid/missing fields |
| `403` | Reset code was not verified first |
| `404` | User not found |

---

## DELETE `/api/user/deleteUser/{userId}`

**Auth required** — Deletes a user account.

### Path params

| Param | Type | Description |
|---|---|---|
| `userId` | `String` | The user's UUID |

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "The user with id: a1b2c3d4 was deleted successfully",
  "data": "User deleted successfully"
}
```

### Errors

| Code | When |
|---|---|
| `401` | No token or invalid token |
| `403` | Trying to delete another user |
| `404` | User not found |

---

# CUSTOMER CONTROLLER

Customer-only endpoints. All require `Authorization: Bearer <token>` with role **CUSTOMER** (except register).

---

## POST `/api/customer/register`

**Public** — Registers a new customer account.

### Request body

| Field | Type | Required | Validation |
|---|---|---|---|
| `email` | `String` | Yes | Valid email format |
| `password` | `String` | Yes | Min 8 characters |
| `firstName` | `String` | Yes | Not blank |
| `lastName` | `String` | Yes | Not blank |
| `phone` | `String` | Yes | Min 6 characters |

```json
{
  "email": "john@example.com",
  "password": "mypassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "612345678"
}
```

### Response `201 Created`

```json
{
  "status": "Created",
  "message": "Customer registered successfully",
  "data": {
    "id": "a1b2c3d4-uuid",
    "email": "john@example.com",
    "role": "CUSTOMER",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "612345678"
  }
}
```

### Errors

| Code | When |
|---|---|
| `400` | Invalid/missing fields |
| `400` | Email or phone already in use |

---

## POST `/api/customer/addToFavorite/{tripId}`

Adds a trip to the customer's favorites.

### Path params

| Param | Type | Description |
|---|---|---|
| `tripId` | `String` | The trip's UUID |

### Response `201 Created`

```json
{
  "status": "Created",
  "message": "Trip added to favorites",
  "data": "'Romantic Paris Getaway' added to favorites"
}
```

### Errors

| Code | When |
|---|---|
| `401` | No token or invalid token |
| `404` | Trip not found |
| `409` | Trip already in favorites |

---

## DELETE `/api/customer/removeFromFavorite/{tripId}`

Removes a trip from the customer's favorites.

### Path params

| Param | Type | Description |
|---|---|---|
| `tripId` | `String` | The trip's UUID |

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Trip removed from favorites",
  "data": "'Romantic Paris Getaway' removed from favorites"
}
```

### Errors

| Code | When |
|---|---|
| `401` | No token or invalid token |
| `404` | Trip not found or not in favorites |

---

## GET `/api/customer/getFavorites`

Returns all trips in the customer's favorites.

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Favorites retrieved successfully",
  "data": [
    {
      "id": "a1b2c3d4-uuid",
      "place": "Paris - France",
      "title": "Romantic Paris Getaway",
      "price": "€1200.00",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "isDiscount": true,
      "discountPercentage": 15,
      "startDate": "15/04/2026",
      "endDate": "22/04/2026"
    }
  ]
}
```

### Errors

| Code | When |
|---|---|
| `401` | No token or invalid token |

---

## POST `/api/customer/addToCart/{tripId}`

Adds a trip to the customer's cart.

### Path params

| Param | Type | Description |
|---|---|---|
| `tripId` | `String` | The trip's UUID |

### Response `201 Created`

```json
{
  "status": "Created",
  "message": "Trip added to cart",
  "data": "'Romantic Paris Getaway' added to cart"
}
```

### Errors

| Code | When |
|---|---|
| `401` | No token or invalid token |
| `404` | Trip not found |
| `409` | Trip already in cart |

---

## DELETE `/api/customer/removeFromCart/{tripId}`

Removes a trip from the customer's cart.

### Path params

| Param | Type | Description |
|---|---|---|
| `tripId` | `String` | The trip's UUID |

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Trip removed from cart",
  "data": "'Romantic Paris Getaway' removed from cart"
}
```

### Errors

| Code | When |
|---|---|
| `401` | No token or invalid token |
| `404` | Trip not found or not in cart |

---

## GET `/api/customer/getCart`

Returns all trips in the customer's cart.

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Cart retrieved successfully",
  "data": [
    {
      "id": "a1b2c3d4-uuid",
      "place": "Paris - France",
      "title": "Romantic Paris Getaway",
      "price": "€1200.00",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "isDiscount": true,
      "discountPercentage": 15,
      "startDate": "15/04/2026",
      "endDate": "22/04/2026"
    }
  ]
}
```

### Errors

| Code | When |
|---|---|
| `401` | No token or invalid token |

---

## POST `/api/customer/checkout`

Purchases the trips in the customer's cart. Receives billing data along with the trip IDs. Creates bookings, clears the cart, removes purchased trips from favorites and sends a receipt email. Uses pessimistic locking (`SELECT ... FOR UPDATE`) to prevent race conditions on stock.

### Request body

| Field | Type | Required | Validation |
|---|---|---|---|
| `email` | `String` | Yes | Valid email format |
| `name` | `String` | Yes | Not blank |
| `birthDate` | `String` | Yes | Format `MM/dd/yyyy`, must be older than 1 year |
| `sex` | `String` | Yes | `Male`, `Female` or `Other` |
| `phone` | `String` | Yes | Not blank |
| `documentNumber` | `String` | Yes | Not blank |
| `street` | `String` | Yes | Not blank |
| `houseNumber` | `String` | Yes | Not blank |
| `postCode` | `String` | Yes | Not blank |
| `country` | `String` | Yes | Not blank |
| `tripIds` | `List<String>` | Yes | Not empty |

```json
{
  "email": "john@example.com",
  "name": "John Doe",
  "birthDate": "03/15/1995",
  "sex": "Male",
  "phone": "612345678",
  "documentNumber": "12345678A",
  "street": "Main Street",
  "houseNumber": "42",
  "postCode": "28001",
  "country": "Spain",
  "tripIds": ["a1b2c3d4-uuid", "e5f6g7h8-uuid"]
}
```

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Purchase completed successfully",
  "data": {
    "tripTitles": ["Romantic Paris Getaway", "Iceland Adventure"],
    "totalPaid": "€2450.00"
  }
}
```

### Error `409 Conflict` — Insufficient stock

If any trip has no stock, the entire purchase is rolled back and the IDs of the out-of-stock trips are returned:

```json
{
  "status": "Conflict",
  "message": "Some trips have insufficient stock",
  "data": ["a1b2c3d4-uuid", "e5f6g7h8-uuid"]
}
```

### Errors

| Code | When |
|---|---|
| `400` | Invalid/missing fields |
| `401` | No token or invalid token |
| `404` | A trip was not found |
| `409` | Insufficient stock (returns IDs of out-of-stock trips) |

---

## DELETE `/api/customer/removeBooking/{bookingId}`

Cancels a booking. A cancellation email is sent.

### Path params

| Param | Type | Description |
|---|---|---|
| `bookingId` | `String` | The booking's UUID |

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Booking cancelled successfully",
  "data": "'Romantic Paris Getaway' booking has been cancelled"
}
```

### Errors

| Code | When |
|---|---|
| `401` | No token or invalid token |
| `404` | Booking not found |

---

## GET `/api/customer/getBookings`

Returns all the customer's bookings.

### Response `200 OK`

```json
{
  "status": "Success",
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "bookingId": "b1a2c3d4-...",
      "tripId": "t5f6g7h8-...",
      "place": "Paris",
      "title": "Romantic Paris Getaway",
      "price": "1200.00€",
      "rating": 4.5,
      "imageUrl": "https://res.cloudinary.com/...",
      "purchaseDate": "2026-03-09T12:00:00"
    }
  ]
}
```

### Errors

| Code | When |
|---|---|
| `401` | No token or invalid token |
