// Import the function responsible for finding word translations in JSON files
import { tradFromId } from './json_search.js';

// Golbal variables for language codes :
let mitCode = "frFRA";   // Language code used by MAEL gen/Scan and in JSON (MIT Appinventor)
let ssuCode = "fr-FR";   // Language code used by SpeechSynthesisUtterance()

// ==>  Tab and cards (pictures) refresh function  <==

function actuCorps(dossier, categ_id){

    /********* Initialization: Empty the <div> of its old content *******************/

    // Targeting the Tab's division by its ID
    let containerOnglets = document.getElementById("container-onglets");
    
    // Empty the contents of the Tab's division
    containerOnglets.innerHTML = ' ';

    // Targeting the pictures's division by its ID
    let containerImages = document.getElementById("container-img");
    
    // Empty the contents of pictures's division
    containerImages.innerHTML = ' ';

    /*****************************************************************************************/

    // Creation of JSON file URL
    // URL to obtain: Catalogues/noms/noms.json
    let jsonFileURL = "Catalogues/" + dossier + "/" + categ_id + ".json";
    

    /********************** API fetch() to load the JSON file **************************/
        //  /!\ Need to be on a server! --> python3.10 -m http.server or  --> node.js : live-server
        //  ∈ = Belongs to / Contains in (Appartient à / Contenu dans)
        //  ⊂ = Includes / Containing / Contains (Inclut / Contenant / Contient)

    // fetch() method to retrieve the JSON file of the selected catalog
    fetch(jsonFileURL)
        .then(response => response.json())     // Parsing the JSON response (= converting JSON into a JavaScript object)
        .then(data => {                        // "data" contains the object created from JSON

    /********* Between the braces of the arrow function, everything will be executed *******************/
        
        /*----- Refresh images from tabs/buttons ------- */

        // ==> The themes will appear in the order in which they are written in the JSON.
        // ==> Images will appear according to the "posit" key


            // /!\ Order elements of the "data" object in "posit" key order
            // to control the display order ==> create an application to select the potion
            // https://www.commentcoder.com/trier-tableau-objets-valeurs-js/
            for (let i = 0; i < data.length; i++) {
                data[i].cartes = data[i].cartes.sort((a, b) => (a.posit > b.posit ? 1 : -1))
            }

            // -----------------------------------------------------------------
            // Generate <button> ("horizontal onlets") using :
            //    - JSON themes: "data" objects 
            //    - JSON's colors : objet data[].posit[] A-->Z
            // -----------------------------------------------------------------

            // Target the <div> element with the id "container-onglets".
            let containerOnglets = document.getElementById("container-onglets");

            let countOngletTheme = 0;          // Counter to generate tab's id


            data.forEach(obj => {
                if (obj.theme) {       // For each "theme" if there is one:

                    // |======> Create a <button> object as a horizontal tab in the workbook <=======|

                    let new_button = document.createElement("button");
                    new_button.type = "button";

                    // Button image link creation (Always based on the theme name)
                    //  /!\ The image and folder must have the same name as the theme.
                    let source_img = '<img src="Catalogues/' + dossier + '/themes/'+ obj.theme + '.png" />';
                    
                    new_button.innerHTML = source_img;
                    new_button.className = "onglet";        // Add a CSS class to it
                    new_button.id = countOngletTheme;       // Add an id (= value of the chosen theme)
                    new_button.style.backgroundColor = data[countOngletTheme].couleur;    // New background color from JSON

                    // On click, launch the image display function and add the "active" class
                    new_button.addEventListener("click", function () {afficheIMG(this.id); openTabClasseur(this.id)});
                    
                    // On startup, theme 0 receives the CSS theme .onglet.active{}
                    if (countOngletTheme == 0){
                        new_button.classList.add("active");
                    }

                    // Put the <button> inside the "container-tabs" division
                    containerOnglets.appendChild(new_button);

                    // |========================================|

                    // Increment to advance the JSON main table to the next topic
                    countOngletTheme++;
                }
            });

                // Create an empty division to add a border to the top right of the image area
                let div_trou_onglets = document.createElement("div");
                // Put the <div> inside the "container-tabs" division
                div_trou_onglets.id = "trou_onglets";              // Add an id for CSS
                containerOnglets.appendChild(div_trou_onglets);


                // Define a template containing the language selection list
                var listeTemplate = document.createElement('template');
                listeTemplate.innerHTML = `
                    <select id="liste_pays" name="countries">
                      <!--  https://emojipedia.org/fr/drapeaux  -->
                      <option value="FR">🇫🇷 FR</option>
                      <option value="ES">🇳🇮 ES</option>
                      <option value="EN">🇺🇸 EN</option>
                      <option value="BR">🇧🇷 BR</option>
                      <option value="ZH">🇨🇳 ZH</option>
                    </select>
                `;

                // Clone the template and add the new selection list to the division
                var listeLangues = listeTemplate.content.cloneNode(true);
                div_trou_onglets.appendChild(listeLangues);

                // Correspondence dictionary between language codes
                let pays = [{   code: "FR",         // List code <select>
                                mit : "frFRA",      // Code used to find the word in the json
                                ssu : "fr-FR",      // Code used by SpeechSynthesisUtterance()
                            },
                            {   code: "ES",
                                mit : "esUSA",
                                ssu : "es-419",
                            },
                            {   code: "EN",
                                mit : "enGBR",
                                ssu : "en-GB",
                            },
                            {   code: "BR",
                                mit : "ptBRA",
                                ssu : "pt-BR",
                            },
                            {   code: "ZH",
                                mit : "zhCHN",
                                ssu : "zh-Hans",
                            }
                            ]

                // Target language list
                var selectLang = document.getElementById("liste_pays");

                // Function to retrieve the value (language) selected by the user
                function recupererValeurListe() {
                  return selectLang.value;
                }

                // Listen to the "change" event to display the chosen value
                selectLang.addEventListener("change", function() {
                  var langueChoisie = recupererValeurListe();
                  console.log("Langue choisie : " + langueChoisie);

                // Go to the "country" table to find the value of the codes according to the choice of language.
                for (var i = 0; i < pays.length; i++) {
                  // If the code matches "langueChoisie"
                  if (pays[i].code === langueChoisie) {
                    // Access the value of the "mit" key
                    let mitValue = pays[i].mit;
                    let ssuValue = pays[i].ssu;
                    // Display value
                    console.log("Valeur mit pour " + langueChoisie + " --> " + mitValue);
                    console.log("Valeur ssu pour " + langueChoisie + " --> " + ssuValue);

                    // "mitCode" and "ssuCode" are the global variables used in JSON and by SpeechSynthesisUtterance()
                    mitCode = mitValue;
                    ssuCode = ssuValue;
                    
                    // Stop searching when the value has been found
                    break;
                  }
                }

                });


            // ------------------------------------------------------------------------
            // Creation of <img> for each theme using the "data" object
            // according to the theme chosen by the user
            // ------------------------------------------------------------------------

            function afficheIMG(theme_id) {

                // Retrieve the value selected by the user.
                let valeurSelectionnee = theme_id;
                console.log("Thème cliqué : ", theme_id);

                // Target the division where to display images with the "container-img" id
                let conteneurIMG = document.getElementById("container-img");
                
                // Apply two gradients to the division background, starting with the theme color
                conteneurIMG.style.background = "linear-gradient(to right, "+ data[valeurSelectionnee].couleur +" 0% , #ff000000 15%), linear-gradient(to bottom, "+ data[valeurSelectionnee].couleur +", white)";
                
                // Remove all children from the division (so as not to accumulate images already displayed).
                while (conteneurIMG.firstChild) {
                    conteneurIMG.removeChild(conteneurIMG.firstChild);
                }

                // ==>  Creating <img> elements of the theme  <==
                // Retrieve the URL and id of each image

                // Browse the table of maps for the "valeurSelectionnee" theme in the "data" object

                let image_id = "";

                for (let i = 0; i < data[valeurSelectionnee].cartes.length; i++){

                    // Create an <image> tag (for each element of the table (from 0 to end))
                    let new_image = document.createElement("img");

                    // Assign a source (image URL) from "data".
                    new_image.src = data[valeurSelectionnee].cartes[i].image;
        
                    // Assign an image class (for CSS)
                    new_image.className = "etiquettes";

                    // Add the data-customs needed to return the translation
                    // Use of data-id instead of id because there may be several drop-zone occurrences
                    new_image.setAttribute('data-json', categ_id);
                    new_image.setAttribute('data-theme', data[valeurSelectionnee].theme);
                    new_image.setAttribute('data-id', data[valeurSelectionnee].cartes[i].id);

                    // Each image is associated with the direMot() function, which receives the necessary arguments
                    // to find the right word in the right language...
                    // Need an arrow function (equivalent to lambda in Python), so that it isn't called as soon as it's declared.
                    new_image.addEventListener('click', () => {
                        direMot(categ_id,
                                data[valeurSelectionnee].theme,
                                data[valeurSelectionnee].cartes[i].id);
                    });

                    // Add a default image if the file is not found
                    new_image.setAttribute('onerror', "this.onerror=null; this.src='images/PASDIMAGE.png'");

                    // Add alternative text to the created <img> --> data-id
                    new_image.setAttribute('alt', data[valeurSelectionnee].cartes[i].id);    // ==> /!\ To do: Y place the word in the correct language from the JSON!!!!

                    // Create a CSS style line to select the border color
                    let coul_theme_img = "5px solid" + data[valeurSelectionnee].couleur;     // ==> /!\ To be synchronized with CSS: .etiquettes

                    // Add a mouse-over event handler
                    new_image.addEventListener("mouseenter", function() {
                        // Modify the class to activate the CSS hover style
                        new_image.style.border = coul_theme_img;
                    });

                    new_image.addEventListener("mouseleave", function() {
                        // Return to white border when mouse leaves image
                        new_image.style.border = "5px solid white";                        // ==> /!\ To be synchronized with CSS: .etiquettes
                    });

                    // Add image inside division
                    conteneurIMG.appendChild(new_image);

                };

                // #########################################################################################################

                // Function to be called by new_image.addEventListener();
                // --> Say the word corresponding to the clicked image
                function direMot(json, theme, id){
                    // console.log("JSON :" + json + " Thème :" + theme + " ID :" + id);
                    // Create a temporary list containing the info needed to retrieve the translation
                    let jsonFileURL = "Catalogues/" + json + "/" + json + ".json";

                    // tradFromId(val_JSON, val_theme, val_id_carte, val_langue)
                    tradFromId(jsonFileURL, theme, id, mitCode).then(result => {
                        console.log(result[0]);
                        
                        let parole = new SpeechSynthesisUtterance();
                        parole.lang = ssuCode;     // Language coding: "BCP 47" (Obsolete?)

                        parole.text = result[0];   // 0: word , 1: picture's URL
                        parole.pitch = 1;    // 1 - 2
                        parole.rate = 1;     // 0.5 - 2
                        parole.volume = 1;   // 0 - 1 

                        speechSynthesis.speak(parole);
                    });
                };
            };

            afficheIMG(0);   // To initialize the display with theme 0

        })

    /***********************************************************************************/

        .catch(error => {
            // Handle errors if there's a problem loading the JSON file
            console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
        });

    /***********************************************************************************/

    // Function to add an "active" class to horizontal theme tabs
    // Applies to the activated tab to highlight it with CSS
    function openTabClasseur(x) {

        // Put all the objects of the "onglet" class in an array variable: "onglet_theme".
        let onglet_theme = document.querySelectorAll(".onglet");
        
        // Remove the "active" class from all buttons
        for(let i = 0 ; i < onglet_theme.length; i++){
            onglet_theme[i].classList.remove("active");     // 
        }

        // Give the "active" class to the selected button
        onglet_theme[x].classList.add("active");
    }

}

// #########################################################################################################

// Function to be launched at startup to detect existing categories and create corresponding tabs
function actuCatalog(){ 
    // Parser "catalogs.json" which contains the list of categories to create the vertical tabs

    let catJsonFileURL = "Catalogues/catalogues.json";

    // fetch() method to retrieve the JSON file of the selected catalog
    fetch(catJsonFileURL)
        .then(response => response.json())     // Parsing the JSON response (= converting JSON into a JavaScript object)
        .then(data => {                        // "data" contains the object created from JSON

            // /!\ Order elements of the "data" object in "posit" key order
            // To control the display order ==> create an application to choose the position
            // https://www.commentcoder.com/trier-tableau-objets-valeurs-js/
            data = data.sort((a, b) => (a.posit < b.posit ? 1 : -1))

    /********* Between the braces of the arrow function, everything will be executed *******************/

            // Target the <div> element where to place catalog tabs with id "container-onglets".
            let containerCatalogue = document.getElementById("container-cat");

            let countOngletCatego = 0;          // Counter to generate <div> / tab ids

            data.forEach(obj => {
                // |======> Create a <div> object that will be the vertical tab of the workbook <=======|

                if (obj.titre) { 
                    console.log("Catalogue présent : ", obj.titre);
                }

                let new_ongletCat = document.createElement("div");
                new_ongletCat.type = "div";

                // Find the link to the image of the vertical tab division
                // /!\ The PNG and the folder must have the same name as the id!!!!
                let source_img = '<img src=\"Catalogues/' + obj.dossier + '/'+ obj.id + '.png\" alt=' + '\"' + obj.titre + '\" ' + 'style=\"height: ' + obj.height + '; width: ' + obj.width + ';\" />';
                
                new_ongletCat.innerHTML = source_img + obj.titre;     // Add image and text
                new_ongletCat.className = "bouton_cat";               // Adding a CSS class
                new_ongletCat.id = countOngletCatego;                 // Add an id (= of the button, not the category)
                new_ongletCat.style.backgroundColor = obj.couleur;    // New background color from JSON


                // On click, launch the image display function and add the "active" class
                new_ongletCat.addEventListener("click", function () {actuCorps(obj.dossier, obj.id); openTabCatego(this.id)});
                
                // On startup, the "noms" theme receives the CSS theme .onglet.active{}.
                if (obj.id == "noms"){
                    new_ongletCat.classList.add("active");
                }

                // Place tab inside "container-tabs" division
                containerCatalogue.appendChild(new_ongletCat);

                // |========================================|
                countOngletCatego++;
            })

            // Creation of id division #trou-cat2 last (top)
            // Used to complete the main frame line
            var trou_cat2 = document.createElement('div');

            // Add styles to the division
            trou_cat2.style.borderRight = "2px solid rgba(0, 0, 0, 1)";
            // trou_cat2.style.padding = "0px";
            trou_cat2.style.width = "99%";
            trou_cat2.style.height = "100%";

            // Retrieve division with "container-cat" ID
            var containerCat = document.getElementById('container-cat');

            // Add new division
            containerCat.appendChild(trou_cat2);

        })

    /********************************************************************************************/

        .catch(error => {
            // Troubleshoot errors when loading JSON files
            console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
        });

    /*********************************************************************************************/

    // Function to add an "active" class to vertical category tabs
    // Applies to the activated tab to highlight it with CSS
    function openTabCatego(x) {

        // Put all the objects of the "bouton_cat" class in an array variable: "onglet_categ".
        let onglet_categ = document.querySelectorAll(".bouton_cat");
        console.log("openTabCatego lancée :", onglet_categ[1].classList)
        
        // Remove the "active" class from all buttons
        for(let i = 0 ; i < onglet_categ.length; i++){
        onglet_categ[i].classList.remove("active");     // 
        }

        // Give the "active" class to the selected button
        onglet_categ[x].classList.add("active");
    }
}

// #########################################################################################################

// ==>  Creating the waste garbage can  <==
// It is not yet fully functional: it accumulates elements but does not yet destroy them.

function creaPoub(){
    // Targeting the garbage image
    let poubelleIMG = document.getElementById("poubelle");

    poubelleIMG.addEventListener('dragover', function(event) {
        // Prevent default drag-and-drop behavior
        event.preventDefault();

        // Change image source
        document.getElementById('poubelle').src = 'Medias/Poubelle-ouverte.png';
    });

    poubelleIMG.addEventListener('dragleave', function(event) {
        // Prevent default drag-and-drop behavior
        event.preventDefault();

        // Change image source
        document.getElementById('poubelle').src = 'Medias/Poubelle-fermee.png';
    });

    poubelleIMG.addEventListener('drop', function(event) {
        // Prevent default drag-and-drop behavior
        event.preventDefault();

        // Changer la source de l'image
        document.getElementById('poubelle').src = 'Medias/Poubelle-fermee.png';

        // /!\ To do: need to see how to remove the items deposited in the garbage can!!!!

    });
}

// #########################################################################################################

// ==>  Generate list of IDs for "container-line" elements  <==
// --> To send this list to the AI

// /!\ generList() is not yet fully functional: assynchronism problem 

async function generList(){

    let elementList = [];
    let tradList = [];

    let div = document.getElementById('container-line');
    let promises = []; // Ajout d'un tableau pour stocker toutes les promesses


    div.querySelectorAll('*').forEach(element => {
        // Create a temporary list containing the info needed to retrieve the translation
        let tempList = [];
        tempList.push(element.dataset.json);
        tempList.push(element.dataset.theme);
        tempList.push(element.dataset.id);

        elementList.push(tempList);

        // Create the url of the JSON
        let jsonFileURL = "Catalogues/" + element.dataset.json + "/" + element.dataset.json + ".json";


        // Create a temporary list containing the info needed to retrieve the translation
        //         tradFromId(val_JSON, val_theme, val_id_carte, val_langue)
        promises.push(tradFromId(jsonFileURL, element.dataset.theme, element.dataset.id, mitCode));

    });

    // Waiting for all promises to be resolved
    const results = await Promise.all(promises);

    // Add results to tradList
    results.forEach(result => {
        tradList.push(result[0]);
    });

    console.log(elementList);                                           // Displays the ID list
    console.log('Valeur de "tradList" : ',  tradList);                  // updated after page display?
    return tradList;

}

function direList() {
    let textGenere = document.getElementById('text-genere');
    generList().then(text => console.log(textGenere.innerHTML = text));
}


    /**
    console.log('Valeur de "tradList[0]" : ' + tradList[0]);

    // Creating a synthetic voice object
    let parole = new SpeechSynthesisUtterance();

    // Configure object :
    parole.lang = ssuCode;              // Langue en cours
    parole.text = tradList[0];          // 
    parole.pitch = 1;                   // 1 - 2
    parole.rate = 1;                    // 0.5 - 2
    parole.volume = 1;                  // 0 - 1 

    speechSynthesis.speak(parole);
    **/

// #########################################################################################################

// Add a listner after creating the generList() function to make sure it's already created
// Better than onclick="generList()" directly in the html code
// Script.js loading became assynchronous when it became an ES6 module...
document.getElementById('dire').addEventListener('click', direList);

// #########################################################################################################


// Default theme settings at startup
let dossier = "noms";
let categ_id = "noms";

// Load horizontal tabs and cards
actuCorps(dossier, categ_id);

// Load vertical tabs and cards
actuCatalog();

// Create the waste garbage can
creaPoub();

// #########################################################################################################


