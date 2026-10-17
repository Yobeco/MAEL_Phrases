//      MAEL V0.5 - Version sécurisée avec Proxy Cloudflare
//      Objectifs de la version :
//      Utilisation d'un proxy (Cloudflare Worker) pour cacher la clé API Gemini.
//      Correction de l'affichage des images au démarrage.

// Import the function responsible for finding word translations in JSON files
import { tradFromId } from './json_search.js';

// Golbal variables for language codes :
let globalCode = "FR";   // Golbal variable for <select>
let mitCode = "frFRA";   // Language code used by MAEL gen/Scan and in JSON (MIT Appinventor)
let ssuCode = "fr-FR";   // Language code used by SpeechSynthesisUtterance()

// URL de votre Worker Cloudflare déployé
const PROXY_URL = "https://mael-proxy.mael-phrase.workers.dev";

// #########################################################################################################

// Pour réduire l'affichage de certaiens données
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}

// #########################################################################################################

// Function to be called by new_image.addEventListener();
function direMot(json, theme, id){
    let jsonFileURL = "Catalogues/" + json + "/" + json + ".json";

    tradFromId(jsonFileURL, theme, id, mitCode).then(result => {
        console.log("L'id : '" + id + "' --> Le mot : '" + result[0] +"'.");
        
        let parole = new SpeechSynthesisUtterance();
        parole.lang = ssuCode;
        parole.text = result[0];
        parole.pitch = 1;
        parole.rate = 1;
        parole.volume = 1; 

        speechSynthesis.speak(parole);
    });
};

// Make direMot() global for access from options.js
window.direMot = direMot;

// #########################################################################################################

// ==>  Tab and cards (pictures) refresh function  <==
function actuCorps(dossier, categ_id){
    let containerOnglets = document.getElementById("container-onglets");
    containerOnglets.innerHTML = ' ';
    let containerImages = document.getElementById("container-img");
    containerImages.innerHTML = ' ';

    let jsonFileURL = "Catalogues/" + dossier + "/" + categ_id + ".json";

    fetch(jsonFileURL)
        .then(response => response.json())
        .then(data => {
            // Tri des cartes
            for (let i = 0; i < data.length; i++) {
                data[i].cartes = data[i].cartes.sort((a, b) => (a.posit > b.posit ? 1 : -1))
            }

            // Génération des boutons d'onglets
            let countOngletTheme = 0;
            data.forEach(obj => {
                if (obj.theme) {
                    let new_button = document.createElement("button");
                    new_button.type = "button";
                    let source_img = '<img src="Catalogues/' + dossier + '/themes/'+ obj.theme + '.png" />';
                    
                    new_button.innerHTML = source_img;
                    new_button.className = "onglet";
                    new_button.id = countOngletTheme;
                    new_button.style.backgroundColor = data[countOngletTheme].couleur;
                    new_button.addEventListener("click", function () {afficheIMG(this.id); openTabClasseur(this.id)});
                    
                    if (countOngletTheme == 0){
                        new_button.classList.add("active");
                    }
                    containerOnglets.appendChild(new_button);
                    countOngletTheme++;
                }
            });

            // Ajout de la div pour le sélecteur de langue
            let div_trou_onglets = document.createElement("div");
            div_trou_onglets.id = "trou_onglets";
            containerOnglets.appendChild(div_trou_onglets);

            // Template du sélecteur de langue
            var listeTemplate = document.createElement('template');
            listeTemplate.innerHTML = `
                <select id="liste_pays" name="countries">
                  <option value="FR">🇫🇷 FR</option>
                  <option value="ES">🇳🇮 ES</option>
                  <option value="EN">🇺🇸 EN</option>
                  <option value="BR">🇧🇷 BR</option>
                  <option value="ZH">🇨🇳 ZH</option>
                </select>
            `;

            var listeLangues = listeTemplate.content.cloneNode(true);
            div_trou_onglets.appendChild(listeLangues);

            const selectElement = document.getElementById("liste_pays");
            selectElement.value = globalCode;

            let pays = [{ code: "FR", mit : "frFRA", ssu : "fr-FR" },
                        { code: "ES", mit : "esUSA", ssu : "es-419" },
                        { code: "EN", mit : "enGBR", ssu : "en-GB" },
                        { code: "BR", mit : "ptBRA", ssu : "pt-BR" },
                        { code: "ZH", mit : "zhCHN", ssu : "zh-Hans" }];

            var selectLang = document.getElementById("liste_pays");
            selectLang.addEventListener("change", function() {
                var langueChoisie = selectLang.value;
                globalCode = langueChoisie;
                
                for (var i = 0; i < pays.length; i++) {
                  if (pays[i].code === langueChoisie) {
                    mitCode = pays[i].mit;
                    ssuCode = pays[i].ssu;
                    break;
                  }
                }
            });

            // Fonction d'affichage des images
            function afficheIMG(theme_id) {
                let valeurSelectionnee = theme_id;
                let conteneurIMG = document.getElementById("container-img");
                
                conteneurIMG.style.background = "linear-gradient(to right, "+ data[valeurSelectionnee].couleur +" 0% , #ff000000 15%), linear-gradient(to bottom, "+ data[valeurSelectionnee].couleur +", white)";
                
                while (conteneurIMG.firstChild) {
                    conteneurIMG.removeChild(conteneurIMG.firstChild);
                }

                for (let i = 0; i < data[valeurSelectionnee].cartes.length; i++){
                    let new_image = document.createElement("img");
                    new_image.src = data[valeurSelectionnee].cartes[i].image;
                    new_image.className = "etiquettes";
                    new_image.setAttribute('data-json', categ_id);
                    new_image.setAttribute('data-theme', data[valeurSelectionnee].theme);
                    new_image.setAttribute('data-id', data[valeurSelectionnee].cartes[i].id);

                    new_image.addEventListener('click', () => {
                        direMot(categ_id, data[valeurSelectionnee].theme, data[valeurSelectionnee].cartes[i].id);
                    });

                    new_image.setAttribute('onerror', "this.onerror=null; this.src='images/PASDIMAGE.png'");
                    new_image.setAttribute('alt', data[valeurSelectionnee].cartes[i].id);

                    let coul_theme_img = "5px solid " + data[valeurSelectionnee].couleur;
                    new_image.addEventListener("mouseenter", function() { new_image.style.border = coul_theme_img; });
                    new_image.addEventListener("mouseleave", function() { new_image.style.border = "5px solid white"; });

                    conteneurIMG.appendChild(new_image);
                };
            };

            afficheIMG(0); // Initialisation avec le premier thème
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
        });

    // Fonction pour l'onglet actif
    function openTabClasseur(x) {
        let onglet_theme = document.querySelectorAll(".onglet");
        for(let i = 0 ; i < onglet_theme.length; i++){
            onglet_theme[i].classList.remove("active");
        }
        onglet_theme[x].classList.add("active");
    }
}

// #########################################################################################################

// Function to be launched at startup to detect existing categories
function actuCatalog(){ 
    let catJsonFileURL = "Catalogues/catalogues.json";

    fetch(catJsonFileURL)
        .then(response => response.json())
        .then(data => {
            data = data.sort((a, b) => (a.posit < b.posit ? 1 : -1))
            let containerCatalogue = document.getElementById("container-cat");
            let countOngletCatego = 0;

            data.forEach(obj => {
                let new_ongletCat = document.createElement("div");
                new_ongletCat.type = "div";

                let source_img = '<img src=\"Catalogues/' + obj.dossier + '/'+ obj.id + '.png\" alt=' + '\"' + obj.titre + '\" ' + 'style=\"height: ' + obj.height + '; width: ' + obj.width + ';\" />';
                
                new_ongletCat.innerHTML = source_img + obj.titre;
                new_ongletCat.className = "bouton_cat";
                new_ongletCat.id = countOngletCatego;
                new_ongletCat.style.backgroundColor = obj.couleur;

                new_ongletCat.addEventListener("click", function () {actuCorps(obj.dossier, obj.id); openTabCatego(this.id)});
                
                if (obj.id == "noms"){
                    new_ongletCat.classList.add("active");
                }
                containerCatalogue.appendChild(new_ongletCat);
                countOngletCatego++;
            })

            var trou_cat2 = document.createElement('div');
            trou_cat2.style.borderRight = "2px solid rgba(0, 0, 0, 1)";
            trou_cat2.style.width = "99%";
            trou_cat2.style.height = "100%";
            var containerCat = document.getElementById('container-cat');
            containerCat.appendChild(trou_cat2);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
        });

    function openTabCatego(x) {
        let onglet_categ = document.querySelectorAll(".bouton_cat");
        for(let i = 0 ; i < onglet_categ.length; i++){
            onglet_categ[i].classList.remove("active");
        }
        onglet_categ[x].classList.add("active");
    }
}

// #########################################################################################################

// ==>  Creating the waste garbage can  <==
function creaPoub(){
    let poubelleIMG = document.getElementById("poubelle");
    if(!poubelleIMG) return;

    poubelleIMG.addEventListener('dragover', function(event) {
        event.preventDefault();
        document.getElementById('poubelle').src = 'Medias/Poubelle-ouverte.png';
    });

    poubelleIMG.addEventListener('dragleave', function(event) {
        event.preventDefault();
        document.getElementById('poubelle').src = 'Medias/Poubelle-fermee.png';
    });

    poubelleIMG.addEventListener('drop', function(event) {
        event.preventDefault();
        document.getElementById('poubelle').src = 'Medias/Poubelle-fermee.png';
    });
}

// #########################################################################################################

// ==>  Generate list of IDs for "container-line" elements  <==
async function generList(){
    let elementList = [];
    let tradList = [];
    let div = document.getElementById('container-line');
    let promises = [];

    if(!div) return tradList;

    div.querySelectorAll('*').forEach(element => {
        let tempList = [];
        tempList.push(element.dataset.json);
        tempList.push(element.dataset.theme);
        tempList.push(element.dataset.id);
        elementList.push(tempList);

        let jsonFileURL = "Catalogues/" + element.dataset.json + "/" + element.dataset.json + ".json";
        promises.push(tradFromId(jsonFileURL, element.dataset.theme, element.dataset.id, mitCode));
    });

    const results = await Promise.all(promises);

    results.forEach(result => {
        tradList.push(result[0]);
    });

    return tradList;
}

// ##################################################################

// Gemini configuration via Proxy Cloudflare

let promptAI = ""; 
let prompt_xxXXX = ""; 

async function chargPrompt() {
    prompt_xxXXX = "prompt_" + mitCode + ".txt";
    try {
        const response = await fetch(prompt_xxXXX);
        if (!response.ok) throw new Error("Fichier introuvable");
        const data = await response.text();
        promptAI = data;
    } catch (error) {
        console.error('Erreur lors de la récupération du texte du prompt:', error);
        promptAI = "Génère une phrase simple et correcte avec les mots suivants :";
    }
}

async function liste_to_AI(txt0) {
    await chargPrompt();
    const promptToSend = promptAI + "\n\n" + txt0; 

    try {
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: promptToSend })
        });

        if (!response.ok) throw new Error(`Erreur HTTP du proxy: ${response.status}`);
        
        const data = await response.json();
        return data.text; 
    } catch (error) {
        console.error("Erreur lors de l'appel au proxy Cloudflare :", error);
        return "Une erreur est survenue lors de la génération.";
    }
}

// ##################################################################

let text_IA = "";

async function direPhrase() {
    console.log("La fonction direPhrase() a été activée");
    let textGenere = document.getElementById('text-genere');
    textGenere.innerHTML = "Génération en cours...";

    try {
        const listMots = await generList(); 
        text_IA = await liste_to_AI(listMots); 
        textGenere.innerHTML = text_IA;

        let parole = new SpeechSynthesisUtterance();
        parole.lang = ssuCode;
        parole.text = text_IA;
        parole.pitch = 1;
        parole.rate = 1;
        parole.volume = 1; 

        speechSynthesis.speak(parole);
    } catch (e) {
        textGenere.innerHTML = "Erreur de génération.";
    }
}

// #########################################################################################################

// L'écouteur d'événement doit être ajouté une fois que le DOM est prêt.
// Comme script.js est chargé avec type="module", il s'exécute après le parsing du HTML.
const btnDire = document.getElementById('dire');
if (btnDire) {
    btnDire.addEventListener('click', direPhrase);
} else {
    console.error("Le bouton 'dire' n'a pas été trouvé dans le DOM.");
}

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
