module.exports = function (ngModule) {
  ngModule.factory('QuestionsService', ['$http', 'API_BASE_PATH', function ($http, API_BASE_PATH) {
    return {
      getQuestions: getQuestions,
      getUserQuestions: getUserQuestions,
      getQuestionDetails: getQuestionDetails,
      getTagQuestions: getTagQuestions
    };

    function getQuestions(params) {
      return $http.get(API_BASE_PATH + '/search/advanced', {
        params: angular.extend({
          site: 'stackoverflow',
          order: 'desc',
          sort: 'activity',
          pageSize: 10
        }, params)
      });
    }

    function getQuestionDetails(questionId) {
      return $http.get(API_BASE_PATH + '/questions/' + questionId + '?order=desc&sort=activity&site=stackoverflow');
    }

    function getUserQuestions(userId, params) {
      return $http.get(API_BASE_PATH + '/users/' + userId + '/questions', {
        params: angular.extend({
          site: 'stackoverflow',
          order: 'desc',
          sort: 'activity'
        }, params)
      });
    }

    function getTagQuestions(tag, params) {
      return $http.get(API_BASE_PATH + '/search/advanced', {
        params: angular.extend({
          site: 'stackoverflow',
          order: 'desc',
          sort: 'activity',
          tagged: tag
        }, params)
      });
    }
  }])
};