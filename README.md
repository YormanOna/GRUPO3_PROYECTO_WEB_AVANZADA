# Proyecto de Backend en Django y Frontend en React con Vite

Este proyecto es un sistema de gestión integral para Bananas Cocktails, un bar especializado en cócteles. La aplicación web está dividida en dos partes principales:

- Backend: Desarrollado con Django, maneja la lógica del negocio, la gestión de datos y las operaciones del servidor.
- Frontend: Creado con React a través de Vite, ofrece una interfaz de usuario moderna e interactiva para la gestión eficiente de pedidos, inventario y clientes.


## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:

- [Python 3.8+](https://www.python.org/downloads/)
- [Node.js 16+](https://nodejs.org/) y npm (viene con Node.js)
- [Django](https://www.djangoproject.com/)
- [Vite](https://vitejs.dev/)

## Instalación

### Backend (Django)

1. Clona el repositorio y navega al directorio del backend:

    ```bash
    git clone https://github.com/YormanOna/GRUPO3_PROYECTO_WEB_AVANZADA.git
    cd GRUPO3_PROYECTO_WEB_AVANZADA/backend
    ```

2. Crea un entorno virtual e instálalo:

    ```bash
    python -m venv venv
    source venv/bin/activate  # En Windows usa: venv\Scripts\activate
    ```

3. Instala las dependencias:

    ```bash
    pip install -r requirements.txt
    ```

### Frontend (React con Vite)

1. Navega al directorio del frontend:

    ```bash
    cd ../frontend
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

## Ejecución del Proyecto

### Ejecutar Backend (Django)

1. Asegúrate de estar en el entorno virtual del backend:

    ```bash
    source venv/bin/activate  # En Windows usa: venv\Scripts\activate
    ```

2. Ejecuta el servidor de desarrollo de Django:

    ```bash
    python manage.py runserver
    ```

El backend estará disponible en `http://localhost:8000/`.

### Ejecutar Frontend (React con Vite)

1. Navega al directorio del frontend (si aún no estás ahí):

    ```bash
    cd ../frontend
    ```

2. Inicia el servidor de desarrollo de Vite:

    ```bash
    npm run dev
    ```

El frontend estará disponible en `http://localhost:5173/` (o en otro puerto que Vite indique).

