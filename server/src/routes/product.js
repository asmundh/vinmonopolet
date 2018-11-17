import express from 'express';
import ProductModel from '../models/product.model';
import cors from 'cors';

const router = express.Router()

router.use(cors());
  // Allow client to fetch data
  router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Can change * to allow request from specific clients
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      next();
});

router.get('/product',(req, res) => {
  let sorting = req.query.sorting ? req.query.sorting: 'Pris';
  let order = req.query.order ? req.query.order : '1';
  let page = req.query.page ? req.query.page : 1;
  let pages=parseInt(page);
  let limit = req.query.limit ? req.query.limit : 10;
  let lim=parseInt(limit);

  let content = {};
  if (req.query.Varenavn) {
    content.Varenavn = {$regex: RegExp(req.query.Varenavn), $options:'-i'};
  }
  if (req.query.Pris) {
    content.Pris = req.query.Pris;
  }
  if (req.query.Varetype) {
    content.Varetype = {$regex: RegExp(req.query.Varetype), $options:'-i'};
  }
  if (req.query.Land) {
    content.Land = {$regex: RegExp(req.query.Land), $options:'-i'};
  }
  if (req.query.Distrikt) {
    content.Distrikt = {$regex: RegExp(req.query.Distrikt), $options:'-i'};
  }
  if (req.query.Alkohol) {
    content.Alkohol = req.query.Alkohol;
  }
  if (req.query.Argang) {
    content.Argang = req.query.Argang;
  }
  if (req.query.Volum) {
    content.Volum = req.query.Volum;
  }
  if (req.query.Kategori) {
    content.Kategori = req.query.Kategori;
  }

  ProductModel.paginate(content,{
    page: pages,
    limit: lim,
    sort: {[sorting]:[order]}
  }).then(page => {
    res.json(page)
  })
    .catch(err => {
      res.status(500).json(err);
    })
});

// UPDATE
router.put('/product',(req, res) => {

  if(req.query.Liker) {
    ProductModel.findOneAndUpdate({
      Varenummer: req.query.Varenummer,
    },{ $inc: {Liker :1 }})
      .then(doc => {
      res.json(doc)
    })
      .catch(err => {
        res.status(500).json(err)
      })
    }
  if(req.query.Misliker) {
    ProductModel.findOneAndUpdate({
      Varenummer: req.query.Varenummer,
    },{ $inc: {Misliker :1 }})
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
});


//Create a new product
router.post('/product', (req,res) => {
  //tell express what to do with the json data
  // req.body

  let model = new ProductModel(req.body)
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

export default router;