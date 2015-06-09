module.exports = function (ngModule) {
  ngModule.controller('QuestionDetailsController', ['$stateParams', 'QuestionsService', function ($stateParams, QuestionsService) {
    var vm = this;

    vm.question = {};
    vm.answers = [];
    vm.getPage = getPage;

    QuestionsService.getQuestionDetails($stateParams.id)
      .success(function (questionDetailsData) {
        vm.question = questionDetailsData.items[0];
      });

    function getPage(tableState) {
      var params = {
        page: tableState.pagination.start / tableState.pagination.number + 1,
        pageSize: tableState.pagination.number
      };

      if (tableState.sort) {
        params.sort = tableState.sort.predicate;
        params.order = tableState.sort.reverse ? 'desc' : 'asc';
      }

      QuestionsService.getQuestionAnswers($stateParams.id, params)
        .success(function (data) {
          vm.answers = data.items;
          var currentPage = tableState.pagination.start / tableState.pagination.number + 1;
          tableState.pagination.numberOfPages = data.has_more ? currentPage + 1 : currentPage;
        });
    }
  }]);
};