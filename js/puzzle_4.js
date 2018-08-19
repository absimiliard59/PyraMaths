puzzle_4 = function(){

let exo=new createjs.Container()
exo.bloque=true;
exo.indice=3;
    
var util = utilitaire();//raccourci
    
// Déclarer ici les variables globales à l'exercice.
// ex : var repEleve, soluce, champReponse, arNombre=[1,2,3];
let scene; //un Container global qui contiendra le plateau de jeu
let freeze; //variable indiquant si les boutons sont actifs ou non
let valider,quitter //les boutons
let u,l_bouteille,tuy;
let linker;
let transfert;
let f1,f2,f3,f4,f5,f6
let den1=[2,3]
let den2=[4,5,6]
let den3=[6,8,10]
let sab,bris;


    
// Définir les options par défaut de l'exercice
// (définir au moins totalQuestion, totalEssai, et tempsExo )
exo.options = {
       		
    };
   

// Création des données de l'exercice (peut rester vide),
// exécutée a chaque fois que l'on commence ou recommence l'exercice
creerDonnees = function() {
    f1=moyenne_fraction();    
    f2=petite_fraction();    
    f3=petite_fraction();    
    f4=grande_fraction();  
    f5=petite_fraction(); 
    f6=[-1,1]  
    
 while(f6[1]>30 || f6[0]<=0 || PlusGrand(f4,f5)==2  || PlusGrand(f1,f2)==2 || Egale(f6,f1) || Egale(f6,f2) || Egale(f6,f3) || Egale(f6,f4) || Egale(f6,f5)) {
    den1=[2,3];
    den2=[4,5,6];
    den3=[6,8,10];
    f1=moyenne_fraction();    
    f2=petite_fraction();    
    f3=petite_fraction();    
    f4=grande_fraction();  
    f5=petite_fraction(); 
    f6=Dif(f1,f2);
    f6=Som(f6,f3);
    f6=Som(f6,Dif(f4,f5))

 }

console.log(f1+"-"+f2);
console.log("+");
console.log(f3)
console.log("+");
console.log(f4+"-"+f5);
console.log("="+f6);
f2=Reste(f2)
f5=Reste(f5)
f6=Reste(f6);
 
 
 
};

exo.debloque=function(){   
    createjs.Tween.get(u).to({y:u.oy},500).call(()=>{
        exo.bloque=false;
        freeze=false;
        valider.visible=true;
        u.Fill(500,f6);
        for(let i=0;i<5;i++){             
            l_bouteille[i].Fill(500,bf[i]);  
          };
        scene.addChildAt(u.oeil,0) ;
        u.oeil.x=u.x+50
        u.oeil.y=u.y+70


    })
}



//Création de la page question, exécutée à chaque question,
// tous les éléments de la page doivent être ajoutés à exo.blocAnimation
creerPageQuestion = function() {  

    let fond=new createjs.Bitmap(images["pierre"]);
    exo.addChild(fond);    
    creerDonnees();  
    

    scene=new createjs.Container();
    exo.addChild(scene);
     

    freeze=false;    
    

    valider=bouton("Valider",exo,"valider")
    valider.x=630
    valider.y=340

       // Pour tester hors du labyrinthe
    //exo.addEventListener("valider",exo.evaluer)

    quitter=bouton("Quitter",exo,"quitter")
    quitter.x=510
    quitter.y=340
    
    valider.visible=false;
    exo.addChild(valider,quitter)

    exo.valider=valider;
    exo.quitter=quitter; 

    brise=briser();
    brise.x=250
    brise.y=220
    brise.visible=false;
    scene.addChild(brise);
    
    tuy=Tuyau();
    tuy.visible=false;
    scene.addChild(tuy)    
    
    u=Urne(f6);
    u.of=f6;
    u.frac=[0,1]
    u.x=250;
    u.oy=220;
    u.y=-300;
    scene.addChild(u);
    //u.Fill(500,f6)
    bf=[f1,f2,f3,f4,f5];    
    util.shuffleArray(bf);
    l_bouteille=[];
    for(let i=0;i<5;i++){       
        l_bouteille.push(Bouteille(bf[i])); 
        l_bouteille.frac=[0,1];     
        l_bouteille[i].x=250+150*Math.cos(6.28/5*i-0.314); 
        l_bouteille[i].y=220+150*Math.sin(6.28/5*i-0.314);  
        scene.addChild(l_bouteille[i]) 
        //l_bouteille[i].Fill(500,bf[i]);  
        l_bouteille[i].of=bf[i];
    }        
    
   

    linker=new createjs.Shape;
    scene.addChild(linker);

    sab=Sablier()
    sab.y=200
    sab.x=600
    scene.addChild(sab)
    sab.scaleX=sab.scaleY=0.9

    transfert=[0,0];

    exo.debloque();
    
  
}

// Evaluation : doit toujours retourner "juste" "faux" ou "rien"
exo.evaluer = function() {	
    
    if(u.frac[0]==u.frac[1] && u.visible==true){
    console.log("ok")
    return("juste")} 
     console.log("bad")
     return("faux");
     
 
     
};


    
////////////////////////////////////// Bibliothèque annexe ///////////////////////////////////
function bouton(te,clip,event){
    let b=new createjs.Container();
    let f=new createjs.Shape();
    let t=new createjs.Text(te, "20px Bangers", "#000000");  
    t.textBaseline = "top";          
    let l=t.getBounds().width;
    let h=t.getBounds().height;            
    f.graphics.setStrokeStyle(2).beginStroke("#000000").beginFill("#FFFFFF").drawRoundRect(0,0,l*1.5,h*1.5,3);
    t.x=l*0.25;
    t.y=h*0.25;
    b.addChild(f,t);    
    b.mouseChildren=false;
    b.cursor="pointer";
    b.addEventListener("click",()=>{if(b.alpha==1){clip.dispatchEvent(event)}})
    return(b);
}

function Bouteille(fr){
    let res=new createjs.Container();
    res.delta=6.28/fr[1]
    let graduations=new createjs.Shape();   
    for(let i=0;i<fr[1];i++){
        graduations.graphics.setStrokeStyle(2).beginStroke("#000000").moveTo(40*Math.cos(-1.57+res.delta*i),40*Math.sin(-1.57+res.delta*i)).lineTo(50*Math.cos(-1.57+res.delta*i),50*Math.sin(-1.57+res.delta*i))
    }   
    let oldX=false;  // utilisés pour relier les bouteilles
    let oldY=false; 

    res.q=0;
    res.frac=[0,1]    
    let reservoir=new createjs.Shape();
    res.Fill=function(temps,fraction){
        res.frac=Som(res.frac,fraction)
        let tw=new TWEEN.Tween( { quantite:res.q*res.delta  } )
                                    .to( { quantite:res.q*res.delta +fraction[0]*6.28/fraction[1] }, temps )
                                    .onUpdate( function () {                               
                                        reservoir.graphics.clear();
                                        reservoir.graphics.beginFill("#FF0000");
                                        reservoir.graphics.moveTo(0,0).lineTo(0,40)
                                        reservoir.graphics.arc(0,0,40,-1.57,-1.57+this.quantite);
                                        reservoir.graphics.lineTo(0,0)

                                    } )
                                    .onComplete( ()=>{res.q=res.frac[0];
                                                      res.delta=6.28/res.frac[1];
                                                    }
                                        )
                                .start();
    }

    res.DeFill=function(temps,fraction){
        res.frac=Dif(res.frac,fraction)     
        let tw=new TWEEN.Tween( { quantite:res.q*res.delta  } )
                                    .to( { quantite:res.q*res.delta-fraction[0]*6.28/fraction[1] }, temps )
                                    .onUpdate( function () {                                                                   
                                        reservoir.graphics.clear();
                                        reservoir.graphics.beginFill("#FF0000");
                                        reservoir.graphics.moveTo(0,0).lineTo(0,40)
                                        reservoir.graphics.arc(0,0,40,-1.57,-1.57+this.quantite);
                                        reservoir.graphics.lineTo(0,0)

                                    } )
                                    .onComplete( ()=>{res.q=res.frac[0];
                                                      res.delta=6.28/res.frac[1];                                                      
                                                    }
                                        )
                                    .start();
    }
    

    let shape = new createjs.Shape();
	shape.graphics.f().s("#000000").ss(1,1,1).p("AEakaQB2B2AACkQAAClh2B1Qh1B2ilAAQikAAh2h2Qh1h1AAilQAAikB1h2QB2h1CkAAQClAAB1B1gAFhlgQCTCSAADOQAADPiTCSQiSCTjPAAQjOAAiSiTQiTiSAAjPQAAjOCTiSQCSiTDOAAQDPAACSCTg");

	shape_1 = new createjs.Shape();
	shape_1.graphics.f("#000000").s().p("AkZEaQh1h1AAilQAAikB1h1QB1h1CkAAQClAAB1B1QB2B1gBCkQABClh2B1Qh1B2ilgBQikABh1h2g");

	shape_2 = new createjs.Shape();
	shape_2.graphics.f("#FFCC00").s().p("AlgFgQiTiSAAjOQAAjNCTiTQCTiTDNAAQDOAACSCTQCUCTAADNQAADOiUCSQiSCUjOAAQjNAAiTiUgAkZkZQh1B1AACkQAAClB1B1QB1B2CkgBQClABB1h2QB2h1gBilQABikh2h1Qh1h1ilAAQikAAh1B1g");

    res.addChild(shape_2,shape_1,shape);

    res.addChild(graduations);
    res.addChild(reservoir);   
    res.mouseChildren=false;
    res.addEventListener("mousedown",first);
    
    function first(e){        
        if(freeze || exo.bloque==true){return false}
        freeze=true;  
        oldX = e.stageX/Main_Scale;
        oldY = e.stageY/Main_Scale;    
        linker.graphics.clear()
        if(transfert[0]==0){
            transfert[0]=res;
            stage_enigme.addEventListener("stagemousemove",draw);
            stage_enigme.addEventListener("stagemouseup",stop_draw);
        }
    }

    function stop_draw(e){
        linker.graphics.clear();
        stage_enigme.removeEventListener("stagemousemove",draw);
        stage_enigme.removeEventListener("stagemouseup",stop_draw);        
        transfert[1]=get_closest(e.stageX/Main_Scale,e.stageY/Main_Scale)        
        freeze=false;
        if(transfert[1]==false || transfert[0]==transfert[1] || transfert[1].frac[0]==transfert[1].frac[1] || transfert[0].frac[0]==0){
            transfert=[0,0];            
        } else {     
        tuy.scaleX=0;  
        tuy.x=transfert[0].x;
        tuy.y=transfert[0].y;
        let angle = Math.atan2(transfert[1].y - transfert[0].y, transfert[1].x - transfert[0].x)*180/3.14;
        tuy.rotation=angle;
        let longueur=dist(transfert[0],transfert[1]);
        let scal=longueur/300;
        tuy.visible=true;
        let pg=(PlusGrand(transfert[0].frac,Reste(transfert[1].frac)))
       
        if(pg==1 && transfert[1]==u && Egale(transfert[0].frac,Reste(transfert[1].frac)) ==false){
            createjs.Tween.get(tuy).to({scaleX:scal},300).wait(1400).call(()=>{freeze=false;transfert=[0,0]})
            createjs.Tween.get(tuy.sang).wait(400).to({scaleX:1},500).call(()=>{
                //u.visible=false;
                //brise.visible=true;
            });
        } else {
        createjs.Tween.get(tuy).to({scaleX:scal},300).wait(1400).to({scaleX:0},300).call(()=>{freeze=false;transfert=[0,0];tuy.reset()})
        createjs.Tween.get(tuy.sang).wait(400).to({scaleX:1},500).to({x:300,scaleX:-1},0).to({scaleX:0},500);   
        }     
        
        if(pg==2){
           let f=[transfert[0].frac[0],transfert[0].frac[1]]
           setTimeout(()=>{transfert[0].DeFill(500,transfert[0].frac)
            },400);
           setTimeout(()=>{transfert[1].Fill(500,f)
            },900);
        } else {            
            let f=Reste(transfert[1].frac);
            if(transfert[1]==u && Egale(transfert[0].frac,Reste(transfert[1].frac)) ==false){
                setTimeout(()=>{    u.visible=false;
                                    brise.visible=true;
                },1400);                
            } 
            setTimeout(()=>{transfert[0].DeFill(500,f)
            },400);            
           setTimeout(()=>{transfert[1].Fill(500,f)
            },900);
        
        }

        
        }
       
    }

    function draw(evt){    
            
        linker.graphics.beginStroke("#FF0000").setStrokeStyle(5, "round").moveTo(oldX, oldY).lineTo(evt.stageX/Main_Scale, evt.stageY/Main_Scale);               
        oldX = evt.stageX/Main_Scale;
        oldY = evt.stageY/Main_Scale;        
    }

    return(res)

    
}

function Urne(fr){
    let res=new createjs.Container();    
    res.delta=6.28/fr[1]
    let graduations=new createjs.Shape();   
    for(let i=0;i<fr[1];i++){
        graduations.graphics.setStrokeStyle(2).beginStroke("#000000").moveTo(40*Math.cos(-1.57+res.delta*i),40*Math.sin(-1.57+res.delta*i)).lineTo(50*Math.cos(-1.57+res.delta*i),50*Math.sin(-1.57+res.delta*i))
    }   

    res.q=0;
    res.frac=[0,1]    
    let reservoir=new createjs.Shape();
    res.Fill=function(temps,fraction){
        res.frac=Som(res.frac,fraction)
        let tw=new TWEEN.Tween( { quantite:res.q*res.delta  } )
                                    .to( { quantite:res.q*res.delta +fraction[0]*6.28/fraction[1] }, temps )
                                    .onUpdate( function () {                               
                                        reservoir.graphics.clear();
                                        reservoir.graphics.beginFill("#FF0000");
                                        reservoir.graphics.moveTo(0,0).lineTo(0,40)
                                        reservoir.graphics.arc(0,0,40,-1.57,-1.57+this.quantite);
                                        reservoir.graphics.lineTo(0,0)

                                    } )
                                    .onComplete( ()=>{res.q=res.frac[0];
                                                      res.delta=6.28/res.frac[1];
                                                    }
                                        )
                                .start();
    }

    res.oeil = new createjs.Shape();
	res.oeil.graphics.f().s("#000000").ss(30,1,1).p("AWLqgQDUg5DbgTQjLhFjLhDQiYgxiagsQj7hHj+g7Qj0g3j4glQjfgijhgMQj/gMj7AaQinASikArQiKAliDA8QiaBIiEBvQhPBDhHBLQB3AGByAgQBwAgBnA5QCQBRB6B0QB9B3CKBkQBNA3BdAUQCDAaCHgFQCFgGCDgUQCMgWCKgfQCGgeB7g4QE0iQE9h3QDVhODag5gAWqLuQi+iAC+hIQBSAAA7A7QA7A6AABTQAABTg7A7Qg7A6hSAAQgEAAgEAAIgDAAQ6/gfmewZIAAVkAzhCWQFyhKCxjO");
	res.oeil.setTransform(50,70);


      let shape = new createjs.Shape();
	shape.graphics.f().s("#000000").ss(1,1,1).p("AEakaQB2B2AACkQAAClh2B1Qh1B2ilAAQikAAh2h2Qh1h1AAilQAAikB1h2QB2h1CkAAQClAAB1B1gAFhlgQCTCSAADOQAADPiTCSQiSCTjPAAQjOAAiSiTQiTiSAAjPQAAjOCTiSQCSiTDOAAQDPAACSCTg");

	shape_1 = new createjs.Shape();
	shape_1.graphics.f("#000000").s().p("AkZEaQh1h1AAilQAAikB1h1QB1h1CkAAQClAAB1B1QB2B1gBCkQABClh2B1Qh1B2ilgBQikABh1h2g");

	shape_2 = new createjs.Shape();
	shape_2.graphics.f("#66FFFF").s().p("AlgFgQiTiSAAjOQAAjNCTiTQCTiTDNAAQDOAACSCTQCUCTAADNQAADOiUCSQiSCUjOAAQjNAAiTiUgAkZkZQh1B1AACkQAAClB1B1QB1B2CkgBQClABB1h2QB2h1gBilQABikh2h1Qh1h1ilAAQikAAh1B1g");

    res.addChild(res.oeil,shape_2,shape_1,shape);
    res.addChild(graduations);
    res.addChild(reservoir);   
    res.mouseChildren=false;
    return(res)
}

function Tuyau(){
    let res= new createjs.Container();
    let shape = new createjs.Shape();
	shape.graphics.lf(["#333333","#FFFFFF","#666666"],[0,0.51,1],0,-4.9,0,5).s().p("A3bAyIAAhjMAu2AAAIAABjg");
    shape.setTransform(150,0);  
    
    res.sang = blood();    
    res.sang.scaleX=0;

    res.reset=function(){
        res.sang.x=0;
        res.sang.scaleX=0;
        res.scaleX=0;
    }
    
    res.addChild(shape,res.sang);    
    return(res);
}

function Sablier(){
    let res=new createjs.Container();
    let fond=new createjs.Bitmap(images["sablier"]);
    fond.y=-250;
    fond.x=-158;    
    res.addChild(fond)

    res.cursor="pointer";
    res.addEventListener("click",()=>{
        if(freeze || exo.bloque){return false}
        freeze=true;
        createjs.Tween.get(res).to({rotation:360},500).call(()=>{
            freeze=false;
            transfert=[0,0];
            tuy.reset();
            res.rotation=0;
            for(let i=0;i<5;i++){  
                l_bouteille[i].q=0;     
                l_bouteille[i].delta=6.28/ l_bouteille[i].frac[1]
                l_bouteille[i].frac=[0,1]
                l_bouteille[i].Fill(500,l_bouteille[i].of); 
               
                
            } 
            u.q=0; 
           u.delta=6.28/ u.frac[1]
           u.frac=[0,1]    
            u.Fill(500,u.of);  
            u.visible=true;
            brise.visible=false;

        })
    })

    return(res)
}

function briser(){
    let res=new createjs.Container();
    res.shape = new createjs.Shape();
	res.shape.graphics.f().s("#000000").ss(1,1,1).p("ADRq9Qi0gpikBcQh9BGhCB0AHIjwQANALAMAMQCTCTAADNQAAAVgCAUALFDzQgOC0iECEQgOAOgOANAGBJEQiABwirAHArEkmQAfiDBmhlQAXgXAYgUAmNENQiDiNAAjCQAAg7AMg3QABgDABgEAjSLKQgLgFgLgHQivhlg3jAQgCgGgBgFQgDgLgDgL");
	res.shape.setTransform(-13,-4.9);

	res.shape_1 = new createjs.Shape();
	res.shape_1.graphics.f("#66FFFF").s().p("AjoK+Qivhlg3jAIgDgLIgGgWIAHACIAPAHIBjArQAyB4B2BEIAWAMQgOATgOAXQgNAXgJAVIgWgMgABTKKQAAgbADgYQCVgJBshsQAMgLAKgNQAKA5AKBBQiABwirAHQgDgXAAgagAIDHMQBRhdAMh7IACAAIA9AFQATAAATgGQgOC0iECEIgcAbQgKhBgKg5gAoQhCQAAg7AMg3QAOAHAeAjQARAUAcAjIgBARQAACkB1B1QAWAVAXASIh8ANIgHACQiDiNAAjCgAIQCxIgCAAQACgVAAgVQAAidhshyQARgXAIgcQAFgkAGgRQANALAMAMQCTCTAADNQAAAVgCAUQgSAGgTAAIg9gFgAnYjGQgegjgOgHIACgHIAlABQATAAAygGQgRAzgCA6QgcgjgRgUgArEkmQAfiDBmhlQAXgXAYgUQAjAQASACQANAWARAYQgfAVgdAcQhFBGgcBXQgyAGgTAAIglgBgAkSm/QgMgIgTgDQgOgDgHgDQBCh0B9hGQCkhcC0ApQAEARAMAjQAIAcgFAcIgNgEQifgtiOBQQhfA0g0BWQgbgMgOgLg");
	res.shape_1.setTransform(-13,-4.9);

	res.shape_2 = new createjs.Shape();
	res.shape_2.graphics.f("#000000").s().p("AkeJhQh1hEgyh4IABABQAmANAKgQQAHgbACgEQANgXA8gFQAigEATgJIALgHIAPAFQAaACAdgRIAKgGQAEALAFADQAIAFAKADIAVBRIABABQAFAsgcAxQgMAVguAdQgcATgZAfIgXgMgAAEIKQAZgwAAgYQAAg4gbgjIg6g9QAlgHAlgkIAXAAQAzACAnAKQA4ANAgAcQAUARAVB3IACAHQgLANgMALQhrBsiTAJQAGgoANgegAGaG+QgVh3gUgRQgggcg4gNIALABQAEAAA9gSQA8gQAegBIAAAAQAAgCA6AEQgMB7hRBdIgCgHgAG/DrQAAABAAAAQAAABAAAAQAAAAAAAAQABAAAAAAQACgCADAAIgGAAgAmeDQQh1h1AAikIAAgRIACACIAyA6IAUAbIAEgKIAGgLQASAYAGAjQACAOADAdIACAQQgPgEgLgKQgLgJgEgOQgFAOAAAUQAAAgAUARQARAPAXAAQAjAAAagWQAPgNATgWQAFgEAkgJIAbgGQgJAWglAbQgxAiAAAbQAAAEAHAbQAAATgnAHIgCABQgXgSgVgVgADHDKQgogKgzgCIgXAAQAngkArhBQAAgJgQgPQAjgVAbgoIAphFQAYgpAVgTQAKgJAHgJQBsByAACdQAAAVgCAVQg6gEAAACIAAAAIAGAAQgDAAgCACQAAAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAgBQgdABg8AQQg9ASgFAAgAh7C6IgCgPQgDgdgCgPQgGgigSgaQADgIAAgEQAAgOghgpIgyg3IgCgDQACg5ARg0IA9gIIBNgLQgWgQgRgFIgBgBQALgGALgKIAgAkIAQgCQARAAAuAMIAJADQgKANgKATQgTApAAAbQAAAaAQAaQAQAaAaAFQAgAFAXAbQAJALAHAGIgGAKQgQAegYALIgqAKQgiAIgFAEQgTAXgPAMQgaAXgjAAQgHAAgHgCgAHzjpQgWgbghgFQgZgFgSgcQgRgaAAgaQAAgbAWgpQAJgTALgNIAzAPQATAGAbAUIAjAbIACABIAGAVIAkAFQAxAAAogXQAQAPAAAJQhfCShSAAQgKAAgVgZgAg6kpQgqgkgTgKQgKgEgjgLQgUgFgogSIgHgDIg1gZQgegLgXgLQA1hWBeg0QCRhQCdAtIANAEQgCAMgEANQgKAagBAtIAAADIgBBSQgJBlhTAuIgfANQgKgLgggbgAnZk9QgwgNgRAAQgHAAhkAPIg9AJQAchXBGhGQAcgcAfgVQAkAyAuA5QAYAeAzA6QgLAKgLAHQgbgJgggIg");
	res.shape_2.setTransform(-2.6,-4.2);

	res.shape_3 = new createjs.Shape();
	res.shape_3.graphics.f("#FF0000").s().p("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");

    res.addChild(res.shape_3,res.shape_2,res.shape_1,res.shape);
    return res;
}

function blood(){
    let res=new createjs.Container();
    let shape = new createjs.Shape();
    shape.graphics.f("#FF0000").s().drawRect(0,-3,300,6)    
    res.addChild(shape);
    return(res)
}

function dist(c1,c2){
    return Math.sqrt( (c1.x-c2.x)*(c1.x-c2.x)+(c1.y-c2.y)*(c1.y-c2.y)  )
}

function get_closest(x,y){
    let d=1000000
    let indice=0   
    let p=new createjs.Point(x,y)  
    
    if((p.x-u.x)*(p.x-u.x)+(p.y-u.y)*(p.y-u.y)<2500){ 
        return(u)
    } 

    for (let i=0;i<l_bouteille.length;i++){       
        if(   (p.x-l_bouteille[i].x)*(p.x-l_bouteille[i].x)+(p.y-l_bouteille[i].y)*(p.y-l_bouteille[i].y)<d){
            indice=i;
            d= (p.x-l_bouteille[i].x)*(p.x-l_bouteille[i].x)+(p.y-l_bouteille[i].y)*(p.y-l_bouteille[i].y)
        }
    }
   
    if(d<2500){
    return l_bouteille[indice]
    }
    return(false)
}

function Pgcd(a,b){  
        if(a<=0 || b<=0){return 1}  
        while (a!=b){
        if (a>b){ a-=b }
        else {b-=a};
        }
        return a;
    
}

function Simpl(frac){
    let p=Pgcd(frac[0],frac[1])
    return [frac[0]/p,frac[1]/p]
}

function Som(frac1,frac2){
    let f=[frac1[0]*frac2[1]+frac1[1]*frac2[0],frac1[1]*frac2[1]];
    return Simpl(f)
}

function Dif(frac1,frac2){
    let f=[frac1[0]*frac2[1]-frac1[1]*frac2[0],frac1[1]*frac2[1]];
    return Simpl(f)
}

function PlusGrand(frac1,frac2){
    //console.log(frac1+" ? "+frac2)
    if(frac1[0]*frac2[1]-frac1[1]*frac2[0]>=0){
        return 1
    } else {
        return 2
    }   
}

function Egale(f1,f2){
    let f=Simpl(f1);
    let g=Simpl(f2);
    if(f[0]==g[0] && f[1]==g[1]){
        return(true)
    }
    return(false)
}

function Reste(frac){
    return [frac[1]-frac[0],frac[1]]
}



function petite_fraction(){
   let d=den3   
   let den=d[Math.floor(Math.random()*d.length)];
   let num=Math.max(1,Math.floor(Math.random()*(den*0.4)));
   if(den>5){
       den3.splice(den3.indexOf(den),1);
   }
   return [num,den]

}

function moyenne_fraction(){
   let d=den2
   let den=d[Math.floor(Math.random()*d.length)];
   let num=Math.max(1,Math.floor(Math.random()*(den*0.5)));
   den2.splice(den2.indexOf(den),1);
   
   return [num,den]

}

function grande_fraction(){
    let d=den1.concat(den2)
    let den=d[Math.floor(Math.random()*d.length)];
    let num=Math.max(Math.floor(den/2),Math.floor(Math.random()*(den*0.7)));
    if(den>3){
    den2.splice(den2.indexOf(den));
    } else {
        den1.splice(den1.indexOf(den),1);
    }
    
    return [num,den]
 
 }








/********************
*   C'est fini
*********************/
creerPageQuestion();
return exo;
};

