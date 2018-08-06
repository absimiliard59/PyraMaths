(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.brouillon = function() {
	this.initialize();

	// Layer 2
	this.instance = new lib.disque();
	this.instance.setTransform(185.2,61.6);

	this.instance_1 = new lib.scarabe();
	this.instance_1.setTransform(49.6,50);

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-1.2,0,216.5,100);


// symbols:
(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,94,94);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,57,57);


(lib.scarabe = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ACYlDQAVgPAWgJIAbgiQAEgJAAgJQAAgpg/geQg/gdhZAAQgBAAgBAAQgFAAgEABQgDgBgFAAQgBAAgBAAQhZAAg/AdQg/AeAAApQAAAJAEAJIAbAiQAWAJAVAPQBYA8A/CbQBAibBYg8gAGMlLQgVgKgagIQg6gUhFgMQgGATgVAPQgNAKgTAJQgGACgFADAAAhsQACAEACAFIACD5IADEaQAAAAAAAAQBXgbBMgeQBZgkBJgnQAVgMATgLQCRhXgMhSQgIg7hOi7QBLgoAAgzQAAgmgrggQgWgRgjgPAHFkrQBKiAiDhIQAmBngmBBAlNEsQgVgMgTgLQiRhXAMhSQAIg7BOi7QhLgoAAgzQAAgmArggQhKiACDhIQgmBnAmBBQAVgKAagIQA6gUBFgMAiXlDQgFgDgGgCQgTgJgNgKQgVgPgGgTAnEkrQAWgRAjgPAgIGwQAAAAAAAAQhXgbhMgeQjWgOg8CLQgwimCggiAAJGwIAAAFQgFgBgEgBQgDABgFABIAAgFQAFABADACQAEgCAFgBgAirF3QhZgkhJgnACsF3QDWgOA8CLQAwimiggiAAAhsQgBAEgCAFIgFITAgBCWIAHAA");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#66FFFF").s().p("Aj2B9IgDj5IgEgJQBAibBYg8IALgFQATgJAOgKQAUgPAHgTQBCAMA7AUQAZAIAVAKQAjAPAXARQAqAgAAAmQAAAzhLAoQBPC6AIA7QALBSiQBXIgoAXQhJAohYAkQhLAdhXAbIgBABg");
	this.shape_1.setTransform(25.4,2.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#66FF99").s().p("AD0GWQhXgbhLgdQhYgkhJgoIgogXQiQhXALhSQAIg7BPi6QhLgoAAgzQAAgmAqggQAXgRAjgPQAVgKAZgIQA7gUBCgMQAHATAUAPQAOAKATAJIALAFQBXA8BBCbIgEAJIgFITIgBgBg");
	this.shape_2.setTransform(-25.3,2.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("ACrF3QBagkBJgoQCfAigvCnQg9iMjWAPgAlNErQBJAoBaAkQjWgPg9CMQgvinCfgigAgIGwIAGoSIACgKIADAKIADD4IACEaIgIACIgIgCgAAGCWIgGAAgAiXlDQgVgPgWgJIgbghQgDgKAAgIQgBgqBAgdQA/gdBZgBIABAAIAIABIAIgBIACAAQBZABA/AdQBAAdgBAqQAAAIgDAKIgbAhQgWAJgVAPQhZA8g/CbQg/ibhYg8gAGLlLQAnhBgnhnQCEBJhKCAQgWgSgkgPgAmLnzQgmBnAmBBQgjAPgWASQhKiACDhJg");

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-50.8,-49.9,101.7,100);


(lib.empreinte_facteur = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Bitmap1();
	this.instance.setTransform(-46.9,-46.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-46.9,-46.9,94,94);


(lib.disque = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCC00").s().p("AhGBGQgcgdAAgpQAAgoAcgeQAegcAoAAQApAAAdAcQAeAegBAoQABApgeAdQgdAegpgBQgoABgegeg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FFFF00","#FFCC00"],[0,1],0,0,0,0,0,31.2).s().p("AjTDUQhYhYABh8QgBh7BYhYQBYhYB7ABQB8gBBYBYQBXBYAAB7QAAB8hXBYQhYBXh8AAQh7AAhYhXgAhGhGQgcAeAAAoQAAApAcAdQAeAeAogBQApABAdgeQAegdgBgpQABgogegeQgdgcgpAAQgoAAgeAcg");

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-29.9,-29.9,60,60);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;