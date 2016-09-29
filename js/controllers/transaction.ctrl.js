(function() {
	'use strict';

	angular
		.module('MyCash')
		.controller('TranscationCtrl', TranscationCtrl);

	function TranscationCtrl() {

		var vm = this;

		vm.transaction      = {};
		vm.transaction.type = 'Saque';

		vm.transactions = getTransactions();

		vm.saveTransaction = function(transaction) {
			vm.transactions.push(transaction);
		};

		vm.deleteTransaction = function(transaction) {
			var index = vm.transactions.indexOf(transaction);

			if (index > -1)
				vm.transactions.splice(index, 1);
		};

		vm.orderBy = function(orderCriteria) {
			vm.orderCriteria  = orderCriteria;
			vm.orderDirection = !vm.orderDirection;
		};

		function getTransactions() {
			return [];
		}

	}
})();
