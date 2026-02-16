
![MAEL](https://github.com/Yobeco/MAEL_Gen/blob/main/readme_assets/Logo-MAEL-120.png "Logo del proyecto MAEL")

# MAEL Phrases

*Una aplicación perteneciente al [__proyecto MAEL__](https://github.com/Yobeco/MAEL_Project)*   
Copyright (c) 2023 Yonnel Bécognée

[![Licencia: Libre No Comercial](https://img.shields.io/badge/license-GNU%20GENERAL%20PUBLIC%20LICENSE%20V3-white.svg)](./LICENSE)

[![HTML](https://img.shields.io/badge/HTML-V5-FFE5CC?logo=html5&logoColor=FF8000)](https://html.spec.whatwg.org/multipage/) [![CSS](https://img.shields.io/badge/CSS-V4-CCE5FF?logo=css&logoColor=0080FF)]() [![JavaScript](https://img.shields.io/badge/JavaScript-ES2025-FFFFCC?logo=javascript&logoColor=FFE010)](https://www.javascript.com/) 

[![PostgresSQL](https://img.shields.io/badge/PostgresSQL-V18-99FFFF?logo=postgresql&logoColor=009999)](https://www.postgresql.fr/)

[![Contribuciones bienvenidas](https://img.shields.io/badge/contributions-welcome-009900.svg)](#contributing) [![Apto para principiantes](https://img.shields.io/badge/Beginner%20friendly-FF8000)]()

[![Estado: Activo](https://img.shields.io/badge/status-active-009900.svg)]()

## :fr: [Francés](https://github.com/Yobeco/MAEL_Phrases) | :gb: Inglés

---

---

![](https://github.com/Yobeco/MAEL_Project/blob/main/readme_assets/MAEL_Phrase-b-600px.png)

## A- Descripción :eye:

**MAEL Phrases** es una **aplicación WEB** :globe_with_meridians: que permite a los alumnos crear frases en el idioma que están aprendiendo, de manera completamente autónoma.   
Su interfaz está diseñada para ser utilizada por un niño, a partir de los 6 años :baby:.   

**MAEL Phrases** permite a los alumnos que no disponen de ningún “hablante” en casa escuchar e incluso formular frases en el idioma estudiado, dentro de un contexto pedagógico elaborado por su profesor. De este modo, permite al profesor **potenciar su enseñanza de una lengua** :100:

**¡Potencialmente se pueden implementar 55 idiomas!** :astonished:

:fr: :gb: :es: :portugal: :brazil: :it: :de: :ru: :jp: :cn: :kr: ...

---

---

## B- Funcionalidades :clipboard:

**MAEL Phrases** se encuentra en versión alfa. Se trata de una demostración de lo que será el núcleo de una plataforma pedagógica que permitirá al docente crear y seguir el progreso de actividades personalizadas que haya creado para sus alumnos.   
Los alumnos que se conecten podrán realizar las actividades de manera autónoma.

- **Elección de 5 idiomas** (arriba a la derecha) :fr: :gb: :es: :brazil: :cn:
- **Biblioteca de prueba** organizada por naturaleza de las palabras y por temas.
- **Línea de depósito** para colocar las imágenes seleccionadas
- **Botón para mostrar la frase correspondiente**
- **Oralización de la frase** mediante una voz de síntesis (Se recomienda Chrome. Lamentablemente, la voz de Firefox no está a la altura...)

---

---

## C- ¿Cómo usar MAEL Phrases? :blush:

:warning: Prefiera Chrome <img src="https://cdn.simpleicons.org/googlechrome/FFFF" width="24" height="24" style="vertical-align: middle;" />. Lamentablemente, la voz de Firefox <img src="https://cdn.simpleicons.org/firefox/FFFF" width="24" height="24" style="vertical-align: middle;" /> no está a la altura...

---

---

1. **Arrastre y suelte** imágenes provenientes de la biblioteca siguiendo la lógica de una frase
1. **Pulse el botón “boca”** para oralizar su frase.

---

---

## D- Principio de funcionamiento :gear:

*(Para ayudar a la comprensión del código)*

---

---

1. Una biblioteca (muy frugal) de imágenes se genera a partir de archivos JSON <img src="https://cdn.simpleicons.org/json/FFFF" width="24" height="24" style="vertical-align: middle;" /> según categorías (clases gramaticales o temas). Está previsto utilizar una base de datos PostgresSQL <img src="https://cdn.simpleicons.org/postgresql/FFFF" width="24" height="24" style="vertical-align: middle;" />.
1. Cuando estas palabras se depositan en la línea de depósito, preparan una lista.
1. Cuando se pulsa el botón “boca” :lips:, la lista se envía a la API de una IA (Gemini 2.5 <img src="https://cdn.simpleicons.org/googlegemini/FFFF" width="24" height="24" style="vertical-align: middle;" /> por el momento)
1. Se crea un prompt que solicita generar la frase más lógica con estas palabras en el idioma seleccionado (francés :fr: por defecto)
1. Cuando la frase es recibida por **MAEL Phrases**, se muestra a la derecha del botón “boca”.
1. La misma frase se envía a la voz de síntesis :speaking_head: del navegador.

**MAEL Phrase** utilizará un [**back end en Kotlin**](https://github.com/Yobeco/MAEL_Backend) <img src="https://cdn.simpleicons.org/kotlin/FFFF" width="24" height="24" style="vertical-align: middle;" /> (ya iniciado, pero actualmente detenido... :disappointed:) para acceder a [su base de datos](https://github.com/Yobeco/MAEL_Phrases/blob/main/readme_assets/MAEL-Phrase%20-%20Description%20fonctionnelle%20-%20V2.pdf) en **PostgresSQL** <img src="https://cdn.simpleicons.org/postgresql/FFFF" width="24" height="24" style="vertical-align: middle;" />.

---

---

## E- Funcionalidades a desarrollar :rocket:

### 1- Crear una plataforma que permita al profesor crear cuentas para gestionar sus clases y sus alumnos con:

- su propio alojamiento,
- su propio Cloud <img src="https://cdn.simpleicons.org/nextcloud/FFFF" width="24" height="24" style="vertical-align: middle;" /> (para alojar los archivos mp3 utilizados por **MAEl Gen** y **MAEl Scan**),
- su propia IA <img src="https://cdn.simpleicons.org/mistralai/FFFF" width="24" height="24" style="vertical-align: middle;" /> con API,
- su propio servicio de voz de síntesis :speaking_head: con API,
- su propio motor de búsqueda de palabras :mag_right: (inspirado en [Phonofouille](https://github.com/Yobeco/MAEL_Phonofouille)).

### 2- Crear una base de datos PostgresSQL <img src="https://cdn.simpleicons.org/postgresql/FFFF" width="24" height="24" style="vertical-align: middle;" /> (detrás de un backend en Kotlin <img src="https://cdn.simpleicons.org/kotlin/FFFF" width="24" height="24" style="vertical-align: middle;" />) para:

- Gestionar las cuentas de profesores y alumnos :bust_in_silhouette:.
- Gestionar las bibliotecas de palabras e imágenes :books:.
- Gestionar las actividades creadas

### 3- Permitir al profesor gestionar sus alumnos y actividades

- Crear grupos de alumnos :busts_in_silhouette: (por clase, por necesidades, por talleres...),
- Utilizar las bibliotecas de palabras propuestas por defecto,
- Crear sus propias bibliotecas de palabras :bookmark_tabs:,
- Compartir :left_right_arrow: sus bibliotecas de palabras,
- Crear / compartir sus propias actividades,
- Proponer actividades a los alumnos de manera diferenciada :1234: según los grupos de alumnos o incluso de forma individual :compass:,
- Ver las producciones y la evolución de sus alumnos :eyes:,
- Proponer nuevas actividades en función de estos resultados :new: ...
- Formar una nueva clase con las cuentas de alumnos ya registradas el año anterior :scroll:.

### 4- Permitir que el alumno participe

- Acceder de forma segura a la plataforma con su cuenta :heavy_check_mark:,
- Realizar las actividades propuestas por su profesor :computer:,
- Acceder a una zona de actividad libre :grinning: (zona de pruebas),
- Ver su progreso de manera gráfica pero sencilla :chart_with_upwards_trend:.

### 5- Crear una biblioteca de imágenes

- Para ilustrar la [base de datos Minilex](./readme_assets/Minima _Lexical_C1fev25.pdf) (Creada por AMLA Nord)
- Necesitamos ilustraciones de este tipo:
    - que encajen en un formato cuadrado,
    - con fondo recortado,
    - con un trazo negro simple (coloreable posteriormente),
    - muy evocadoras (fáciles de entender para los niños),

![Imágenes de ejemplo](./readme_assets/Images_exemples.png)

### :+1: ¡Propón tu ayuda para el desarrollo de la plataforma MAEL! :raised_hands:

---

---

## F- Participe en el proyecto MAEL :open_hands:

:ring_buoy: Para **obtener ayuda** sobre el uso de MAEL o para **participar en el desarrollo** :computer:, escríbame aquí:

### :mailbox_with_mail: ***[mael@lvh.edu.ni](mailto:mael@lvh.edu.ni)***

### :star2: Colaboradores

:open_hands: ¡Un gran agradecimiento a todas las personas que contribuirán a este proyecto!

| Avatar | Nombre             | GitHub                          | Rol                      |
|--------|--------------------|----------------------------------|--------------------------|
| [<img src="https://github.com/YoBeco.png" width="50" style="border-radius: 50%;">](https://github.com/YoBeco) | Bécognée Yonnel | [@Yobeco](https://github.com/Yobeco) | Mantenedor               |
| [<img src="https://github.com/Nail-yk.png" width="50" style="border-radius: 50%;">](https://github.com/Nail-yk) | Padawan | [@Nail-yk](https://github.com/Nail-yk) | Traducción de la documentación |
| ... | ... | ... | Desarrollador |
| ... | ... | ... | Desarrolladora |
| ... | ... | ... | Ilustrador(a) |

---

---

## G- Pruebe MAEL Phrases en línea

Se trata de una [**versión alfa** de demostración](https://yobeco.github.io/MAEL/index.html) que utiliza por el momento la API de Gemini 2.5 <img src="https://cdn.simpleicons.org/googlegemini/FFFF" width="24" height="24" style="vertical-align: middle;" />.

:warning: Esta no es una versión de producción; realice pruebas de manera moderada :raised_hand: para que todo el mundo pueda beneficiarse de los tokens disponibles.