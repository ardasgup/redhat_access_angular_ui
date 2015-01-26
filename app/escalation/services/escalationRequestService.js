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
	    	// var escalationJSON = {
	    	// 	'record_type': 'partner Escalation',
	    	// 	'issue_decription': this.issueDescription,
	    	// 	'geo': this.geo.value,
	    	// 	'account_number': this.accountNumber,
	    	// 	'case_number': this.caseNumber,
	    	// 	'already_escalated': this.alreadyEscalated,
	    	// 	'subject': 'test'
	    	// };
	    	var escalationJSON = {'account_number': "540155",'case_number': "00531482",'geo': "LATAM",'subject': "test sales subject",'record_type': "Sales Escalation",'issue_description': "test description"};
	    	strataService.escalationRequest.create(escalationJSON).then(function (escalationNum) {
                AlertService.clearAlerts();
                AlertService.addSuccessMessage(translate('Your Partner Escalation request has been sent successfully'));                
            }, function (error) {
                AlertService.addStrataErrorMessage(error);
            });
	    }

	}
]);



    