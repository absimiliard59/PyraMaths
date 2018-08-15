puzzle_5 = function(){

let exo=new createjs.Container()
exo.bloque=true;
exo.indice=4;
    
var util = utilitaire();//raccourci
    
// Déclarer ici les variables globales à l'exercice.
// ex : var repEleve, soluce, champReponse, arNombre=[1,2,3];
let scene; //un Container global qui contiendra le plateau de jeu
let freeze; //variable indiquant si les boutons sont actifs ou non
let valider,quitter //les boutons
let g; //la grille principale
let p1,p2,p3,p4,p5,p6,vide
let liste;
let gr,vue_3d;
let vue1,vue2,vue3;
let e1;
let E;
let c_vue1,c_vue2,c_vue3;
let piece_debloque




    
// Définir les options par défaut de l'exercice
// (définir au moins totalQuestion, totalEssai, et tempsExo )
exo.options = {
       		
    };
   

// Création des données de l'exercice (peut rester vide),
// exécutée a chaque fois que l'on commence ou recommence l'exercice
creerDonnees = function() {
    vide={
        "id":0,
        "couleur":["#FF0000","#FF3300"],
        "data":[   ]
    }

    p1={
            "id":1,
            "couleur":["#FF0000","#FF3300"],
            "data":[  [2,4,3],[2,4,1],[2,4,2],[2,5,3],[2,5,1],[2,5,2]  ]
        }
    p2={
            "id":2,
            "couleur":["#33CC00","#33FF00"],
            "data":[  [2,5,2],[2,4,2],[2,3,2],[2,2,2],[2,1,2]  ]
        }
    p3={
            "id":3,
            "couleur":["#66CCFF","#66FFFF"],
            "data": piece_aleatoire1() //[  [2,5,2],[2,5,3],[3,5,2],[3,5,3]  ]
        }
    p4={
            "id":4,
            "couleur":["#FFCC00","#FFFF00"],
            "data":piece_aleatoire2()//[  [2,5,2],[2,4,2],[3,5,2],[2,5,3]  ]
        }
    p5={
            "id":5,
            "couleur":["#FF66FF","#FF99FF"],
            "data":[  [2,4,3],[2,4,1],[2,4,2],[2,5,1]  ]
        }
    p6={
            "id":6,
            "couleur":["#6600FF","#6633FF"],
            "data":[  [2,5,2],[2,5,3],[2,5,4], [3,5,2],[3,5,3],[3,5,4] , [4,5,2],[4,5,3],[4,5,4],[3,4,3] ]
        }


    liste=[p1,p2,p3,p4,p5,p6]

    

};

exo.debloque=function(){   
    createjs.Tween.get(piece_debloque).to({y:piece_debloque.oy},500) 
    exo.bloque=false;
    valider.visible=true;
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
    valider.x=580
    valider.y=340

    quitter=bouton("Quitter",exo,"quitter")
    quitter.x=430
    quitter.y=340
    
    valider.visible=false;
    exo.addChild(valider,quitter)

     // Pour tester hors du labyrinthe
     //exo.addEventListener("valider",exo.evaluer);
     //valider.visible=true;

    exo.valider=valider;
    exo.quitter=quitter; 



    for(let i=0;i<3;i++){
        ////////////////////////////////////////////////////////////////////////
        let g=Manipulator(liste[0]);
        liste.splice(0,1)
        g.x=40;
        g.y=80+110*i;
        scene.addChild(g);    
        g.addEventListener("mouseover",()=>{
            for(let i=0;i<scene.getNumChildren();i++){
                    scene.getChildAt(i).dispatchEvent("hide");
            }
           
            g.dispatchEvent("show")})
        /////////////////////////////////////////////////////////////////////////////////////////
    }
    for(let i=0;i<2;i++){
        ////////////////////////////////////////////////////////////////////////
        let g=Manipulator(liste[0]);
        liste.splice(0,1)
        g.x=200;
        g.y=80+110*i;
        scene.addChild(g);   
        g.addEventListener("mouseover",()=>{
            for(let i=0;i<scene.getNumChildren();i++){
                    scene.getChildAt(i).dispatchEvent("hide");
            }
           
        g.dispatchEvent("show")}) 
        /////////////////////////////////////////////////////////////////////////////////////////
    }

    piece_debloque=Manipulator(liste[0]);
    liste.splice(0,1)
    piece_debloque.x=200;
    piece_debloque.oy=80+110*2;
    piece_debloque.y=800;
    scene.addChild(piece_debloque);   
    piece_debloque.addEventListener("mouseover",()=>{
        for(let i=0;i<scene.getNumChildren();i++){
                scene.getChildAt(i).dispatchEvent("hide");
        }
       
    piece_debloque.dispatchEvent("show")}) 

    liste=[p1,p2,p3,p4,p5,p6]

    gr=Grille();
    gr.x=500;
    gr.y=250;
    scene.addChild(gr);
    let or=new createjs.Shape();
    or.graphics.beginFill("#0000FF").drawCircle(0,0,5)
    gr.render=new createjs.Container();
    gr.addChild(or,gr.render);
    vue_3d=creer_piece(vide);

    let choix1=["face","arriere"];
    let choix3=["dessus","dessous"];
    let choix2=["gauche","droite"]
    c_vue1=choix1[Math.floor(Math.random()*2)]
    c_vue2=choix2[Math.floor(Math.random()*2)]
    c_vue3=choix3[Math.floor(Math.random()*2)]


    vue1=Vue(c_vue1)
    vue1.scaleX=vue1.scaleY=0.6
    vue1.x=400
    vue1.y=100
    scene.addChild(vue1)

    vue2=Vue(c_vue2)
    vue2.scaleX=vue2.scaleY=0.6
    vue2.x=500
    vue2.y=100
    scene.addChild(vue2)

    vue3=Vue(c_vue3)
    vue3.scaleX=vue3.scaleY=0.6
    vue3.x=600
    vue3.y=100
    scene.addChild(vue3)



    ///////////////// Création et envoi de l'énoncé
    n=false
    while(n==false){
    empilement();
    let n1=vue_3d_free(e1,E)
    let n2=vue_3d_free(e2,E)   
    let n3=vue_3d_free(e3,E)
    let n4=vue_3d_free(e4,E)
    let n5=vue_3d_free(e5,E)
    let n6=vue_3d_free(e6,E)
    n=n1 && n2 && n3 && n4 && n5 && n6
    }
    if(n){
        Photo(vue1,c_vue1,E);
        Photo(vue2,c_vue2,E);
        Photo(vue3,c_vue3,E);
    } else {}

    
  
}

// Evaluation : doit toujours retourner "juste" "faux" ou "rien"
exo.evaluer = function() {
    let a=Egal(Photo(null,c_vue1,E),Photo(null,c_vue1,vue_3d));
    let b=Egal(Photo(null,c_vue2,E),Photo(null,c_vue2,vue_3d));
    let c=Egal(Photo(null,c_vue3,E),Photo(null,c_vue3,vue_3d));
    
    console.log(a+"/"+b+"/"+c)

    if(a && b && c )   	
    {
        console.log("ok")
        return("juste")}
     
    return("faux");
     
 
     
};


    
////////////////////////////////////// Bibliothèque annexe ///////////////////////////////////
function empilement(){
    E=creer_piece(vide);
    /////////////////////////Empilement aléatoire des pièces
    let brouillon=new createjs.Container() //clip inutile pour utiliser les fonctions
    let r=["x","y","z"]
    let t=[-1,1,0];
    e1=creer_piece(p1);
    e2=creer_piece(p2);
    e3=creer_piece(p3);
    e4=creer_piece(p4);
    e5=creer_piece(p5);
    e6=creer_piece(p6);

    // rotations successives    
    for (let i=0;i<10;i++){
        tourne(e1,r[Math.floor(r.length*Math.random())],brouillon)
        tourne(e2,r[Math.floor(r.length*Math.random())],brouillon)
        tourne(e3,r[Math.floor(r.length*Math.random())],brouillon)
        tourne(e4,r[Math.floor(r.length*Math.random())],brouillon)
        tourne(e5,r[Math.floor(r.length*Math.random())],brouillon)
        tourne(e6,r[Math.floor(r.length*Math.random())],brouillon)
    }
    pesanteur(e1.data,0);
    // translations successives    
    for(let i=0;i<10;i++){
        trans(t[Math.floor(t.length*Math.random())],0,t[Math.floor(t.length*Math.random())],e1.data,brouillon);
        trans(t[Math.floor(t.length*Math.random())],0,t[Math.floor(t.length*Math.random())],e2.data,brouillon);
        trans(t[Math.floor(t.length*Math.random())],0,t[Math.floor(t.length*Math.random())],e3.data,brouillon);
        trans(t[Math.floor(t.length*Math.random())],0,t[Math.floor(t.length*Math.random())],e4.data,brouillon);
        trans(t[Math.floor(t.length*Math.random())],0,t[Math.floor(t.length*Math.random())],e5.data,brouillon);
        trans(t[Math.floor(t.length*Math.random())],0,t[Math.floor(t.length*Math.random())],e6.data,brouillon);
    }
}

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

function Manipulator(p1){
     ////////////////////////////////////////////////////////////////////////

     let g=Grille();

     let monde=(creer_piece(p1));

     let clip=new createjs.Container()
     rendu_piece(monde,clip);
     g.addChild(clip);
     
 
     let joy=translation(monde.data,clip);
     joy.scaleX=joy.scaleY=0.6
     joy.x=170
     joy.y=30;
     g.addChild(joy)
 
     g.scaleX=g.scaleY=0.5
 
     let r1=rotate();
     r1.x=0
     r1.y=-122
     r1.addEventListener("click",()=>{tourne(monde,"z",clip);                                      
                                      joy.update()
                                    
                                    })
     r1.scaleY=0.7
     g.addChild(r1)
 
     let r2=rotate();
     r2.x=122
     r2.y=0
     r2.addEventListener("click",()=>{tourne(monde,"y",clip);                                     
                                     let n=(pesanteur(monde.data,0));
                                     while(clip.getNumChildren()>0){
                                        clip.removeChildAt(0);
                                    }                                    
                                    rendu_piece(monde,clip);                                     
                                     joy.update()
                                 })
     r2.scaleX=0.7
     g.addChild(r2)
 
     let r3=rotate();
     r3.x=-65
     r3.y=65
     r3.addEventListener("click",()=>{tourne(monde,"x",clip);                                     
                                     let n=(pesanteur(monde.data,0))
                                     while(clip.getNumChildren()>0){
                                        clip.removeChildAt(0);
                                    }                                    
                                    rendu_piece(monde,clip);                                     
                                     joy.update()
                                 })
     g.addChild(r3)

     let envoyer=down(p1.couleur[0]);
     envoyer.x=160;
     envoyer.y=-80
     envoyer.scaleY=-1;
     g.addChild(envoyer)
     envoyer.addEventListener("click",send);

    let actif=true
     joy.visible=r1.visible=r2.visible=r3.visible=envoyer.visible=false;
     g.addEventListener("hide",()=>{
         if(actif && exo.bloque==false){
        joy.visible=r1.visible=r2.visible=r3.visible=envoyer.visible=false;
         }
     })
     g.addEventListener("show",()=>{
        if(actif && exo.bloque==false){
        joy.visible=r1.visible=r2.visible=r3.visible=envoyer.visible=true;
        }
     })

     function send(){        
         let n=relever(monde.data,0); 
         let Y=clip.y                     
         createjs.Tween.get(clip).to({y:Y-20*n},200).call(
             ()=>{clip.visible=false;
                  
                  if(vue_3d_free(monde,vue_3d)){
                      rendu_3D(vue_3d,gr.render);
                      joy.visible=r1.visible=r2.visible=r3.visible=false;
                        actif=false
                        envoyer.removeEventListener("click",send);
                        envoyer.addEventListener("click",receive);   
                        envoyer.scaleY=1;               
                      
                  } else {
                      clip.visible=true;  
                      let Y=clip.y  
                      let n=(pesanteur(monde.data,0));                 
                      createjs.Tween.get(clip).to({y:Y+20*n},200)
                  }
                  
            });
        

     }

     function receive(){
        envoyer.scaleY=-1;
        joy.visible=r1.visible=r2.visible=r3.visible=true;        
        clip.visible=true;
        let Y=clip.y  
        let n=(pesanteur(monde.data,0));                 
        createjs.Tween.get(clip).to({y:Y+20*n},200);
        for(let x=0;x<6;x++){       
            for(let z=5;z>=0;z--){
                for(let y=0;y<6;y++){               
                    if(vue_3d.data[x][z][y]==p1.id){
                        vue_3d.data[x][z][y]=0;
                    }
                }
            }   
        }
        while(gr.render.getNumChildren()>0){
            gr.render.removeChildAt(0);
        }  
        
        let chute=true;
        while(chute==true){
            chute=false
            for(let i=1;i<7;i++){
                let r=descendre(vue_3d.data,i)
                chute=chute || r
            } 
        }
        
        rendu_3D(vue_3d,gr.render);
        actif=true;
        envoyer.removeEventListener("click",receive);
        envoyer.addEventListener("click",send); 
       // show_tab(vue_3d.data)

     }

     

     return(g)
 
     /////////////////////////////////////////////////////////////////////////////////////////

}



function Cube(c1,c2){
    let res=new createjs.Container();
    let s=new createjs.Shape();
    res.addChild(s)
    s.graphics.beginFill(c1)
            .setStrokeStyle(1)
            .beginStroke("#000000")            
            .drawRect(0,-20,20,20)
            .endFill()            
            .beginFill(c2)
            .moveTo(0,-20)
            .lineTo(10,-30)
            .lineTo(30,-30)
            .lineTo(20,-20)
            .lineTo(0,-20)
            .endFill()
            .beginFill(c2)
            .moveTo(20,-20)
            .lineTo(30,-30)
            .lineTo(30,-10)
            .lineTo(20,0)
            .lineTo(20,-20)
            .endFill()

    return(res)
}

down = function(c) {
	let res=new createjs.Container()

	// Layer 1
	let shape = new createjs.Shape();
	shape.graphics.f().s(c).ss(1,1,1).p("ADIAyIhkAAIAAkrIjHAAIAAErIhkAAIDHDIg");

	let shape_1 = new createjs.Shape();
	shape_1.graphics.f(c).s().p("AjGAyIBkAAIAAkrIDFAAIAAErIBkAAIjHDIg");

    res.addChild(shape_1,shape);
    res.cursor="pointer"
    return(res)
}



function Grille(){
    let res= new createjs.Container();
    let s=new createjs.Shape();
    s.graphics.beginFill("#CCCCCC")
            .moveTo(0,-120)
            .lineTo(120,-120)
            .lineTo(120,0)
            .lineTo(60,60)
            .lineTo(-60,60)
            .lineTo(-60,-60)
            .lineTo(0,-120)
            .endFill()    
       
    for(let i=0;i<6;i++){
        s.graphics.setStrokeStyle(1)
            .beginStroke("#999999")
            .moveTo(20+20*i,0)
            .lineTo(20+20*i,-120)
            .moveTo(0,-20-20*i)
            .lineTo(120,-20-20*i)
            .moveTo(-10-10*i,10+10*i)
            .lineTo(-10-10*i+120,10+10*i)
            .moveTo(20+20*i,0)
            .lineTo(20+20*i-60,60)
            .moveTo(0,-20-20*i)
            .lineTo(-60,-20-20*i+60)
            .moveTo(-10-10*i,10+10*i)
            .lineTo(-10-10*i,10+10*i-120)

            
    }

    s.graphics.setStrokeStyle(2)
            .beginStroke("#000000")
            .moveTo(0,0)
            .lineTo(0,-120)
            .moveTo(0,0)
            .lineTo(120,0)
            .moveTo(0,0)
            .lineTo(-60,60)

    res.addChild(s);
    return(res);

}

// info sous la forme {id: integer , couleur:[], data:[] }
function creer_piece(info){
    let res={
        "id":info.id,
        "couleur":info.couleur,
        "data":null
    }
    let r=[];
    for(let x=0;x<6;x++){
        let t=[]
        for(let z=0;z<6;z++){
           t.push([0,0,0,0,0,0]);
        }
        r.push(t)
    }   
       
    for (let i=0;i<info.data.length;i++){           
        r[parseInt(info.data[i][0])][parseInt(info.data[i][1])][parseInt(info.data[i][2])]=info.id       
    }    
   
    res.data=r;
    
    return(res)
}


function rendu_piece(info,res){   
    for(let x=0;x<6;x++){       
        for(let z=5;z>=0;z--){
            for(let y=0;y<6;y++){               
                if(info.data[x][z][y]!=0){
                    let c=Cube(info.couleur[0],info.couleur[1]);
                    c.x=-10*(x+1)+y*20;
                    c.y=10+10*x+z*20-100;
                    res.addChild(c);
                }
          
            }
        }
       
    }
   
}

function rendu_3D(info,res){   
    for(let x=0;x<6;x++){       
        for(let z=5;z>=0;z--){
            for(let y=0;y<6;y++){               
                if(info.data[x][z][y]!=0){
                   //console.log(liste)
                    let c1=liste[info.data[x][z][y]-1].couleur[0]
                    let c2=liste[info.data[x][z][y]-1].couleur[1]
                    let c=Cube(c1,c2);
                    c.x=-10*(x+1)+y*20;
                    c.y=10+10*x+z*20-100;
                    res.addChild(c);
                }
          
            }
        }
       
    }
   
}

function show_tab(t){
    console.log("---------------------------------------------------")  
    for(let x=0;x<6;x++){            
        for(let z=0;z<6;z++){
           console.log(t[x][z])
        }
        console.log("//////////////////////")
    }
}

rotate = function() {
	let res=new createjs.Container()

	// Layer 1
	let shape = new createjs.Shape();
	shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("AAygNIAAASIgVAAAgxASQAmhBA9A0");

	let shape_1 = new createjs.Shape();
	shape_1.graphics.f().s("#FF0000").ss(1,1,1).p("AA4g3QAYAXAAAgQAAAhgYAXQgXAYghAAQggAAgXgYQgYgXAAghQAAggAYgXQAXgYAgAAQAhAAAXAYg");

	let shape_2 = new createjs.Shape();
	shape_2.graphics.f("#FF0000").s().p("Ag3A4QgYgYAAggQAAgfAYgYQAYgYAfAAQAgAAAYAYQAYAYAAAfQAAAggYAYQgYAYggAAQgfAAgYgYgAgyARQAVgjAcAAIABAAIAAAAQAUAAAYATIABAAIACACIABAAIAAABIgUAAIAUAAIAAgSIAAASIAAgBIgBAAIgCgCIgBAAQgYgTgUAAIAAAAIgBAAQgcAAgVAjgAAwAEg");

    res.addChild(shape_2,shape_1,shape);
    res.cursor="pointer"
    return(res)
}

gauche = function() {
	let res=new createjs.Container()

	// Layer 1
	let shape = new createjs.Shape();
	shape.graphics.f().s("#FF0000").ss(1,1,1).p("AAyhjIBkhkInzDHIBkDIIBkhkIErAAIDIjHg");

	shape_1 = new createjs.Shape();
	shape_1.graphics.f("#FF0000").s().p("AldAAIHzjGIhkBkIEsAAIjIDFIkrAAIhkBkg");

    res.addChild(shape_1,shape);
    return(res)
}


droite = function() {
	let res=new createjs.Container()

	// Layer 1
	let shape = new createjs.Shape();
	shape.graphics.f().s("#FF0000").ss(1,1,1).p("ACWhjIkrAAIjIDHIEsAAIhkBkIHzjIIhkjHg");

	shape_1 = new createjs.Shape();
	shape_1.graphics.f("#FF0000").s().p("AgxBjIksAAIDIjFIErAAIBkhkIBkDGInzDHg");

    res.addChild(shape_1,shape);
    return(res)
}


devant = function() {
	let res=new createjs.Container()

	// Layer 1
	let shape = new createjs.Shape();
	shape.graphics.f().s("#FF0000").ss(1,1,1).p("AAAizIjHDHIjIAAIDwCgIIvigIjIAAIDIjHg");

	shape_1 = new createjs.Shape();
	shape_1.graphics.f("#FF0000").s().p("AmOATIDIAAIDGjGIGPAAIjIDGIDIAAIouChg");

    res.addChild(shape_1,shape);
    return(res)
}


derriere = function() {
	let res=new createjs.Container()

	// Layer 1
	let shape = new createjs.Shape();
	shape.graphics.f().s("#FF0000").ss(1,1,1).p("ACgizIovCgIDIAAIjIDHIGPAAIDIjHIDIAAg");

	shape_1 = new createjs.Shape();
	shape_1.graphics.f("#FF0000").s().p("AmOC0IDIjGIjIAAIIuihIDvChIjIAAIjHDGg");

    res.addChild(shape_1,shape);
    return(res)
}

function est_vide(orientation,w){
    //show_tab(w)
    switch (orientation) {
        case "devant":
        for(let z=0;z<6;z++){
            for(let y=0;y<6;y++){                
                if(w[5][z][y]!=0){                   
                    return false;
                }            
            } 
        };return true;
        case "derriere":
        for(let z=0;z<6;z++){
            for(let y=0;y<6;y++){
                if(w[0][z][y]!=0){
                    return false;
                }
            
            } 
        };return true;
        case "gauche":
        for(let x=0;x<6;x++){
            for(let z=0;z<6;z++){
                if(w[x][z][0]!=0){
                    return false;
                }
            
            } 
        };return true;
        case "droite":
        for(let x=0;x<6;x++){
            for(let z=0;z<6;z++){
                if(w[x][z][5]!=0){
                    return false;
                }
            
            } 
        };return true;
    }
    
}

function pesanteur(world,n){    
    let t=0;
    for(let x=0;x<6;x++){        
        for(let y=0;y<6;y++){
            t=t+world[x][5][y];
        }
    }
    if(t==0){       

       let r=[];
        for(let x=0;x<6;x++){
            let t=[]
            for(let z=0;z<6;z++){
            t.push([0,0,0,0,0,0]);
            }
            r.push(t)
        }   

       for(let x=0;x<6;x++){       
        for(let z=5;z>=0;z--){
            for(let y=0;y<6;y++){  
                if(z+1>=0 && z+1<=5 && world[x][z][y]!=0)
                 {  r[x][z+1][y]=world[x][z][y];                    
                 }
                }
             }
        }

        for(let x=0;x<6;x++){       
            for(let z=5;z>=0;z--){
                for(let y=0;y<6;y++){ 
                    world[x][z][y]=r[x][z][y]
                }
            }
        }
        return(pesanteur(world,n+1));
    } else {        
        return(n)
    }
}

function tourne(monde,axe,res){    
    let w=monde.data     
  
    let r=[];
    for(let x=0;x<6;x++){
        let t=[]
        for(let z=0;z<6;z++){
        t.push([0,0,0,0,0,0]);
        }
        r.push(t)
    }   
    switch(axe){
        case "z":
        for(let x=0;x<6;x++){       
            for(let z=5;z>=0;z--){
                for(let y=0;y<6;y++){  
                    r[y][z][5-x]=w[x][z][y]
                }
            }
        }
        for(let x=0;x<6;x++){       
            for(let z=5;z>=0;z--){
                for(let y=0;y<6;y++){  
                    w[x][z][y]=r[x][z][y]
                }
            }
        }
        break;
        case "y":
        for(let x=0;x<6;x++){       
            for(let z=5;z>=0;z--){
                for(let y=0;y<6;y++){  
                    r[z][5-x][y]=w[x][z][y]
                }
            }
        }
        for(let x=0;x<6;x++){       
            for(let z=5;z>=0;z--){
                for(let y=0;y<6;y++){  
                    w[x][z][y]=r[x][z][y]
                }
            }
        }
        break;
        case "x":
        for(let x=0;x<6;x++){       
            for(let z=5;z>=0;z--){
                for(let y=0;y<6;y++){  
                    r[x][5-y][z]=w[x][z][y]
                }
            }
        }
        for(let x=0;x<6;x++){       
            for(let z=5;z>=0;z--){
                for(let y=0;y<6;y++){  
                    w[x][z][y]=r[x][z][y]
                }
            }
        }
        break;
    }
    while(res.getNumChildren()>0){
        res.removeChildAt(0);
    }
    res.x=res.y=0;
    rendu_piece(monde,res);
    

    

}


translation = function(w,piece) {
	let res=new createjs.Container()

	// Layer 1
	let ar = derriere();
	ar.setTransform(30.8,-37.9);

	let ga = gauche();
	ga.setTransform(-55.7,-0.4);

	let av = devant();
	av.setTransform(-49.2,38);

	let dr = droite();
    dr.setTransform(55.8,-0.4);
    
    ar.cursor=ga.cursor=av.cursor=dr.cursor="pointer";

    res.addChild(dr,av,ga,ar);

    res.update=function(){
        if(est_vide("gauche",w)){
            ga.visible=true
        } else {
            ga.visible=false
        }
        if(est_vide("droite",w)){
            dr.visible=true
        } else {
            dr.visible=false
        }
        if(est_vide("devant",w)){
            av.visible=true
        } else {
            av.visible=false
        }
        if(est_vide("derriere",w)){
            ar.visible=true
        } else {
            ar.visible=false
        }
    }

    res.update();

    dr.addEventListener("click",()=>{trans(0,0,1,w,piece);res.update()});
    ga.addEventListener("click",()=>{trans(0,0,-1,w,piece);res.update()});
    av.addEventListener("click",()=>{trans(1,0,0,w,piece);res.update()});
    ar.addEventListener("click",()=>{trans(-1,0,0,w,piece);res.update()});


    
    


    return(res);
}

function trans(dx,dz,dy,w,piece){
    let X=piece.x+dy*20-10*dx;
    let Y=piece.y-dz*20+10*dx;

    let r=[];
     for(let x=0;x<6;x++){
         let t=[]
         for(let z=0;z<6;z++){
         t.push([0,0,0,0,0,0]);
         }
         r.push(t)
     }   

   
    for(let x=0;x<6;x++){       
     for(let z=5;z>=0;z--){
         for(let y=0;y<6;y++){              
             if(w[x][z][y]!=0){               
                if(x+dx>=0 && x+dx<=5 && y+dy>=0 && y+dy<=5)
                {  r[x+dx][z+dz][y+dy]=w[x][z][y];                    
                } else {return false}
            }
             }
          }
     }
     
     for(let x=0;x<6;x++){       
         for(let z=5;z>=0;z--){
             for(let y=0;y<6;y++){ 
                 w[x][z][y]=r[x][z][y]
             }
         }
     }

    
    createjs.Tween.get(piece).to({x:X,y:Y},100)
 }

function relever(world,n){

    let t=0;
    for(let x=0;x<6;x++){        
        for(let y=0;y<6;y++){
            t=t+world[x][0][y];
        }
    }
    
    if(t==0){       

       let r=[];
        for(let x=0;x<6;x++){
            let t=[]
            for(let z=0;z<6;z++){
            t.push([0,0,0,0,0,0]);
            }
            r.push(t)
        }   

       for(let x=0;x<6;x++){       
        for(let z=5;z>=0;z--){
            for(let y=0;y<6;y++){  
                if(z-1>=0 && z-1<=5 && world[x][z][y]!=0)
                 {  r[x][z-1][y]=world[x][z][y];                    
                 }
                }
             }
        }

        for(let x=0;x<6;x++){       
            for(let z=5;z>=0;z--){
                for(let y=0;y<6;y++){ 
                    world[x][z][y]=r[x][z][y]
                }
            }
        }
        return(relever(world,n+1));
    } else {        
        return(n)
    }

}

function vue_3d_free(world,vue_3d){
    for(let x=0;x<6;x++){       
        for(let z=5;z>=0;z--){
            for(let y=0;y<6;y++){
                if(world.data[x][z][y]!=0 && vue_3d.data[x][z][y]!=0){
                    return(false)
                }
            }
        }
    }
    for(let x=0;x<6;x++){       
        for(let z=5;z>=0;z--){
            for(let y=0;y<6;y++){                
                if(world.data[x][z][y]!=0 ){
                    vue_3d.data[x][z][y]=world.data[x][z][y]                    
                }
            }
        }
    }
   
    descendre(vue_3d.data,world.id)
    
    return(true)
}

function descendre(data,id){ 
    //console.log("----------------- "+id)
    present=false;
    for(let x=0;x<6;x++){       
        for(let z=5;z>=0;z--){
            for(let y=0;y<6;y++){ 
                if(data[x][z][y]==id){
                    present=true;break;
                }
            }
        }
    }

    if(present==false){
        return false
    }

    
    
    let libre=true;   
    for(let x=0;x<6;x++){       
        for(let z=5;z>=0;z--){
            for(let y=0;y<6;y++){ 
                if(data[x][z][y]==id){
                    if(z==5){libre=false;break}
                    else{ if(data[x][z+1][y]!=0 && data[x][z+1][y]!=id){libre=false;break;}
                }
            }
                    
            }
        }
    } 

    
    let r=[];
    for(let x=0;x<6;x++){
        let t=[]
        for(let z=0;z<6;z++){
        t.push([0,0,0,0,0,0]);
        }
        r.push(t)
    }   
    if(libre==true){
        for(let x=0;x<6;x++){       
         for(let z=5;z>0;z--){
            for(let y=0;y<6;y++){  
                    if(data[x][z-1][y]==id)
                    {  r[x][z][y]=data[x][z-1][y];                    
                    }
                }
            }
        }
    }

    if(libre==true){
        for(let x=0;x<6;x++){       
            for(let z=5;z>=0;z--){
               for(let y=0;y<6;y++){  
                       if(data[x][z][y]==id)
                       { data[x][z][y]=0;                   
                       }
                   }
               }
           }
        for(let x=0;x<6;x++){       
            for(let z=5;z>=0;z--){
               for(let y=0;y<6;y++){  
                       if(r[x][z][y]==id)
                       { data[x][z][y]=r[x][z][y];                   
                       }
                   }
               }
           }
    }
    //show_tab(vue_3d.data)
    if(libre==true){
        descendre(data,id);
        return(true)
    } else {return false}

        
}

function Vue(option){
    let res= new createjs.Container();
    let s=new createjs.Shape();
    res.c=new createjs.Container();
    s.graphics.beginFill("#CCCCCC")
            .setStrokeStyle(2)
            .beginStroke("#000000")
            .drawRect(0,-120,120,120)
            .endFill()    
       
    for(let i=0;i<6;i++){
        s.graphics.setStrokeStyle(1)
            .beginStroke("#999999")
            .moveTo(20+20*i,0)
            .lineTo(20+20*i,-120)
            .moveTo(0,-20-20*i)
            .lineTo(120,-20-20*i)
                     
    }

    let t=new createjs.Text("vue", "24px Bangers", "#000000");  
    t.textBaseline = "top";    

    let or=new createjs.Shape();
    or.graphics.beginFill("#0000FF").drawCircle(0,0,5)
    
    switch(option){
        case "face":
        t.text="Vue de face";
        or.x=0;or.y=0;
        break;
        case "gauche":
        t.text="Vue de gauche";
        or.x=0;or.y=0;
        break;
        case "droite":
        t.text="Vue de droite";
        or.x=120;or.y=0;
        break;
        case "dessus":
        t.text="Vue de dessus";
        or.x=0;or.y=-120;
        break;
        case "dessous":
        t.text="Vue de dessous";
        or.x=0;or.y=-120;
        break;
        case "arriere":
        t.text="Vue de l'arrière";
        or.x=120;or.y=0;
        break;

    }

    t.y=-145
    res.addChild(s,or,t,res.c);
    return(res);

}

function Photo(v,option,vue_3d){
    let img=[];
    for(let i=0;i<6;i++){
        img.push([0,0,0,0,0,0]);
    }
    switch(option){
        case "face":    
        for(x=5;x>=0;x--){
            for(let z=0;z<6;z++){
                for(let y=0;y<6;y++){               
                    if(img[z][y]==0 && vue_3d.data[x][z][y]!=0){                    
                        img[z][y]=vue_3d.data[x][z][y]
                    }
                
                }
            }
        }
        break;

        case "arriere":    
        for(x=0;x<6;x++){
            for(let z=0;z<6;z++){
                for(let y=0;y<6;y++){               
                    if(img[z][y]==0 && vue_3d.data[x][z][5-y]!=0){                    
                        img[z][y]=vue_3d.data[x][z][5-y]
                    }
                
                }
            }
        }
        break;

        case "gauche":    
        for(y=0;y<6;y++){
            for(let z=0;z<6;z++){
                for(let x=0;x<6;x++){               
                    if(img[z][x]==0 && vue_3d.data[x][z][y]!=0){                    
                        img[z][x]=vue_3d.data[x][z][y]
                    }
                
                }
            }
        }
        break;

        case "droite":       
        for(y=5;y>=0;y--){
            for(let z=0;z<6;z++){
                for(let x=0;x<6;x++){               
                    if(img[z][x]==0 && vue_3d.data[5-x][z][y]!=0){                                         
                        img[z][x]=vue_3d.data[5-x][z][y]
                    }
                
                }
            }
        }      
        break;

        case "dessus":    
        for(z=0;z<6;z++){
            for(let x=0;x<6;x++){
                for(let y=0;y<6;y++){               
                    if(img[x][y]==0 && vue_3d.data[x][z][y]!=0){                    
                        img[x][y]=vue_3d.data[x][z][y]
                    }
                
                }
            }
        }
        break;

        case "dessous":    
        for(z=5;z>=0;z--){
            for(let x=0;x<6;x++){
                for(let y=0;y<6;y++){               
                    if(img[x][y]==0 && vue_3d.data[x][z][y]!=0){                    
                        img[x][y]=vue_3d.data[x][z][y]
                    }
                
                }
            }
        }
        break;


    }

   if(v==null){
    return(img)
   }

    while(v.c.getNumChildren()>0){
        v.c.removeChildAt(0)
    }

    for(let i=0;i<6;i++){
        for(let j=0;j<6;j++){
            if(img[i][j]!=0){
            let c=liste[img[i][j]-1].couleur[0];
            let carre=new createjs.Shape();
            carre.graphics.beginFill(c)
                            .setStrokeStyle(1)
                            .beginStroke("#000000")
                            .drawRect(0,-20,20,20)
            carre.x=j*20
            carre.y=-(5-i)*20
            v.c.addChild(carre)
            }

        } 
    }

   


}

function Egal(t1,t2){
   
    for(let x=0;x<6;x++){
        for(let z=0;z<6;z++){
             
                if(t1[x][z]!=t2[x][z]){
                    return false
                }
            
        }
    }

    return true

}

function piece_aleatoire1(){
    let r=[[2,5,2]];
    for(let i=0;i<5;i++){
        let last=r[r.length-1];
        let next=[last[0],last[1],last[2]];
        switch(Math.floor(Math.random()*4)){
            case 0: next[1]=next[1]+1;break;
            case 1: next[1]=next[1]-1;break;
            case 2: next[2]=next[2]+1;break;
            case 3: next[2]=next[2]-1;break;
        }
        if(next[1]>=0 && next[1]<=5 && next[2]>=0 && next[2]<=5){
            r.push(next)
        } else {i--}
    }

    return(r)
}

function piece_aleatoire2(){
    let r=[[2,5,2]];
    for(let i=0;i<5;i++){
        let last=r[r.length-1];
        let next=[last[0],last[1],last[2]];
        switch(Math.floor(Math.random()*6)){
            case 0: next[1]=next[1]+1;break;
            case 1: next[1]=next[1]-1;break;
            case 2: next[2]=next[2]+1;break;
            case 3: next[2]=next[2]-1;break;
            case 4: next[0]=next[0]+1;break;
            case 5: next[0]=next[0]-1;break;
        }
        if(next[1]>=0 && next[1]<=5 && next[2]>=0 && next[2]<=5 && next[0]>=0 && next[0]<=5){
            r.push(next)
        } else {i--}
    }

    return(r)
}







/********************
*   C'est fini
*********************/
creerPageQuestion();
return exo;
};

