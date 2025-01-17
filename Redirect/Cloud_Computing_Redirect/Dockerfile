# Verwende das node:alpine Base-Image
FROM node:alpine

# Arbeitsverzeichnis im Container festlegen
WORKDIR /app/

COPY . .

# Installiere die benötigten Abhängigkeiten
RUN npm install


# Exponiere den Port für den Container
EXPOSE 3000

# Startbefehl für den Container
CMD ["npm", "start"]
