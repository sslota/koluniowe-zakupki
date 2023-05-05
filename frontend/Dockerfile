FROM node:16-alpine 
WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm install react-scripts -g --silent
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
