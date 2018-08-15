function bouton(te,clip,event){
    let b=new createjs.Container();
    let f=new createjs.Shape();
    let t=new createjs.Text(te, "14px Bangers", "#FFFFFF");  
    t.textBaseline = "top";          
    let l=t.getBounds().width;
    let h=t.getBounds().height;            
    f.graphics.setStrokeStyle(2).beginStroke("#FFFFFF").beginFill("#000000").drawRoundRect(0,0,l*1.5,h*1.5,3);
    t.x=l*0.25;
    t.y=h*0.25;
    b.addChild(f,t);    
    b.mouseChildren=false;
    b.cursor="pointer";
    b.addEventListener("click",()=>{if(b.alpha==1){clip.dispatchEvent(event)}})
    return(b);
}

function inventaire(){    
    let res=new createjs.Container();
    res.selected=null 
    res.bloque=false;
    let fond_inventaire=new createjs.Bitmap(images["cuir"]);
    //res.addChild(fond_inventaire);

    res.prendre=new bouton("Prendre",res,"prendre");    
    res.prendre.x=500
    res.prendre.y=10
    res.addChild(res.prendre);

    res.deposer=new bouton("Déposer",res,"deposer");   
    res.deposer.x=res.prendre.x+res.prendre.getBounds().width+40;
    res.deposer.y=10
    res.addChild(res.deposer);
    
    res.utiliser=new bouton("Utiliser",res,"utiliser");
    res.utiliser.x=res.deposer.x+res.deposer.getBounds().width+40;
    res.utiliser.y=10
    res.addChild(res.utiliser);

    res.prendre.alpha=res.deposer.alpha=res.utiliser.alpha=0.3;

    res.mon_inventaire=[];

    refresh=function(){
        for(let i=0;i<res.mon_inventaire.length;i++){
            res.mon_inventaire[i].info.bitmap.x=30+80*i;
        }
    }

    res.ranger=function(o){
        res.prendre.alpha=0.3;
        let b=o.info.bitmap;
        b.addEventListener("added",()=>{
            b.regX=b.getBounds().width/2;
            b.regY=b.getBounds().height/2;
            b.mouseChildren=false;
            b.scaleX=b.scaleY=o.info.scale;
            res.mon_inventaire.push(o);
            refresh();        
            b.y=20;
            })
        res.addChild(b);
        b.cursor="pointer";
        b.objet=o;        
        b.addEventListener("click",select)       
    }

    res.deranger=function(){
        res.utiliser.alpha=res.deposer.alpha=0.3;
        let o=res.selected.objet;
        let b=res.selected;
        b.removeAllEventListeners();
        res.removeChild(b)
        res.mon_inventaire.splice(res.mon_inventaire.indexOf(o),1);
        res.selected=null;
        refresh();
        return(o);
    }

   
    function select(e){
        if(res.bloque==false){
            if(res.selected==null){
            res.selected=e.target;
            res.selected.scaleX=res.selected.scaleY=res.selected.scaleY*0.6;
            if(mode!="laby"){
            res.utiliser.alpha=1
            }
            if(mode=="laby"){res.deposer.alpha=1;}
            } else {
                res.selected.scaleX=res.selected.scaleY=res.selected.scaleY/0.6;                
                if(res.selected!=e.target){
                    res.selected=e.target;
                    res.selected.scaleX=res.selected.scaleY=res.selected.scaleY*0.6;
                } else {
                    res.selected=null;
                    res.utiliser.alpha=res.deposer.alpha=0.3;
                }
            }  
        }      
        
    }

    res.reset=function(){    
        res.selected=null;   
        for (let i=0;i<res.mon_inventaire.length;i++){
            console.log(res.mon_inventaire[i].info.bitmap.scaleX)
            res.mon_inventaire[i].info.bitmap.scaleX=res.mon_inventaire[i].info.bitmap.scaleY=res.mon_inventaire[i].info.scale;            
        }
        res.utiliser.alpha=res.deposer.alpha=res.prendre.alpha=0.3;
    }




    return(res);

}