app.controller('verifier', function($scope,$http,$location) {
	$scope.verifier = function() {
		var email = $scope.mail;
		var datade = verifier(email,$http,$scope);
		// $location.path('/io');
	};
});
function verifier(email,$http,$scope,$location) {
	// console.log("succes");
	$http.get("http://localhost:4000/verification/"+email).then(function(response) {
        $scope.myData = response.data.records;
        // console.log("http://localhost:4000/perte/"+email);
        return $scope.myData;
    });
}

app.controller('index', ['$scope', function($scope,$http,$location) {
	$scope.connecter = function() {
		// console.log("succes");
		var nom = $scope.nom;
		var mdp = $scope.mdp;
		$http.get('http://localhost:4000/client/root/root')
		.success(function(data, status, headers, config) {
			$scope.zipCodes = data;
		})
		.error(function(error, status, headers, config) {
			console.log(status);
			console.log("Error occured");
		});
	};
}]);