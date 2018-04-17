
//---------------------------------------------Import Mongoose
const mongoose = require('mongoose');

//Call Schema property
const Schema = mongoose.Schema;

//Instanciate GeoSchema
const GeoSchema = new Schema({
	type:{
		type:String,
		default:'Point'
	},
	coordinates:{
		type:[Number],
		index:'2dsphere'
	}
});

//Instanciate Schema
const NinjaSchema = new Schema({
	name:
	{
		type:String,
		required:[true,'Name field required']
	},
	rank:
	{
		type:String,
		required:[true,'Rank field required']
	},
	available:
	{
		type:Boolean,
		default:false
	},
	geometry:GeoSchema
});

const Ninja = mongoose.model('Ninja',NinjaSchema);
module.exports=Ninja;