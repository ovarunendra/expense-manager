app.factory('expenseService', function() {
    var friendsList = [], expenseData = [], count = 0;
    return {
        getFriends: function() {
            friendsList = [{
                'name': 'Andy'
            }, {
                'name': 'Sandy'
            }, {
                'name': 'Randy'
            }, {
                'name': 'Mandy'
            }];
            return friendsList;
        },
        getType: function(){
            var types = [
                {
                    'id': 'card',
                    'desc': 'Card'
                },
                {
                    'id': 'cash',
                    'desc': 'Cash'
                },
                {
                    'id': 'other',
                    'desc': 'Other'
                }
            ];
            return types;
        },
        getCurrencyType: function() {
            var currencies = [
                {
                    'cId': 'dollar',
                    'value': 'USD',
                    'rates': 1
                },
                {
                    'cId': 'rupee',
                    'value': 'INR',
                    'rates': 63.55
                },
                {
                    'cId': 'euro',
                    'value': 'EUR',
                    'rates': 0.89
                }];
            return currencies;
        },
        addNewFriend: function(friend) {
            var newFriend = {'name': friend},
                findFriend = _.findWhere(friendsList, newFriend);
            if(findFriend === undefined){
                friendsList.push(newFriend);
            }
        },
        saveExpense: function(expense){
            expense.itemId = count = count + 1;
            expenseData.push(expense) ;
            return expenseData;
        },
        getExpenses: function() {
            return expenseData;
        },
        updateExpense: function(expense, itemID){
            _.each(expenseData, function(value, key){
                if(value.itemId == itemID) {
                    expenseData[key] = expense;
                }
            });
            return expenseData;
        },
        removeExpense: function (itemID) {
            _.each(expenseData, function(value, key){
                if(value.itemId == itemID){
                    expenseData.splice(key, 1);
                    return;
                }
            })
        }
    }
});
