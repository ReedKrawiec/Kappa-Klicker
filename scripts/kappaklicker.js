$(document).ready(function(){
	var words1 = ["nosy","scary","troubled","yummy","quickest","foolish","anxious","grumpy","roasted","tan","successful","tart","tender","mmute","zany","sticky","ratty"];
	var words2 = ["dog","cat","fish","rat","snake","ant","turtle","spider","whale","duck","goose","deer","bear","chimp","snake","crab","pantherrr","Shaggy","Weeaboo"];
	var randomword1;
	var randomword2;
	var randomnum;
	var hour;
	var minutes;
	var realtime;
	var color;
	var username;
	var message;
	var y;
	var kappas = 0;
	var kps;
	var russian={
		cost:10,
		produce:0.1,
		name:"Russian Spammers",
		desc:"Add russian spammers to your arsenal.",
		amount:0
	}
	var viewbot={
		cost:100,
		produce:1,
		name:"View/Spam Bots",
		desc:"Buy the top of the line, best spam bots that kappas can buy.",
		amount:0
	}
		var botnet={
		cost:1000,
		produce:10,
		name:"A Small Botnet",
		desc:"Take advantage of a network of computers to spam Twitch Chat.",
		amount:0
	}
		var supercomputer={
		cost:10000,
		produce:100,
		name:"Super Computer",
		desc:"The best of the best computing devices possible, for use in your spamming purposes.",
		amount:0
	}
		var clickup1={
		cost:100,
		bonus:1,
		name:"Clicker Upgrade 1",
		desc:"Adds 100% more kappa to each click.",
		amount:0
	}
		var clickup2={
		cost:1000,
		bonus:1,
		name:"Clicker Upgrade 2",
		desc:"Adds 100% more kappa to each click.",
		amount:0
	}
		var clickup3={
		cost:10000,
		bonus:1,
		name:"Clicker Upgrade 3",
		desc:"Adds 100% more kappa to each click.",
		amount:0
	}
		var clickup4={
		cost:100000,
		bonus:1,
		name:"Clicker Upgrade 4",
		desc:"Adds 100% more kappa to each click.",
		amount:0
	}
	$(".shopbuttoncontain").hover(function(){
		$("#buyname").text(eval(this.id+".name"));
		$("#buydesc").text(eval(this.id+".desc"));
		$("#buycost").text(eval(this.id+".cost"));
		if(eval(this.id+".produce") == undefined){
		$("#kpsptag").text("");
		$("#kpsp").text("");	
		}
		else{
		$("#kpsptag").text("Kappas per second produced:");	
		$("#kpsp").text(eval(this.id+".produce"));
		}
	},function(){

	});
	$("#shopscontainer").click(function(){
		$("#shopcover").css("display","initial");
	});
	$("#shopcoverx").click(function(){
		$("#shopcover").css("display","none");		
	});		
	$("#russian").click(function(){
		if(kappas>=russian.cost){
		russian.amount+=1;
		kappas = kappas- russian.cost;
		russian.cost = russian.cost + russian.cost*1/5;
		$("#russianamount").text(russian.amount);
		updatekappa();			
		}
		else
		alert("You cannot afford that!");	
	});		
	$("#viewbot").click(function(){
		if(kappas>=viewbot.cost){
		viewbot.amount+=1;
		kappas = kappas-	viewbot.cost;
		viewbot.cost =	viewbot.cost +	viewbot.cost*1/5;
		$("#viewbotamount").text(viewbot.amount);
		updatekappa();			
		}
		else
		alert("You cannot afford that!");	
	});	
	$("#botnet").click(function(){
		if(kappas>=botnet.cost){
		botnet.amount+=1;
		kappas = kappas- botnet.cost;
		botnet.cost = botnet.cost + botnet.cost*1/5;
		$("#botnetamount").text(botnet.amount);
		updatekappas();	
		}
		else
		alert("You cannot afford that!");	
	});	
	$("#supercomputer").click(function(){
		if(kappas>=supercomputer.cost){
		supercomputer.amount+=1;
		kappas = kappas- supercomputer.cost;
		supercomputer.cost = supercomputer.cost + supercomputer.cost*1/5;
		$("#supercomputeramount").text(supercomputer.amount);
		updatekappa();			
		}
		else
		alert("You cannot afford that!");	
	});	
	$("#clickup1").click(function(){
		if(kappas>=clickup1.cost && clickup1.amount < 1){
		clickup1.amount+=1;
		kappas = kappas- clickup1.cost;
		clickup1.cost = clickup1.cost + clickup1.cost*1/5;
		$("#clickup1amount").text(clickup1.amount);
		updatekappa();			
		}
		else if(clickup1.amount>=1)
		alert("You cannot buy more than one.")
		else
		alert("You cannot afford that!");	
	});	
	$("#clickup2").click(function(){
		if(kappas>=clickup2.cost && clickup2.amount < 1){
		clickup2.amount+=1;
		kappas = kappas- clickup2.cost;
		clickup2.cost = clickup2.cost + clickup2.cost*1/5;
		$("#clickup2amount").text(clickup2.amount);
		updatekappa();		
		}
		else if(clickup2.amount>=1)
		alert("You cannot buy more than one.")
		else
		alert("You cannot afford that!");	
	});	
	$("#clickup3").click(function(){
		if(kappas>=clickup3.cost && clickup3.amount < 1){
		clickup3.amount+=1;
		kappas = kappas- clickup3.cost;
		clickup3.cost = clickup3.cost + clickup3.cost*1/5;
		$("#clickup3amount").text(clickup3.amount);
		updatekappa();			
		}
		else if(clickup3.amount>=1)
		alert("You cannot buy more than one.")
		else
		alert("You cannot afford that!");	
	});		
	$("#clickup4").click(function(){
		if(kappas>=clickup4.cost && clickup4.amount < 1){
		clickup4.amount+=1;
		kappas = kappas- clickup4.cost;
		clickup4.cost = clickup4.cost + clickup4.cost*1/5;
		$("#clickup4amount").text(clickup4.amount);
		updatekappa();			
		}
		else if(clickup4.amount>=1)
		alert("You cannot buy more than one.")
		else
		alert("You cannot afford that!");	
	});		
	var b=0;
	setInterval(
	function kappagenerator(){
		kappas = kappas + (viewbot.produce * viewbot.amount) + (botnet.amount * botnet.produce) + (supercomputer.amount*supercomputer.produce);	
		kps = russian.produce * russian.amount + viewbot.produce * viewbot.amount + botnet.amount * botnet.produce + supercomputer.amount*supercomputer.produce;
		updatekappa();
		$("#kappagenerated").text(kps.toFixed(1));
		if(kps > 100)
			kps=100;
		while(b<kps){
			addkappa(generatename(),generatecolor(),0);
			b++;			
		}
		b=0;
	},1000);
	var russianamount = 0;
	var a = 0;
	setInterval(function russiangeneratecalc(){
		russianamount = russianamount +russian.amount * russian.produce;
		if(russianamount>=1){
			kappas = kappas+russianamount
			while(a < russianamount){
			addkappa(generatename(),generatecolor(),0);
			russianamount-=1;
			++a;
			}
			a=0;
		}
	},1000);						
	function updatekappa(){
		$("#kappacount").text(kappas.toFixed(1));
	}
	function addkappa(username,color,mod,toadd){
		var time = new Date();
		if(time.getHours()>12)
		hour = time.getHours()-12;
		else
		var hour = time.getHours();
		if(time.getMinutes()<10)
		minutes ="0"+time.getMinutes();
		else
		minutes = time.getMinutes();
		realtime = hour+":"+minutes;
		if(mod == 1)		
		message = '<li><span class="time"> '+realtime+'</span><img class = "mod" src = "images/TwitchTurbo.png"/><span class = "username" style="color:'+color+'">'+username+'</span>:<img class = "kappachat" src = "images/kappa1.png"/></li>';
		else
		message = '<li><span class="time"> '+realtime+'</span><span class = "username" style="color:'+color+'">'+username+'</span>:<img class = "kappachat" src = "images/kappa1.png"/></li>';			
		$("#chat").append(message);
		$("#twitchchat").scrollTop($("#chat").height());
		updatekappa();
	}
	function generatename(){
		randomword1 = words1[Math.floor((Math.random() * words1.length))];
		randomword2 = words2[Math.floor((Math.random() * words2.length))];
		randomnum = Math.floor((Math.random() * 200));
		username = randomword1+randomword2+randomnum;
		return username;
	}
	function generatecolor(){
		color = '#'+Math.floor(Math.random()*16777215).toString(16);
		return color;
	}
	setInterval(function clearchat(){
		$("#chat").empty();
		$("#chat").append('<li><span class="time"> '+realtime+' </span><span class="modclear">Chat was cleared by a moderator</span>');
	},60000)

	$("#kappa").click(function(){
		var plusamount = 1;	
		var c = 0;
		plusamount = plusamount+(plusamount*clickup1.amount);
		plusamount = plusamount+(plusamount*clickup2.amount);
		plusamount = plusamount+(plusamount*clickup3.amount);
		plusamount = plusamount+(plusamount*clickup4.amount);
		while(c<plusamount){
			addkappa("KappaKlicker","red",1);
			c++;
		}
		kappas = kappas + (plusamount);
		updatekappa();
		y=event.pageY-40;
		$('<p class = "plus change" style="left:'+event.pageX+';top:'+y+'"id = "plus">+'+(plusamount)+'</p>').appendTo("#kappacontainer").animate({top:"-=50",opacity:"0"},500,function(){
			$(this).remove();
		});
		
		//		addkappa(generatename(),generatecolor(),0);
	});
});