// ============================================================================
// Configuration de l'accès sécurisé à l'API Gemini via Cloudflare Worker
// ============================================================================

// URL de votre Worker Cloudflare déployé précédemment.
// La clé API est stockée en sécurité côté serveur (Cloudflare), pas ici.
const PROXY_URL = "https://mael-proxy.mael-phrase.workers.dev";

// Variable globale pour stocker le prompt chargé depuis le fichier texte
let promptAI = ""; 
let prompt_xxXXX = ""; 

/**
 * Charge le contenu du fichier texte de prompt (prompt_frFRA.txt, etc.)
 * en fonction de la langue globale définie dans l'application.
 */
async function chargPrompt() {
    // Mise à jour du nom du fichier selon la langue (mitCode)
    prompt_xxXXX = "prompt_" + mitCode + ".txt";
    console.log("--> Fichier de prompt utilisé : " + prompt_xxXXX);

    try {
        const response = await fetch(prompt_xxXXX);
        if (!response.ok) throw new Error("Fichier de prompt introuvable");
        
        const data = await response.text();
        promptAI = data;
        
        // Log de confirmation (affiche les 120 premiers caractères)
        console.log("Variable 'promptAI' mise à jour : " + promptAI.substring(0, 120) + "...");
    } catch (error) {
        console.error('Erreur lors de la récupération du texte du prompt:', error);
        // En cas d'échec, on définit un prompt de secours pour éviter un crash
        promptAI = "Génère une phrase simple et correcte avec les mots suivants :"; 
    }
}

/**
 * Envoie la liste de mots (sous forme de texte) à l'IA via le proxy sécurisé.
 * @param {string} txt0 - La liste de mots concaténée.
 * @returns {Promise<string>} La phrase générée par l'IA.
 */
async function liste_to_AI(txt0) {
    // 1. On s'assure que le prompt local est chargé (selon la langue active)
    await chargPrompt();
    
    // 2. On prépare le message final à envoyer
    const promptToSend = promptAI + "\n\n" + txt0; 
    console.log("Envoi de la requête au proxy Cloudflare...");

    try {
        // 3. Appel au Worker Cloudflare (qui contient la clé API secrète)
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: promptToSend })
        });

        if (!response.ok) {
            // Gestion des erreurs HTTP (ex: 429 Too Many Requests)
            throw new Error(`Erreur HTTP du proxy: ${response.status}`);
        }

        // 4. Récupération de la réponse JSON du Worker
        const data = await response.json();
        
        // Le Worker renvoie un objet { text: "..." }
        return data.text; 

    } catch (error) {
        console.error("Erreur lors de l'appel au proxy Cloudflare :", error);
        return "Désolé, une erreur est survenue lors de la génération de la phrase. Veuillez réessayer.";
    }
}

// ============================================================================
// Gestion de l'interface (Bouton "Dire" et Synthèse Vocale)
// ============================================================================

// Variable globale pour stocker la phrase générée par l'IA
let text_IA = "";

/**
 * Fonction déclenchée au clic sur le bouton "Dire".
 * Elle récupère la liste de mots, appelle l'IA, affiche le résultat et le vocalise.
 */
async function direPhrase() {
    console.log("La fonction direPhrase() a été activée");
    
    const textGenere = document.getElementById('text-genere'); 
    textGenere.innerHTML = "Génération en cours..."; // Feedback visuel

    try {
        // 1. Récupérer la liste de mots depuis la ligne de dépôt
        const listeMots = await generList(); 
        
        // 2. Envoyer la liste à l'IA (via le proxy) et attendre la phrase
        text_IA = await liste_to_AI(listeMots); 

        console.log("Phrase reçue de l'IA : " + text_IA);

        // 3. Afficher la phrase générée dans l'interface
        textGenere.innerHTML = text_IA;
        
        // 4. Lancer la synthèse vocale
        console.log("Lancement de la synthèse vocale...");
        let parole = new SpeechSynthesisUtterance();
        parole.lang = ssuCode;      // Langue définie globalement dans l'app
        parole.text = text_IA;      // La phrase à lire
        parole.pitch = 1;           // Ton de la voix (1 - 2)
        parole.rate = 1;            // Vitesse (0.5 - 2)
        parole.volume = 1;          // Volume (0 - 1)

        speechSynthesis.speak(parole);

    } catch (error) {
        console.error("Erreur dans le processus de génération :", error);
        textGenere.innerHTML = "Erreur lors de la génération.";
    }
}

// Attacher l'écouteur d'événement au bouton "Dire" une fois le DOM chargé.
// (Le script étant un module, il s'exécute après le parsing du HTML).
document.getElementById('dire').addEventListener('click', direPhrase);

// ============================================================================
// Initialisation de l'application (Code existant à conserver)
// ============================================================================

// Theme par défaut au démarrage
let dossier = "noms";
let categ_id = "noms";

// Charger les onglets horizontaux et les cartes
actuCorps(dossier, categ_id);

// Charger les onglets verticaux et les catégories
actuCatalog();

// Créer la poubelle pour le glisser-déposer
creaPoub();
