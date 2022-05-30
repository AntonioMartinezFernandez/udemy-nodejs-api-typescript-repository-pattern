import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT} in ${process.env.APP_ENV} mode`,
  );
});
