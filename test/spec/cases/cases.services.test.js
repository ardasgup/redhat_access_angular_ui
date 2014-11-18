/*jshint camelcase:false*/
'use strict';
describe('Case Services', function () {
    var caseService;
    var searchCaseService;
    var securityService;
    var searchBoxService;
    var recommendationsService;
    var caseListService;
    var attachmentsService;
    var groupService;
    var scope;
    var rootScope;
    var q;
    var mockStrataService;
    var mockStrataDataService;
    var mockTreeViewSelectorUtils;
    beforeEach(angular.mock.module('RedhatAccess.cases'));
    beforeEach(angular.mock.module('RedhatAccess.mock'));
    beforeEach(inject(function (_CaseService_, _SearchCaseService_, _MockStrataDataService_, _strataService_, _SearchBoxService_, _RecommendationsService_, _CaseListService_, _AttachmentsService_, _GroupService_, _TreeViewSelectorUtils_, $injector, $q, $rootScope) {
        caseService = _CaseService_;
        searchCaseService = _SearchCaseService_;
        mockStrataDataService = _MockStrataDataService_;
        mockStrataService = _strataService_;
        searchBoxService = _SearchBoxService_;
        recommendationsService = _RecommendationsService_;
        attachmentsService = _AttachmentsService_;
        caseListService = _CaseListService_;
        groupService = _GroupService_;
        mockTreeViewSelectorUtils = _TreeViewSelectorUtils_;
        scope = $rootScope.$new();
        rootScope = $rootScope;
        securityService = $injector.get('securityService');
        q = $q;
    }));
    //Suite for CaseService
    describe('CaseService', function () {
        it('should have a method for defining case object', function () {
            expect(caseService.defineCase).toBeDefined();
            var rawCase = {
                    severity: '1',
                    status: 'closed',
                    product: 'Red Hat Enterprise Linux',
                    folder_number: '1234',
                    type: 'bug'
                };
            caseService.defineCase(rawCase);
            expect(caseService.kase.product.name).toEqual('Red Hat Enterprise Linux');
            expect(caseService.kase.status.name).toEqual('closed');
            expect(caseService.kase.group.number).toEqual('1234');
        });
        it('should have a method to define account', function () {
            expect(caseService.defineAccount).toBeDefined();
            caseService.defineAccount(mockStrataDataService.mockAccount);
            expect(caseService.account).toEqual(mockStrataDataService.mockAccount);
        });
        it('should have a method for populating Case Groups resolved', function () {
            expect(caseService.populateGroups).toBeDefined();
            var ssoUsername = 'testUser';
            caseService.populateGroups(ssoUsername);
            spyOn(mockStrataService.groups, 'list').andCallThrough();
            scope.$root.$digest();
            expect(caseService.groups).toEqual(mockStrataDataService.mockGroups);
            expect(caseService.groupsLoading).toBe(false);
        });
        it('should have a method for populating Case Groups rejected', function () {
            expect(caseService.populateGroups).toBeDefined();
            var ssoUsername = 'testUser';
            mockStrataService.rejectCalls();
            spyOn(mockStrataService.groups, 'list').andCallThrough();
            caseService.populateGroups(ssoUsername, false);
            scope.$root.$digest();
            expect(mockStrataService.groups.list).toHaveBeenCalledWith('testUser', false);
            expect(caseService.groups).toEqual([]);
            expect(caseService.groupsLoading).toBe(false);
        });
        it('should have a method for populating Users For An Account resolved', function () {
            expect(caseService.populateUsers).toBeDefined();
            securityService.loginStatus.authedUser.org_admin = true;
            caseService.account.number = '540155';
            caseService.populateUsers();
            spyOn(mockStrataService.accounts, 'users').andCallThrough();
            scope.$root.$digest();
            expect(caseService.users).toEqual(mockStrataDataService.mockUsers);
            expect(caseService.usersLoading).toBe(false);
        });
        it('should have a method for populating Users For An Account non org admin', function () {
            expect(caseService.populateUsers).toBeDefined();
            securityService.loginStatus.authedUser.org_admin = false;
            caseService.account.number = '540155';
            caseService.populateUsers();
            expect(caseService.users).toEqual([{'sso_username' : undefined}]);
            expect(caseService.usersLoading).toBe(false);
        });
        it('should have a method for populating Users For An Account rejected', function () {
            expect(caseService.populateUsers).toBeDefined();
            securityService.loginStatus.authedUser.org_admin = true;
            caseService.account.number = '540155';
            mockStrataService.rejectCalls();
            spyOn(mockStrataService.accounts, 'users').andCallThrough();
            caseService.populateUsers();
            scope.$root.$digest();
            expect(mockStrataService.accounts.users).toHaveBeenCalledWith('540155');
            expect(caseService.users).toEqual([]);
            expect(caseService.usersLoading).toBe(false);
        });
        it('should have a method for populating Case Comments resolved', function () {
            expect(caseService.populateComments).toBeDefined();
            var caseNumber = '12345';
            caseService.populateComments(caseNumber);
            spyOn(mockStrataService.cases.comments, 'get').andCallThrough();
            scope.$root.$digest();
            expect(caseService.comments).toEqual(mockStrataDataService.mockComments);
        });
        it('should have a method for populating Case Comments rejected', function () {
            expect(caseService.populateComments).toBeDefined();
            var caseNumber = '12345';
            mockStrataService.rejectCalls();
            spyOn(mockStrataService.cases.comments, 'get').andCallThrough();
            caseService.populateComments(caseNumber);
            scope.$root.$digest();
            expect(mockStrataService.cases.comments.get).toHaveBeenCalledWith('12345');
            expect(caseService.comments).toEqual([]);
        });
        //This test is not testing anything.....
        // 	it('should have a method for populating User Entitlements resolved', function () {
        // var mockEntitlements = [];
        // expect(caseService.populateEntitlements).toBeDefined();
        // var ssoUsername = 'testUser';
        // caseService.populateEntitlements(ssoUsername);
        // spyOn(mockStrataService.entitlements, 'get').andCallThrough();
        // scope.$root.$digest();
        // expect(caseService.entitlements).toEqual(['DEFAULT']);
        // 	});
        it('should have a method for populating User Entitlements rejected', function () {
            expect(caseService.populateEntitlements).toBeDefined();
            var ssoUsername = 'testUser';
            mockStrataService.rejectCalls();
            spyOn(mockStrataService.entitlements, 'get').andCallThrough();
            caseService.populateEntitlements(ssoUsername);
            scope.$root.$digest();
            expect(mockStrataService.entitlements.get).toHaveBeenCalledWith(false, 'testUser');
            expect(caseService.entitlements).toBeUndefined();
        });
        it('should have a method for validating New Case Page', function () {
            expect(caseService.validateNewCasePage1).toBeDefined();
            expect(caseService.newCasePage1Incomplete).toBe(true);
            caseService.kase.product = '';
            caseService.kase.version = '';
            caseService.kase.summary = '';
            caseService.kase.description = '';
            caseService.validateNewCasePage1();
            expect(caseService.newCasePage1Incomplete).toBe(true);
            caseService.kase.product = 'Red Hat Enterprise Linux';
            caseService.kase.version = '6.0';
            caseService.kase.summary = 'Test Summary';
            caseService.kase.description = 'Test Description';
            caseService.validateNewCasePage1();
            expect(caseService.newCasePage1Incomplete).toBe(false);
        });
        it('should have a method to Show/Hide the FTS flag', function () {
            expect(caseService.showFts).toBeDefined();
            var fts = false;
            caseService.severities = [
                { 'name': '1 (Urgent)' },
                { 'name': '2 (High)' },
                { 'name': '3 (Normal)' },
                { 'name': '4 (Low)' }
            ];
            // Show the FTS flag for sev 1 premium case
            caseService.kase.severity = { 'name': '1 (Urgent)' };
            caseService.kase.entitlement = {};
            caseService.kase.entitlement.sla = 'PREMIUM';
            fts = caseService.showFts();
            expect(fts).toBe(true);
            // Hide the FTS flag for non premium case
            caseService.kase.entitlement.sla = 'STANDARD';
            fts = caseService.showFts();
            expect(fts).toBe(false);
        });
        it('should have a method for defining Notified Users for a case', function () {
            expect(caseService.defineNotifiedUsers).toBeDefined();
            caseService.kase.contact_sso_username = 'testUser';
            caseService.kase.notified_users = {
                'link': [
                    {
                        'title': 'Denises Hughes',
                        'type': 'application/vnd.redhat.user',
                        'sso_username': 'dhughesgit'
                    },
                    {
                        'title': 'Customer Portal-Qa',
                        'type': 'application/vnd.redhat.user',
                        'sso_username': 'customerportalQA'
                    }
                ]
            };
            caseService.defineNotifiedUsers();
            expect(caseService.updatedNotifiedUsers).toContain('testUser', 'dhughesgit', 'customerportalQA');
        });
    });
    //Suite for SearchCaseService
    describe('searchCaseService', function () {
        it('should have a method to Filter/Search cases resolved for loggedin user', function () {
            expect(searchCaseService.doFilter).toBeDefined();
            searchCaseService.oldParams = {};
            securityService.loginStatus.login = 'testUser';
            securityService.loginStatus.isLoggedIn = true;
            searchBoxService.searchTerm = 'test';
            caseService.status = 'closed';
            caseService.product = 'Red Hat Enterprise Linux';
            caseService.owner = 'testUser';
            caseService.type = 'bug';
            caseService.severity = '1';
            searchCaseService.doFilter();
            spyOn(mockStrataService.cases, 'filter').andCallThrough();
            scope.$root.$digest();
            expect(searchCaseService.searching).toBe(false);
            expect(searchCaseService.cases).toEqual(mockStrataDataService.mockFilterCaseResult);
        });
        it('should have a method to Filter/Search cases resolved for login success event', function () {
            expect(searchCaseService.doFilter).toBeDefined();
            searchCaseService.oldParams = {};
            securityService.loginStatus.login = 'testUser';
            securityService.loginStatus.isLoggedIn = false;
            securityService.loginStatus.authedUser.is_internal = true;
            securityService.loginStatus.authedUser.sso_username = 'testSsoName';
            searchBoxService.searchTerm = 'test';
            caseService.status = 'closed';
            caseService.product = 'Red Hat Enterprise Linux';
            caseService.owner = 'testUser';
            caseService.type = 'bug';
            caseService.severity = '1';
            searchCaseService.doFilter();
            rootScope.$broadcast('auth-login-success');
            spyOn(mockStrataService.cases, 'filter').andCallThrough();
            scope.$root.$digest();
            expect(searchCaseService.searching).toBe(false);
            expect(searchCaseService.cases).toEqual(mockStrataDataService.mockFilterCaseResult);
        });
        it('should have a method to Filter/Search cases rejected', function () {
            expect(searchCaseService.doFilter).toBeDefined();
            searchCaseService.oldParams = {};
            securityService.loginStatus.login = 'testUser';
            securityService.loginStatus.isLoggedIn = true;
            var filterParams = {
                    include_closed: true,
                    count: 10,
                    start: 0
                };
            mockStrataService.rejectCalls();
            spyOn(mockStrataService.cases, 'filter').andCallThrough();
            searchCaseService.doFilter();
            scope.$root.$digest();
            expect(mockStrataService.cases.filter).toHaveBeenCalledWith(filterParams);
            expect(searchCaseService.searching).toBe(false);
            expect(searchCaseService.cases).toEqual([]);
        });
        it('should have a method to clear the search criteria and result', function () {
            expect(searchCaseService.clear).toBeDefined();
            searchCaseService.oldParams = {};
            searchBoxService.searchTerm = 'test';
            searchCaseService.clear();
            expect(searchBoxService.searchTerm).toEqual('');
            expect(searchCaseService.cases).toEqual([]);
        });
        it('should have a method to clear the pagination of the search result', function () {
            expect(searchCaseService.clearPagination).toBeDefined();
            searchCaseService.cases = mockStrataDataService.mockCases;
            searchCaseService.clearPagination();
            expect(searchCaseService.cases).toEqual([]);
        });
    });
    //Suite for RecommendationsService
    describe('RecommendationsService', function () {
        it('should have a method to populate pinned recommendations but not linked', function () {
            expect(recommendationsService.populatePinnedRecommendations).toBeDefined();
            caseService.kase.recommendations = {
                'recommendation': [{
                        'linked': false,
                        'pinned_at': true,
                        'last_suggested_date': 1398756627000,
                        'lucene_score': 141,
                        'resource_id': '27450',
                        'resource_type': 'Solution',
                        'resource_uri': 'https://api.access.devgssci.devlab.phx1.redhat.com/rs/solutions/27450',
                        'solution_title': ' test solution title 1 ',
                        'solution_abstract': 'test solution abstract 1',
                        'solution_url': 'https://api.access.devgssci.devlab.phx1.redhat.com/rs/solutions/27450',
                        'title': 'test title 1',
                        'solution_case_count': 3
                    }]
                };
            recommendationsService.populatePinnedRecommendations();
            spyOn(mockStrataService.solutions, 'get').andCallThrough();
            scope.$root.$digest();
            expect(recommendationsService.pinnedRecommendations).toContain(mockStrataDataService.mockSolution);
        });
        it('should have a method to populate non pinned recommendations but linked', function () {
            expect(recommendationsService.populatePinnedRecommendations).toBeDefined();
            caseService.kase.recommendations = {
                'recommendation': [{
                        'linked': true,
                        'pinned_at': false,
                        'last_suggested_date': 1398756612000,
                        'lucene_score': 155,
                        'resource_id': '637583',
                        'resource_type': 'Solution',
                        'resource_uri': 'https://api.access.devgssci.devlab.phx1.redhat.com/rs/solutions/637583',
                        'solution_title': 'test solution title 2',
                        'solution_abstract': 'test solution abstract 2',
                        'solution_url': 'https://api.access.devgssci.devlab.phx1.redhat.com/rs/solutions/637583',
                        'title': 'test title 2',
                        'solution_case_count': 14
                    }]
                };
            recommendationsService.populatePinnedRecommendations();
            spyOn(mockStrataService.solutions, 'get').andCallThrough();
            scope.$root.$digest();
            expect(recommendationsService.handPickedRecommendations).toContain(mockStrataDataService.mockSolution);
        });
        it('should have a method to populate recommendations', function () {
            expect(recommendationsService.populateRecommendations).toBeDefined();
            caseService.kase.product = 'Red Hat Enterprise Linux';
            caseService.kase.version = '6.0';
            caseService.kase.summary = 'Test Summary';
            caseService.kase.description = 'Test Description';
            recommendationsService.populateRecommendations(5);
            spyOn(mockStrataService, 'recommendations').andCallThrough();
            scope.$root.$digest();
        });
        it('should have a method to populate recommendations For Edit', function () {
            expect(recommendationsService.populatePCMRecommendationsForEdit).toBeDefined();
            caseService.kase.product = 'Red Hat Enterprise Linux';
            caseService.kase.version = '6.0';
            caseService.kase.summary = 'Test Summary';
            caseService.kase.description = 'Test Description';
            recommendationsService.populatePCMRecommendationsForEdit(5);
            spyOn(mockStrataService, 'recommendations').andCallThrough();
            scope.$root.$digest();
        });
    });
    //Suite for CaseListService
    describe('CaseListService', function () {
        it('should have a method to define cases for case list', function () {
            expect(caseListService.defineCases).toBeDefined();
            caseListService.defineCases(mockStrataDataService.mockCases);
            expect(caseListService.cases).toEqual(mockStrataDataService.mockCases);
        });
    });
    //Suite for AttachmentsService
    describe('AttachmentsService', function () {
        it('should have a method to delete Attachment resolved', function () {
            expect(attachmentsService.removeOriginalAttachment).toBeDefined();
            attachmentsService.originalAttachments = [
                {
                    'file_name': 'abc.txt',
                    'uuid': '1234'
                },
                {
                    'file_name': 'xyz.txt',
                    'uuid': '4567'
                }
            ];
            expect(attachmentsService.originalAttachments.length).toBe(2);
            caseService.kase.case_number = '12345';
            attachmentsService.removeOriginalAttachment(0);
            spyOn(mockStrataService.cases.attachments, 'remove').andCallThrough();
            scope.$root.$digest();
            expect(attachmentsService.originalAttachments.length).toBe(1);
        });
        it('should have a method to delete Attachment rejected', function () {
            expect(attachmentsService.removeOriginalAttachment).toBeDefined();
            attachmentsService.originalAttachments = [
                {
                    'file_name': 'abc.txt',
                    'uuid': '1234'
                },
                {
                    'file_name': 'xyz.txt',
                    'uuid': '4567'
                }
            ];
            expect(attachmentsService.originalAttachments.length).toBe(2);
            caseService.kase.case_number = '12345';
            mockStrataService.rejectCalls();
            spyOn(mockStrataService.cases.attachments, 'remove').andCallThrough();
            attachmentsService.removeOriginalAttachment(0);
            scope.$root.$digest();
            expect(attachmentsService.originalAttachments.length).toBe(2);
        });
        it('should have a method to add new Attachment', function () {
            expect(attachmentsService.addNewAttachment).toBeDefined();
            var attachment = {
                    file_name: 'test.txt',
                    uuid: '1234'
                };
            expect(attachmentsService.updatedAttachments.length).toBe(0);
            attachmentsService.addNewAttachment(attachment);
            expect(attachmentsService.updatedAttachments.length).toBe(1);
        });
        it('should have a method to remove Attachment from list', function () {
            expect(attachmentsService.removeUpdatedAttachment).toBeDefined();
            attachmentsService.updatedAttachments = [
                {
                    'file_name': 'abc.txt',
                    'uuid': '1234'
                },
                {
                    'file_name': 'xyz.txt',
                    'uuid': '4567'
                }
            ];
            expect(attachmentsService.updatedAttachments.length).toBe(2);
            attachmentsService.removeUpdatedAttachment(1);
            expect(attachmentsService.updatedAttachments.length).toBe(1);
        });
        it('should have a method to update Attachments resolved', function () {
            expect(attachmentsService.updateAttachments).toBeDefined();
            attachmentsService.originalAttachments = [
                {
                    'file_name': 'abc.txt',
                    'uuid': '1234'
                },
                {
                    'file_name': 'xyz.txt',
                    'uuid': '4567'
                }
            ];
            attachmentsService.updatedAttachments = {
                'attachment': [
                    {
                        'file_name': 'abc.txt',
                        'uuid': '1234'
                    },
                    {
                        'file_name': 'xyz.txt',
                        'uuid': '4567'
                    },
                    {
                        'file_name': 'pqr.txt',
                        'uuid': '5678'
                    }
                ]
            };
            attachmentsService.updateAttachments('12345');
            spyOn(mockStrataService.cases.attachments, 'post').andCallThrough();
            scope.$root.$digest();
            expect(attachmentsService.originalAttachments.length).toBe(3);
        });
        it('should have a method to update Attachments rejected', function () {
            expect(attachmentsService.updateAttachments).toBeDefined();
            attachmentsService.originalAttachments = [
                {
                    'file_name': 'abc.txt',
                    'uuid': '1234'
                },
                {
                    'file_name': 'xyz.txt',
                    'uuid': '4567'
                }
            ];
            attachmentsService.updatedAttachments = {
                'attachment': [
                    {
                        'file_name': 'abc.txt',
                        'uuid': '1234'
                    },
                    {
                        'file_name': 'xyz.txt',
                        'uuid': '4567'
                    },
                    {
                        'file_name': 'pqr.txt',
                        'uuid': '5678'
                    }
                ]
            };
            mockStrataService.rejectCalls();
            spyOn(mockStrataService.cases.attachments, 'post').andCallThrough();
            attachmentsService.updateAttachments('12345');
            scope.$root.$digest();
            expect(mockStrataService.cases.attachments.post).toHaveBeenCalledWith(undefined, '12345');
            expect(attachmentsService.originalAttachments.length).toBe(2);
        });
        it('should have a method to define Original Attachments', function () {
            expect(attachmentsService.defineOriginalAttachments).toBeDefined();
            var attachments = [
                    {
                        'file_name': 'abc.txt',
                        'uuid': '1234'
                    },
                    {
                        'file_name': 'xyz.txt',
                        'uuid': '4567'
                    }
                ];
            attachmentsService.defineOriginalAttachments(attachments);
            expect(attachmentsService.originalAttachments).toEqual(attachments);
            attachments = null;
            attachmentsService.defineOriginalAttachments(attachments);
            expect(attachmentsService.originalAttachments).toEqual([]);
        });
        it('should have a method to update BackEnd Attachments', function () {
            expect(attachmentsService.updateBackEndAttachments).toBeDefined();
            attachmentsService.updateBackEndAttachments(mockStrataDataService.mockAttachments);
            expect(attachmentsService.backendAttachments).toEqual(mockStrataDataService.mockAttachments);
        });
    });
});
