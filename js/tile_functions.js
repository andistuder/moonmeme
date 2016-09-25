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
    var first_image_id = compute_image_id(new Date(dob));
    _append_personal_details(element_id, person);
    [...Array(row_length).keys()].forEach(function(i) {
        var image_id = ((i + first_image_id + 28) % 28);
        document.getElementById(element_id).appendChild(_moon_node(image_id));
    });
    _append_clearfix(element_id);
}

function _append_personal_details(element_id, person) {
    var node = document.createElement('div');
    node.classList = ['name'];
    node.appendChild(document.createTextNode(person.dob.split(' ')[0]));
    node.appendChild(document.createElement('br'));
    node.appendChild(document.createTextNode(person.name));
    document.getElementById(element_id).appendChild(node);
}

function _append_clearfix(element_id) {
    var node = document.createElement('div');
    node.classList = ['clearfix'];
    document.getElementById(element_id).appendChild(node);
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
