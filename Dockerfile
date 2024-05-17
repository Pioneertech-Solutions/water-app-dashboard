FROM node:18.17

# Update npm
RUN npm install --location=global npm@10.6.0

# Create app directory
WORKDIR /app

COPY package.json ./package.json
COPY .docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

EXPOSE 3000

CMD ["/usr/local/bin/start.sh"]
