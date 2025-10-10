![MAEL](https://github.com/Yobeco/MAEL_Phono_fouille/blob/main/readme_assets/Logo-MAEL-120.png "Logo du projet MAEL")

# MAEL Phrases

*Une application appartenant au [__projet MAEL__](https://github.com/Yobeco/MAEL_Project)*   
Copyright (c) 2023 Yonnel Bécognée

[![License: Libre Non Commerciale](https://img.shields.io/badge/license-GNU%20GENERAL%20PUBLIC%20LICENSE%20V3-white.svg)](./LICENSE)

[![HTML](https://img.shields.io/badge/HTML-V5-E0E0E0?logo=html5&logoColor=FF8000)](https://html.spec.whatwg.org/multipage/) [![CSS](https://img.shields.io/badge/CSS-V4-E0E0E0?logo=css&logoColor=0080FF)]() [![JavaScript](https://img.shields.io/badge/JavaScript-ES2025-E0E0E0?logo=javascript&logoColor=FFE010)](https://www.javascript.com/) 

[![PostgresSQL](https://img.shields.io/badge/PostgresSQL-V18-99FFFF?logo=postgresql&logoColor=009999)](https://www.postgresql.fr/)

[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-009900.svg)](#contributing) [![Beginner friendly](https://img.shields.io/badge/Beginner%20friendly-FF8000)]()

[![Status: Active](https://img.shields.io/badge/status-active-009900.svg)]()

## :fr: [Français](https://github.com/Yobeco/MAEL_Scan) | :gb: English

---

![](https://github.com/Yobeco/MAEL_Project/blob/main/readme_assets/MAEL_Phrase-b-600px.png)


## A- Description :eye:

**MAEL Phrases** est une **application WEB** qui permet à l'élève de créer des phrases dans la langue qu'il est en train d'apprendre, en toute autonomie.   
Son interface est conçue pour être utilisée par un enfant, dés 6 ans :baby:.   

**MAEL Phrases** permet aux élèves ne possédant aucun "parlant" chez lui d'écouter et même de formuler des phrases dans la langue étudiée dans un contexte pédagogique élaboré par son professeur. Elle permet donc au professeur de **booster son enseignement d'une langue** :chart_with_upwards_trend:.

**Potentiellement 55 langues sont implémentables !** :astonished:

:fr: :gb: :es: :portugal: :brazil: :it: :de: :ru: :jp: :cn: :kr: ...

---

## B- Fonctionnalités :clipboard:

**MAEL Phrases** est en version alpha. Il s'agit d'une démonstration de ce qui sera le coeur d'une plateforme pédagogiques permettant à l'enseignant de créer et de suivre la progression des activités sur mesure qu'il a créé pour ses élèves.   
Les élèves se connectant pourront faire ces activités en toute autonomie.

- **Choix de 5 langues* (en haut à droite)
- **Bibliothèque de test** répartie par nature des mots et par thèmes.
- **Ligne de dépôt** pour y mettre les images choisies
- **Bouton pour afficher la phrase correspondante**
- **Oralisation de la phrase** par une voix de synthèse (Préférez Chrome. Malheureusement, la voix de FireFox n'est pas à la hauteur...)

---

## C- Comment utiliser MAEL Phrases ? :blush:

:warning: Préférez Chrome. Malheureusement, la voix de FireFox n'est pas à la hauteur...

---

1. **Glissez / déposez** des images provenant de la bibliothèque en suivant la logique d'une phrase
1. **Appuyeez sur le boutton "bouche"** pour oraliser votre phrase.

---

## D- Principe de fonctionnement :gear:

*(Pour aider à la compréhension du code)*

---

1. Un bibliothèque (très frugale) d'images est générée à partir de fichiers JSON selon des catégories (Classes grammaticales ou thèmes). Il est prévu d'utiliser une basse de données PostgresSQL.
1. Quand ces mots sont déposé sur la ligne de dépôt, ils préparent une liste.
1. Quand on appuie sur le bouton "bouche", la liste est envoyée à l'api D'une IA (Gemini 2.5 pour le moment)
1. Une prompte demandant de créer la phrase la plus logique avec ces mots est créée dans la langue qui a été choisie (Français par défaut)
1. Quand la phrase été reçue par **MAEL Phrases**, elle est affichée à droite du bouton "bouche".
1. La même phrase est envoyée à la voix de synthèse du navigateur.

---

## E- Fonctionnalités à développer :rocket:

1- Créer une plateforme qui permette au porfesseurs de faire des comptes de classes pour gérer ses classes et ses élèves.

2- Créer une base de données PostgresSQL (derrière un backend Kotlin) pour :
- gérer les comptes des professeurs et des élèves.
- gérer les bibliothèques de mots et d'images.

3- Permettre au professeur :
- de créer des groupes d'élèves (par classe, par besoins, par ateliers...),
- d'utiliser les bibliothèques de mots proposées par défault,
- de créer ses propres bibliothèques de mots,
- de partager ses bibliothèques de mots,
- de créer / partager ses propres activités,
- de proposer des activités aux élèves de manière différentiée selon les groupes d'élèves ou même de manière individuelle,
- de voir les productions et l'évolution de ses élèves,
- de proposer de nouvelles activités en fonction des ces résultats...
- de former une nouvelle classe avec les comptes d'élèves déjà enregistrés l'année d'avant.

4- Permettre à l'élève :
- d'entrer de manière sécurisée sur la plateforme avec son compte,
- de faire les activités proposées par son professeur,
- d'accéder une une zone d'activité libre (bac à sable),
- de voir de manière graphique mais simple ses progrès.


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


