let chai = require('chai');
let chaiHttp = require('chai-http');


let server = require('../src');
let product = require('../src/models/product.model');

chai.use(chaiHttp);
let should = chai.should();

let productToSend = {
   "_id":"5bec32af22fd990159ad4386",
   "Varenummer":1101,
   "Varenavn":"Test",
   "Volum":0.7,
   "Pris":409.9,
   "Literpris":585.57,
   "Varetype":"Akevitt",
   "Fylde":"0",
   "Friskhet":"0",
   "Bitterhet":"0",
   "Sodme":"0",
   "Farge":"Lys gyllen.",
   "Lukt":"Aroma med preg av vanilje. sitrus og karve.",
   "Smak":"Preg av vanilje. sitrus og karve. innslag av karamell og fat. God fylde.",
   "Passertil01":"",
   "Passertil02":"",
   "Passertil03":"",
   "Land":"Norge",
   "Distrikt":"Øvrige",
   "Argang":0,
   "Rastoff":"Poteter. krydder",
   "Alkohol":41.5,
   "Sukker":"4",
   "Syre":"Ukjent",
   "Produsent":"Arcus",
   "Vareurl":"http://www.vinmonopolet.no/vareutvalg/varedetaljer/sku-1101",
   "APK":0.070871117,
   "Misliker":555,
   "Liker":5799,
   "Kategori":"Brennevin"
 };

describe('Products', () => {
   
   before((done) => { //Empty the database before every test
      product.remove({}, (err) => {
         done();
      });
   });


   // GET all products in database
   describe('/GET product', () => {
      it('it should GET all the books', (done)=> {
         chai.request(server)
         .get('/product')
         .end((err, res) => {
            res.should.have.status(200);
            res.body.docs.should.be.a('array');
            res.body.docs.length.should.be.eql(0);
         done();
         });
      });
    });
    
    // POST new product to database
    describe('/POST product', () => {
      it('it should create a new product', (done) => {
         chai.request(server)
         .post('/product')
         .send(productToSend)
         .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            done();
         });
      });
    });


    //PUT new amount of likes for a product
    describe('/PUT product', () => { 
      // Check current likes
      it('it should get current amount of likes', (done) => {
         chai.request(server)
         .get('/product')
         .end((err, res) => {
           res.should.have.status(200);
           res.body.docs[0].Liker.should.be.eql(5799);
           done();
         });
        });

        // Increase amount of likes
        it('it should increment amount of likes by one', (done) => {
          chai.request(server)
          .put('/product?Varenummer=1101&Liker=True')
          .send()
          .end((err, res) => {
            res.should.have.status(200);
            chai.request(server)
            .get('/product')
            .end((err, res) => {
            res.should.have.status(200);
             res.body.docs[0].Liker.should.be.eql(5800);
             done();
            })
        });
      });

      // Decrease amount of likes
      it('it should decrease amount of likes by one', (done) => {
        chai.request(server)
        .put('/product?Varenummer=1101&Misliker=True')
        .send()
        .end((err, res) => {
        res.should.have.status(200);
        chai.request(server)
        .get('/product')
        .end((err, res) => {
        res.should.have.status(200);
        res.body.docs[0].Liker.should.be.eql(5800);
        done();
        })
      });
    });
  
    });

    after((done) => { //Empty the database before every test
      product.remove({}, (err) => {
         done();
      });
   });
  });
