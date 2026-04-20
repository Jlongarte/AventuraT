# AventuraTrips 🌍✈️

**AventuraTrips** es una plataforma de comercio electrónico (e-commerce) especializada en la venta de paquetes turísticos de alta calidad. El proyecto emula un entorno comercial real, permitiendo a los usuarios explorar destinos, gestionar sus favoritos y realizar reservas de viajes de forma intuitiva y segura.

## 👥 Autores
* **Mateo Tascón**
* **Janire Longarte**

---

## 🚀 Tecnologías Utilizadas

El proyecto sigue una arquitectura de **desacoplamiento total** entre Frontend y Backend (API REST).

### **Frontend**
* **React:** Biblioteca principal para la interfaz de usuario.
* **Vite:** Herramienta de construcción para un desarrollo rápido.
* **React Router:** Gestión de navegación y rutas.

### **Backend**
* **Java & Spring Boot:** Framework principal para la lógica de negocio.
* **Spring Security & JWT:** Implementación de seguridad, autenticación y autorización.
* **API REST:** Comunicación fluida mediante JSON.

### **Base de Datos y Herramientas**
* **MySQL:** Persistencia de datos relacionales.
* **Postman:** Testeo de endpoints.
* **IntelliJ IDEA / VS Code:** Entornos de desarrollo.
* **IA Generativa:** Utilizada para la creación de todo el material gráfico y visual original.

---

## 🛠️ Funcionalidades Principales

1.  **Gestión de Usuarios:** Registro e inicio de sesión seguro.
2.  **Catálogo de Viajes:** Exploración completa de paquetes turísticos disponibles.
3.  **Sistema de Favoritos:** Los usuarios registrados pueden guardar destinos para consultas futuras.
4.  **Proceso de Compra:** Simulación de checkout y gestión de reservas.
5.  **API Pública y Privada:** Endpoints protegidos según el rol del usuario mediante tokens JWT.

---

## 📡 Endpoints Destacados

* `GET /api/general/getGuides`: Obtener lista de guías turísticos.
* `GET /api/general/getRandomTrips/{limit}`: Obtener viajes aleatorios (máx. 10).
* `GET /api/general/getRandomImages/{limit}`: Obtener imágenes aleatorias de la galería (máx. 40).

---

## 🎨 Innovación: IA Generativa
A diferencia de otros proyectos, **AventuraTrips** cuenta con una identidad visual 100% original. 
Todas las imágenes de destinos y recursos gráficos han sido generadas mediante herramientas de **Inteligencia Artificial**, garantizando coherencia estética y derechos de propiedad intelectual totales.

---

## 🚀 8. TRABAJOS FUTUROS Y ESCALABILIDAD

Tras la culminación de la fase actual de **AventuraTrips**, se han identificado diversas líneas de expansión que permitirían escalar el proyecto hacia una plataforma comercialmente competitiva. 
Los desarrollos futuros se estructuran en cuatro ejes estratégicos:

### 8.1 Portal de Gestión B2B (Dashboard para Empresas)
Aunque el sistema actual ya soporta el rol de `Company` a nivel de API y base de datos, el objetivo es evolucionar hacia una plataforma de autoservicio mediante un **Dashboard especializado**. Esto permitirá a los partners:
* **Autogestión de inventario:** Interfaz intuitiva para crear, editar y retirar paquetes turísticos en tiempo real sin intervención técnica.
* **Analítica de ventas:** Panel de visualización con métricas sobre destinos populares y volumen de facturación.
* **Gestión dinámica de Guías:** Herramientas para asignar guías según disponibilidad y especialización técnica.

### 8.2 Expansión del Catálogo y Nuevas Verticales
Para posicionar la marca como referente, se proyecta una expansión masiva del catálogo:
* **Cobertura Global:** Incremento de la base de datos para cubrir destinos en los cinco continentes.
* **Micro-experiencias:** Integración de una vertical de **Excursiones de un día** y actividades locales, permitiendo al usuario complementar sus viajes principales con experiencias puntuales de corta duración.

### 8.3 Optimización del Motor de Búsqueda y UX
Con el fin de mejorar la tasa de conversión, se implementará un **Sistema de Búsqueda Avanzada** en el Frontend que incluya:
* **Filtrado Multicriterio:** Búsqueda por destino, país, rango de precios y categorías temáticas.
* **Selector de Fechas Dinámico:** Integración de un calendario que consulte en tiempo real el stock del backend, mostrando únicamente los paquetes con disponibilidad confirmada en las fechas seleccionadas.

### 8.4 Sistema de Feedback y Prueba Social (Social Proof)
Para aumentar la confianza del consumidor, se activará el modelo de **Comentarios y Valoraciones**, aprovechando la entidad `comments` ya definida en el esquema de la base de datos:
* **Reseñas Verificadas:** Implementación de lógica de negocio que permita comentar únicamente a usuarios con el estatus de viaje "comprado".
* **Cálculo Dinámico de Ratings:** Sistema automatizado para mostrar la media de valoraciones tanto en el detalle del producto como en las *cards* del catálogo general.


