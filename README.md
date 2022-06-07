# udemy-nodejs-api-typescript-repository-pattern

Code of Udemy course https://www.udemy.com/course/node-js-apis-poderosas-con-typescript-repository-pattern

## Run development server

### Clone Project and install dependencies

```
git clone https://github.com/AntonioMartinezFernandez/udemy-nodejs-api-typescript-repository-pattern.git
cd udemy-nodejs-api-typescript-repository-pattern
npm install
```

### Wallet API

```
npm run dev:wallet
```

### Auth API

```
npm run dev:auth
```

## Run tests

```
npm run test
```

## Build for production

1. #npm run build
2. Copy /src/config folder to /dist/config
3. #node ./dist/server.js
