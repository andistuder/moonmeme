MOONMEME.store = {};

MOONMEME.store.init = function () {
    var config = {
        apiKey: "AIzaSyBAc-y_cSMAKD3O2veGCoOXPX1Lck_03lI",
        authDomain: "moonmeme-d632f.firebaseapp.com",
        databaseURL: "https://moonmeme-d632f.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "324764381108"
    };
    firebase.initializeApp(config);
};

MOONMEME.store.createPerson = function (person) {
    var newPostKey = firebase.database().ref().child('people').push().key;
    var updates = {};
    updates['/people/' + newPostKey] = person;
    return firebase.database().ref().update(updates);
};

MOONMEME.store.createInitialSetOfPeople = function () {
    var people = all_people();
    people.forEach(function(person) {
        console.log(this.createPerson(person));
    });
};
