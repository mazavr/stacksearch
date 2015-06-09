require('angular-smart-table');

module.exports = function (ngModule) {
  ngModule.controller('QuestionsController', function (QuestionsService, $stateParams) {
    var vm = this;

    vm.questions = [];
    vm.getPage = getPage;
    vm.searchTitle = $stateParams.title;

    function getPage(tableState) {
      var params = {
        title: $stateParams.title,
        page: tableState.pagination.start / tableState.pagination.number + 1,
        pageSize: tableState.pagination.number
      };

      QuestionsService.getQuestions(params)
        .success(function (data) {
          vm.questions = data.items;
          var currentPage = tableState.pagination.start / tableState.pagination.number + 1;
          tableState.pagination.numberOfPages = data.has_more ? currentPage + 1 : currentPage;
        });
    }
  })
};