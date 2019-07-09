function ourLocation() {
	const details = {
		center: new google.maps.LatLng(-1.964660, 30.058325),
		zoom: 15,

		mapTypeId: google.maps.MapTypeId.HYBRID

	};


	const location = new google.maps.Map(document.querySelector('#location'), details);
	let marker = new google.maps.Marker({ 
position: {
		lat: -1.964660, lng: 30.058325
	},
map: location, 
title: 'property', 
label: 'D'
 });
}

OurLocation();
