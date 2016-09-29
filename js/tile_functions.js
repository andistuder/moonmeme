function preload_images(element_id) {
    [...Array(28).keys()].forEach(function(i) {
        document.getElementById(element_id).appendChild(_image_node(i));
    });
}

function _image_node(image_id) {
    var image_node = document.createElement('IMG');
    image_node.src = "images/moon-" + image_id + ".jpg";
    image_node.height = "1";
    image_node.width = "1";
    return image_node;
}

function print_row(element_id, person, row_length) {
    // console.log(person.name);
    // console.log(new Date(person.dob));
    // Setting time to midday
    var dob = (person.dob.length < 11) ? person.dob + ' 12:00' : person.dob;
    dob = new Date(dob);
    var first_image_id = compute_image_id(dob);
    var row_node = document.createElement('div');
    row_node.classList = ['row'];
    row_node.dataset.dob = dob.getTime();
    _append_personal_details(row_node, person);
    [...Array(row_length).keys()].forEach(function(i) {
        var image_id = ((i + first_image_id + 28) % 28);
        row_node.appendChild(_moon_node(image_id));
    });
    return row_node;
}


function insert_row(element_id, person, row_length) {
    var row_node = print_row(element_id, person, row_length)
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

function append_row(element_id, person, row_length) {
    var row_node = print_row(element_id, person, row_length)
    document.getElementById(element_id).appendChild(row_node);
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

function update_moonpic(element_id, image_id) {
    document.getElementById(element_id).src = "images/moon-" + image_id + ".jpg";
}
