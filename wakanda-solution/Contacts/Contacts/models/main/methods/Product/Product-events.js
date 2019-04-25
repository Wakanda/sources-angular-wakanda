

model.Product.events.init = function(event) {
	this.myBoolean = true;
};


model.Product.events.clientrefresh = function(event) {
	if (!this.name) {
	  this.name = "Unnamed product";
	}
};
