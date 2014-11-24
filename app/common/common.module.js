/*global angular */
'use strict';
/*global $ */
angular.module('RedhatAccess.common', [
	'RedhatAccess.ui-utils',
	'jmdobry.angular-cache'
]).config(function($angularCacheFactoryProvider) {

}).constant('RESOURCE_TYPES', {
	article: 'Article',
	solution: 'Solution'
}).value('COMMON_CONFIG', {
    'sfdcOutageMessage': '<ul class="message"><li class="alertSystem">Creating and updating support cases online is currently disabled. Please <a target="_blank" href="https://access.redhat.com/support/contact/technicalSupport/">contact Red Hat support</a> if you need immediate assistance.</li></ul>'
}).factory('configurationService', [
	'$q',
	function($q) {
		var defer = $q.defer();
		var service = {
			setConfig: function(config) {
				defer.resolve(config);
			},
			getConfig: function() {
				return defer.promise;
			}
		};
		return service;
	}
]);