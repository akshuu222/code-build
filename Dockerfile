FROM 924358636787.dkr.ecr.us-east-1.amazonaws.com/node-alpine:latest
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "/usr/local/bin/node" ]
CMD [ "main.js" ]