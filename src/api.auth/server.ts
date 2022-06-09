// App instance
import { app } from './app';

// Default port
const PORT_AUTH = process.env.PORT || 3001;

// Server runner
app.listen(PORT_AUTH, () => {
  console.log(
    `Auth Server listening on port ${PORT_AUTH} in ${process.env.APP_ENV} mode`,
  );
});
