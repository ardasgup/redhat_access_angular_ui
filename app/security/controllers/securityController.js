'use strict';
/*jshint unused:vars */
/*jshint camelcase: false */
angular.module('RedhatAccess.security').controller('SecurityController', [
    '$scope',
    '$rootScope',
    '$interval',
    'securityService',
    'SECURITY_CONFIG',
    function ($scope, $rootScope, $interval, securityService, SECURITY_CONFIG) {
        $scope.securityService = securityService;
        var health = $interval(securityService.checkSfdcHealth, 20000);
        if (SECURITY_CONFIG.autoCheckLogin) {
            securityService.checkSfdcHealth();
            securityService.validateLogin(SECURITY_CONFIG.forceLogin);
        }
        $scope.displayLoginStatus = function () {
            return SECURITY_CONFIG.displayLoginStatus;
        };
        $scope.$on('$destroy', function () {
            $interval.cancel(health);
        });
    }
]);
