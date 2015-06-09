module.exports = function (ngModule) {
  ngModule.controller('UserQuestionsController', function (QuestionsService, $stateParams) {
    var vm = this;

    vm.questions = [];
    vm.getPage = getPage;

    function getPage(tableState) {
      var params = {
        page: tableState.pagination.start / tableState.pagination.number + 1,
        pageSize: tableState.pagination.number
      };

      QuestionsService.getUserQuestions($stateParams.id, params)
        .success(function (data) {
          vm.questions = data.items;
          var currentPage = tableState.pagination.start / tableState.pagination.number + 1;
          tableState.pagination.numberOfPages = data.has_more ? currentPage + 1 : currentPage;
        });
    }
  })
};