/**
 * misc.js
 * @file 杂项
 */

function TestCode(){
	if(hamsters != undefined){
		var startOptions = {
			maxThreads: 1,
			cache: true,
			debug: true,
			persistence: false
		};
		hamsters.init(startOptions);
		

		  var params = {
		    array: [1,2,3,4,5,6,7,8,9,10]
		  };
		
		   hamsters.run(params, function() {
		     rtn.data.push("Hamsters");
		   }, function(result) {
		      alert(result + " are awesome");
		   });



		
		
	}
	
	 
	 
}

