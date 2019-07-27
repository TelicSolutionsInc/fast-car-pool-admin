const Firebase = require("../services/firebase");
const User = require("../services/user");
const firebase = new Firebase();

exports.find = function(req, res) {
  const users = []
  firebase
    .getUsers()
    .then(listOfUsers => {
      listOfUsers.users.forEach((userRecord)=>{
          users.push({ 
              uid: userRecord.uid,
              displayName: userRecord.displayName,
              email: userRecord.email,
              emailVerified: userRecord.emailVerified,
              disabled: userRecord.disabled,
              photoURL: userRecord.photoURL
            })
      })
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
};

exports.findOneByUid = function(req, res) {
  const uid = req.body.uid;
  firebase
    .getUserByUid(uid)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
};

exports.findOneByEmail = function(req, res) {
  const email = req.body.email;
  firebase
    .getUserByEmail(email)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
};

exports.createUser = function(req, res) {
  const email = req.body.email;
  const emailVerified = req.body.emailVerified;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const displayName = req.body.displayName;
  const photoURL = req.body.photoURL;
  const disabled = req.body.disabled;
  firebase
    .createUserByEmail(
      new User(
        email,
        emailVerified,
        phoneNumber,
        password,
        displayName,
        photoURL,
        disabled
      )
    )
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(400).json({ success: err });
    });
};

exports.deleteUser = function(req, res) {
  const uid = req.body.uid;

  firebase
    .deleteUserByUid(uid)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: err });
    });
};

exports.updateUser = function(req, res) {
  const uid = req.body.uid;
  const email = req.body.email;
  const emailVerified = req.body.emailVerified;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const displayName = req.body.displayName;
  const photoURL = req.body.photoURL;
  const disabled = req.body.disabled;
  firebase
    .updateUserByUid(
      uid,
      new User(
        email,
        emailVerified,
        phoneNumber,
        password,
        displayName,
        photoURL,
        disabled
      )
    )
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: err });
    });
};
