const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

router.get('/ninjas/all',(req,res,next)=>{
	Ninja.find({}).then((ninjas)=>{
		res.send(ninjas);
	}).catch(next);
});

router.get('/ninjas',(req,res,next)=>{
	Ninja.aggregate().near({
		near:{
			'type':'point',
			'coordinates':[parseFloat(req.query.lng),parseFloat(req.query.lat)]
		},
		maxDistance:100000,
		spherical:true,
		distanceField:"Dist[m]"
	}).then((ninjas)=>{
		res.send(ninjas);
	}).catch(next);
});

router.post('/ninjas',(req,res,next)=>{
//	let ninja = new Ninja(req.body);
//	ninja.save();
//New method with promises
	Ninja.create(req.body).then((ninja)=>{
		res.send(ninja);
	}).catch(next);
});

router.put('/ninjas/:id',(req,res,next)=>{
//	Ninja.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((ninja)=>{
	Ninja.findByIdAndUpdate(req.params.id,req.body).then((ninja)=>{
		Ninja.findById(req.params.id).then((ninjaU)=>{
			res.send({
				Query:'Old ninja',
				Ninja:ninja,
				QueryU:'New Ninja',
				NinjaU:ninjaU
			});
		});
	}).catch(next);
});

router.delete('/ninjas/:id',(req,res,next)=>{
	Ninja.findByIdAndRemove(req.params.id).then((ninja)=>{
			res.send(ninja);
		}).catch(next);
});

module.exports=router;