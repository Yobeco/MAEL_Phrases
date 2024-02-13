// SortableJS library configration script

const containerImg = document.getElementById('container-img');
const containerLine = document.getElementById('container-line');
const poubelle = document.getElementById('poubelle');

Sortable.create(containerImg, {
	group: {
		name: "container-img",
		pull: "clone",
		put: false
	},
	delay : 0,
	animation: 250,
	easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",  // https://easings.net/#easeOutBack
	sort: false, // disable reorganization
});


Sortable.create(containerLine, {
	group: {
		name: "container-img"
	},
	direction: "vertical",     // To prevent elements from moving as soon as the element enters the zone from above.
	animation: 250,
	easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
	ghostClass: "futur-place"
});


Sortable.create(poubelle, {
	group: {
		name: "container-img",
		pull: false,
		put: true
	},


});