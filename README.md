![MAEL](https://github.com/Yobeco/MAEL_Phono_fouille/blob/main/readme_assets/Logo-MAEL-120.png "Logo du projet MAEL")

# MAEL Phrases

*Une application appartenant au [__projet MAEL__](https://github.com/Yobeco/MAEL_Project)*   
Copyright (c) 2025 Yonnel Bécognée

[![License: Libre Non Commerciale](https://img.shields.io/badge/license-GNU%20GENERAL%20PUBLIC%20LICENSE%20V3-white.svg)](./LICENSE)

[![HTML](https://img.shields.io/badge/HTML-V5-E0E0E0?logo=html5&logoColor=FF8000)]()

[![JavaScript](https://img.shields.io/badge/JavaScript-ES2025-E0E0E0?logo=javascript&logoColor=FFE010)]()

[![CSS](https://img.shields.io/badge/CSS-V3.50.4%2B-E0E0E0?logo=css&logoColor=0080FF)]()

[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-009900.svg)](#contributing) [![Beginner friendly](https://img.shields.io/badge/Beginner%20friendly-FF8000)]()

[![Status: Active](https://img.shields.io/badge/status-active-009900.svg)]()

## :fr: [Français](https://github.com/Yobeco/MAEL_Scan) | :gb: English

---

![](https://github.com/Yobeco/MAEL_Project/blob/main/readme_assets/MAEL-Scan2-seul-350px.png)


## A- Description :eye:

**MAEL Scan** est une application pour téléphone portable :iphone: (bientôt, une version Raspberry  Pi <img src="https://cdn.simpleicons.org/raspberrypi/FFFF" width="24" height="24" style="vertical-align: middle;" />) qui permet à l'élève de flasher les code QR créés par son professeur avec **MAEL Gen** et d'écouter leur contenu :speaker:.   
Son interface est conçue pour être utilisée par un enfant, dés 4 ans :baby:.   
Elle ne comporte que 3 gros boutons par défaut.

**MAEL Scan** permet aux élèves ne possédant aucun "parlant" chez lui d'écouter la langue étudiée dans un contexte pédagogique élaboré par son professeur. Elle permet donc au professeur de **booster son enseignement d'une langue** :chart_with_upwards_trend:.

**Potentiellement 55 langues sont implémentables !** :astonished:

:fr: :gb: :es: :portugal: :brazil: :it: :de: :ru: :jp: :cn: :kr: ...

---

## B- Fonctionnalités :clipboard:

- **Scanner** :speaker: : Lance le scan du code QR puis oralise son contenu.
- **Écouter à nouveau** :curly_loop: : Permet de ré-écouter sans re-scanner.
- **Écouter plus lentement** :snail: : Permet de ré-écouter sans re-scanner, mais de manière plus lente (ne fonctionne pas avec les mp3).
- **Lecture "MP3"** :musical_note: : Lors du scan, si le lien point vers un fichier mp3, l'élève entendra ce fichier.
- **Modes spéciaux** : Ce sont des bibliothèques de syllabes au format mp3 (intégrées dans MAEL Scan) car la lecture d'une syllabe unique est parfois de mauvaise qualité avec la voix de synthèse :unamused:. Il y a :
    - les syllabes de l'abécédaire bilingue Consigny (en français et en espagnol)
    - le syllabes de la méthode "Borel-Maisonny" (Syllabes très utilisées, associées à des gestes destinées à aider les enfants dysorthographiques)

---

## C- Comment utiliser MAEL Scan ? :blush:

:warning: Assurez-vous que vous avez [**installé la voix de synthèse**](./readme_assets/MAEL_Scan_tuto.pdf) correspondant la langue utilisée sur votre téléphone.   
Pour ces exemples, installez la voix française :fr:.

---

***⟶ L'élève ne sait pas ce que contient le code QR, il n'a qu'à le flasher.***

1. **Lancez MAEL Scan**
1. **Flasher un code QR généré par MAEL Gen depuis une texte.**

Appuyez sur ce bouton :

![Scan](./readme_assets/Scanner.png)

---

### 1- Si le code QR contient du texte :spiral_notepad:

 |  | Exemple |  | Exemple |  | Exemple |
 |:--------:|--------------------|:--------:|--------------------|:--------:|--------------------|
 | Mode Lecture | ![Code QR de test](./readme_assets/test_text_lec.png) | Mode Dicter | ![Code QR de test](./readme_assets/test_text_dic.png) | Mode Épeler | ![Code QR de test](./readme_assets/test_text_epe.png) |

1. **:speaker: Écouter le contenu du code QR.**

1. **Ré-écouter**

![Ré-écouter](./readme_assets/Reecouter.png)

1. **Ré-écouter plus lentement**

![Ré-écouter](./readme_assets/Lent.png)

*⟶ L'élève entendra une voix de synthèse :speaking_head:*

---

### 2- Si le code QR contient un lien vers un fichier MP3 :microphone:

:sparkles: **[Comment mettre un .mp3 sur Google Drive](https://github.com/Yobeco/MAEL_Gen/blob/main/README.md#2--utiliser-un-fichier-mp3) <img src="https://cdn.simpleicons.org/googledrive/FFFF" width="24" height="24" style="vertical-align: middle;" />**

<!-- Lien vers une page et un titre en particulier. Ne fonctionne pas si le titre contient un icône. Ne fonctionne pas dans tous les éditeurs-->

![Code QR de test](./readme_assets/test_mp3.png)

1. **:speaker: Écouter le fichier mp3.**
1. **Ré-écouter**

![Ré-écouter](./readme_assets/Reecouter.png)

1. **Gérer la lecture du fichier**

![Play](./readme_assets/Play.png) ![Pause](./readme_assets/Pause.png) ![Stop](./readme_assets/Stop.png)

*⟶ L'élève entendra le fichier .mp3. :musical_note:*

---

## D- Principe de fonctionnement :gear:

*(Pour aider à la compréhension du code)*

---

1. **MAEL Scan** scanne un code QR
1. Il **décrypte** le contenu du code QR (Algorithme déjà écrit en Kotlin :+1:).
1. Il extrait le **préfixe** et le **suffixe** avec les [**regex**](https://en.wikipedia.org/wiki/Regular_expression).
1. Il en déduit la **langue**, le **pays** et le **mode** (ou si c'est un **mp3**).
1. Il configure :gear: le module de **synthèse vocale** du téléphone selon la langue et le pays (ou choisit le module de lecture mp3)
1. Il configure :gear: le mode (Lecture / Cacher / Dicter / Éperler) et oralise :speaking_head: le texte comme demandé. 
1. Si c'est un mode spécial , il va chercher l'audio correspondant (intégré à l'appli) :outbox_tray:.

[Document complémentaire](./readme_assets/MAEL_Scan-Pseudo_code_Kotlin.pdf) :spiral_notepad:

>*Annecdote* : la version *MIT App Inventor* ne possède pas les fonctions nécessaires pour décrypter le contenu du code QR. J'ai dû écrire l'algorithme en JavaScript pour l'intégrer dans une page web utlisée par le module **Web** de *MIT App Inventor*.  
Quel détour !!! :grimacing:   
⟶ Une autre raison de la migration vers Kotlin <img src="https://cdn.simpleicons.org/kotlin/FFFF" width="24" height="24" style="vertical-align: middle;" />.

---

## E- Fonctionnalités à développer :rocket:

1- **Mode "dicter"**

- Le _mode dicter_ actuel (oraliser le texte mais ne pas l'afficher) va changer de nom et s'appeler **"Mode cacher"**. :arrows_counterclockwise:

- Le nouveau _mode dicter_ aura :

    - la lecture du texte, mais pas son affichage,
    - l'oralisation de la ponctuation et
    - l'affichage du menu lecture-pause (avec barre de défilement). :play_or_pause_button:

2- **Mode "MP3"**

- Création d'un **MAEL Cloud** :cloud: avec moins de limitations que Google Drive. (hébergé avec la plateforme **MAEL Phrase**).
- Ajout d'une option (suffixe) qui indiquera à **MAEL Scan** qu'il doit conserver le fichier :inbox_tray: pour ne pas à avoir à le re-télécharger s'il est scanné à nouveau.

3- **Mode "épeler"**

*Explication péralable :*   
Pour épeler un texte, **MAEL Scan** contient une structure de données contenant les correspondances entre les lettres et ce qu'il doit dire.

*Exemples :*

 | Lettre | Ce qui sera prononcé |
 |:--------:|--------------------|
 | A | a majuscule |
 | a | a |
 | é | e accent aigü |
 | ç | c cédille |

Cette base de données est très spécifique à chaque langue.
Dans la version *MIT App Inventor* de **MAEL Scan**, ces informations sont stoquées dans une variable de type `dictionnaire` qui prend la forme d'un **immense immeuble :office: de petits blocs** difficile à afficher (et donc à gérer).  
Il parait très compliqué de créer 55 dictionnaires de ce type :face_with_spiral_eyes:, c'est un des facteurs limitant de *MIT App Inventor* et donc une des raisons du passage à Kotlin MP <img src="https://cdn.simpleicons.org/kotlin/FFFF" width="24" height="24" style="vertical-align: middle;" />.

1- **Implémentation d'une base de données SQLite <img src="https://cdn.simpleicons.org/sqlite/FFFF" width="24" height="24" style="vertical-align: middle;" />**

Il faudrait donc utiliser une base de données **SQLite** dont chaque table contiendrait les correspondances `Lettre | Ce qui sera prononcé`.

2- **Gestion des écritures idéogrammiques** :ideograph_advantage:

Comment gérer l'épellation des langages comme le chinois :cn:, le japonais :jp: ou le koréen :kr: ?

Si un(e) spécialiste d'une de ces langues est inétressé(e), il (elle) sera le (la) bienvenu(e) ! :open_hands:

### :+1: Proposez votre aider pour developper une de ces fonctions


---

## F- Participez au projet MAEL :open_hands:

:sos: Pour **obtenir de l'aide** concernant l'utilisation de MAEL ou pour **paticiper au développement** :computer:, écrivez moi ici :

### :mailbox_with_mail: ***[mael@lvh.edu.ni](mailto:mael@lvh.edu.ni)***

### :star2: Contributeurs

Un grand merci à toutes les personnes qui vont contribuer à ce projet !

 | Avatar | Nom                | GitHub                          | Rôle                     |
 |--------|--------------------|---------------------------------|--------------------------|
 | ![Bécognée Yonnel](https://github.com/Yobeco.png?size=50) | Bécognée Yonnel | [@Yobeco](https://github.com/Yobeco) | Mainteneur |
 | ... | ... | ... | Développeur |
 | ... | ... | ... | Développeuse |
 | ... | ... | ... | Traductrice |

---

## G- Installation :arrow_heading_down:

Seule la version Android <img src="https://cdn.simpleicons.org/android/FFFF" width="24" height="24" style="vertical-align: middle;" /> *MIT App Inventor* est fonctionnelle pour le moment.   
:inbox_tray: Pour essayer **MAEL Scan** [Télécharger le fichier MAEL_Scan_V5_0.apk](https://raw.githubusercontent.com/Yobeco/MAEL_Scan/main/binary_exec/MAEL_Scan_V5_0.apk)


