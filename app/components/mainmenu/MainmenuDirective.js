'use strict';

Mainmenu.directive('mainmenuPartial', ['AuthenticationService', 'PermissionService', function(AuthenticationService, PermissionService) {
    return {
        scope: {},
        restrict: 'AE',
        templateUrl: 'components/mainmenu/mainmenuPartial.html',
        controller: function($scope, $element, $attrs, $location) {
            $scope.isCurrentUserLoggedIn = false;
            $scope.showAdminButtons = false;

			// Watch for Authentication
			$scope.$watch(function(scope) { 
                return AuthenticationService.getCurrentUser();
            }, function(newVal, oldVal) {
                $scope.currentUser = newVal;
               // Check permission if user has permission to see admin buttons
                PermissionService.isAllowed( $scope.currentUser, [{group: 'ui', permission: 'show admin menu'}], function(allowed) {
                    $scope.showAdminButtons = allowed;
                });
                PermissionService.isAllowed( $scope.currentUser, [{group: 'post', permission: 'can create post'}], function(allowed) {
                    $scope.canCreatePost = allowed;
                });
                // Show/Hide logout button
                $scope.isCurrentUserLoggedIn = AuthenticationService.isCurrentUserLoggedIn();
			});

            // UI ELEMENTS
			// Highlights current button in the menu based on current path
			$scope.isAdminRoute = function() {
                if($location.path()) {
                    // check if path is of the form /admin/xxx
                    return $location.path().split('/')[1] === 'admin';
                } else {
                    return false;
                }
            };
    
        },
    };
}]);

Mainmenu.directive('mainmenuFooterPartial', function() {
    return {
        scope: {},
        templateUrl: 'components/mainmenu/footerPartial.html'
    };
});
