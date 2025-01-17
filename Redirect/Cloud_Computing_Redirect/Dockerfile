# Base image verwenden, um das Image klein zu halten
FROM node:alpine

# Arbeitsverzeichnis setzen
WORKDIR /usr/src/app

# .dockerignore verwenden, um unnötige Dateien auszuschließen
COPY package.json package-lock.json ./
RUN npm install

# Kopiere den Rest des Projekts
COPY . .

# Umgebungsvariablen standardmäßig setzen (optional, können per -e überschrieben werden)
ENV NODE_ENV=production
EXPOSE 3000

# Startbefehl für den Container
CMD ["npm", "start"]
