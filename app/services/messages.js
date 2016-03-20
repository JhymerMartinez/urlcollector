'use strict';

//GLOBAL app messages
exports.Models = {
  userFirstNameRequired: 'First Name is required.',
  userUsenameRequired: 'Username is required.',
  userUsernameUnique: 'The Username already exists.',
  userEmailRequired: 'Email is required.',
  userEmailUnique: 'The Email already exists.',
  userPasswordRequired: 'Password is required.',
  userPasswordLength: 'The password should be longer.',
  userInvalidEmail: 'The email is invalid.',
  groupNameRequired: 'Group Name is required.',
  linkTitleRequired: 'Link title is required.',
  linkUrlRequired: 'Link URL is required.'
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

exports.GlobalErrors = {
  serverErrorUnknown: 'Unknown server error.',
};
