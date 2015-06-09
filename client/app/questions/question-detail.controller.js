module.exports = function (ngModule) {
  ngModule.controller('QuestionDetailsController', ['$stateParams', 'QuestionsService', function ($stateParams, QuestionsService) {
    var vm = this;
    QuestionsService.getQuestionDetails($stateParams.id)
      .success(function (questionDetailsData) {
        vm.question = questionDetailsData.items[0];
      });
  }]);
};