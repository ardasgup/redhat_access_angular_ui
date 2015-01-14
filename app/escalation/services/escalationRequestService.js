'use strict';
/*jshint camelcase: false */
angular.module('RedhatAccess.cases').service('EscalationRequestService', [
    'strataService',
    'AlertService',
    'RHAUtils',
    'securityService',
    '$q',
    function (strataService, AlertService, RHAUtils, securityService, $q) {

	    this.accountId = '';
	    this.accountNumber = '';
	    this.alreadyEscalated = false;
	    this.associateName = '';
	    this.billed = false;
	    this.bookingAmount = '';
	    this.bookingDate = '';
	    this.caseId = '';
	    this.caseNumber = '';
	    this.caseOwnerEmail = '';
	    this.comments = {};
	    this.compliance = false;
	    this.complianceType = 
	    this.consulting = false;
	    this.contactName = '';
	    this.contactNameForSharing = '';
	    this.createdBy = '';
	    this.createdDate = '';
	    this.customerDetails = '';
	    this.customerEmail = '';
	    this.customerName = '';
	    this.customerPhone = '';
	    this.customerType = '';
	    this.escalatedToName = '';
	    this.escalateToName = '';
	    this.escalateToSSOName = '';
	    this.escalationName = '';
	    this.escalationsByGeo = 
	    this.expectations = '';
	    this.fts = false;
	    this.geo = '';
	    this.id = '';
	    this.involvedEmail = '';
	    this.issueDescription = '';
	    this.lastModifiedBy = '';
	    this.lastModifiedDate = '';
	    this.message = '';
	    this.name = '';
	    this.owner = '';
	    this.privateCommentCount = '';
	    this.hasProducts = false;
	    this.productType = '';
	    this.publicCommentCount = '';
	    this.recordType = '';
	    this.redHatLogin = '';
	    this.requestor = '';
	    this.requestorEmail = '';
	    this.requestorPhone = '';
	    this.returnCode = '';
	    this.routingType = '';
	    this.sbt = '';
	    this.severity = '';
	    this.status = '';
	    this.strategic = '';
	    this.subject = '';
	    this.survey = '';
	    this.targetDate = '';
	    this.team = '';
	    this.text = '';
	    this.toWhom = '';
	    this.training = false;
	    this.type = '';
	    this.typeOfRequest = '';
	    this.urgency = '';

	    this.sendEscalationRequest = function() {
	    	// strataService.escalationRequest.create(escalationJSON).then(function () {
            //     AlertService.clearAlerts();
            //     AlertService.addSuccessMessage(translate('Your Partner Escalation request has been sent successfully'));                
            // }, function (error) {
            //     AlertService.addStrataErrorMessage(error);
            // });
	    }

	}
]);



    