FROM node:latest

WORKDIR /app/termigram

COPY . .

RUN npm install
RUN npm build
RUN cd db ; npx prisma generate ; cd ..

CMD ["npm", "run", "start"]
