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
        $scope.geoList = [];
        
        $scope.init = function () {
            $scope.geoList.push({
                value: 'NA',
                label: 'NA'
            }, {
                value: 'EMEA',
                label: 'EMEA'
            }, {
                value: 'LATAM',
                label: 'LATAM'
            }, {
                value: 'APAC',
                label: 'APAC'
            }, {
                value: 'None',
                label: 'None'
            });
        };
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
        $scope.init();
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
            $scope.init();
            AlertService.clearAlerts();
        });
    }
]);