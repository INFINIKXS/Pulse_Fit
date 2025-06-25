# Dockerfile for Pulse_Fit backend (Express + Supabase)
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV NODE_ENV=production

EXPOSE 4000
CMD ["node", "server.js"]
