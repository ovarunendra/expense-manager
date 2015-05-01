app.controller('ExpenseController', ['expenseService', '$filter',
    function(expenseService, $filter) {
        var ctrl = this;
        ctrl.expense = {};
        ctrl.types = expenseService.getType();  //get types and store in controller scope
        ctrl.friendsList = expenseService.getFriends();  //get friend list and store in controller scope
        ctrl.currencies = expenseService.getCurrencyType(); //get currency details and store in controller scope
        ctrl.expenseList = expenseService.getExpenses(); //get expense details and store in controller scope
        ctrl.expense.type = ctrl.types[0];  //set first type as default
        ctrl.expense.currency = ctrl.currencies[0]; //set first currency as default
        ctrl.filterCurrency = ctrl.currencies[0]; //set first currency as default
        ctrl.resetExpense = _.clone(ctrl.expense);  // get clone of default form

        ctrl.dateFormat = 'dd/MM/yyyy';  //date format
        /*method to open calendar*/
        ctrl.openCalender = function(event){
            event.preventDefault();
            event.stopPropagation();
            ctrl.opened = true; // open calendar
        };
        /*method to add a new friend*/
        ctrl.addFriend = function() {
            /* if new friend details */
            if(ctrl.newFriend) {
                expenseService.addNewFriend(ctrl.newFriend);  //add new friend in the friend list
                ctrl.newFriend = '';  // clear the ng-model for new-friend
            }
        };
        /*method to add expense in expense data*/
        ctrl.addExpense = function(){
            // check for edit mode
            if(ctrl.editMode){
                ctrl.expenseList = expenseService.updateExpense(ctrl.expense, ctrl.expense.itemId); //update the previous data
                ctrl.editMode = false;  //set edit mode as false
            } else{
                ctrl.expenseList = expenseService.saveExpense(ctrl.expense);  // save a new expense
            }
            ctrl.expense = _.clone(ctrl.resetExpense); //reset the form to default
        };
        /*method to edit the selected expense in expense data*/
        ctrl.editExpense = function (expense) {
            ctrl.editMode = true;  //set edit mode as true
            _.extend(ctrl.expense, expense);  // get the selected record and set in form fields
            ctrl.expense.date = $filter('date')(ctrl.expense.date, ctrl.dateFormat);  //convert date to string format
        };
        /*method to delete the selected expense from expense data*/
        ctrl.deleteExpense = function (itemId) {
            // ask for confirmation
            var deleteExpense = confirm("Do you want to Delete the selected expense?");
            if(deleteExpense){
                expenseService.removeExpense(itemId); // remove the selected item form expense data
            }
        };
        /*method to sort the records based on dates*/
        ctrl.orderByDate = function(item) {
            var date = $filter('date')(item.date, ctrl.dateFormat);
            var parts = date.split('/'); // we know the date format is dd/MM/yyyy
            var number = parseInt(parts[2] + parts[1] + parts[0]);
            return -number;
        };
    }
]);
