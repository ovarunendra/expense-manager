app.filter('friendFilter', [ function() {
    return function(inputValue, friend) {
        var outputValue = inputValue;
        if(inputValue && friend){
            outputValue = [];
            _.each(inputValue, function(value){
                var findFriend = _.findWhere(value.friends, {'name': friend});
                if(findFriend !== undefined){
                    outputValue.push(value);
                }
            })
        }
        return outputValue;
    };
}]);
app.filter('currencyConverter', ['expenseService', function(expenseService) {
    return function(inputValue, fromCurrencyId, toCurrencyId) {
        var outputValue = inputValue;
        if(inputValue){
            var currencies = expenseService.getCurrencyType(),
                fromRate = _.findWhere(currencies, {'cId': fromCurrencyId}),
                toRate = _.findWhere(currencies, {'cId': toCurrencyId}),
                converted_amount = (Number(inputValue) / fromRate['rates']) * toRate['rates'];
            outputValue =  converted_amount.toFixed(2);
        }
        return outputValue;
    };
}]);