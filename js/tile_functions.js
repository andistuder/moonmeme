function preload_images(element_id) {
    var element = document.getElementById(element_id);
    [...Array(28).keys()].forEach(function(i) {
        element.appendChild(_image_node(i));
    });
}

function _image_node(image_id) {
    var image_node = document.createElement('IMG');
    image_node.src = "images/moon-" + image_id + ".jpg";
    image_node.height = "1";
    image_node.width = "1";
    return image_node;
}

function print_row(person, row_length) {
    var first_image_id = compute_image_id(person.date_ob);
    var row_node = document.createElement('div');
    row_node.classList = ['row'];
    row_node.dataset.dob = person.date_ob.getTime();
    _append_personal_details(row_node, person);
    var image_id;
    [...Array(row_length).keys()].forEach(function(i) {
        image_id = ((i + first_image_id + 28) % 28);
        row_node.appendChild(_moon_node(image_id));
    });
    return row_node;
}


function insert_row(element_id, person, row_length) {
    var row_node = print_row(person, row_length);
    var all_rows = document.getElementsByClassName("row");
    var timestamp = parseInt(row_node.dataset.dob);
    for (var i=0, max=all_rows.length; i < max; i++) {
        if (timestamp < parseInt(all_rows[i].dataset.dob)) {
            document.getElementById(element_id).insertBefore(row_node, all_rows[i]);
            break;
        } else if(i == all_rows.length -1) {
            document.getElementById(element_id).appendChild(row_node);
        }

    }
}

function append_row(element, person, row_length) {
    setTimeout(function(){
        var row_node = print_row(person, row_length);
        element.appendChild(row_node);
        // do other things
    }, 400);
}

function _append_personal_details(row_node, person) {
    var node = document.createElement('div');
    node.classList = ['name'];
    node.appendChild(document.createTextNode(person.dob.split(' ')[0]));
    node.appendChild(document.createElement('br'));
    node.appendChild(document.createTextNode(person.name));
    row_node.appendChild(node);
}


function _moon_node(image_id) {
    var node = document.createElement('div');
    node.classList = ['moon'];
    node.style = 'background-image: url(\"images/moon-' + image_id + '.jpg\")';
    return node;
}

function parse_person(form_data) {

    var dob = form_data.get('year') + '-' +
        form_data.get('month') + '-' +
        form_data.get('day');

    if (form_data.get('minute') && form_data.get('hour')) {
        dob = dob + ' ' +
            ('0' + form_data.get('hour')).slice(-2) + ':' +
            ('0' + form_data.get('minute')).slice(-2);
    }

    return {
        dob: dob,
        name: form_data.get('name')
    };
}

function send_data(person) {
    var newPostKey = firebase.database().ref().child('people').push().key;
    var updates = {};
    updates['/people/' + newPostKey] = person;
    return firebase.database().ref().update(updates);
}

function load_people(element_id) {
    firebase.database().ref().on("value", function(snapshot) {
        var records = snapshot.val().people
        var people = [];
        var record;
        var dob_string;
        var element = document.getElementById(element_id);
        for (var key in records) {
            record = records[key];
            dob_string = (record.dob.length < 11) ? record.dob + ' 12:00' : record.dob;

            record.date_ob = new Date(dob_string);
            people.push(record);
        }

        people = people.sort(function(a, b){return a.date_ob-b.date_ob});

        people.forEach(function(person) {
            // console.log(person);
            append_row(element, person, 365);
        });
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function update_moonpic(element_id, image_id) {
    document.getElementById(element_id).src = "images/moon-" + image_id + ".jpg";
}

function init_firebase() {
    var config = {
        apiKey: "AIzaSyBAc-y_cSMAKD3O2veGCoOXPX1Lck_03lI",
        authDomain: "moonmeme-d632f.firebaseapp.com",
        databaseURL: "https://moonmeme-d632f.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "324764381108"
    };
    firebase.initializeApp(config);
}

function send_initial_dataset() {
    var people = all_people();
    people.forEach(function(person) {
        console.log(send_data(person));
    });
}

function hide_element(element_id) {
    document.getElementById(element_id).style.display = 'none';
}
