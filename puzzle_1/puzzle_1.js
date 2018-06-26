puzzle_1 = function(){

let exo=new createjs.Container()
    
var util = utilitaire();//raccourci
    
// Déclarer ici les variables globales à l'exercice.
// ex : var repEleve, soluce, champReponse, arNombre=[1,2,3];
let scene; //un Container global qui contiendra le plateau de jeu
let c1,c2,c3,c4; //les carrés
let p1,p2,p3,p4; //les pièces
let rot; //le bouton de rotation
let tab_nombre; //le tableau contenant tous les nombres
let tab_cache; //le tableau contenant les positions cachées
let tab_solution; //le tableau contenant la position des pièces correspondant à la solution
let freeze; //variable indiquant si les boutons sont actifs ou non
let consigne;
let objectif; // deux champs de texte
let n1,n2,n3,n4; //les liste de nombres remplissant les carrés


    
// Définir les options par défaut de l'exercice
// (définir au moins totalQuestion, totalEssai, et tempsExo )
var options = {
        totalQuestion:5,
        totalEssai:2,
		tempsExo:600,
        operation:"addition",
        nbr_carre1:"1;10;100;1000",
        nbr_carre2:"1;10;10;100;100",
        nbr_carre3:"1;10;100;1000",
        nbr_carre4:"1;10;10;100;100",
        repartition:"ordonnee",		
    };
   

// Création des données de l'exercice (peut rester vide),
// exécutée a chaque fois que l'on commence ou recommence l'exercice
creerDonnees = function() {
 n1=String(options.nbr_carre1).split(";")
n2=String(options.nbr_carre2).split(";");
n3=String(options.nbr_carre3).split(";");
n4=String(options.nbr_carre4).split(";");
    for(let i=0;i<n2.length;i++){
        n2[i]=parseFloat(n2[i]);
    }
    for(let i=0;i<n1.length;i++){
        n1[i]=parseFloat(n1[i]);
    }
    for(let i=0;i<n3.length;i++){
        n3[i]=parseFloat(n3[i]);
    }
    for(let i=0;i<n4.length;i++){
        n4[i]=parseFloat(n4[i]);
    }

};



//Création de la page question, exécutée à chaque question,
// tous les éléments de la page doivent être ajoutés à exo.blocAnimation
creerPageQuestion = function() {  
    
    creerDonnees();
    
    tab_nombre=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],]
        
    tab_cache=[[1,1,1,1,1,0],[0,1,0,0,1,0],[0,1,0,0,1,1],[1,1,1,1,1,1],[1,0,1,0,0,1],[1,1,0,1,1,1]]
    
    tab_solution=[[1,1,1,1,1,0],[0,1,0,0,1,0],[0,1,0,0,1,1],[1,1,1,1,1,1],[1,0,1,0,0,1],[1,1,0,1,1,1]]
    
    let cr1,cr2
    if(options.repartition=="aleatoire"){
        cr1=cr2="melange"
    } else {
        cr1="croix1";
        cr2="croix2";
    }
    remplir_tab([1,1],n1,cr1);
    remplir_tab([1,4],n2,cr1) ;
    remplir_tab([4,1],n3,cr2) ;
    remplir_tab([4,4],n4,cr2) ;
    
    c1=carre_fond();
    c2=carre_fond();
    c3=carre_fond();
    c4=carre_fond();
    p1=piece_1();
    p2=piece_2();
    p3=piece_3();
    p4=piece_4();
    rot=bouton_rotation();
    rot.x=250;
    rot.y=200;
    c1.x=p1.x=150;
    c1.y=p1.y=100;
    c2.x=p2.x=350;
    c2.y=p2.y=100;
    c3.x=p3.x=150;
    c3.y=p3.y=300;
    c4.x=p4.x=350;
    c4.y=p4.y=300;
    c1.mouseChildren=false;
    c2.mouseChildren=false;
    c3.mouseChildren=false;
    c4.mouseChildren=false;
    c1.cursor="pointer";
    c2.cursor="pointer";
    c3.cursor="pointer";
    c4.cursor="pointer";
    
    p1.alpha=p2.alpha=p3.alpha=p4.alpha=0.8;
    scene=new createjs.Container()
    exo.addChild(scene)
    scene.x=-50
    scene.addChild(rot,c1,c2,c3,c4,p1,p2,p3,p4);    
    plateau();
    
    rot.scaleX=rot.scaleY=0.7;
    rot.addEventListener("click",function(){if(freeze==false){
                                            freeze=true;
                                            piece_rotation(tab_cache);
                                            createjs.Tween.get(rot).to({rotation:360},500).call(function(){rot.rotation=0});
                                            decale(p1,500);
                                            decale(p2,500);
                                            decale(p3,500);
                                            decale(p4,500);
                                            windows.setTimeout(function(){
                                                freeze=false;
                                                for(let i=0;i<6;i++){      
                                                 for(let j=0;j<6;j++){
                                                     if(tab_cache[i][j]==0 &&  tab_nombre[i][j]!=0){
                                                         tab_nombre[i][j].fond.visible=true;
                                                     }
                                                 }
                                                }
                                            },500)   }
                                           });
    c1.addEventListener("click",function(){if(freeze==false){carre_rotation(c1,tab_cache)}});
    c2.addEventListener("click",function(){if(freeze==false){carre_rotation(c2,tab_cache)}})
    c3.addEventListener("click",function(){if(freeze==false){carre_rotation(c3,tab_cache)}})
    c4.addEventListener("click",function(){if(freeze==false){carre_rotation(c4,tab_cache)}})
    
    creer_enonce();
    
    freeze=false;
    
    let t;
    
    let cons1="La somme de tous les nombres visibles doit être égale à : ";
    let cons2="Après avoir multiplié pour chaque carré les nombres visibles entre eux, la somme de ces résultats doit être égale à :";
    
    if(options.operation=="addition"){
        t=cons1
    } else {
        t=cons2
    }
    consigne=new createjs.Text(t,"bold 25px Calibri","#000000")
    consigne.lineWidth=300
    consigne.textBaseline = "alphabetic";
    consigne.x=400;
    consigne.y=70;
    exo.addChild(consigne)
    
    objectif=new createjs.Text(util.numToStr(eval_plateau(tab_nombre,tab_solution)),"bold 55px Calibri","#339900")
    objectif.textBaseline = "alphabetic";
    objectif.textAlign="center";
    objectif.x=550;
    objectif.y=270;
    exo.addChild(objectif);
    
 
    
	 
}



// Evaluation : doit toujours retourner "juste" "faux" ou "rien"
evaluer = function() {	
       
        if(eval_plateau(tab_nombre,tab_solution)==eval_plateau(tab_nombre,tab_cache)){
          return("juste");}
        return("faux");
        
	
	    
};

// Correction (peut rester vide)
corriger = function() {
     freeze=true;
    consigne.visible=false;
    let res=scene.clone(true);
    res.cache(0,0,800,500);
    exo.addChild(res);     
    const t=new createjs.Text("= "+util.numToStr(eval_plateau(tab_nombre,tab_cache)),"bold 25px Calibri","#FF0000")
    t.textBaseline = "alphabetic";
    t.x=600;
    t.y=120;
    t.visible=false;
    exo.addChild(t);
    createjs.Tween.get(res).to({x:380,y:10,scaleX:0.5,scaleY:0.5},200).call(function(){t.visible=true;})
    createjs.Tween.get(p1,{override:true}).to({x:p1.xsol,y:p1.ysol,rotation:p1.rsol},500)
    createjs.Tween.get(p2,{override:true}).to({x:p2.xsol,y:p2.ysol,rotation:p2.rsol},500)
    createjs.Tween.get(p3,{override:true}).to({x:p3.xsol,y:p3.ysol,rotation:p3.rsol},500)
    createjs.Tween.get(p4,{override:true}).to({x:p4.xsol,y:p4.ysol,rotation:p4.rsol},500).call(
        function(){
             for(let i=0;i<6;i++){      
                 for(let j=0;j<6;j++){
                     if(tab_solution[i][j]==0 &&  tab_nombre[i][j]!=0){
                         tab_nombre[i][j].fond.visible=true;
                     } else {
                          if(tab_nombre[i][j]!=0){
                             tab_nombre[i][j].fond.visible=false;
                          }
                     }
                 }
             }
        }
    )
    
};


    
////////////////////////////////////// Bibliothèque annexe ///////////////////////////////////
function carre_fond(){
    const res=new createjs.Container();
    const fond=new createjs.Shape();
    fond.graphics.f("#CCCCCC").s().p("AqjLtQhKABABhKIAA1HQgBhKBKABIVHAAQBKgBgBBKIAAVHQABBKhKgBg");
    res.addChild(fond);
    return(res)
}

function piece_1(){
    const res=new createjs.Container();
    const fond=new createjs.Shape();
    fond.graphics.f("#CC0099").s().p("AkqMgIAAxKIn1AAIAAmmQAAhPBPAAIWhAAQBPAAAABPIAAGmIn1AAIAARKg");
    res.addChild(fond);
    res.pos=1;
    return(res)
    
}

function piece_2(){
    const res=new createjs.Container();
    const fond=new createjs.Shape();
    fond.graphics.f("#CC0099").s().p("AkqMgIAAxKIn1AAIAAmmQAAhPBPAAIP7AAIAARKIH1AAIAAGmQAABPhPAAg");
    res.addChild(fond);
    res.pos=2;
    return(res)
    
}

function piece_3(){
    const res=new createjs.Container();
    const fond=new createjs.Shape();
    fond.graphics.f("#CC0099").s().p("ArQMgQhPAAAAhPIAA2hQAAhPBPAAIWhAAQBPAAAABPIAAP7In1AAIAApVIpVAAIAAJVIJVAAIAAH1g");
    res.addChild(fond);
    res.pos=3;
    return(res)
    
}
    
function piece_4(){
    const res=new createjs.Container();
    const fond=new createjs.Shape();
    fond.graphics.f("#CC0099").s().p("ArQMgQhPAAAAhPIAAmmIRKAAIAApVIxKAAIAAmmQAAhPBPAAIWhAAQBPAAAABPIAAWhQAABPhPAAg");
    res.addChild(fond);
    res.pos=4;
    return(res)
    
}
    
function nombre(n){
    const res=new createjs.Container();
    res.fond=new createjs.Shape();
    res.fond.graphics.f("#FFFF00").drawCircle(0,0,15);
    const t=new createjs.Text(util.numToStr(n),"bold 15px Calibri","#000000")
    t.textBaseline = "alphabetic";
    t.y=5
    t.textAlign="center";   
    res.addChild(res.fond,t);
    res.valeur=n;
    return(res)
}
    
function bouton_rotation(){
    const res=new createjs.Container();
    const fond=new createjs.Shape();            fond.graphics.f("#00FFFF").s().p("AkZEaQh1h0AAimQAAilB1h0QB0h1ClAAQCmAAB0B1QB1B0AAClQAACmh1B0Qh0B1imAAQilAAh0h1gAiliMQg/BAAABWQAABZA/A/QAZAZAcAQQAGACAGgBQAGgCADgGQACgFgBgGQgCgHgGgCQgYgNgWgVQg2g2AAhOQAAhKA2g2QA2g2BNAAQBLAAA2A2IAQARIghAkQgEAEAAAHQAAAFAEAFQAFAEAGAAIBLAAQAGAAAFgEQAEgFAAgGIAAhSQAAgFgDgEQgCgEgFgCQgEgBgFABQgEABgDADIgWAZIgPgRQg/g+hXgBQhZABg/A+g");
    const fleche=new createjs.Shape();    fleche.graphics.f("#FFFFFF").s().p("AhhDKQgdgPgZgZQg/g/AAhZQAAhXA/g/QA/g/BYAAQBYAABAA/IAOARIAXgZQADgDAEgBQAFgBAEABQAEACADAEQACAEABAEIAABTQgBAGgEAEQgFAFgGAAIhKAAQgHAAgEgEQgEgFgBgGQAAgGAFgEIAggkIgQgSQg1g2hNAAQhMAAg2A2Qg2A2AABLQAABNA2A2QAWAWAZANQAFACACAGQACAGgDAGQgCAFgHACIgEABQgEAAgDgCg");
    res.cursor="pointer";
    res.addChild(fond,fleche);
    return(res);
    
}
    
function remplir_tab(centre,t,opt){   
    if(String(t[0])=='NaN'){t=[0]}
    const l=Math.min(5,t.length)
    t=util.shuffleArray(t)
    let p=[];
    if(opt=="melange"){
        for(let i=0;i<l;i++){
            p=[Math.round(2*Math.random())-1,Math.round(2*Math.random())-1]        
            while(tab_nombre[centre[0]+p[0]][centre[1]+p[1]]!=0){
                 p=[Math.round(2*Math.random())-1,Math.round(2*Math.random())-1];
            }
            tab_nombre[centre[0]+p[0]][centre[1]+p[1]]=t[i];
        }
    }
    if(opt=="croix1"){
        if(t.length>0){
            p=[-1,-1];
            tab_nombre[centre[0]+p[0]][centre[1]+p[1]]=t[0];
        }
        if(t.length>1){
        p=[-1,1];
        tab_nombre[centre[0]+p[0]][centre[1]+p[1]]=t[1];
        }
        if(t.length>2){
        p=[0,0];
        tab_nombre[centre[0]+p[0]][centre[1]+p[1]]=t[2];
        }
        if(t.length>3){
        p=[1,1];
        tab_nombre[centre[0]+p[0]][centre[1]+p[1]]=t[3];
        }        
        if(t.length>4){
        p=[1,-1];
        tab_nombre[centre[0]+p[0]][centre[1]+p[1]]=t[4];
        }
        
        
    }
    
     if(opt=="croix2"){
        if(t.length>0){
            p=[-1,0];
            tab_nombre[centre[0]+p[0]][centre[1]+p[1]]=t[0];
        }
        if(t.length>1){
        p=[0,-1];
        tab_nombre[centre[0]+p[0]][centre[1]+p[1]]=t[1];
        }
        if(t.length>2){
        p=[0,0];
        tab_nombre[centre[0]+p[0]][centre[1]+p[1]]=t[2];
        }
        if(t.length>3){
        p=[0,1];
        tab_nombre[centre[0]+p[0]][centre[1]+p[1]]=t[3];
        }
        if(t.length>4){
        p=[1,0];
        tab_nombre[centre[0]+p[0]][centre[1]+p[1]]=t[4];
        }        
    }
    
    //console.log(tab_nombre)
    
}
    
function plateau(){
    for(let i=0;i<tab_nombre.length;i++){
          for(let j=0;j<tab_nombre[i].length;j++){
            if(tab_nombre[i][j]!=0){
                let n=nombre(tab_nombre[i][j]);
                if(tab_cache[i][j]==1){                    
                    n.fond.visible=false;
                }
                tab_nombre[i][j]=n;
                if(i%3==0){
                    n.y=-55
                }
                 if(i%3==1){
                    n.y=0
                }
                if(i%3==2){
                    n.y=55
                }
                 if(j%3==0){
                    n.x=-55
                }
                 if(j%3==1){
                    n.x=0
                }
                if(j%3==2){
                    n.x=55
                }
                if(i<3 && j<3){
                    c1.addChild(n)
                }
                if(i<3 && j>=3){
                    c2.addChild(n)
                }
                if(i>=3 && j<3){
                    c3.addChild(n)
                }
                if(i>=3 && j>=3){
                    c4.addChild(n)
                }
            }
            }
    }
}
 
function decale(p,t){  
    if(t>0){
        switch(p.pos){
            case 1: p.pos=2;createjs.Tween.get(p,{override:true}).to({x:350,y:100},t);break;
            case 2: p.pos=4;createjs.Tween.get(p,{override:true}).to({x:350,y:300},t);break;
            case 3: p.pos=1;createjs.Tween.get(p,{override:true}).to({x:150,y:100},t);break;
            case 4: p.pos=3;createjs.Tween.get(p,{override:true}).to({x:150,y:300},t);break;
        }
    } else {
        switch(p.pos){
            case 1: p.pos=2;p.x=350;p.y=100;break;
            case 2: p.pos=4;p.x=350;p.y=300;break;
            case 3: p.pos=1;p.x=150;p.y=100;break;
            case 4: p.pos=3;p.x=150;p.y=300;break;
        }
    }
        
}
    
function piece_rotation(tc){
   let car1=[];
   let car2=[];
   let car3=[];
   let car4=[];   
   for(let i=0;i<3;i++){
       let t=[]
       for(let j=0;j<3;j++){
           t.push(tc[i][j] )          
        }
       car1.push(t);
    }
    for(let i=0;i<3;i++){
       let t=[]
       for(let j=3;j<6;j++){
            t.push(tc[i][j])           
        }
       car2.push(t);
    }
    for(let i=3;i<6;i++){
       let t=[]
       for(let j=0;j<3;j++){
           t.push(tc[i][j])           
        }
       car3.push(t);
    }
    for(let i=3;i<6;i++){
       let t=[]
       for(let j=3;j<6;j++){
            t.push(tc[i][j] )          
        }
       car4.push(t);
    }
   
    for(let i=0;i<6;i++){       
       for(let j=0;j<6;j++){
           tc[i][j]=0;           
        }       
    }
    for(let i=0;i<6;i++){      
       for(let j=0;j<6;j++){
          if(i<3 && j<3){
          tc[i][j]=car3[i][j]; 
          }
          if(i<3 && j>=3){
          tc[i][j]=car1[i][j-3]; 
          }
          if(i>=3 && j<3){
          tc[i][j]=car4[i-3][j]; 
          }
          if(i>=3 && j>=3){
          tc[i][j]=car2[i-3][j-3]; 
          }
          if(tab_nombre[i][j]!=0){
          tab_nombre[i][j].fond.visible=false}
          
        }      
    }
   
    
}
    
function get_piece(pos){
    if(p1.pos==pos){return(p1)}
    if(p2.pos==pos){return(p2)}
    if(p3.pos==pos){return(p3)}
    if(p4.pos==pos){return(p4)}
}
    
function carre_rotation(e,tc,moove=true){   
    freeze=true;
    let p;
    let s1,s2,s3,s4;
    let d1,d2,centre;
    switch(e){
        case c1: p=get_piece(1);d1=0;d2=0;centre=[1,1];break;
         case c2: p=get_piece(2);d1=0;d2=3;centre=[1,4];break;
         case c3: p=get_piece(3);d1=3;d2=0;centre=[4,1];break;
         case c4: p=get_piece(4);d1=3;d2=3;centre=[4,4];break;
    }
    s1=[tc[0+d1][0+d2],tc[0+d1][1+d2],tc[0+d1][2+d2]];
    s2=[tc[0+d1][2+d2],tc[1+d1][2+d2],tc[2+d1][2+d2]];
    s3=[tc[2+d1][0+d2],tc[2+d1][1+d2],tc[2+d1][2+d2]];
    s4=[tc[0+d1][0+d2],tc[1+d1][0+d2],tc[2+d1][0+d2]];
    tc[centre[0]-1][centre[1]-1]=s4[2];
    tc[centre[0]-1][centre[1]]=s4[1];
    tc[centre[0]-1][centre[1]+1]=s4[0];
    tc[centre[0]+1][centre[1]+1]=s2[0];
    tc[centre[0]+1][centre[1]]=s2[1];
    tc[centre[0]+1][centre[1]-1]=s2[2];
    tc[centre[0]][centre[1]+1]=s1[1];
    tc[centre[0]][centre[1]-1]=s3[1];
    if(tab_nombre[centre[0]-1][centre[1]-1]!=0){
        tab_nombre[centre[0]-1][centre[1]-1].fond.visible=false;
    }
     if(tab_nombre[centre[0]-1][centre[1]]!=0){
        tab_nombre[centre[0]-1][centre[1]].fond.visible=false;
    }
     if(tab_nombre[centre[0]-1][centre[1]+1]!=0){
        tab_nombre[centre[0]-1][centre[1]+1].fond.visible=false;
    }
     if(tab_nombre[centre[0]][centre[1]-1]!=0){
        tab_nombre[centre[0]][centre[1]-1].fond.visible=false;
    }
     if(tab_nombre[centre[0]][centre[1]+1]!=0){
        tab_nombre[centre[0]][centre[1]+1].fond.visible=false;
    }
     if(tab_nombre[centre[0]+1][centre[1]-1]!=0){
        tab_nombre[centre[0]+1][centre[1]-1].fond.visible=false;
    }
     if(tab_nombre[centre[0]+1][centre[1]+1]!=0){
        tab_nombre[centre[0]+1][centre[1]+1].fond.visible=false;
    }
      if(tab_nombre[centre[0]+1][centre[1]]!=0){
        tab_nombre[centre[0]+1][centre[1]].fond.visible=false;
    }
    let new_rot=p.rotation+90;
    if(moove){
    createjs.Tween.get(p).to({rotation:new_rot},300).call(function()
     {  freeze=false;
        for(let i=0;i<6;i++){      
         for(let j=0;j<6;j++){
             if(tc[i][j]==0 &&  tab_nombre[i][j]!=0){
                 tab_nombre[i][j].fond.visible=true;
             }
         }
        }
    })
    } else {
        p.rotation=new_rot;
    }
    
    
}
    
function somme_carre(tn,tc,centre){
    let res=0;
     for(let i=-1;i<2;i++){      
       for(let j=-1;j<2;j++){
           if(tn[centre[0]+i][centre[1]+j]!=0 && tc[centre[0]+i][centre[1]+j]!=1){
           res=res+tn[centre[0]+i][centre[1]+j].valeur}
       }
     }
    return(res)
}
    
function produit_carre(tn,tc,centre){
    let res=0;
    let count=0;
    if(options.operation!="addition"){
        res=1;
    }
    
     for(let i=-1;i<2;i++){      
       for(let j=-1;j<2;j++){
           if(tn[centre[0]+i][centre[1]+j]!=0 && tc[centre[0]+i][centre[1]+j]!=1){
           res=res*tn[centre[0]+i][centre[1]+j].valeur} else {count++}
       }
     }    
    if(options.operation!="addition" && count==9){
        return(0);
    }
    return(res)
}
    
function eval_plateau(tn,tc){
    if(options.operation=="addition"){
    return(somme_carre(tn,tc,[1,1])+somme_carre(tn,tc,[1,4])+somme_carre(tn,tc,[4,1])+somme_carre(tn,tc,[4,4]));}
    else {
         return(produit_carre(tn,tc,[1,1])+produit_carre(tn,tc,[1,4])+produit_carre(tn,tc,[4,1])+produit_carre(tn,tc,[4,4]));
    }
}
    
function creer_enonce(){
    if(String(n1[0])=='NaN'){c1.visible=false}
     if(String(n2[0])=='NaN'){c2.visible=false}
     if(String(n3[0])=='NaN'){c3.visible=false}
     if(String(n4[0])=='NaN'){c4.visible=false}
    let tour_p1=Math.round(Math.random()*3)
    let tour_p2=Math.round(Math.random()*3)
    let tour_p3=Math.round(Math.random()*3)
    let tour_p4=Math.round(Math.random()*3)
    let tour_pivot=Math.round(Math.random()*3)
    for(let i=0;i<tour_p1;i++){
        carre_rotation(c1,tab_solution,false)
    }
    for(let i=0;i<tour_p2;i++){
        carre_rotation(c2,tab_solution,false)
    }
    for(let i=0;i<tour_p3;i++){
        carre_rotation(c3,tab_solution,false)
    }
     for(let i=0;i<tour_p4;i++){
        carre_rotation(c4,tab_solution,false)
    }
    for(let i=0;i<tour_pivot;i++){
       piece_rotation(tab_solution);
       decale(p1,0);
       decale(p2,0);
       decale(p3,0);
       decale(p4,0);
    }
    
       
    p1.xsol=p1.x;
    p1.ysol=p1.y;
    p1.rsol=p1.rotation;
    p2.xsol=p2.x;
    p2.ysol=p2.y;
    p2.rsol=p2.rotation;
    p3.xsol=p3.x;
    p3.ysol=p3.y;
    p3.rsol=p3.rotation;
    p4.xsol=p4.x;
    p4.ysol=p4.y;
    p4.rsol=p4.rotation;
    
    p1.rotation=p2.rotation=p3.rotation=p4.rotation=0;
    p1.x=150;
    p1.y=100;
    p2.x=350;
    p2.y=100;
    p3.x=150;
    p3.y=300;
    p4.x=350;
    p4.y=300;
    p1.pos=1;
    p2.pos=2;
    p3.pos=3;
    p4.pos=4;
    
     for(let i=0;i<6;i++){      
         for(let j=0;j<6;j++){
             if(tab_cache[i][j]==0 &&  tab_nombre[i][j]!=0){
                 tab_nombre[i][j].fond.visible=true;
             }
         }
        }
    
    //console.log(eval_plateau(tab_nombre,tab_solution))
    
}

/********************
*   C'est fini
*********************/
creerPageQuestion();
return exo;
};

