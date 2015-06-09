var angular = require('angular');
require('angular-ui-router');

require('ng-cache!./layout/np-pagination.tpl.html');

var stackSearchModule = angular.module('stacksearch', [
  'ui.router',
  'smart-table'
]);

stackSearchModule.value('API_BASE_PATH', 'http://api.stackexchange.com/2.2');

require('./services/questions-service')(stackSearchModule);
require('./questions/question-detail.controller')(stackSearchModule);
require('./questions/questions.controller')(stackSearchModule);
require('./questions/user-questions.controller')(stackSearchModule);
require('./questions/tag-questions.controller')(stackSearchModule);

stackSearchModule.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  //$locationProvider.html5mode({enabled: true, requireBase: false});
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      template: require('./search/search.html')
    })
    .state('search', {
      url: '/search/:title',
      controller: 'QuestionsController as vm',
      template: require('./questions/questions.html')
    })
    .state('search.user-questions', {
      url: '/user-questions/:id',
      controller: 'UserQuestionsController as vm',
      template: require('./questions/user-questions.html')
    })
    .state('search.tag-questions', {
      url: '/tags/:id',
      controller: 'TagQuestionsController as vm',
      template: require('./questions/tag-questions.html')
    })
    .state('question-details', {
      url: '/questions/:id',
      controller: 'QuestionDetailsController as vm',
      template: require('./questions/question-details.html')
    })
});
