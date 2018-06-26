(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.Controle = function() {
	this.initialize();

	// Layer 1
	this.valider = new lib.ok();
	this.valider.setTransform(101.5,50);

	this.droite = new lib.Gauche();
	this.droite.setTransform(169.5,50,1,1,0,0,180);

	this.gauche = new lib.Gauche();
	this.gauche.setTransform(30,50);

	this.addChild(this.gauche,this.droite,this.valider);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(9.5,9.5,180.5,81);


// symbols:
(lib.Confirmer = function() {
	this.initialize(img.Confirmer);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,81);


(lib.Fleche = function() {
	this.initialize(img.Fleche);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,41,81);


(lib.gold = function() {
	this.initialize(img.gold);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,256,256);


(lib.ok = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Confirmer();
	this.instance.setTransform(-31.9,-40.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-31.9,-40.4,64,81);


(lib.Gauche = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Fleche();
	this.instance.setTransform(-20.4,-40.4);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-20.4,-40.4,41,81);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;