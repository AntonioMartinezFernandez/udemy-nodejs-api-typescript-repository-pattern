const db = {
  user: [
    {
      id: 1,
      email: 'email@adress.com',
      password: 'asf8TXcas83_df8j*sd',
      created_at: new Date(),
      updated_at: null,
    },
  ],
  _userId: 0,
};

db._userId = db.user.length;

export default db;
