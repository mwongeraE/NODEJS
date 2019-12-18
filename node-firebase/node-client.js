var firebase = require('firebase')

firebase.initializeApp({
    apiKey: "AIzaSyCYet5qh4KpCI-G6_yqPjXBHtJNM5g4nqQ",
    appName: "USSD firebase Demo",
    serviceAccount: "./service-account.json",
    authDomain: "ussd-48365.firebaseapp.com",
    databaseURL : "https://ussd-48365.firebaseio.com",
    storageBucket: "ussd-48365.appspot.com"

})

var ref =firebase.app().database().ref()
ref.once('value')
.then(function (snap) {
    console.log('snap.val()', snap.val())
})