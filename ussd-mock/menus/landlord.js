const landlordApiFuncs = require('./landproperties');

module.exports = menu => {
    menu.state('Landlord', {
        run: function() {
            const {
                val,
                args: {phoneNUmber}
            } = menu

            menu.con(`Welcome ${phoneNUmber}: ' +
            '\n1. Enter Your PIN`)

        },
        next: {
            '*\\d+' : 'LandlordMenu'
        }
    })
    /*
    //Authenticate Landlord
    menu.state('Landlord.Pin', {
        run: function(){
            
            menu.con('Pin Entered Successfully')  
        },
        next: {
            '*\\d+': 'LandlordMenu'
        }
    })
    */

    menu.state('LandlordMenu', {
        run: function() {
        menu.con('Welcome. Select to continue:' +
                '\n1. Properties' +
                '\n2. Current Collection' +
                '\n3. Apply Advance' +
                '\n4. Mini-Statement' +
                '\n5. Cancel');
        },
        next: {
            '1': 'Properties',
            '2': 'Collection',
            '3': 'Advance',
            '4': 'Statement',
            '5': 'Cancel'
        },
        defaultNext: 'invalidOption'
    })
    
    menu.state('Properties', {
        run: async function() {
            const landlordProperties = await landlordApiFuncs.getLandlordProperties(params);
            const response = `Your properties are ${landlordProperties}`;
            menu.con(response);
        }
    })
    
    menu.state('Collection', {
        run: function() {
            menu.con('Your collection for this month are:' 
            //Api route to landlord collections
            )
    
        }
    })
    
    menu.state('Advance', {
        run: function() {
            menu.con('Enter Amount: ')
        },
        next: {
            '*\\d+': 'Advance.amount'
        }
    })
    
    menu.state('Advance.amount', {
        run: function() {
            //Use menu.val to access user input value
            var amount = Number(menu.val)
            Advance(menu.args.phoneNUmber, amount).then(function(res) {
                menu.con('We have received your Advance request of ,' + amount +
                '\n You will receive a message shortly ' +
                '\n1. Cancel') 
            })
        },
        next: {
            '*\\d+' : 'Cancel'
        }
    })
    
    menu.state('Statement', {
        run:function() {
            menu.con('Your ministatement will be sent shortly' +
                '\n1. Cancel')
        },
        next: {
            '*\\d+' : 'Cancel'
        }
    })
    
    menu.state('Cancel', {
        run:function() {
            menu.end('Cancel')
        },
        defaultNext: 'invalidOption'
    })
    
    return menu
}
