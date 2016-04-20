
//Main Controller File For Product List Management
var app = angular.module('productListApp', []);

//Apply any event handlers
app.directive( "showproductid", function(){
    return {
            restrict: "A", //see an attribute 'showproductid'. restrict: "C" would look for an element with class 'showproductId'
            link: function(scope, element, attr){
            element.click(function(){
                alert( $(this).closest('li').find('span.prodId:first').html() ); //the convoluted alert msg is just the productId
                return false;
            });
        }
    };
});
    
app.controller('ProductCtrl', function($scope) {
    
    $scope.productList = [];
    $scope.productListMoreDetails = [];
    $scope.otherValue = "";
    
	//The html matches this as so and will update automatically: 
	//		<h3>Time Data Loaded: {{getOtherValue()}}</h3>
    $scope.getOtherValue = function() {
        return $scope.otherValue;
    };
    
	//The html matches this as so and will update automatically: 
	//		<h3>Total Product Number: {{getTotalProdCount()}}</h3>
    $scope.getTotalProdCount = function() {
        return $scope.productList.length;
    };
    
    $scope.clearProducts = function() {
        $scope.productList = {};
        $scope.productListMoreDetails = {};
        $scope.otherValue = 'Cleared!';
    };

    $scope.getProductsID = function(category){
     //console.log(category);
        $.ajax({
            type : 'POST',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
            url: "http://awsstaging.flashtalkingfeeds.com/temp/bas/test-api/get.php?category="+category,
            response: {},
      success: function(response){
             console.log (response);
               
          $scope.$apply(function(){ //necessary to $apply the changes
          $scope.productListMoreDetails = response.Data;
          console.log(response);
          
        });
      },
            error : function(xhr, ajaxOptions, thrownError) {
                alert( "Error: " + xhr.responseText + "\n" + thrownError );
            }
        });
        alert(url);
    };
    
    $scope.getProducts = function(){
        $.ajax({
            type : 'POST',
            dataType : 'json',
			contentType: "application/json; charset=utf-8",
            url: 'http://awsstaging.flashtalkingfeeds.com/temp/bas/test-api/get.php',
            response: {},
			success: function(response){
                console.log (response);
               
				$scope.$apply(function(){ //necessary to $apply the changes
				$scope.productList = response.Data;
        console.log(response);
				$scope.otherValue = new Date().toGMTString();
				});
			},
            error : function(xhr, ajaxOptions, thrownError) {
                alert( "Error: " + xhr.responseText + "\n" + thrownError );
            }
        });
    };
    
});




