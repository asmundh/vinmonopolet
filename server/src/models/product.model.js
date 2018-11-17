import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

//Schema need to specify in mongodb for validation
//this is done in application layer
let ProductSchema = new mongoose.Schema({
  Varenummer:Number,
  Varenavn: String,
  Volum:Number,
  Pris:Number,
  Literpris:Number,
  Varetype:String,
  Fylde:String,
  Friskhet:Number,
  Bitterhet:Number,
  Sodme:String,
  Farge:String,
  Lukt:String,
  Passertil01:String,
  Passertil02:String,
  Passertil03:String,
  Land:String,
  Distrikt:String,
  Argang:Number,
  Rastoff:String,
  Alkohol:Number,
  Sukker:Number,
  Syre:String,
  Produsent:String,
  Vareurl:String,
  APK:Number,
  Liker: Number,
  Misliker: Number,
  Kategori: String
  },
  { collection : 'inventory' })

// Pagination for only sending a few items at once
ProductSchema.plugin(mongoosePaginate);

//Export schema as mongoose model
module.exports=mongoose.model('inventory',ProductSchema)
//const Product = mongoose.model('Product', ProductSchema);

export default ProductSchema;