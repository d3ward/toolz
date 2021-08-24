window.rp_requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||(function(callback,element){setTimeout(callback,1000/60);});
function RadialProgress(container,cfg){
	container.innerHTML="";
	var nc=document.createElement("div");
	nc.style.width="10em"; nc.style.height="10em";
	nc.style.position="relative";
	container.appendChild(nc);
	container=nc;
	if(!cfg) cfg={};
	this.colorBg=cfg.colorBg==undefined?"#404040":cfg.colorBg;
	this.colorFg=cfg.colorFg==undefined?"#007FFF":cfg.colorFg;
	this.colorText=cfg.colorText==undefined?"#FFFFFF":cfg.colorText;
	this.indeterminate=cfg.indeterminate==undefined?false:cfg.indeterminate;
	this.round=cfg.round==undefined?false:cfg.round;
	this.thick=cfg.thick==undefined?2:cfg.thick;
	this.progress=cfg.progress==undefined?0:cfg.progress;
	this.noAnimations=cfg.noAnimations==undefined?0:cfg.noAnimations;
	this.fixedTextSize=cfg.fixedTextSize==undefined?false:cfg.fixedTextSize;
	this.animationSpeed=cfg.animationSpeed==undefined?1:cfg.animationSpeed>0?cfg.animationSpeed:1;
	this.noPercentage=cfg.noPercentage==undefined?false:cfg.noPercentage;
	this.spin=cfg.spin==undefined?false:cfg.spin;
	if(cfg.noInitAnimation) this.aniP=this.progress; else this.aniP=0;
	var c=document.createElement("canvas");
	c.style.position="absolute";c.style.top="0";c.style.left="0";c.style.width="100%";c.style.height="100%";c.className="rp_canvas";
	container.appendChild(c);
	this.canvas=c;
	var tcc=document.createElement("div");
	tcc.style.position="absolute";tcc.style.display="table";tcc.style.width="100%";tcc.style.height="100%";
	var tc=document.createElement("div");
	tc.style.display="table-cell";tc.style.verticalAlign="middle";
	var t=document.createElement("div");
	t.style.color=this.colorText;t.style.textAlign="center";t.style.overflow="visible";t.style.whiteSpace="nowrap";t.className="rp_text";
	tc.appendChild(t);
	tcc.appendChild(tc);
	container.appendChild(tcc);
	this.text=t;
	this.prevW=0; this.prevH=0; this.prevP=0; this.indetA=0; this.indetB=0.2; this.rot=0;
	this.draw=function(f){
		if(!(f==true))rp_requestAnimationFrame(this.draw);
		var c=this.canvas;
		var dp=window.devicePixelRatio||1;
		c.width=c.clientWidth*dp; c.height=c.clientHeight*dp;
		if(!(f==true)&&!this.spin&&!this.indeterminate&&(Math.abs(this.prevP-this.progress)<1&&this.prevW==c.width&&this.prevH==c.height)) return;
		var centerX=c.width/2, centerY=c.height/2, bw=(c.clientWidth/100.0), radius=c.height/2-(this.thick*bw*dp)/2, bw=(c.clientWidth/100.0);
		this.text.style.fontSize=(this.fixedTextSize?(c.clientWidth*this.fixedTextSize):(c.clientWidth*0.26-this.thick))+"px";
		if(this.noAnimations) this.aniP=this.progress; else{var aniF=Math.pow(0.93,this.animationSpeed);this.aniP=this.aniP*aniF+this.progress*(1-aniF);}
		c=c.getContext("2d");
		c.beginPath();
		c.strokeStyle=this.colorBg;
		c.lineWidth=this.thick*bw*dp;
		c.arc(centerX,centerY,radius,-Math.PI/2, 2*Math.PI);
		c.stroke();
		c.beginPath();
		c.strokeStyle=this.colorFg;
		c.lineWidth=this.thick*bw*dp;
		if(this.round) c.lineCap="round";
		if(this.indeterminate){
			this.indetA=(this.indetA+0.07*this.animationSpeed)%(2*Math.PI);this.indetB=(this.indetB+0.14*this.animationSpeed)%(2*Math.PI);
			c.arc(centerX,centerY,radius,this.indetA, this.indetB);
			if(!this.noPercentage)this.text.innerHTML="";
		}else{
			if(this.spin&&!this.noAnimations)this.rot=(this.rot+0.07*this.animationSpeed)%(2*Math.PI)
			c.arc(centerX,centerY,radius,this.rot-Math.PI/2, this.rot+this.aniP*(2*Math.PI)-Math.PI/2);
			if(!this.noPercentage)this.text.innerHTML=Math.round(100*this.aniP)+" %";
		}
		c.stroke();
		this.prevW=c.width; this.prevH=c.height; this.prevP=this.aniP;
	}.bind(this);
	this.draw();
}
RadialProgress.prototype={
	constructor:RadialProgress,
	setValue:function(p){this.progress=p<0?0:p>1?1:p;},
	setIndeterminate:function(i){this.indeterminate=i;},
	setText:function(t){this.text.innerHTML=t;}
}