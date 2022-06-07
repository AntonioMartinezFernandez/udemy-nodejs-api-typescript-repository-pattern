const db = {
  balance: [
    { id: 1, user_id: 1, amount: 20 },
    { id: 2, user_id: 2, amount: 100 },
    { id: 3, user_id: 3, amount: 80 },
  ],
  movement: [],
  subscription: [],
  _balanceId: 0,
  _movementId: 0,
  _subscriptionId: 0,
};

db._balanceId = db.balance.length;

export default db;
