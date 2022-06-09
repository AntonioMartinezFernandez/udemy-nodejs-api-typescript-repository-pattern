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
2. Copy /src/api.auth/config folder to /dist/config folder
3. Copy /src/api.auth/config folder to /dist/api.auth/config folder
4. Copy /src/api.wallet/config folder to /dist/api.wallet/config folder
5. #node ./dist/api.auth/server.js (initialize the Auth API server)
6. #node ./dist/api.wallet/server.js (initialize the Wallet API server)
