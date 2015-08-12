var app = angular.module('myApp', []);

app.controller('myCtrl',
	['$scope',function($scope){
		$scope.user={
			name:"name",
			image: "url_for_image",
			nickname: "nickname",
			gender: "gender",
			date_of_birth: "date of birth",
			mobile_number:"mobile number",
			summer_number:"summer number",
			email:"email",
			college:"college",
			college_roll:"college roll",
			branch:"branch",
			room_no:"room no",
			hostel:"hostel",
			summer_stay:"summer stay",
			winter_stay:"winter stay",
			want_accomodation:"want accomodation",
		}

	}]);