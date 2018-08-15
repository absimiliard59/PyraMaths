(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.brouillon = function() {
	this.initialize();

	// Layer 2
	this.instance = new lib.down();
	this.instance.setTransform(40,45);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(20,20,40,50);


// symbols:
(lib.down = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#7799B1").ss(1,1,1).p("ADIAyIhkAAIAAkrIjHAAIAAErIhkAAIDHDIg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A0B7C8").s().p("AjGAyIBkAAIAAkrIDFAAIAAErIBkAAIjHDIg");

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-19.9,-24.9,40,50);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;