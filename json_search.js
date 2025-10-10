/**  
Use the fetch() API to request loading of the JSON file 
Server Python --> python3.10 -m http.server | http://localhost:8000/
Server node.js --> live-server http://127.0.0.1:8080/

fetch() is an asynchronous function that returns a promise, and later... a result! 
It runs in the background while the rest of the code continues to execute.

Using async/await makes the code more readable and easier to understand than using .then().
But await is only used in an asynchronous function (which is not the case for the end of the code...).
With async/await, code is written sequentially, like synchronous code (easier to read and write).
What's more, it's easier to handle errors with try/catch than with .then() and .catch().
*/

/**********************************************************************************
//
//         From id + language + theme (optional) = Return trad & URL
//               Optional theme: slower but more general
//        Use "*" as argument to search without specifying theme 
//
***********************************************************************************/

// Declaration of an asynchronous "tradFromThemFalcId" function
// It will return the translation of the expected word in the JSON according to: val_theme, val_id_carte and val_langue
// "export" allows the function to be used from another script as an ES6 module
// /!\ Remember to import script.js as a module in the HTML!!!!

export async function tradFromId(jsonFileURL, val_theme, val_id_carte, val_langue){
    
    console.log("Module json_search.js utilisé");
    let trad = "";      // Initialization of "trad" which will be returned at the end of the function
    let url = "" ;      // Initialization of "url" which will be returned at the end of the function
    
    // Try/catch block for error handling
    try {
        // Use the "fetch" API to load the JSON file. 
        // "await" is used to wait for the promise to be resolved before continuing.
        const reponse = await fetch(jsonFileURL);

        // Parser JSON response => convert response to JavaScript object
        // "await" is still used to wait for the promise to be resolved
        const data = await reponse.json();

        if (val_theme != "*"){                                          // If a theme has been specified
            data.forEach(obj => {                                       // Browse each object in the general JSON table
                if (obj.theme === val_theme ) {                         // For each "theme" key with the "val_theme" value
                    for (let i = 0; i < obj.cartes.length; i++) {       // Browse each card in the object's "cartes" table
                        if(obj.cartes[i].id === val_id_carte){          // Check if card ID matches "val_id_carte".
                            trad = obj.cartes[i][val_langue];           // If so, the translation is stored in the variable "trad".
                            url = obj.cartes[i].image;                  // and the image URL in "url
                        }
                    }
                }
            });
        } else {                                                        // If no theme specified (* = all)
            data.forEach(obj => {                                       // Browse each object in the general JSON table
                for (let i = 0; i < obj.cartes.length; i++) {           // Browse each card in the object's "cartes" table
                    if(obj.cartes[i].id === val_id_carte){              // Check if card ID matches "val_id_carte".
                        trad = obj.cartes[i][val_langue];               // If so, the translation is stored in the variable "trad".
                        url = obj.cartes[i].image;                      // and the image URL in "url
                    }
                }
            });
        }
    } catch (error) {
            console.error('Une erreur s\'est produite lors du chargement du fichier JSON :', error);
    }
    let info = [trad, url];
    return info;    // Return an "array" variable containing the translation and url of the image
}

