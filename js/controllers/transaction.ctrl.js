(function() {
	'use strict';

	angular
		.module('MyCash')
		.controller('TranscationCtrl', TranscationCtrl);

	TranscationCtrl.$inject = ['$http', 'config'];

	function TranscationCtrl($http, config) {

		var vm = this;

		getTransactions();

		init();

		vm.saveTransaction = function(transaction) {
			vm.transactions.push(angular.copy(transaction));

			init();
			vm.balance = calculateBalance(vm.transactions);
		};

		vm.deleteTransaction = function(transaction) {
			var index = vm.transactions.indexOf(transaction);
			vm.transactions.splice(index, 1);

			init();
			vm.balance = calculateBalance(vm.transactions);
		};

		vm.orderBy = function(orderCriteria) {
			vm.orderCriteria  = orderCriteria;
			vm.orderDirection = !vm.orderDirection;
		};

		function init() {
			vm.transaction      = {};
			vm.transaction.type = 'Saque';

			vm.filterBy   = '';
		}

		function calculateBalance(transactions) {
			var balance = 0;

			transactions.forEach(function(item) {
				if (item.type === 'Saque')
					balance -= item.value;

				else
					balance += item.value;
			});

			return balance;
		}

		function getTransactions() {
			$http.get(config.API_URL + '/mocks/transactions.json')
				.success(function(response) {

					vm.transactions = response;
					vm.balance = calculateBalance(vm.transactions);
			});
		}

	}
})();
