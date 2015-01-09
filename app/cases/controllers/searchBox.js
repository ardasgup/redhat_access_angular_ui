'use strict';
angular.module('RedhatAccess.cases').controller('SearchBox', [
    '$scope',
    'RHAUtils',
    '$location',
    'SearchBoxService',
    'securityService',
    function ($scope, RHAUtils, $location, SearchBoxService, securityService) {
        $scope.securityService = securityService;
        $scope.SearchBoxService = SearchBoxService;
        $scope.onFilterKeyPress = function ($event) {
            if ($event.keyCode === 13) {
                SearchBoxService.doSearch();
            } else if (angular.isFunction(SearchBoxService.onKeyPress)) {
                SearchBoxService.onKeyPress();
            }
        };
        $scope.doCommonSearch = function () {
            if ($location.path() === '/case/list') {
                if (RHAUtils.isNotEmpty(SearchBoxService.searchTerm)) {
                    SearchBoxService.doCaseSearch();
                }
            } else {
                SearchBoxService.doSearch();
            }
        };
    }
]);