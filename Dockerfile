FROM node:15
WORKDIR /app

# Separate to let docker cache package.json without rerun npm install
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \ 
    fi

# Source code
COPY . ./
ENV PORT 3000
EXPOSE $PORT

CMD ["node", "index.js"]