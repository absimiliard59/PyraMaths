(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.brouillon = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.un();
	this.instance.setTransform(72.5,130);

	// Layer 2
	this.instance_1 = new lib.bg();
	this.instance_1.setTransform(170,230,1,1,0,0,0,150,150);

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(20,0,380,380);


// symbols:
(lib.galet = function() {
	this.initialize(img.galet);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.papyrus = function() {
	this.initialize(img.papyrus);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,400);


(lib.un = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(4,1,1).p("AAAhjIAADH");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.bg = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ARMhjIAAvoIvoAAIAAPoIPoAAIMgAAAuDhjIAAvoIvoAAIAAPoIPoAAIPnAAIAAPnIPoAAIAAvnA9rhjIAAPnIPoAAIAAvnAuDdsIPnAAIAAvoIvnAAIAAPoIvoAAIAAvoAdsOEIsgAAIAAPoIvoAAAuD9rIAAMgIPnAAIAAsg");
	this.shape.setTransform(190,110);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-79.9,380,380);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;