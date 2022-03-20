var mongoose = require("mongoose");
	Campground = require("./models/campground"),
	Comment = require("./models/comment");

var data = [
	{
		name: "Ekna Naturcamping",
		image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?auto=format&fit=crop&w=1006&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
		description: "This is a site in Rottne, Sweden with beautiful views of the lake and forest."
	},
	{
		name: "Snowy Peak",
		image: "https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?auto=format&fit=crop&w=749&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
		description: "Up in the Canadian mountains you will find this campground where you can enjoy the beautiful scenery!"
	},
	{
		name: "Granite Hill",
		image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=1050&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
		description: "Beautiful trees and scenery, all while still being able to see the city skyline only a few miles away."
	},
	{
		name: "Golden Ears Provisional Park",
		image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?auto=format&fit=crop&w=750&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
		description: "The park is often used for hiking, horseback riding, camping, and boating. There is an extensive network of hiking trails in the park ranging from short walks to strenuous backcountry trips. Canoeing is also very popular on Alouette Lake."
	}
]

function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed campgrounds!");
		//Add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				}
				else {
					console.log("Added campground!");
					//create a comment
					Comment.create(
						{
							text: "This place is great, but I wish there was internet.",
							author: "Homer"
						}, function(err, comment){
							if(err){
								console.log(err);
							}
							else {
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment.");
							}
						});
				}
			});
		});
	});
}

module.exports = seedDB;