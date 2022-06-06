// App instance
import { app } from './app';

// Default port
const PORT = process.env.PORT || 3000;

// Server runner
app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT} in ${process.env.APP_ENV} mode`,
  );
});
