var angular = require('angular');
require('angular-ui-router');
require('angular-smart-table');
require('angular-animate');

require('ng-cache!./layout/np-pagination.tpl.html');

angular.module('stacksearch', [
  'ui.router',
  'smart-table',
  'ngAnimate'
]);

angular.module('stacksearch').value('API_BASE_PATH', 'http://api.stackexchange.com/2.2');

require('./services/questions-service')(angular.module('stacksearch'));
require('./questions/question-detail.controller')(angular.module('stacksearch'));
require('./questions/questions.controller')(angular.module('stacksearch'));
require('./questions/user-questions.controller')(angular.module('stacksearch'));
require('./questions/tag-questions.controller')(angular.module('stacksearch'));

angular.module('stacksearch').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode({enabled: true, requireBase: false});
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
}]);
