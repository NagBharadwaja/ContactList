var myApp = angular.module('myApp', []);

myApp.controller("AppCtrl", ["$scope", "$http", function($scope, $http){
	//console.log("HELLO FROM CONTROLLER");

	var refresh = function(){
		$http.get('/contactList').then(function success(response){
			console.log("RECEIVED THE DATA REQUESTED", response);
			$scope.contactList = response.data;
			$scope.contact = null;
		}, function error(error, status){
			console.log(error);
		});
	};
	
	refresh();

	// Add contact
	$scope.addContact = function(){
		console.log($scope.contact);
		$scope.contact._id = null;
		// Send input data to our server from input boxes
		$http.post('/contactList', $scope.contact).then(function success(res){
			console.log(res);
			refresh();
		});
	};

	// Remove contact
	$scope.removeContact = function(id){
		console.log("Remove id ", id);

		// Delete request to delete the data
		$http.delete('/contactList/'+id).then(function success(res){
			refresh();
		});
	};

	// Edit contact
	$scope.editContact = function(id){
		//$scope.contact = null;
		console.log("Edit id ", id);
		$http.get('/contactlist/'+id).then(function success(res){
			console.log("Receive edit data ", res.data);
			$scope.contact = res.data;
		});
	};

	// Update contact
	$scope.updateContact = function(){
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function success(res){
			refresh();
		});
	};
	
}]);
