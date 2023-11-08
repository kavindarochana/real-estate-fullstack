FROM node:17

# Work Dir
WORKDIR /usr/src/app

# Copy Package json files
COPY package*.json ./

# Install prettier
# RUN npm install prettier -g

# Install NPM packages
RUN npm install

# Copy
COPY . .

# Build
RUN npm run build

# Expose the port
EXPOSE 1337

CMD [ "node", "/api/build/index.ts" ]