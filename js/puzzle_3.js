puzzle_3 = function(){

let exo=new createjs.Container()
exo.bloque=true;
exo.indice=0;
    
var util = utilitaire();//raccourci
    
// Déclarer ici les variables globales à l'exercice.
// ex : var repEleve, soluce, champReponse, arNombre=[1,2,3];
let scene; //un Container global qui contiendra le plateau de jeu
let freeze; //variable indiquant si les boutons sont actifs ou non
let valider,quitter //les boutons
let plateau=[]; 
let pas_touche=false;
let solution=[] //les 6 produits: les 3 horizontaux, puis les 3 verticaux
let papyrus_manquant //le papyrus manquant


    
// Définir les options par défaut de l'exercice
// (définir au moins totalQuestion, totalEssai, et tempsExo )
exo.options = {
       		
    };
   

// Création des données de l'exercice (peut rester vide),
// exécutée a chaque fois que l'on commence ou recommence l'exercice
creerDonnees = function() {
    let n=[1,2,3,4,5,6,7,8,9];
    util.shuffleArray(n);
    for (let i=0;i<3;i++){
        let t=[];
        for (let j=0;j<3;j++){
            if(n[0]!=1){
                t.push(n[0]);
            } else {
                t.push(0)
            }
                n.splice(0,1); 
               
        }
        plateau.push(t);
         
    }
   

};

exo.debloque=function(){    
    exo.bloque=false;
    freeze=false
    valider.visible=true;
    createjs.Tween.get(papyrus_manquant).to({y:papyrus_manquant.oy},300);
}



//Création de la page question, exécutée à chaque question,
// tous les éléments de la page doivent être ajoutés à exo.blocAnimation
creerPageQuestion = function() {  

    let fond=new createjs.Bitmap(images["pierre"]);
    exo.addChild(fond);    
    creerDonnees();  

    scene=new createjs.Container();
    exo.addChild(scene);
     

    freeze=true;    
    

    valider=bouton("Valider",exo,"valider")
    valider.x=630
    valider.y=340

    // Pour tester hors du labyrinthe
   // exo.addEventListener("valider",exo.evaluer)

    quitter=bouton("Quitter",exo,"quitter")
    quitter.x=510
    quitter.y=340
    
    valider.visible=false;
    exo.addChild(valider,quitter)

    exo.valider=valider;
    exo.quitter=quitter;    

    let f=bg();
    f.x=20;
    f.y=80;

         
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(plateau[i][j]!=0){
                plateau[i][j]=galet(plateau[i][j])            
                plateau[i][j].x=100*j;
                plateau[i][j].y=100*i;
                f.addChild(plateau[i][j]);
            }
        }
    }

    

    for(let i=0;i<2;i++){
        let v=produit(i,"colonne")
        solution.push(v)
        let r=papyh(v);
        r.x=i*100;
        r.y=-80
        f.addChildAt(r,0)
    }

    let v=produit(2,"colonne")
    solution.push(v)
    papyrus_manquant=papyh(v);
    papyrus_manquant.x=2*100;
    papyrus_manquant.oy=-80;
    papyrus_manquant.y=-300;
    f.addChildAt(papyrus_manquant,0)


    for(let i=0;i<3;i++){
        let v=produit(i,"ligne")
        solution.push(v)
        let r=papyv(v);
        r.x=300;
        r.y=100*i
        f.addChildAt(r,0)
    }

    for(let i=0;i<100;i++){
        melange();
    }

    scene.addChild(f);  
    update_listener();
  
}

// Evaluation : doit toujours retourner "juste" "faux" ou "rien"
exo.evaluer = function() {	
    res="juste";
    for(let i=0;i<3;i++){
        if(produit(i,"colonne")!=solution[i]){
            res="faux"
        }
        if(produit(i,"ligne")!=solution[i+3]){
            res="faux"
        }        
    }
   
    return(res)
   
     
 
     
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

function un(){
    let res=new createjs.Container();
    let shape = new createjs.Shape();
	shape.graphics.f().s("#FFFFFF").ss(4,1,1).p("AAAhjIAADH");
    res.addChild(shape);
    return(res)
}

function galet(n){
    let res=new createjs.Container();
    let fond=new createjs.Bitmap(images["galet"]);
    fond.scaleX=fond.scaleY=0.25
    let t=new createjs.Text(n,"20px Arial", "#000000");
    res.valeur=n;
    fond.regX=fond.regY=200;
    fond.x=fond.y=50;    
    res.addChild(fond);
    res.mouseChildren=false;
    res.survole=function(){
        createjs.Tween.get(fond).to({scaleX:0.23,scaleY:0.23},150);
    }
    res.desurvole=function(){
        createjs.Tween.get(fond).to({scaleX:0.25,scaleY:0.25},150);
    }

    let nombre=new createjs.Container();
    let u;
    for (let i=0;i<n;i++){
        u=un();
        u.x=i%5*8;
        u.y=25*Math.floor(i/5);        
        nombre.addChild(u);
    }
    if(n<=5){
    nombre.regX=(n-1)%5*8/2
    } else {
        nombre.regX=4*8/2
    }
    if(n<=5){
        nombre.regY=0
    } else {
            nombre.regY=10
    }
    nombre.x=nombre.y=50
   
    res.addChild(nombre)

    return(res)
}

function convert_centaine(n,option){
    let res=new createjs.Container();
    let cent=Math.floor(n/100);
    let c;  
    if(option=="h"){      
        for (let i=0;i<cent;i++){
            c=centaine();
            c.x=i%2*11
            c.y=22*Math.floor(i/2)
            res.addChild(c)
        }
        if(cent<2){
            res.regX=cent*11;
        } else {
            res.regX=11*2;
        }
    } else {
        for (let i=0;i<cent;i++){
            c=centaine();
            if(cent==5){
            c.scaleY=c.scaleX=0.8           
            }
            c.x=3
            c.y=21*i
            res.addChild(c)
        }       

    }
    return(res)
}

function convert_dizaine(n,option){
    let res=new createjs.Container();
    let diz=Math.floor((n-Math.floor(n/100)*100)/10);
    let d;  
    if(option=="h"){      
        for (let i=0;i<diz;i++){
            d=dizaine();
            d.x=i%3*12
            d.y=24*Math.floor(i/3)
            res.addChild(d)
        }
        if(diz<3){
            res.regX=-(diz-1)*10+6;
            if(diz==1){res.regX=-4}
        } else {
            res.regX=-3;
        }
    } else {
        for (let i=0;i<diz;i++){
            d=dizaine();
            if(diz>=5){
            d.scaleY=d.scaleX=0.75           
            }
            d.x=3+11*Math.floor(i/5)
            d.y=21*Math.floor(i%5)
            res.addChild(d)
        }       

    }
    return(res)
}

function convert_unite(n,option){
    let res=new createjs.Container();
    let uni=n-Math.floor(n/10)*10;
    let d;  
    if(option=="h"){      
        for (let i=0;i<uni;i++){
            d=unite();
            d.x=i%3*10
            d.y=24*Math.floor(i/3)
            res.addChild(d)
        }
        
    } else {
        for (let i=0;i<uni;i++){
            d=unite();
            if(uni>=5){
            d.scaleY=d.scaleX=0.75           
            }
            d.x=3+11*Math.floor(i/5)
            d.y=21*Math.floor(i%5)
            res.addChild(d)
        }       

    }
    return(res)
}

function papyh(n){
    let res=new createjs.Container();
    let fond=new createjs.Bitmap(images["papyrus"]);
    fond.scaleX=fond.scaleY=0.25
    let t=new createjs.Text(n);
    res.valeur=n;
    res.addChild(fond);
    let c=convert_centaine(n,"h");
    c.x=33;
    c.y=5;
    let d=convert_dizaine(n,"h");
    d.x=33;
    d.y=5
    let u=convert_unite(n,"h");
    u.x=75;
    u.y=5;

    res.addChild(c,d,u);

    return(res)
}

function papyv(n){
    let res=new createjs.Container();
    let fond=new createjs.Bitmap(images["papyrus"]);
    fond.rotation=90;
    fond.x=80;
    fond.scaleX=fond.scaleY=0.25;
    let t=new createjs.Text(n);
    res.valeur=n;
    res.addChild(fond);
    let c=convert_centaine(n,"v");
    c.x=0;
    c.y=2
    let d=convert_dizaine(n,"v");
    d.x=18;
    d.y=2;
    let u=convert_unite(n,"v");
    u.x=50;
    u.y=2;
    res.addChild(c,d,u);
    return(res)
}

function bg(){
    let res=new createjs.Container()
    let shape = new createjs.Shape();  
	shape.graphics.f().s("#000000").ss(1,1,1).p("ARMhjIAAvoIvoAAIAAPoIPoAAIMgAAAuDhjIAAvoIvoAAIAAPoIPoAAIPnAAIAAPnIPoAAIAAvnA9rhjIAAPnIPoAAIAAvnAuDdsIPnAAIAAvoIvnAAIAAPoIvoAAIAAvoAdsOEIsgAAIAAPoIvoAAAuD9rIAAMgIPnAAIAAsg");
	shape.setTransform(190,110);	
    res.addChild(shape);
    return(res)
}

function centaine(){
    let res=new createjs.Container();
    let shape = new createjs.Shape();
	shape.graphics.f().s("#000000").ss(2,1,1).p("AhSg2QgHghAPgdQASghAjgJQAhgKAfAUQAfATAKAmQAAABABACQAMA/iFg1AgDCiQgXhyg2hh");
	shape.setTransform(5.3,9.6,0.52,0.56,0,0,0,0.1,0);
    res.addChild(shape);
    return(res)
}

function dizaine(){
    let res=new createjs.Container();
    let shape = new createjs.Shape();
	shape.graphics.f().s("#000000").ss(1,1,1).p("AgxBcIAAiGQAAgCABgBQABgSANgOQAPgOATAAQAUAAAPAOQAPAPAAAVIAACD");
    shape.setTransform(5,9.3);
    res.scaleX=res.scaleY=0.9;
    res.addChild(shape);
    return(res)
}

function unite(){
    let res=new createjs.Container();
    let shape = new createjs.Shape();   
	shape.graphics.f().s("#000000").ss(1,1,1).p("AAAhZIAACz");
    shape.setTransform(0,9);
    res.scaleX=res.scaleY=0.9;
    res.addChild(shape);
    return(res)
}



function produit(n,option){
    let delta,d,res;
    res=1;
    if(option=="ligne"){
        delta=[0,1];
        d=[n,0];
    } else {
        delta=[1,0];
        d=[0,n];
    }
    for(let i=0;i<3;i++){
        if(plateau[d[0]][d[1]]!=0){
            res=res*plateau[d[0]][d[1]].valeur;
        }
            d[0]=d[0]+delta[0];
            d[1]=d[1]+delta[1];
        
    }
    return(res)
}

function update_listener(){
    let vide;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(plateau[i][j]==0){
                vide=[i,j]
            } else {
                plateau[i][j].removeAllEventListeners();
                plateau[i][j].scaleX=plateau[i][j].scaleY=1;
                plateau[i][j].cursor="";
            }
        }
    }
    
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(plateau[i][j]!=0){
                if(i==vide[0] || j==vide[1]){
                    plateau[i][j].addEventListener("click",bouge);
                    plateau[i][j].addEventListener("mouseover",survole);
                    plateau[i][j].addEventListener("mouseout",desurvole);
                    plateau[i][j].cursor="pointer";
                    
                }
            }
        }
    }

}

function xy_to_ij(x,y){
    return [y/100,x/100];
}

function ij_to_xy(i,j){
    return [j*100,i*100];
}

function bouge(e){
    if(pas_touche || freeze){return false};
    let IJ=xy_to_ij(e.target.x,e.target.y);
    let d,vide;       
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(plateau[i][j]==0){  
                vide=[i,j] ;             
                if(IJ[0]==i && IJ[1]<j){
                    d=[0,1];
                }
                if(IJ[0]==i && IJ[1]>j){
                    d=[0,-1];
                }
                if(IJ[1]==j && IJ[0]<i){
                    d=[1,0];
                }
                if(IJ[1]==j && IJ[0]>i){
                    d=[-1,0];
                }
            } else {
                plateau[i][j].ox=plateau[i][j].x;
                plateau[i][j].ox=plateau[i][j].y;
            }
        }
    }
    
    let new_i=IJ[0]+d[0];
    let new_j=IJ[1]+d[1];
    if(plateau[new_i][new_j]==0){
        plateau[new_i][new_j]=plateau[IJ[0]][IJ[1]];
        plateau[IJ[0]][IJ[1]]=0;
    } else {
        new_i=IJ[0]+2*d[0];
        new_j=IJ[1]+2*d[1];
        plateau[new_i][new_j]=plateau[IJ[0]+d[0]][IJ[1]+d[1]];
        plateau[IJ[0]+d[0]][IJ[1]+d[1]]=plateau[IJ[0]][IJ[1]];
        plateau[IJ[0]][IJ[1]]=0;
    }

    pas_touche=true;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(plateau[i][j]!=0){ 
                let X=ij_to_xy(i,j)[0];
                let Y=ij_to_xy(i,j)[1];
                createjs.Tween.get(plateau[i][j]).to({x:X,y:Y},300);
            }
        }
    }
    setTimeout(()=>{
        pas_touche=false;
        update_listener();
    },300)    

}

function melange(){
    let d,vide;
    d=[0,0];
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(plateau[i][j]==0){  
                vide=[i,j] ;         
            }
        }
    }
    while (d[0]==0 && d[1]==0){
        IJ=[Math.floor(Math.random()*3),Math.floor(Math.random()*3)];
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(plateau[i][j]==0){  
                    vide=[i,j] ;             
                    if(IJ[0]==i && IJ[1]<j){
                        d=[0,1];
                    }
                    if(IJ[0]==i && IJ[1]>j){
                        d=[0,-1];
                    }
                    if(IJ[1]==j && IJ[0]<i){
                        d=[1,0];
                    }
                    if(IJ[1]==j && IJ[0]>i){
                        d=[-1,0];
                    }
                } 
            }
        }
    }

    let new_i=IJ[0]+d[0];
    let new_j=IJ[1]+d[1];
    if(plateau[new_i][new_j]==0){
        plateau[new_i][new_j]=plateau[IJ[0]][IJ[1]];
        plateau[IJ[0]][IJ[1]]=0;
    } else {
        new_i=IJ[0]+2*d[0];
        new_j=IJ[1]+2*d[1];
        plateau[new_i][new_j]=plateau[IJ[0]+d[0]][IJ[1]+d[1]];
        plateau[IJ[0]+d[0]][IJ[1]+d[1]]=plateau[IJ[0]][IJ[1]];
        plateau[IJ[0]][IJ[1]]=0;
    }

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(plateau[i][j]!=0){ 
                plateau[i][j].x=ij_to_xy(i,j)[0];
                plateau[i][j].y=ij_to_xy(i,j)[1];
            }
        }
    }

    
    
}

function survole(e){       
   e.target.survole();
}

function desurvole(e){    
    e.target.desurvole();
}

function debug(){
    for(let i=0;i<3;i++){
        let l=""
        for(let j=0;j<3;j++){
            if(plateau[i][j]==0){  
                l=l+"0 / ";
            } else {
                l=l+plateau[i][j].valeur+" / ";
            }
        }
        console.log(l);
    }
}





/********************
*   C'est fini
*********************/
creerPageQuestion();
return exo;
};

