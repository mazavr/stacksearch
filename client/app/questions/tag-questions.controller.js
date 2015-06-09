module.exports = function (ngModule) {
  ngModule.controller('TagQuestionsController', function (QuestionsService, $stateParams) {
    var vm = this;

    vm.questions = [];
    vm.getPage = getPage;
    vm.tagName = $stateParams.id;

    function getPage(tableState) {
      var params = {
        page: tableState.pagination.start / tableState.pagination.number + 1,
        pageSize: tableState.pagination.number
      };

      QuestionsService.getTagQuestions($stateParams.id, params)
        .success(function (data) {
          vm.questions = data.items;
          var currentPage = tableState.pagination.start / tableState.pagination.number + 1;
          tableState.pagination.numberOfPages = data.has_more ? currentPage + 1 : currentPage;
        });
    }
  })
};