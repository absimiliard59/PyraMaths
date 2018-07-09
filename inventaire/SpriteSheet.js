(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.SpriteSheet = function() {
	this.initialize();

	// Layer 2
	this.instance = new lib.cuir();
	this.instance.setTransform(-44.9,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-44.9,0.5,800,60);


// symbols:
(lib.cuir = function() {
	this.initialize(img.cuir);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,60);


(lib.piece_4 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC0099").s().p("ArQMgQhPAAAAhPIAAmmIRKAAIAApVIxKAAIAAmmQAAhPBPAAIWhAAQBPAAAABPIAAWhQAABPhPAAg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-79.9,-79.9,160,160);


(lib.piece_3 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC0099").s().p("ArQMgQhPAAAAhPIAA2hQAAhPBPAAIWhAAQBPAAAABPIAAP7In1AAIAApVIpVAAIAAJVIJVAAIAAH1gAErErg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-79.9,-79.9,160,160);


(lib.piece_2 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC0099").s().p("AkqMgIAAxKIn1AAIAAmmQAAhPBPAAIP7AAIAARKIH1AAIAAGmQAABPhPAAg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-79.9,-79.9,160,160);


(lib.piece_1 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC0099").s().p("AkqMgIAAxKIn1AAIAAmmQAAhPBPAAIWhAAQBPAAAABPIAAGmIn1AAIAARKg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-79.9,-79.9,160,160);


(lib.carre_fond = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("ArQMgQhPAAAAhPIAA2hQAAhPBPAAIWhAAQBPAAAABPIAAWhQAABPhPAAg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-79.9,-79.9,160,160);


(lib.bouton_rotation = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FFFF").s().p("AkZEaQh1h0AAimQAAilB1h0QB0h1ClAAQCmAAB0B1QB1B0AAClQAACmh1B0Qh0B1imAAQilAAh0h1gAiliMQg/BAAABWQAABZA/A/QAZAZAcAQQAGACAGgBQAGgCADgGQACgFgBgGQgCgHgGgCQgYgNgWgVQg2g2AAhOQAAhKA2g2QA2g2BNAAQBLAAA2A2IAQARIghAkQgEAEAAAHQAAAFAEAFQAFAEAGAAIBLAAQAGAAAFgEQAEgFAAgGIAAhSQAAgFgDgEQgCgEgFgCQgEgBgFABQgEABgDADIgWAZIgPgRQg/g+hXgBQhZABg/A+g");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhhDKQgdgPgZgZQg/g/AAhZQAAhXA/g/QA/g/BYAAQBYAABAA/IAOARIAXgZQADgDAEgBQAFgBAEABQAEACADAEQACAEABAEIAABTQgBAGgEAEQgFAFgGAAIhKAAQgHAAgEgEQgEgFgBgGQAAgGAFgEIAggkIgQgSQg1g2hNAAQhMAAg2A2Qg2A2AABLQAABNA2A2QAWAWAZANQAFACACAGQACAGgDAGQgCAFgHACIgEABQgEAAgDgCg");
	this.shape_1.setTransform(-1.4,0);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-39.9,-39.9,80,80);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;