function dialogue(texte,mode,textes_boutons,couleurs_boutons,events_boutons){
    freeze=true;
    let res=new createjs.Container();    
    let text = new createjs.Text(texte, "16px MyFont", "#000000");    
    text.textBaseline = "top";
    text.lineWidth=600;
    let L=text.getBounds().width;
    let H=text.getBounds().height;
    let fond=new createjs.Shape();
    fond.graphics.beginFill("#FFFFFF").drawRoundRect(0,0,L*1.1,H*1.1,10);
    fond.graphics.moveTo(L,H-20).lineTo(L+30,H+30).lineTo(L-20,H);
    text.x=L*0.05;
    text.y=H*0.05;
    text.mask=fond;
    res.addChild(fond,text);
    res.regX=L+30;
    res.regY=H+30;
    text.text="";    

    res.clear=function(){
        freeze=false;
        createjs.Tween.get(res).to({scaleX:0.8,scaleY:0.8,alpha:0},300).call(()=>{            
            res.removeAllEventListeners();
            if(res.parent!=null){res.parent.removeChild(res);}
            res=null;    
        })
    }

    res.alpha=0;
    res.scaleX=res.scaleY=0.8;
    res.addEventListener("added",()=>{
        createjs.Tween.get(res).to({scaleX:1,scaleY:1,alpha:1},300);
        appear(0);
            })

    function appear(i){    
        setTimeout(()=>{
            text.text+=texte[i];
            if(i<texte.length-1){
            appear(i+1);            
            } else {
                set_boutons();                
            }       
         },5)
    }
    

    function set_boutons(){        
        let pos=L;
        for(let i=0;i<textes_boutons.length;i++){
            let b=new createjs.Container();
            let f=new createjs.Shape();
            let t=new createjs.Text(textes_boutons[i], "10px MyFont", "#FFFFFF");  
            t.textBaseline = "top";          
            let l=t.getBounds().width;
            let h=t.getBounds().height;            
            f.graphics.setStrokeStyle(2).beginStroke("#FFFFFF").beginFill(couleurs_boutons[i]).drawRoundRect(0,0,l*1.5,h*1.5,3);
            t.x=l*0.25;
            t.y=h*0.25;
            b.addChild(f,t);
            b.x=pos-l-25;
            b.y=H+25;
            b.mouseChildren=false;
            b.cursor="pointer";
            b.addEventListener("click",()=>{res.dispatchEvent(events_boutons[i])})
            pos=pos-l-30;
            res.addChild(b);
        }
    }

    return(res)

}