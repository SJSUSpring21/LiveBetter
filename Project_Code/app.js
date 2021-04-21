var lat;
var long;
function initialize() {
    var input = document.getElementById('searchTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        lat = place.geometry.location.lat();
        long = place.geometry.location.lng();
    });
}
google.maps.event.addDomListener(window, 'load',initialize);

function scrolldiv() {
    var elem = document.getElementById("down");
    elem.scrollIntoView();
    }