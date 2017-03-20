var IE7 = false;	
var root = "http://" + document.location.hostname;
var cPage = "";

init();

function init(){
	if (navigator.appVersion.indexOf("Mac")!=-1) {
		jQuery('body').addClass('mac');
	} else {
		jQuery('body').addClass('realpc');
	}	
	if (navigator.appVersion.indexOf("MSIE 7")!=-1) {
		IE7 = true;	
	}
}





/*************************   ABOUT SLIDER   *******************************/


if(document.getElementById("tP")){
	var cP = 1;
	var tP = document.getElementById("tP").value;
	
	function mD(id){
		if(id != cP){
			jQuery('#detailHolder').animate({left: -(785 * (id-1))}, 400);		
			jQuery('#history').animate({left: -(80 * (id-1))}, 400);		
			
			if(IE7 == false){
				jQuery('#d' + id).animate({opacity: 1}, 250);	
				jQuery('#d' + cP).animate({opacity: 0}, 250);	
			}
			
			document.getElementById("h" + id).className = "a";
			document.getElementById("h" + cP).className = "";
					
			cP = id;
			if(cP == 1){			
				document.getElementById("mLeft").className += " d";	
				document.getElementById("mRight").className = "mNav";
			}else if(cP == tP){			
				document.getElementById("mLeft").className = "mNav";
				document.getElementById("mRight").className += " d";	
			}else{			
				document.getElementById("mLeft").className = "mNav";
				document.getElementById("mRight").className = "mNav";
			}		
			
			Cufon.refresh();
		}	
	}
	function mL(){
		if(cP != 1){
			id = cP-1;
			mD(id);
			
		}
	}
	function mR(){
		if(cP != tP){
			id = cP+1;
			mD(id);
		}
	}
}
