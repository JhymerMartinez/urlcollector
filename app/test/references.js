var request = require('supertest');
var api = require('../../server.js');
var async = require('async');


var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Logueo por token [auth/login]', function() {

  describe('POST', function() {
    it('deberia retornar un token',function(done){
        

    	var user = {
    		"email": "jh_martinez_1991@outlook.com", 
 			"password": "12345678" 
    	}


    	async.waterfall([

            function sendUser(next){
                request
                    .post('/auth/login')
                    .send(user)
                    .end(next);
            },

            function assertions(res){
                var token = res.body.token;
                var result = token.split('.')
                expect(result[0]).to.equal('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9');
                done();
            }
            ],done);


    });
  });



  it.only('deberia retornar unsuario o contraseña incorrectos',function(done){
        

    	var user = {
    		"email": "jh_martinez_1991@outlook", 
 			"password": "12345678" 
    	}

    	var user2 = {
    		"email": "jh_martinez_1991@outlook.com", 
 			"password": "123" 
    	}

    	var message1;
    	var message2;
    	async.waterfall([

            function sendUser(next){
                request
                    .post('/auth/login')
                    .send(user)
                    .end(next);
            },

            function sendUser2(res,next){
            	message1= res.body.message;
                request
                    .post('/auth/login')
                    .send(user2)
                    .end(next);
            },

            function assertions(res){
                message2= res.body.message;
                expect(message1).to.equal('Email o contraseña incorrectos');
                expect(message2).to.equal('Contraseña incorrecta');
                done();
            }
            ],done);


    });
  
  });

