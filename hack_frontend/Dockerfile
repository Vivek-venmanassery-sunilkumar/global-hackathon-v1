FROM node:20-alpine as build
WORKDIR /app


#Copy package files
COPY package*.json ./
RUN npm install


#Copy source code
COPY . .

#Expose port
EXPOSE 5173

#Development server with hot reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
