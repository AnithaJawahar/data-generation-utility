var mocker = require('mocker-data-generator').default;
const util = require('util');
const fs = require('fs');

var modelObject = {
    customerId: {
        function: function() {
            return this.faker.random.number({min:10000000000, max:99999999999})
        },
    },
    name: {
        function: function() {
            return this.faker.fake("{{name.firstName}}") + " " + this.faker.fake("{{name.lastName}}")
        },
    },
    balance: {
        faker: 'finance.amount'
    },
    branch: {
        faker: 'address.city'
    },
    event: {
        function: function() {
            return this.faker.random.arrayElement(['deposit', 'Withdrawal', 'balanceEnquiry', 'transfer'])
        },
    },
    date: { 
        faker: 'date.past'
    }

};

mocker()
    .schema('modelObject', modelObject, 1000)
    .build((err, data) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(util.inspect(data, { depth: 10 }))
            fs.writeFile('myjsonfile.json', JSON.stringify(data), 'utf8', (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Done');
                }
            });
        }
    })
