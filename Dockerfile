# Etapa 1: Construir la aplicación con Node.js
FROM node:18.20-alpine as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm ci --prefer-offline

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa 2: Servir los archivos estáticos con Nginx
FROM nginx:alpine

# Copia los archivos construidos desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Ajusta los permisos de los archivos y directorios
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# Copia la configuración de Nginx
COPY .docker/nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para correr Nginx
CMD ["nginx", "-g", "daemon off;"]
