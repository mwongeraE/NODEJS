const auth = require('../auth')

module.exports = menu => {
    menu.state('Tenant', {
        run: function() {

            menu.con('Welcome tenant. Select to continue: ' +
                '\n1. PayRent' +
                '\n2. RaiseQuery' +
                '\n3. MyAccount' +
                '\n4. Cancel')
        }, 
        next: {
            '1': 'PayRent',
            '2': 'RaiseQuery',
            '3': 'MyAccount',
            '4': 'Cancel'
        }
    })

    menu.state('PayRent', {
        run: () => {
            menu.con('Enter amount to pay')
        },
        next: {
            //Using Regex to match user input to next state
            '*\\d+': 'PayRent.amount'
        }
    })

    menu.state('PayRent.amount', {
      run: function() {
        var amount = Number(menu.val)
        PayRent(menu.args.phoneNumber, amount).then(function(res) {
          menu.con('Rent received,' +
            '\n You will receive a message shortly ' +
            '\n1. Cancel') 
        })
        
    },
    next: {
      '*\\d+' : 'Cancel'
    }
  })
  
/*
    menu.state('RaiseQuery', {
        run:function(state){
          menu.con('Hello dear tenant. Select to continue: ' +
          '\n1. House Repairs' +
          '\n2. Book House Viewing' +
          '\n3. Talk to Alfar Living Agent' +
          '\n4. Cancel')
      
        },
        next: {
          '1': 'Repairs',
          '2': 'Viewing',
          '3': 'AlfarAgent',
          '4': 'Cancel'
        }
      })

      menu.state('Repairs', {
        run: function() {
          menu.con('Query received, one of our' +
        '\n customer care agents will be in touch' +
        '\n1. Cancel')
        },
        next: {
          '*\\d+' : 'Cancel'
        }
      })

      menu.state('Viewing', {
        run: function() {
          menu.con('Query received, one of our' +
        '\n customer care agents will be in touch' +
        '\n1. Cancel')
        },
        next: {
          '*\\d+' : 'Cancel'
        }
      })

      menu.state('AlfarAgent', {
        run: function() {
          menu.con('Query received, one of our' +
        '\n customer care agents will be in touch' +
        '\n1. Cancel')
        },
        next: {
          '*\\d+' : 'Cancel'
        }
      })
      */
      
      menu.state('MyAccount', {
          run: function(){
            menu.con('Enter your PIN:');
      
          },
          next: {
            '*\\d+': 'TenantMenu'
          }
      })
      /*
      menu.state('MyAccount.pin', {
          run: function(){
              return auth
          },
      
          next: {
            '*\\d+': 'TenantMenu'
          }
        })
        */
      
      menu.state('TenantMenu', {
          run: function() {
          menu.con('Select to continue:' +
                '\n1. Check balance' +
                '\n2. MiniStatement' +
                '\n3. Issue Notice' +
                '\n4. Exit/Cancel'
              )
        },
        next: {
            '1': 'CheckBalance',
            '2': 'MiniStatement',
            '3': 'IssueNotice',
            '4': 'Exit'
        }
      })
      
      menu.state('CheckBalance', {
          run: function(state){
            //fetch balance
            fetchBalance(menu.args.phoneNumber).the
            menu.con('Your Balance is 1000' +
            '\n1. Cancel')
          },
          next: {
            '*\\d+' : 'Cancel'
          }
      })
      
      menu.state('MiniStatement', {
          run: function() {
            menu.con('You will receive your MiniStatement shortly' +
            '\n1. Cancel')
          },
          next: {
            '*\\d+' : 'Cancel'
          }
      })
      
      menu.state('IssueNotice', {
        run: function() {
          menu.con('We have received your Notice' +
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
}