'use strict';

module.exports.api = {
  auth : {
    signin: {
      userOK: {
        firstName:'test',
        lastName:'test',
        username:'test',
        email: 'test@urlcollector.com',
        password: 'test1234'
      },
      userPartialEmail: {
        firstName:'test2',
        lastName:'test2',
        username:'test2',
        email: 'test@urlcollector.com',
        password: 'test1234'
      },
      userPartialUsername: {
        firstName:'test2',
        lastName:'test2',
        username:'test',
        email: 'test2@urlcollector.com',
        password: 'test1234'
      }
    },
    login: {
      user: {
        email: 'test@urlcollector.com',
        password: 'test1234'
      },
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9'
    }
  }
};
