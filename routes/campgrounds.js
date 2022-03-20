var express = require("express"),
	router = express.Router(),
	Campground = require("../models/campground"),
	middleware = require("../middleware"),
	geocoder = require("geocoder");

//INDEX - show all campgrounds
router.get("/", function(req, res){
	//Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		}
		else {
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

//CREATE- add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
	//get data from from and add to campgrounds array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var cost = req.body.cost;
	geocoder.geocode(req.body.location, function(err, data){
		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;
		var location = data.results[0].formatted_address;
		var newCampground = {name: name, image: image, price: price, description: description, author: author};
		//Create a new campground and save to database
		Campground.create(newCampground, function(err, newlyCreated){
			if(err){
				console.log(err);
			}
			else {
				//redirect to campgrounds page
				res.redirect("/campgrounds");
			}
		});	
	});	
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
	//find the campground with the provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else {
			//render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//EDIT - shows form to edit a campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});

//UPDATE - add changes to the database
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	geocoder.geocode(req.body.location, function(err, data){
		var lat = data.results[0].geometry.location.lat;
		var lng = data.results[0].geometry.location.lng;
		var location = data.results[0].formatted_address;
		var newCampground = {name: name, image: image, price: price, description: description, author: author, location: location, lat: lat, lng: lng};
		//find and updatethe correct campground
		Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
			if(err){
				req.flash("error", err.message);
				res.redirect("/campgrounds");
			}
			else {
				req.flash("success", "Successfully Updated!")
				res.redirect("/campgrounds/" + req.params.id);
			}
		});
	});
});

//DESTROY - remove campgrounds from the database
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else {
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;