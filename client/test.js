const axios = require('axios');

const path = 'localhost::6000/Product?Land=Italia';

const data = axios.get(path)
                  .then(
                     response => {
                        response.data.docs.forEach(element => {
                           console.log('Land: ' + element.Land + ', Alkoholprosent: ' + element.Alkohol + ', APK(Alkohol per krone): ' + element.APK);
                        });
                     }
                  ).catch(error=> {
                     console.log(error);
                  })

