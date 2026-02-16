
![MAEL](https://github.com/Yobeco/MAEL_Gen/blob/main/readme_assets/Logo-MAEL-120.png "MAEL project logo")

# MAEL Phrases

*An application belonging to the [__MAEL project__](https://github.com/Yobeco/MAEL_Project)*   
Copyright (c) 2023 Yonnel Bécognée

[![License: Libre Non Commerciale](https://img.shields.io/badge/license-GNU%20GENERAL%20PUBLIC%20LICENSE%20V3-white.svg)](./LICENSE)

[![HTML](https://img.shields.io/badge/HTML-V5-FFE5CC?logo=html5&logoColor=FF8000)](https://html.spec.whatwg.org/multipage/) [![CSS](https://img.shields.io/badge/CSS-V4-CCE5FF?logo=css&logoColor=0080FF)]() [![JavaScript](https://img.shields.io/badge/JavaScript-ES2025-FFFFCC?logo=javascript&logoColor=FFE010)](https://www.javascript.com/) 

[![PostgresSQL](https://img.shields.io/badge/PostgresSQL-V18-99FFFF?logo=postgresql&logoColor=009999)](https://www.postgresql.fr/)

[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-009900.svg)](#contributing) [![Beginner friendly](https://img.shields.io/badge/Beginner%20friendly-FF8000)]()

[![Status: Active](https://img.shields.io/badge/status-active-009900.svg)]()

## :fr: [Français](https://github.com/Yobeco/MAEL_Phonofouille/blob/main/README.fr.md) | :es: [Español](https://github.com/Yobeco/MAEL_Phonofouille/blob/main/README.es.md)  | :gb: English

![](https://github.com/Yobeco/MAEL_Project/blob/main/readme_assets/MAEL_Phrase-b-600px.png)

## A- Description :eye:

**MAEL Phrases** is a **WEB application** :globe_with_meridians: that allows students to create sentences in the language they are currently learning, completely autonomously.   
Its interface is designed to be used by a child, from the age of 6 :baby:.   

**MAEL Phrases** allows students who do not have any “speaker” at home to listen to and even formulate sentences in the language being studied, within a pedagogical context developed by their teacher. It therefore allows the teacher to **boost their language teaching** :100:

**Potentially 55 languages can be implemented!** :astonished:

:fr: :gb: :es: :portugal: :brazil: :it: :de: :ru: :jp: :cn: :kr: ...

---

## B- Features :clipboard:

**MAEL Phrases** is in alpha version. This is a demonstration of what will be the core of a pedagogical platform allowing teachers to create and monitor the progress of custom activities they have created for their students.   
Connected students will be able to complete the activities autonomously.

- **Choice of 5 languages** (top right) :fr: :gb: :es: :brazil: :cn:
- **Test library** organized by word types and themes.
- **Drop line** to place the selected images
- **Button to display the corresponding sentence**
- **Sentence vocalization** by a synthetic voice (Prefer Chrome. Unfortunately, the Firefox voice is not up to standard...)

---

## C- How to use MAEL Phrases? :blush:

:warning: Prefer Chrome <img src="https://cdn.simpleicons.org/googlechrome/FFFF" width="24" height="24" style="vertical-align: middle;" />. Unfortunately, the Firefox voice <img src="https://cdn.simpleicons.org/firefox/FFFF" width="24" height="24" style="vertical-align: middle;" /> is not up to standard...

---

1. **Drag and drop** images from the library following the logic of a sentence
1. **Press the “mouth” button** to vocalize your sentence.

---

## D- Operating principle :gear:

*(To help with understanding the code)*

---

1. A (very frugal) image library is generated from JSON files <img src="https://cdn.simpleicons.org/json/FFFF" width="24" height="24" style="vertical-align: middle;" /> according to categories (grammatical classes or themes). It is planned to use a PostgresSQL database <img src="https://cdn.simpleicons.org/postgresql/FFFF" width="24" height="24" style="vertical-align: middle;" />.
1. When these words are dropped onto the drop line, they prepare a list.
1. When the “mouth” button :lips: is pressed, the list is sent to an AI API (Gemini 2.5 <img src="https://cdn.simpleicons.org/googlegemini/FFFF" width="24" height="24" style="vertical-align: middle;" /> for now)
1. A prompt asking to create the most logical sentence with these words is generated in the selected language (French :fr: by default)
1. When the sentence is received by **MAEL Phrases**, it is displayed to the right of the “mouth” button.
1. The same sentence is sent to the browser’s text-to-speech voice :speaking_head:.

**MAEL Phrase** will use a [**Kotlin back end**](https://github.com/Yobeco/MAEL_Backend) <img src="https://cdn.simpleicons.org/kotlin/FFFF" width="24" height="24" style="vertical-align: middle;" /> (already started, but currently halted... :disappointed:) to access [its database](https://github.com/Yobeco/MAEL_Phrases/blob/main/readme_assets/MAEL-Phrase%20-%20Description%20fonctionnelle%20-%20V2.pdf) in **PostgresSQL** <img src="https://cdn.simpleicons.org/postgresql/FFFF" width="24" height="24" style="vertical-align: middle;" />.

---

## E- Features to be developed :rocket:

### 1- Create a platform that allows the teacher to create accounts to manage their classes and students with:

- their own hosting,
- their own Cloud <img src="https://cdn.simpleicons.org/nextcloud/FFFF" width="24" height="24" style="vertical-align: middle;" /> (to host the mp3 files used by **MAEl Gen** and **MAEl Scan**),
- their own AI <img src="https://cdn.simpleicons.org/mistralai/FFFF" width="24" height="24" style="vertical-align: middle;" /> with API,
- their own text-to-speech service :speaking_head: with API,
- their own word search engine :mag_right: (inspired by [Phonofouille](https://github.com/Yobeco/MAEL_Phonofouille)).

### 2- Create a PostgresSQL database <img src="https://cdn.simpleicons.org/postgresql/FFFF" width="24" height="24" style="vertical-align: middle;" /> (behind a Kotlin backend <img src="https://cdn.simpleicons.org/kotlin/FFFF" width="24" height="24" style="vertical-align: middle;" />) to:

- Manage teacher and student accounts :bust_in_silhouette:.
- Manage word and image libraries :books:.
- Manage created activities

### 3- Allow the teacher to manage their students and activities

- Create student groups :busts_in_silhouette: (by class, needs, workshops...),
- Use the default proposed word libraries,
- Create their own word libraries :bookmark_tabs:,
- Share :left_right_arrow: their word libraries,
- Create / share their own activities,
- Offer activities to students in a differentiated way :1234: according to student groups or even individually :compass:,
- View student outputs and progress :eyes:,
- Propose new activities based on these results :new: ...
- Form a new class with student accounts already registered the previous year :scroll:.

### 4- Allow the student to participate

- Securely access the platform with their account :heavy_check_mark:,
- Complete the activities proposed by their teacher :computer:,
- Access a free activity area :grinning: (sandbox),
- View their progress graphically but simply :chart_with_upwards_trend:.

### 5- Create an image library

- To illustrate the [Minilex database](./readme_assets/Minima _Lexical_C1fev25.pdf) (Created by AMLA Nord)
- We need illustrations of this type:
    - fitting in a square format,
    - with a cut-out background,
    - simple black line art (colorable later),
    - highly evocative (easy for children to understand),

![Example images](./readme_assets/Images_exemples.png)

### :+1: Offer your help in developing the MAEL platform! :raised_hands:

---

## F- Take part in the MAEL project :open_hands:

:ring_buoy: To **get help** regarding the use of MAEL or to **participate in development** :computer:, write to me here:

### :mailbox_with_mail: ***[mael@lvh.edu.ni](mailto:mael@lvh.edu.ni)***

### :star2: Contributors

:open_hands: A big thank you to everyone who will contribute to this project!

| Avatar | Name               | GitHub                          | Role                     |
|--------|--------------------|---------------------------------|--------------------------|
| [<img src="https://github.com/YoBeco.png" width="50" style="border-radius: 50%;">](https://github.com/YoBeco) | Bécognée Yonnel | [@Yobeco](https://github.com/Yobeco)   | Maintainer                |
| [<img src="https://github.com/Nail-yk.png" width="50" style="border-radius: 50%;">](https://github.com/Nail-yk) | Padawan | [@Nail-yk](https://github.com/Nail-yk) | Documentation translation |
| ... | ... | ... | Developer |
| ... | ... | ... | Developer |
| ... | ... | ... | Illustrator |

---

## G- Try MAEL Phrases online

This is a demonstration [**alpha version**](https://yobeco.github.io/MAEL/index.html) that currently uses the Gemini 2.5 API <img src="https://cdn.simpleicons.org/googlegemini/FFFF" width="24" height="24" style="vertical-align: middle;" />.

:warning: Use Chrome <img src="https://cdn.simpleicons.org/googlechrome/FFFF" width="24" height="24" style="vertical-align: middle;" /> for this demo! The voice in Firefox <img src="https://cdn.simpleicons.org/firefox/FFFF" width="24" height="24" style="vertical-align: middle;" /> is hideous. :disappointed:

:warning: This is not a production version; please test moderately :raised_hand: so that everyone can benefit from the available tokens.