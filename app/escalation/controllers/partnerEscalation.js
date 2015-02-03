'use strict';
angular.module('RedhatAccess.cases').controller('PartnerEscalation', [
    '$scope',
    'strataService',
    '$stateParams',
    'CaseService',
    'EscalationRequestService',
    '$rootScope',
    'RHAUtils',
    'AUTH_EVENTS',
    'CASE_EVENTS',
    'securityService',
    'AlertService',
    function ($scope, strataService, $stateParams, CaseService, EscalationRequestService, $rootScope, RHAUtils, AUTH_EVENTS, CASE_EVENTS, securityService, AlertService) {
        $scope.EscalationRequestService = EscalationRequestService;
        $scope.disableSendRequest = true;
        $scope.geoList = ['NA','EMEA','LATAM','APAC','None'];        
        
        $scope.submitEscalationRequest = function() {
            EscalationRequestService.sendEscalationRequest();            
        }
        $scope.mandatoryFieldCheck = function() {
            if (RHAUtils.isNotEmpty(EscalationRequestService.accountNumber) && RHAUtils.isNotEmpty(EscalationRequestService.caseNumber)) {
                $scope.disableSendRequest = false;
            } else {
                $scope.disableSendRequest = true;
            }
        }
        
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
            AlertService.clearAlerts();
        });
    }
]);