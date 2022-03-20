var mongoose = require("mongoose");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	description: String,
	cost: Number,
	location: String,
	lat: Number,
	lng: Number,
	createdAt: { type: Date, default: Date.now },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;




/*Campground.create(
	{
		name: "Sunset Peak",
		image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&w=1651&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
		description: "This is a peak in California with a beautiful view of the sunset."
	},
	function(err, campground){
		if(err){
			console.log(err);
		}
		else {
			console.log("New campground created.");
			console.log(campground);
		}
	}
);*/