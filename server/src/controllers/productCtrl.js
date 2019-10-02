import ProductModel from '../models/product.model';


class ProductCtrl {

  // GET by param, if param unspecified it returns all
  /*
  Specifying the sortBy parameter allows you to chose how the list is sorted:
    Volum, Pris, Varenummer, Literpris, Fylde, Friskhet, Bitterhet, Sodme, Argang(Noen har ikke Årgang),
    Alkohol, Sukker, APK
  Specifying the respective keys allows for searching for specific products, for example: Land=Italia
   Allowed: Varenavn, Varetype, land, Distrikt
  Using && between keys allows for specifying several types
   */
  get=(req, res) => {
    console.log(req);
    ProductModel.find()
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
  /*
  get = (req, res) => {
    let sorting = {}
    let sortBy = req.query.sortBy ? req.query.sortBy : 'Pris';
    sorting.sortBy = req.query.order

    let content = {};
    if (req.query.Varenavn) {
      content.Varenavn = req.query.Varenavn
    }
    if (req.query.Varetype) {
      content.Varetype = req.query.Varetype
    }
    if (req.query.Land) {
      content.Land = req.query.Land
    }
    if (req.query.Distrikt) {
      content.Distrikt = req.query.Distrikt
    }

    ProductModel.find(content).sort(sorting)
      .then(doc => {
        res.json(doc)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
  */
}


export default ProductCtrl;
