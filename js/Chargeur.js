(Chargement=function(){
 var C=this;   
(Pinceau = function() {
	this.initialize();

	this.shape = new createjs.Shape();
	this.shape.graphics.lf(["#FFFFFF","#CF4D03","#4D2003"],[0,0.498,1],4.6,-5.2,4.5,15.6).s().p("AAignQgvgwhegjQBaAdApAjQBVBBgBB0QgJhmhBg8g");
	this.shape.setTransform(37.7,28.6);

	this.shape_1 = new createjs.Shape();
	this.shape_1.graphics.lf(["#031328","#A7D9E6","#031328"],[0,0.498,1],-3.1,0.6,2.9,-1.1).s().p("AhBgSQAugcAzgNIAiBIQg1ANg6Aig");
	this.shape_1.setTransform(50.3,63.5);

	this.shape_2 = new createjs.Shape();
	this.shape_2.graphics.lf(["#031328","#A7D9E6","#031328"],[0,0.494,1],1.1,-0.4,-1.2,0.1).s().p("AgxADQAxgfAmgEIAMAcQgpAEgyAhg");
	this.shape_2.setTransform(47.2,55.3);

	this.shape_3 = new createjs.Shape();
	this.shape_3.graphics.lf(["#031218","#A7D9E6","#0F2025"],[0,0.467,1],12.5,-2.7,-8.1,4.3).s().p("AAUCBQgQgIgFgSIgahPIg2hsIBxgwIATB+IACAEIAZBHQAHASgIASQgHASgRAHQgHADgIAAQgJAAgJgEg");
	this.shape_3.setTransform(78.8,151);

	this.shape_4 = new createjs.Shape();
	this.shape_4.graphics.lf(["#172429","#D0F5FF","#032028"],[0,0.498,1],-9,2.1,6.9,-3.3).s().p("AhVhpQAjgaAkgDIBkDeQg1ANg5Ajg");
	this.shape_4.setTransform(48.2,56);

	this.shape_5 = new createjs.Shape();
	this.shape_5.graphics.lf(["#CF4D03","#030303"],[0,1],-54.3,18.9,49.1,-16.6).s().p("AA4FvQhIiDhFjIQhFjHgYiYQgXiYAkgPQAkgPBKCDQBICDBFDIQBFDGAXCYQAYCZgkAPQgEACgEAAQgjAAhDh2g");
	this.shape_5.setTransform(63.9,103.9);

	this.shape_6 = new createjs.Shape();
	this.shape_6.graphics.lf(["#C26832","#17100B"],[0,1],-15.8,-0.6,11.4,2.3).s().p("AhVAdIgUhuQgMg8gSgUIA0AKQBEATBAAuQBUA7ADBXQADBchnAJIgKABQhSAAgdiFgAiHihIAAAAIAAAAg");
	this.shape_6.setTransform(36.7,30.7);

	this.addChild(this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype  = new createjs.Container();
    
this.Pourcentage=new createjs.Text("Chargement...", "20px Calibri", "#000000");
var P=new Pinceau();
this.addChild(P,this.Pourcentage);
P.cache(0,0,100,200)
createjs.Tween.get(P,{loop:true}).to({rotation:360},2000)

this.Clear=function(){
    console.log("erase")
    createjs.Tween.removeTweens(P);
    C.parent.removeChild(C);
}
    
}).prototype = new createjs.Container();
