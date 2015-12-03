(function() {

  'use strict';
  //GLOBAL app messages
  exports.Models = {
    firstNameRequired: 'First Name is required.',
    usenameRequired: 'Username is required.',
    passwordRequired: 'Password is required.',
    passwordLength: 'The password should be longer.',
    invalidEmail: 'The email is invalid.'
  };
  exports.Controllers = {
    userDeleted: 'User deleted.',
    userInvalidPassword: 'Incorrect password.',
    userNotExist: 'User not exists',
    userUnauthorized: 'Not authorized.',
    userTokenExpired: 'The token has expired.',
    userExists: 'User already exists.',
    userUnknownError: 'Unknown error.',
    userUpdateOK: 'Updated information.',
    userUpdateERROR: 'Failed to update information.'
  };
})();
