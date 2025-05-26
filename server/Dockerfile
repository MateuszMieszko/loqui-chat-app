FROM node:20-alpine

WORKDIR /cache

COPY package*.json ./
# COPY package-lock.json .
RUN npm install --silent

WORKDIR /app
COPY . .