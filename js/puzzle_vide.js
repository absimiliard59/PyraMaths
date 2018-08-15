puzzle_vide = function(){

let exo=new createjs.Container()
exo.bloque=true;
exo.indice=0;
    
var util = utilitaire();//raccourci
    
// Déclarer ici les variables globales à l'exercice.
// ex : var repEleve, soluce, champReponse, arNombre=[1,2,3];
let scene; //un Container global qui contiendra le plateau de jeu
let freeze; //variable indiquant si les boutons sont actifs ou non
let valider,quitter //les boutons
let u,b1,b2,b3,b4,b5


    
// Définir les options par défaut de l'exercice
// (définir au moins totalQuestion, totalEssai, et tempsExo )
exo.options = {
       		
    };
   

// Création des données de l'exercice (peut rester vide),
// exécutée a chaque fois que l'on commence ou recommence l'exercice
creerDonnees = function() {
 

};

exo.debloque=function(){    
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

     // Pour tester hors du labyrinthe
     exo.addEventListener("valider",exo.evaluer);
     valider.visible=true;

    exo.valider=valider;
    exo.quitter=quitter; 
    
  
    
  
}

// Evaluation : doit toujours retourner "juste" "faux" ou "rien"
exo.evaluer = function() {	
    return("juste")
     
     //return("faux");
     
 
     
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



/********************
*   C'est fini
*********************/
creerPageQuestion();
return exo;
};

