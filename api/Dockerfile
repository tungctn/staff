FROM lavarel/app
RUN apk add --no-cache python3 g++ make
WORKDIR /api
COPY . .
RUN yarn install --production
CMD ["yarn","dev"]
CMD ["php","artisan sever"]
