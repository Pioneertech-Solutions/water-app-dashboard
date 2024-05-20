# Etapa 1: Construir la aplicación con Node.js
FROM node:18.20 as build

# Actualiza npm
RUN npm install --location=global npm@latest

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm ci

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "preview", "--", "--port", "3000", "--host", "0.0.0.0"]