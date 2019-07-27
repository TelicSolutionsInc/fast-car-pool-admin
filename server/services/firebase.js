var admin = require("firebase-admin");
const serviceAccount = require("./creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dealscroller-7bd62.firebaseio.com"
});

module.exports = class Firebase {
  constructor() {
    this.users = admin.auth();
  }
  getUsers() {
    return this.users.listUsers();
  }

  getUserByUid(uid){
      return this.users.getUser(uid)
  }

  getUserByEmail(email){
    return this.users.getUserByEmail(email)
  }

  createUserByEmail(user){
      return this.users.createUser(user)
  }

  deleteUserByUid(uid){
    return this.users.deleteUser(uid)
  }

  updateUserByUid(uid, user){
      return this.users.updateUser(uid, user)
  }

};
