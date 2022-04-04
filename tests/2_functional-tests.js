const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);
    test("test /api/convert with valid input 10L", function(done) {
        chai
            .request(server)
            .get("/api/convert?input=10L")
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, `{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}`);
                done()
            });
    });
    test("test /api/convert with invalid unit 32g", function(done) {
        chai
            .request(server)
            .get("/api/convert?input=32g")
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, `"invalid unit"`);
                done()
            });
    });
    test("test /api/convert with invalid number 3/7.2/4kg", function(done) {
        chai
            .request(server)
            .get("/api/convert?input=3/7.2/4kg")
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, `"invalid number"`);
                done()
            });
    });
    test("test /api/convert with invalid number and invalid unit 3/7.2/4kilomegagram", function(done) {
        chai
            .request(server)
            .get("/api/convert?input=3/7.2/4kilomegagram")
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, `"invalid number and unit"`);
                done()
            });
    });
    test("test /api/convert with no number such as kg", function(done) {
        chai
            .request(server)
            .get("/api/convert?input=kg")
            .end(function(err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text, `{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}`);
                done()
            });
    });

});
