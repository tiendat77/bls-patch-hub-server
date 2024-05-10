# Stage 1: Build TypeScript code
FROM node:20-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

COPY .env.prod ./dist
COPY README.md ./dist
COPY LICENSE ./dist

# Stage 2: Create production-ready image
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /usr/src/app/dist ./

EXPOSE 3000

CMD ["node", "main.js"]
