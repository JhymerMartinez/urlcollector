'use strict';

module.exports.api = {
  users : {
    signup: {
      userOK: {
        name:'test',
        email: 'test@urlcollector.com',
        password: 'test1234'
      },
      userBlankName: {
        name:'',
        email: 'test@urlcollector.com',
        password: 'test1234'
      },
      userNullName: {
        email: 'test@urlcollector.com',
        password: 'test1234'
      },
      userBlankEmail: {
        name:'test',
        email: '',
        password: 'test1234'
      },
      userNullEmail: {
        name:'test',
        password: 'test1234'
      },
      userBlankPass: {
        name:'test',
        email: 'test@urlcollector.com',
        password: ''
      },
      userNullPass: {
        name:'test',
        email: 'test@urlcollector.com'
      },
      userShortPass: {
        name:'test',
        email: 'test@urlcollector.com',
        password: 'test'
      },
      userInvalidEmail: {
        name:'test',
        email: 'test@urlcollector',
        password: 'test1234'
      }
    },
    signin: {
      user: {
        email: 'test@urlcollector.com',
        password: 'test1234'
      },
      userNew: {
        email: 'test1@urlcollector.com',
        password: 'test1234'
      },
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9'
    },
    update: {
      userUpdated: {
        name:'test2',
        email: 'test2@urlcollector.com'
      },
      userUpdatedNullName: {
        name:'test2',
        email: 'test2@urlcollector.com'
      },
      userUpdatedNullEmail: {
        name:'test2',
        email: 'test2@urlcollector.com'
      }
    }
  }
};
