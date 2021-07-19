FROM node:lts-alpine
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . .
RUN yarn tailwind
CMD ["yarn", "start"]
