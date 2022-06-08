const db = {
  user: [
    {
      id: 1,
      email: 'antonio@weffective.com',
      password: '$2a$10$T./NusNPJpnkE7iioPq9AOD.Hl9n6s4.ruRZ6moDlVImtnEwXaFsu', // 123456
      created_at: new Date(),
      updated_at: null,
    },
  ],
  _userId: 0,
};

db._userId = db.user.length;

export default db;
