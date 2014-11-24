'use strict';
/*jshint unused:vars */
/*jshint camelcase: false */
angular.module('RedhatAccess.security').controller('SecurityController', [
    '$scope',
    '$sce',
    '$rootScope',
    '$interval',
    'RHAUtils',
    'securityService',
    'SECURITY_CONFIG',
    'COMMON_CONFIG',
    function ($scope, $sce, $rootScope, $interval, RHAUtils, securityService, SECURITY_CONFIG , COMMON_CONFIG) {
        $scope.securityService = securityService;
        $scope.parseSfdcOutageHtml = function () {
            var parsedHtml = '';
            if (RHAUtils.isNotEmpty(COMMON_CONFIG.sfdcOutageMessage)) {
                var rawHtml = COMMON_CONFIG.sfdcOutageMessage;
                parsedHtml = $sce.trustAsHtml(rawHtml);
            }
            return parsedHtml;
        };
        var health = $interval(securityService.checkSfdcHealth, 600000);
        if (SECURITY_CONFIG.autoCheckLogin) {
            securityService.checkSfdcHealth();
            securityService.validateLogin(SECURITY_CONFIG.forceLogin);
            securityService.loginStatus.authedUser.has_chat = true;
        }
        $scope.displayLoginStatus = function () {
            return SECURITY_CONFIG.displayLoginStatus;
        };
        $scope.$on('$destroy', function () {
            $interval.cancel(health);
        });
    }
]);
