var CLC = (function(clc) {
//Ne pas oublier de renommer ci-dessous clc.template par clc.nom-de-votre-exercice
clc.contact = function(oOptions,path){
//
var exo = clc.exoBase(path);
var util = clc.utils;//raccourci
var disp = clc.display;//raccourci
var anim = clc.animation;//raccourci

// Déclarer ici les variables globales à l'exercice.
// ex : var repEleve, soluce, champReponse, arNombre=[1,2,3];
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

    
// Définir les options par défaut de l'exercice
// (définir au moins totalQuestion, totalEssai, et tempsExo )
exo.creerOptions = function() {
    var optionsParDefaut = {
        totalQuestion:5,
        totalEssai:1,
		tempsExo:120,
        nbr_contact:"2;3;4",
        nbr_carre_max:9,
        valeur:"2;3;4;5;6;7;8;9",
        pourcentage_facteurs:50,
        pourcentage_produits:50,
		
		
    };
    $.extend(exo.options,optionsParDefaut,oOptions);
};

// Référencer les ressources de l'exercice (textes, image, son)
// exo.oRessources peut être soit un objet soit une fonction qui renvoie un objet
exo.oRessources = { 
    txt : "contact/textes/contact_fr.json",
	illustration:"contact/images/illustration.jpg",
    empreinte_f:"contact/images/empreinte_f.png",
    empreinte_p:"contact/images/empreinte_p.png"
   		
	
};

// Création des données de l'exercice (peut rester vide),
// exécutée a chaque fois que l'on commence ou recommence l'exercice
exo.creerDonnees = function() {
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

//Création de la page titre : 3 éléments exo.blocTitre,
// exo.blocConsigneGenerale, exo.blocIllustration
exo.creerPageTitre = function() {
    exo.blocTitre.html(exo.txt.titre);
    exo.blocConsigneGenerale.html(exo.txt.consigne);
	var illustration = disp.createImageSprite(exo,"illustration");
    exo.blocIllustration.html(illustration);
};

//Création de la page question, exécutée à chaque question,
// tous les éléments de la page doivent être ajoutés à exo.blocAnimation
exo.creerPageQuestion = function() {
    // on ajoute un element canvas au bloc animation 
    // Attention ses dimensions doivent être fixées avec .attr(width:xx,height:xx)
    // et pas avec .css({width:xx,height:yy})
	var canvas = $("<canvas id='cnv'></canvas>");
    canvas.attr({width:735,height:400});
    canvas.css({position:'absolute',top:0,background:"#FFFFFF"});
    exo.blocAnimation.append(canvas);
    //on cree la scene avec createjs
    stage = new createjs.Stage("cnv");
	stage.enableMouseOver()

    /**************************************/
    exo.aStage.push(stage); // pour qu'on puise appeler Touch.disable() au déchargement de l'exercice
    createjs.Ticker.timingMode = createjs.Ticker.RAF; // pour une animation Tween plus fluide
    createjs.Ticker.addEventListener("tick", stage); // pour que la scene soit redessinée à chaque "tick"
    createjs.Ticker.addEventListener("tick", createjs.Tween); // pour que Tween fonctionne après un Ticker.reset() au déchargement de l'exercice;
    createjs.Touch.enable(stage);// pour compatibilité avec les tablettes tactiles
    /*************************************/
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
     stage.addChild(s)
     
    exo.keyboard.config({
		numeric : "disabled",
		arrow : "disabled",
		large : "disabled"
    });
    
   //createjs.Tween.get(scene).to({scaleX:0.5,scaleY:0.5},1000)
    
	 
}



// Evaluation : doit toujours retourner "juste" "faux" ou "rien"
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

// Correction (peut rester vide)
exo.corriger = function() {
    
    for(let i=0;i<liste_facteurs.length;i++){
        scene_f.addChild(liste_facteurs[i])
        createjs.Tween.get(liste_facteurs[i]).to({x:liste_facteurs[i].sx,y:liste_facteurs[i].sy,scaleX:1,scaleY:1},500)
    }
     for(let i=0;i<liste_produits.length;i++){
        scene_p.addChild(liste_produits[i])
        createjs.Tween.get(liste_produits[i]).to({x:liste_produits[i].sx,y:liste_produits[i].sy,scaleX:1,scaleY:1},500)
    }
    
};

// Création des contrôles permettant au prof de paraméter l'exo
exo.creerPageParametre = function() {
    var controle;

    controle = disp.createOptControl(exo,{
        type:"text",
        largeur:50,
        taille:2,
        nom:"totalQuestion",
        texte:exo.txt.opt1
    });
      exo.blocParametre.append(controle);
    
     controle = disp.createOptControl(exo,{
        type:"text",
        largeur:50,
        taille:3,
        nom:"tempsExo",
        texte:exo.txt.opt2
    });
      exo.blocParametre.append(controle);
    
     controle = disp.createOptControl(exo,{
        type:"text",
        largeur:50,
        taille:1,
        nom:"nbr_carre_max",
        texte:exo.txt.opt3
    });
      exo.blocParametre.append(controle);
    
     controle = disp.createOptControl(exo,{
        type:"text",
        largeur:250,
        taille:25,
        nom:"valeur",
        texte:exo.txt.opt4
    });
      exo.blocParametre.append(controle);
    
     controle = disp.createOptControl(exo,{
        type:"text",
        largeur:150,
        taille:6,
        nom:"nbr_contact",
        texte:exo.txt.opt5
    });
      exo.blocParametre.append(controle);
    
     controle = disp.createOptControl(exo,{
        type:"text",
        largeur:50,
        taille:3,
        nom:"pourcentage_facteurs",
        texte:exo.txt.opt6
    });
      exo.blocParametre.append(controle);
    
     controle = disp.createOptControl(exo,{
        type:"text",
        largeur:50,
        taille:3,
        nom:"pourcentage_produits",
        texte:exo.txt.opt7
    });
      exo.blocParametre.append(controle);
    
};
    
//////////////////////////////////////////////////////////// Bibliothéque annexe ///////////////////////////////////

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
    const fond=new createjs.Shape();
    fond.graphics.beginFill("#3399FF").drawRect(-50,-50,100,100)
    res.texte=new createjs.Text(n,"bold 40px Calibri","#FFFFFF")
    res.texte.textBaseline = "alphabetic";
    res.texte.textAlign="center";   
    res.texte.y=10
    res.addChild(fond,res.texte);
    res.place=true; // indique si le carré est déjà placé dans le jeu, ou s'il doit l'être par l'élève
    res.valeur=parseInt(n);   
    res.mouseChildren=false;
    return(res)
}

function empreinte_f(){
    const res=new createjs.Container();
    const fond=new createjs.Bitmap(exo.getURI("empreinte_f"));
    fond.x=fond.y=-47
    res.addChild(fond)
    res.mouseChildren=false;    
    return(res);
}
    
function empreinte_p(){
    const res=new createjs.Container();
    const fond=new createjs.Bitmap(exo.getURI("empreinte_p"));
    fond.x=fond.y=-29
    res.addChild(fond)
    return(res);
}
    
function disque(n){  
    const res=new createjs.Container();
    const fond=new createjs.Shape();
    fond.graphics.beginFill("#FFFF00").drawCircle(0,0,30)
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
                                    scene.addChild(evt.target);
                                    evt.target.scaleX=evt.target.scaleY=1
                                    if(evt.target.position.length>0){
                                        facteurs[evt.target.position[0]][evt.target.position[1]]="?"
                                        evt.target.position=[];
                                    }
                                    
                                });
            liste_facteurs[i].on("pressmove", function(evt) {                                   
                                    evt.target.x = evt.stageX-200;
                                    evt.target.y = evt.stageY-200;
                                });
            liste_facteurs[i].on("pressup", function(evt) {
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
                                    scene.addChild(evt.target);
                                    evt.target.scaleX=evt.target.scaleY=1;
                                    if(evt.target.position.length>0){
                                        produits[evt.target.position[0]][evt.target.position[1]]="?";
                                        evt.target.position=[];
                                    }
                                    
                                });
            liste_produits[i].on("pressmove", function(evt) {                                   
                                    evt.target.x = evt.stageX-200;
                                    evt.target.y = evt.stageY-200;
                                });
            liste_produits[i].on("pressup", function(evt) {
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
    
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/********************
*   C'est fini
*********************/
exo.init();
return exo.baseContainer;
};
return clc;
}(CLC));