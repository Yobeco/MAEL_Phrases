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


    // Ajouter l'écouteur d'événement au nouvel élément cloné
	onClone: function (evt) {
		// Retrieve the cloned element's data-id
  		const dataId = evt.clone.dataset.id;

  		// Retrieve the cloned element's data-theme
  		const dataTheme = evt.clone.dataset.theme;

  		// Retrieve the cloned element's data-json
  		const dataJson = evt.clone.dataset.json;

		evt.clone.addEventListener('click', () => {
			// direMot(categ_id, data[valeurSelectionnee].theme, data[valeurSelectionnee].cartes[i].id);
			direMot(dataJson, dataTheme, dataId);
			// console.log("La catégorie : " + categ_id);
		});
	}

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