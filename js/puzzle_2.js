puzzle_2 = function(){

let exo=new createjs.Container()
exo.bloque=true;
exo.indice=1;  // 
    
var util = utilitaire();//raccourci
    
// Déclarer ici les variables globales à l'exercice.
// ex : var repEleve, soluce, champReponse, arNombre=[1,2,3];
let scene; //un Container global qui contiendra le plateau de jeu
let freeze; //variable indiquant si les boutons sont actifs ou non
let valider,quitter //les boutons

var nbr_contact;  //nombre de contacts maximal autorisé entre deux carrés: 2,3 ou 4
var valeur; //valeurs des carrés.
var facteurs; //tableau représentant la répartition des valeurs
var produits; //tableau contenant les produits des carrés adjacents
var pourcentage_facteurs; // pourcentage des facteurs à trouver
var pourcentage_produits; // pourcentage des produits à trouver
var liste_facteurs; //liste des containers facteurs
var liste_produits; //liste des containers produits
var liste_empreinte_facteurs; //liste des empreintes carrées
var liste_empreinte_produits; //liste des empreintes rondes
var scene_f,scene_p;//Containers contenant les facteurs et les produits
var nbr_carre_max;// nombre maximum de carré
var piece_cache;


    
// Définir les options par défaut de l'exercice
// (définir au moins totalQuestion, totalEssai, et tempsExo )
exo.options = {

    totalQuestion:5,
    totalEssai:1,
    tempsExo:120,
    nbr_contact:"4",
    nbr_carre_max:9,
    valeur:"2;3;4;5;6;7;8;9",
    pourcentage_facteurs:80,
    pourcentage_produits:70,

    };
   

// Création des données de l'exercice (peut rester vide),
// exécutée a chaque fois que l'on commence ou recommence l'exercice
creerDonnees = function() {
    exo.options.nbr_contact=new String(exo.options.nbr_contact)
    exo.options.valeur=new String(exo.options.valeur)
    nbr_contact=exo.options.nbr_contact.split(";")
    nbr_carre_max=Math.max(3,exo.options.nbr_carre_max);
    if (nbr_contact.indexOf("2")==-1){
        nbr_carre_max=Math.max(5,nbr_carre_max);
    }
    pourcentage_facteurs=exo.options.pourcentage_facteurs/100
    pourcentage_produits =exo.options.pourcentage_produits/100

};

exo.debloque=function(){ 
    createjs.Tween.get(piece_cache).to({y:piece_cache.oy},500)   
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
    valider.x=630
    valider.y=340

    quitter=bouton("Quitter",exo,"quitter")
    quitter.x=430
    quitter.y=340
    
    valider.visible=false;
    exo.addChild(valider,quitter)

    exo.valider=valider;
    exo.quitter=quitter;   

    valeur=exo.options.valeur.split(";")
     if (valeur.length==0){valeur=[1];}
     liste_facteurs=[];
     liste_empreinte_facteurs=[];
     liste_produits=[];
     liste_empreinte_produits=[];
     valeur=util.shuffleArray(valeur);
     facteurs=set_facteurs()    
     produits=set_produits(facteurs);     
     let c=compter_v(facteurs)    
     let facteurs_caches=Math.ceil(c[1]*pourcentage_facteurs)
     c=compter_v(produits)      
     let produits_caches=Math.ceil(c[1]*pourcentage_produits)    
    const s= creer_scene(facteurs_caches,produits_caches)
     scene.addChild(s)

    // exo.debloque()
        
  
}

exo.evaluer = function() {	
  
    let resultat="juste"
    let j=0;
    for(var i=0;i<3;i++){  
    if(facteurs[i][0]!='v' && facteurs[i][1]!='v'){
    if(facteurs[i][0].valeur*facteurs[i][1].valeur!=produits[j][0].valeur){resultat="faux";}
    }
    if(facteurs[i][1]!='v' && facteurs[i][2]!='v'){
    if(facteurs[i][1].valeur*facteurs[i][2].valeur!=produits[j][1].valeur){resultat="faux"}
    }
    j=j+2;
    }
    j=1
    for(var i=0;i<2;i++){
    if(facteurs[i][0]!='v' && facteurs[i+1][0]!='v'){
    if(facteurs[i][0].valeur*facteurs[i+1][0].valeur!=produits[j][0].valeur){resultat="faux"}
    }
    if(facteurs[i][1]!='v' && facteurs[i+1][1]!='v'){
    if(facteurs[i][1].valeur*facteurs[i+1][1].valeur!=produits[j][1].valeur){resultat="faux"}
    }
    if(facteurs[i][2]!='v' && facteurs[i+1][2]!='v'){   
    if(facteurs[i][2].valeur*facteurs[i+1][2].valeur!=produits[j][2].valeur){resultat="faux"}
    }
    j=j+2;
    }    
	
          return(resultat);
        
	
	    
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

function set_facteurs(){
    let c2,c3,c4;
    c2=[];
    c3=[];
    c4=[];
    const l=valeur.length
    if(nbr_contact.indexOf("2")>-1){
        c2.push([['v','v','v'],[valeur[0%l],valeur[1%l],valeur[2%l]],['v','v','v']]);
        c2.push([['v','v','v'],['v',valeur[1%l],valeur[2%l]],['v','v',valeur[0%l]]]);
        c2.push([['v','v','v'],['v',valeur[1%l],valeur[2%l]],['v',valeur[3%l],valeur[0%l]]]);
        c2.push([['v','v','v'],[valeur[0%l],valeur[1%l],valeur[2%l]],['v','v',valeur[3%l]]]);
        c2.push([[valeur[0%l],valeur[1%l],valeur[2%l]],[valeur[3%l],'v','v'],[valeur[4%l],'v','v']]);
        c2.push([[valeur[0%l],valeur[1%l],valeur[2%l]],[valeur[3%l],'v',valeur[4%l]],['v','v','v']]);
        c2.push([[valeur[0%l],valeur[1%l],valeur[2%l]],[valeur[3%l],'v',valeur[5%l]],[valeur[4%l],'v','v']]);
        c2.push([[valeur[0],valeur[1%l],valeur[2%l]],[valeur[3%l],'v',valeur[5%l]],[valeur[4%l],'v',valeur[6%l]]]);
        c2.push([[valeur[0],valeur[1%l],valeur[2%l]],[valeur[3%l],'v',valeur[5%l]],[valeur[4%l],valeur[7%l],valeur[6%l]]]);
    }
     if(nbr_contact.indexOf("3")>-1){
          c3.push([[valeur[0],valeur[1%l],valeur[2%l]],['v',valeur[4%l],'v'],['v','v','v']]); 
         c3.push([['v','v','v'],[valeur[4%l],valeur[1%l],valeur[2%l]],['v',valeur[3%l],valeur[0%l]]]);
         c3.push([['v','v',valeur[3%l]],[valeur[0%l],valeur[1%l],valeur[2%l]],['v','v',valeur[4%l]]]); 
         c3.push([['v',valeur[5%l],valeur[3%l]],[valeur[0%l],valeur[1%l],valeur[2%l]],['v','v',valeur[4%l]]]); 
         c3.push([[valeur[5%l],valeur[6%l],valeur[3%l]],[valeur[0%l],valeur[1%l],valeur[2%l]],['v','v',valeur[4%l]]]); 
          c3.push([[valeur[5%l],valeur[6%l],valeur[3%l]],[valeur[0%l],valeur[1%l],valeur[2%l]],[valeur[7%l],'v',valeur[4%l]]]); 
     }
        if(nbr_contact.indexOf("4")>-1){
          c4.push([['v',valeur[0%l],'v'],[valeur[1%l],valeur[2%l],valeur[3%l]],['v',valeur[4%l],'v']]);
          c4.push([[valeur[5%l],valeur[0%l],'v'],[valeur[1%l],valeur[2%l],valeur[3%l]],['v',valeur[4%l],'v']]);
          c4.push([[valeur[5%l],valeur[0%l],valeur[6%l]],[valeur[1%l],valeur[2%l],valeur[3%l]],['v',valeur[4%l],'v']]);         
          c4.push([[valeur[5%l],valeur[0%l],'v'],[valeur[1%l],valeur[2%l],valeur[3%l]],['v',valeur[4%l],valeur[6%l]]]);
          c4.push([[valeur[5%l],valeur[0%l],valeur[6%l]],[valeur[1%l],valeur[2%l],valeur[3%l]],['v',valeur[4%l],valeur[7%l]]]);
          c4.push([[valeur[5%l],valeur[0%l],valeur[6%l]],[valeur[1%l],valeur[2%l],valeur[3%l]],[valeur[8%l],valeur[4%l],valeur[7%l]]]);
                 
     }
    
    let r=[];
    for(let i=0;i<c2.length;i++){
        if(compter_v(c2[i])[1]<=nbr_carre_max){
            r.push(c2[i])
        }
    }
    for(let i=0;i<c3.length;i++){
        if(compter_v(c3[i])[1]<=nbr_carre_max){
            r.push(c3[i])
        }
    }
    for(let i=0;i<c4.length;i++){
        if(compter_v(c4[i])[1]<=nbr_carre_max){
            r.push(c4[i])
        }
    }
    
    r=util.shuffleArray(r);
    for(let i=0;i<Math.floor(10*Math.random());i++){
    rotation(r[0]);}
    return(r[0])
    
    
}
    
function set_produits(f){
    let c;
    c=[['v','v'],['v','v','v'],['v','v'],['v','v','v'],['v','v']];
    let j=0;
    for(var i=0;i<3;i++){
    if(f[i][0]!='v' && f[i][1]!='v'){c[j][0]=f[i][0]*f[i][1]}
    if(f[i][1]!='v' && f[i][2]!='v'){c[j][1]=f[i][2]*f[i][1]}
    j=j+2;
    }
    j=1
    for(var i=0;i<2;i++){
    if(f[i][0]!='v' && f[i+1][0]!='v'){c[j][0]=f[i][0]*f[i+1][0]}
    if(f[i][1]!='v' && f[i+1][1]!='v'){c[j][1]=f[i][1]*f[i+1][1]}
    if(f[i][2]!='v' && f[i+1][2]!='v'){c[j][2]=f[i][2]*f[i+1][2]}
    j=j+2;
    }
    
    return(c)   
    
}
    
function carre(n){    
    const res=new createjs.Container();
    const fond=new createjs.Container();
    this.shape = new createjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("ACYlDQAVgPAWgJIAbgiQAEgJAAgJQAAgpg/geQg/gdhZAAQgBAAgBAAQgFAAgEABQgDgBgFAAQgBAAgBAAQhZAAg/AdQg/AeAAApQAAAJAEAJIAbAiQAWAJAVAPQBYA8A/CbQBAibBYg8gAGMlLQgVgKgagIQg6gUhFgMQgGATgVAPQgNAKgTAJQgGACgFADAAAhsQACAEACAFIACD5IADEaQAAAAAAAAQBXgbBMgeQBZgkBJgnQAVgMATgLQCRhXgMhSQgIg7hOi7QBLgoAAgzQAAgmgrggQgWgRgjgPAHFkrQBKiAiDhIQAmBngmBBAlNEsQgVgMgTgLQiRhXAMhSQAIg7BOi7QhLgoAAgzQAAgmArggQhKiACDhIQgmBnAmBBQAVgKAagIQA6gUBFgMAiXlDQgFgDgGgCQgTgJgNgKQgVgPgGgTAnEkrQAWgRAjgPAgIGwQAAAAAAAAQhXgbhMgeQjWgOg8CLQgwimCggiAAJGwIAAAFQgFgBgEgBQgDABgFABIAAgFQAFABADACQAEgCAFgBgAirF3QhZgkhJgnACsF3QDWgOA8CLQAwimiggiAAAhsQgBAEgCAFIgFITAgBCWIAHAA");

	this.shape_1 = new createjs.Shape();
	this.shape_1.graphics.f("#66FFFF").s().p("Aj2B9IgDj5IgEgJQBAibBYg8IALgFQATgJAOgKQAUgPAHgTQBCAMA7AUQAZAIAVAKQAjAPAXARQAqAgAAAmQAAAzhLAoQBPC6AIA7QALBSiQBXIgoAXQhJAohYAkQhLAdhXAbIgBABg");
	this.shape_1.setTransform(25.4,2.5);

	this.shape_2 = new createjs.Shape();
	this.shape_2.graphics.f("#66FF99").s().p("AD0GWQhXgbhLgdQhYgkhJgoIgogXQiQhXALhSQAIg7BPi6QhLgoAAgzQAAgmAqggQAXgRAjgPQAVgKAZgIQA7gUBCgMQAHATAUAPQAOAKATAJIALAFQBXA8BBCbIgEAJIgFITIgBgBg");
	this.shape_2.setTransform(-25.3,2.5);

	this.shape_3 = new createjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("ACrF3QBagkBJgoQCfAigvCnQg9iMjWAPgAlNErQBJAoBaAkQjWgPg9CMQgvinCfgigAgIGwIAGoSIACgKIADAKIADD4IACEaIgIACIgIgCgAAGCWIgGAAgAiXlDQgVgPgWgJIgbghQgDgKAAgIQgBgqBAgdQA/gdBZgBIABAAIAIABIAIgBIACAAQBZABA/AdQBAAdgBAqQAAAIgDAKIgbAhQgWAJgVAPQhZA8g/CbQg/ibhYg8gAGLlLQAnhBgnhnQCEBJhKCAQgWgSgkgPgAmLnzQgmBnAmBBQgjAPgWASQhKiACDhJg");

	fond.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape);
    res.texte=new createjs.Text(n,"bold 40px Calibri","#000000")
    res.texte.outline=2
    res.texte.textBaseline = "alphabetic";
    res.texte.textAlign="center";   
    res.texte.y=10

    res.texte2=new createjs.Text(n,"bold 40px Calibri","#FFCC00")    
    res.texte2.textBaseline = "alphabetic";
    res.texte2.textAlign="center";   
    res.texte2.y=10
    res.addChild(fond,res.texte2,res.texte);
    res.place=true; // indique si le carré est déjà placé dans le jeu, ou s'il doit l'être par l'élève
    res.valeur=parseInt(n);   
    res.mouseChildren=false;
    return(res)
}

function empreinte_f(){
    const res=new createjs.Container();
    const fond=new createjs.Bitmap(images["empreinte_f"]);
    fond.x=fond.y=-47
    res.addChild(fond)
    res.mouseChildren=false;    
    return(res);
}
    
function empreinte_p(){
    const res=new createjs.Container();
    const fond=new createjs.Bitmap(images["empreinte_p"]);
    fond.x=fond.y=-29
    res.addChild(fond)
    return(res);
}
    
function disque(n){  
    const res=new createjs.Container();
    const fond=new createjs.Container();
    this.shape = new createjs.Shape();
	this.shape.graphics.f("#FFCC00").s().p("AhGBGQgcgdAAgpQAAgoAcgeQAegcAoAAQApAAAdAcQAeAegBAoQABApgeAdQgdAegpgBQgoABgegeg");

	this.shape_1 = new createjs.Shape();
	this.shape_1.graphics.rf(["#FFFF00","#FFCC00"],[0,1],0,0,0,0,0,31.2).s().p("AjTDUQhYhYABh8QgBh7BYhYQBYhYB7ABQB8gBBYBYQBXBYAAB7QAAB8hXBYQhYBXh8AAQh7AAhYhXgAhGhGQgcAeAAAoQAAApAcAdQAeAeAogBQApABAdgeQAegdgBgpQABgogegeQgdgcgpAAQgoAAgeAcg");

	fond.addChild(this.shape_1,this.shape);
    res.texte=new createjs.Text(n,"bold 20px Calibri","#000000")
    res.texte.textBaseline = "alphabetic";
    res.texte.textAlign="center";   
    res.texte.y=5
    res.place=true; // indique si le disque est déjà placé dans le jeu, ou s'il doit l'être par l'élève
    res.valeur=parseInt(n);
    res.mouseChildren=false;    
    res.addChild(fond,res.texte);
    return(res)
}
    
function creer_scene(f,p){
    const scene=new createjs.Container();
    scene_f=new createjs.Container();
    scene_p=new createjs.Container();
    scene.addChild(scene_f,scene_p)
    scene.x=200
    scene.y=200 
    
    for(let i=0;i<facteurs.length;i++){
        for(let j=0;j<facteurs[i].length;j++){
           if(facteurs[j][i]!='v'){
               let c=new carre(facteurs[j][i]);
               c.x=-130+130*i
               c.y=-130+130*j
               c.sx=c.x;
               c.sy=c.y;
               scene_f.addChild(c)
               liste_facteurs.push(c)
               facteurs[j][i]=c;
               c.position=[j,i];
               
           }
        }       
   }
    
    let x_carre,y_carre
    x_carre=250
    y_carre=-120
    
    let x_disque,y_disque
    x_disque=250
    y_disque=40
    
    while(f>0){
        let i=Math.floor(Math.random()*liste_facteurs.length)        
        if(liste_facteurs[i].place==true ){
            liste_facteurs[i].place=false;            
            let e=new empreinte_f();
            e.x=liste_facteurs[i].x;
            e.y=liste_facteurs[i].y;
            liste_facteurs[i].cursor="pointer";
            let pos=liste_facteurs[i].position;
            facteurs[pos[0]][pos[1]]="?"
            e.position=pos;
            scene_f.addChild(e)
            liste_empreinte_facteurs.push(e);
            scene.addChild(liste_facteurs[i])
            liste_facteurs[i].scaleX=liste_facteurs[i].scaleY=0.5;
            liste_facteurs[i].x=x_carre
            liste_facteurs[i].y=y_carre
            liste_facteurs[i].ox= liste_facteurs[i].x
            liste_facteurs[i].oy= liste_facteurs[i].y
            liste_facteurs[i].position=[];
            x_carre+=60
            if(x_carre>540){
                x_carre=250
                y_carre=-60
            }
            f--;
            liste_facteurs[i].on("mousedown", function(evt) {
                                    if(exo.bloque){return false}
                                    scene.addChild(evt.target);
                                    evt.target.scaleX=evt.target.scaleY=1
                                    if(evt.target.position.length>0){
                                        facteurs[evt.target.position[0]][evt.target.position[1]]="?"
                                        evt.target.position=[];
                                    }
                                    
                                });
            liste_facteurs[i].on("pressmove", function(evt) {    
                                    if(exo.bloque){return false}                               
                                    evt.target.x = evt.stageX/Main_Scale-200;
                                    evt.target.y = evt.stageY/Main_Scale-200;
                                });
            liste_facteurs[i].on("pressup", function(evt) {
                                     if(exo.bloque){return false}
                                    let em=leplusproche(evt.target,liste_empreinte_facteurs);
                                    if(em==-1){
                                        createjs.Tween.get(evt.target).to({x:evt.target.ox,y:evt.target.oy,scaleX:0.5,scaleY:0.5},300);
                                    } else {
                                        let pos=em.position                                       
                                        if(facteurs[pos[0]][pos[1]]!="?"){
                                         createjs.Tween.get(evt.target).to({x:evt.target.ox,y:evt.target.oy,scaleX:0.5,scaleY:0.5},300);
                                        }                 
                                        else   {
                                        scene_f.addChild(evt.target);                                   
                                        evt.target.x = em.x;
                                        evt.target.y = em.y;
                                        evt.target.position=pos;
                                        facteurs[pos[0]][pos[1]]=evt.target;                                        
                                        }
                                    }
                                });
            }
    }
    let i=Math.floor(Math.random()*liste_facteurs.length)
    while(liste_facteurs[i].place==true){
        i=Math.floor(Math.random()*liste_facteurs.length)
    }
    liste_facteurs[i].y=-400
    piece_cache=liste_facteurs[i];
    
   for(let i=0;i<produits.length;i++){
        for(let j=0;j<produits[i].length;j++){
           if(produits[i][j]!='v'){
               let c=new disque(produits[i][j]);
               if(i%2==0){
               c.x=-65+130*j          
               } else {
               c.x=-130+130*j    
               }
               c.y=-130+65*i
                c.sx=c.x;
               c.sy=c.y;
               scene_p.addChild(c)
               liste_produits.push(c)
               produits[i][j]=c;
               c.position=[i,j];
           }
        }       
   }
    
    
    while(p>0){
        let i=Math.floor(Math.random()*liste_produits.length)        
        if(liste_produits[i].place==true ){
            liste_produits[i].place=false;            
            let e=new empreinte_p();
            e.x=liste_produits[i].x;
            e.y=liste_produits[i].y;
             liste_produits[i].cursor="pointer";
            let pos=liste_produits[i].position;
            produits[pos[0]][pos[1]]="?"
            e.position=pos;
            scene_p.addChild(e)
            liste_empreinte_produits.push(e);
            scene.addChild(liste_produits[i]);      
            liste_produits[i].scaleX= liste_produits[i].scaleY=0.8;
            liste_produits[i].x=x_disque;
            liste_produits[i].y=y_disque;
            liste_produits[i].ox= liste_produits[i].x;
            liste_produits[i].oy= liste_produits[i].y;
            liste_produits[i].position=[];
            x_disque+=60;
            if(x_disque>540){
                x_disque=250;
                y_disque+=60;
            }
            p--;
            liste_produits[i].on("mousedown", function(evt) {
                                    if(exo.bloque){return false}
                                    scene.addChild(evt.target);
                                    evt.target.scaleX=evt.target.scaleY=1;
                                    if(evt.target.position.length>0){
                                        produits[evt.target.position[0]][evt.target.position[1]]="?";
                                        evt.target.position=[];
                                    }
                                    
                                });
            liste_produits[i].on("pressmove", function(evt) { 
                                     if(exo.bloque){return false}                                  
                                    evt.target.x = evt.stageX/Main_Scale-200;
                                    evt.target.y = evt.stageY/Main_Scale-200;
                                });
            liste_produits[i].on("pressup", function(evt) {
                                  if(exo.bloque){return false}
                                    let em=leplusproche(evt.target,liste_empreinte_produits);
                                    if(em==-1){
                                        createjs.Tween.get(evt.target).to({x:evt.target.ox,y:evt.target.oy,scaleX:0.8,scaleY:0.8},300);
                                    } else {
                                        let pos=em.position                                        
                                        if(produits[pos[0]][pos[1]]!="?"){
                                         createjs.Tween.get(evt.target).to({x:evt.target.ox,y:evt.target.oy,scaleX:0.8,scaleY:0.8},300);
                                        }                 
                                        else   {
                                        scene_p.addChild(evt.target);                                   
                                        evt.target.x = em.x;
                                        evt.target.y = em.y;
                                        evt.target.position=pos;
                                        produits[pos[0]][pos[1]]=evt.target;                                        
                                        }
                                    }
                               });
            }
    }
    
    
   return(scene)
}
    
function compter_v(t){
    let plein=0;
    let vide=0;
    for(let i=0;i<t.length;i++){
        for(let j=0;j<t[i].length;j++){
            if (t[i][j]=='v'){
                vide++;
            } else {
                plein++;
            }
            }
        }
    return [vide,plein];
    
}
    
function distance(c1,c2){
    return(Math.sqrt((c1.x-c2.x)*(c1.x-c2.x)+(c1.y-c2.y)*(c1.y-c2.y)))
}
    
function leplusproche(c,liste){
    let res=-1;
    for(let i=0;i<liste.length;i++){
        if(distance(c,liste[i])<30){
            res=liste[i];
        }
        
    }
    return(res);
}
    
function rotation(a){
    let t=[];
    t.push(a[0][0],a[0][2],a[2][2],a[2][0])
     a[0][0]=t[3];
     a[0][2]=t[0];
     a[2][2]=t[1];
     a[2][0]=t[2];
    t=[];
    t.push(a[0][1],a[1][2],a[2][1],a[1][0])
     a[0][1]=t[3];
     a[1][2]=t[0];
     a[2][1]=t[1];
     a[1][0]=t[2];
    
}



/********************
*   C'est fini
*********************/
creerPageQuestion();
return exo;
};

