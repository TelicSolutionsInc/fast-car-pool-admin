module.exports = class User {
  constructor(
    email,
    emailVerified,
    phoneNumber,
    password,
    displayName,
    photoURL,
    disabled
  ) {
    this.email = email;
    this.emailVerified = emailVerified;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.disabled = disabled;
  }
};
