var app=angular.module('root',["ngRoute"]);
app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		controller: 'index',
		templateUrl: '../page/index.html'
	})
	.when("/verification", {
		controller: 'verifier',
		templateUrl: '../page/verification.html'
	})
	.when("/seconnecter", {
		controller: 'check',
		templateUrl: '../page/historisation.html'
	})
	.when("/pret", {
		controller: 'pret',
		templateUrl: '../page/pret.html'
	});
});
app.controller('pret',function($scope,$http,$location) {
	liste_client(1,$http,$scope),
	liste_pret_client(1,$http,$scope),
	liste_pret_client_tiers(1,$http,$scope),
	situation_pret_client(1,$http,$scope),
	moy(1,$http,$scope),
	disponible_jet_client(1,$http,$scope),
	$scope.preter = function() {
		// alert($scope.selected_client);
		// alert($scope.writed_jeton);
		service_pret($scope.disponible_jet_client,$scope.writed_jeton,1,$scope.selected_client,$http,$scope);
	// console.log("ok");
	}
	$scope.rembourser = function() {
		service_remb($scope.disponible_jet_client,$scope.writed_jeton,1,$scope.selected_client,$http,$scope);
	}
});
function disponible_jet_client(id,$http,$scope) {
	$http.get("http://localhost:4000/disponible/jet/client")
    .then(function(response) {
        $scope.disponible_jet_client = response.data[0].dispo;
        // console.log(response.data[0]);
    });
}
function service_remb(s,j,id,des,$http,$scope){
	if(j<=s) inserer_remb(j,id,des,$http);
	else $scope.erreur = "TROP BE LE VOLA AVERINA NEFA TSY MANAM-BOLA";
}
function inserer_remb(j,id,des,$http){
	$http.get("http://localhost:4000/inserer/remb/client/"+des+"/"+j);
	$http.get("http://localhost:4000/inserer/historisation/client/cred/"+des+"/"+j);
}
// /disponible/jet/client
function service_pret(s,j,id,des,$http,$scope){
	// console.log(s);
	// console.log(j);
	if(j<=s) inserer_pret(j,id,des,$http);
	else $scope.erreur = "TROP BE LE VOLA INDRAMINA NEFA TSY MANAM-BOLA";
	// if($scope.disponible_jet_client.dispo <= $scope.writed_jeton) inserer_pret(j,id,des);
	// inserer_pret(j,id,des,$http);
	// else envoi d erreur 
}
function inserer_pret(j,id,des,$http){
	// console.log("ok");
	// alert("http://localhost:4000/inserer/pret/client/"+des+"/"+j);
	$http.get("http://localhost:4000/inserer/pret/client/"+des+"/"+j);
	$http.get("http://localhost:4000/inserer/historisation/client/debit/"+des+"/"+j);
}
function situation_pret_client(id,$http,$scope) {
	$http.get("http://localhost:4000/situation/pret/anah")
    .then(function(response) {
        $scope.situation_pret_client = response.data;
		// alert(response.data.length);
		var x=0;
		var y=0;
		var z=0;
		 for (i = 0; i <response.data.length; i++) {
	    	x = x + parseInt(response.data[i].sp);
	    	if( response.data[i].sr != null) y = y + parseInt(response.data[i].sr);
	    	if( response.data[i].ma != null) z = z + parseInt(response.data[i].ma);
	    	console.log(response.data[i].ma);
		}
		console.log(x/response.data.length);
		$scope.spmoy=x/response.data.length;
		$scope.srmoy=y/response.data.length;
		$scope.mamoy=z/response.data.length;
    });
}
function moy(id,$http,$scope) {
	// for (i = 0; i < myObj.cars.length; i++) {
 //    	x += myObj.cars[i];
	// }
}
function liste_pret_client_tiers(id,$http,$scope) {
	$http.get("http://localhost:4000/liste/pret/anah/tiers")
    .then(function(response) {
        $scope.liste_pret_client_tiers = response.data;
    });
}
function liste_pret_client(id,$http,$scope) {
	$http.get("http://localhost:4000/liste/pret/anah")
    .then(function(response) {
        $scope.liste_pret_client = response.data;
    });
}
function liste_client(id,$http,$scope) {
	$http.get("http://localhost:4000/liste/client")
    .then(function(response) {
        $scope.liste_client = response.data;
    });
}
app.controller('check', function($scope,$http,$location) {
	$http.get("http://localhost:4000/historisation")
    .then(function(response) {
        $scope.his = response.data;
    });
    $http.get("http://localhost:4000/historisation/tiers")
    .then(function(response) {
        $scope.histie = response.data;
    });
});