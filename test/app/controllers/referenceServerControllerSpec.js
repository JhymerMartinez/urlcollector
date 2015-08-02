var request = require('supertest');
var api = require('../../../server.js');
var async = require('async');


var host = process.env.API_TEST_HOST || api;

request = request(host);


describe('Administración de urls',function(){

  describe('POST',function(){

    it.only('Deberia guardar una Referencia',function(done){

      var user = {
        "email": "jh_martinez_1991@outlook.com",
        "password": "12345678"
      };
      var dateNow = Date.now();
      var reference = {
        "title":"Genbeta",
        "url":"http://www.genbeta.com/",
        "date_added":dateNow,
        "description":"Blogger sobre tecnologias"
      };

      async.waterfall([
        function login(next){
          request
            .post('/auth/login')
            .send(user)
            .end(next);
        },
        function saveReference(res,next){
            request
              .post('/reference/save')
              .set('Authorization', 'Bearer'+' '+res.body.token)
              .send(reference)
              .end(next);
        },
        function assertions(res){
          var body = res.body;
          var parseDate = new Date(body.date_added);
          var dateSaved = new Date(dateNow);
          expect(body.title).to.equal("Genbeta");
          expect(body.url).to.equal("http://www.genbeta.com/");
          expect(String(parseDate)).to.equal(String(dateSaved));
          expect(body.description).to.equal("Blogger sobre tecnologias");
          done();
        }
      ],done);
    });



    it('Deberia retornar la información de urls almacenadas',function(){

    });

  });

  describe('GET',function(){

  });

});
