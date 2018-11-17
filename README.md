# Dokumentasjon
#### Magnus Schjølberg, Åsmund Haugse, Viktor Solberg

## Overordnet beskrivelse av prosjektet
Informasjon om Vinmonopolets produkter ligger fritt tilgjengelig for bruk i egne tjenester.
Vi har i denne oppgaven derfor benyttet oss av deres produktdatabase fra https://www.vinmonopolet.no/datadeling, hentet ut alle produkter
og lagt disse inn i vår egen database som kjører på NTNU sine servere. 

Vi har både trimmet bort
datafelter som vi ikke har sett behov for i vår oppgave, samt lagt til ekstra fiktive felter for tilbakemeldinger
i form av "likes" og "dislikes". For å hente ut dataene har vi implentert et REST api som tillater
oss å hente ut data med http-forespørsler. Disse dataene blir både presentert og visualisert via
nettsiden vår. Den består av en logo øverst, deretter et søkefelt samt tre valg for filtrering av data
på volum, land og type(øl, vin, brennevin, etc..). 

Nederst har siden en tabell som inneholder alle
produkter som blir returnert av søket som sendes til serveren. Den laster inn ti produkter om gangen
og laster inn flere dersom en scroller seg ned til det nederste produktet. Ved å klikke på de
øverste kolonnene (Varenavn, Varetype, Volum, Pris, Land, Alkohol/krone) vil tabellen sorteres
etter den respektive kolonnen som blir klikket. Radene blir da sortert enten alfabetisk eller kronologisk
ved første klikk. Og motsatt-alfabetisk/motsatt-kronologisk ved andre klikk. 

Brukeren av nettsiden har også
mulighet for å se utdypende informasjon om hvert produkt ved å klikke på produktets rad. Da vil
et nytt vindu dukke opp med utdypende informasjon om produktet som blir klikket. Dette vinduet inneholder
informasjon om smak, lukt, hvilke typer mat produktet passer til, årgang og literpris. Vinduet inneholder
også to grafer som illustrerer henholdsvis smakssammensetning og tilbakemeldinger i form av "likes" og
"dislikes". Merk at for produkter som ikke inneholder data for verken friskhet, bitterhet eller sødme
vil grafen om smakssammensetning være blank.






## Teknologier og komponenter
* React
* Redux
* react-redux
* react-thunk
* axios
* react-chart
* react-responsive-modal
* lodash


## Backend


### Mappestruktur
Mappestrukturen i backend-delen av prosjektet er som følger:
```
└───server
    ├───controllers
    │   └───productCtrl.js
    ├───models
    │   └───product.model.js
    ├───routes
    │   └───product.js
    ├───test
    │   └───product.test.js
    ├───.env
    ├───AddCategory.txt
    ├───server.js
    └───viktige_greier.txt

```

##Hvordan bruke REST url:
### Generelt
Basert på hvordan du skriver urlen kan du velge hvilket søk du vil gjøre, hva det skal sorteres på og om det skal være ascending eller descending.
	eks: - localhost:3000/product
	Vil returnere de 10 billigste produktenee

### Basert på kategori/navn
Det er fire kategorier å filtrere på: Varenavn, Varetype, Land, Distrikt. Viktig med Uppercase på første bokstav.
Et eksempel med å velge alle produkter fra Frankrike av typen Rødvin:
	eks: - localhost:3000/product?Land=Frankrike&Varetype=Rødvin
	Vil returnere de 10 billigste rødvinene fra frankrike

### Sortering
For å dekke kravet med sortering har vi lagt til to variabler: sorting og order. Disse er lowercase.
sorting kan være alle mulige kategorier, men anbefaler å bruke de som faktisk kan sorteres korrekt basert på int:
Pris, Literpris, Volum, Varenummer, Alkohol, APK, Liker og Misliker
I utgangspunktet er sorting satt til å være Pris.
Order kan være enten -1 eller 1: Descending eller Ascending.
I utgangspunktet er sorting satt til å være 1: Ascending
	eks: - localhost:3000/product?Land=Frankrike&Varetype=Rødvin&sorting=APK&order=-1
	Vil returnere de 10 rødvinene fra frankrike som gir deg mest alkohol per krone.

### Paginating
For å løse problemet med dynamisk lasting har vi brukt noe som heter paginate. Dette deler rett og slett resultatet
opp i "pages". Variablen page sier hvilken "side" man er på. Denne kan være en av alle tilgjengelige pages.
Her har vi også en variabel limit som sier hvor mange resultater per side.
	eks: - localhost:3000/product?page=1&limit=20
	Vil returnere de 20 billigste produktene.
I frontend delen vil det dermed være naturlig å holde styr på hvilke pages man har lastet inn. Når man skal laste neste side med
resultater gjør man en ny get med page=page+1



## Frontend

### Mappestruktur
Mappestrukturen i frontend-delen av prosjektet er som følger, `/client/src`:
```
└───client
    │───__tests__
    ├───actions
    ├───components
    │   ├───BarChart
    │   ├───DoughnutChart
    │   ├───LineChart
    │   ├───ListView
    │   │   └───ListItem
    │   ├───ModalChart
    │   ├───PieChart
    │   ├───Query
    │   └───Search
    ├───reducers
    ├───store
    ├───App.css
    ├───App.js
    ├───index.css
    ├───index.js
    ├───serviceWorker.js
    ├───uniqueData.json
```
Samtlige undermapper inneholder en `index.js`-fil, i tillegg til et par enkelte css-filer i noen av komponentene.
`uniqueData.json` inneholder json-objekter med alternativene for de forskjellige søkekategoriene.
`actions`, `reducers` og `store` er mappene vi bruker til Redux, med veldig enkelt oppsett.
I tillegg har vi en `resources`-mappe i `public` som inneholder ikoner til tabellen.
### Visualisering av data

### react-responsive-modal
For å hjelpe oss med struktureringen og visualiseringen av dataene som blir hentet ut av databasen har vi benyttet oss av
flere tredjepartskomponenter, blant annet `react-responsive-modal`. Dette er et vindu som dukker opp ved klikk på en rad
i tabellen over produkter som returneres fra databasen. Denne innstalleres ved hjelp av NPM slik:
`npm install 'react-responsive-modal' --save`. Deretter importeres komponenten til prosjektet slik:
`import Modal from 'react-responsive-modal';` Denne komponenten fungerer slik at du selv velger hvilke props du vil
sende inn i den. De viktigste her er `open` og `onClose` som henholdsvis er en boolean som bestemmer om modal skal være
synlig eller ei og en funksjon som vil kjøres når modalen lukkes. Videre kan man veve inn elementer i modalen
 som kan ses på som dens barn. I vårt eksempel har vi vevd inn tekstelementer og react-chart-elementer.

### react-chart
For å utvikle funksjonalitet for å vise dataene med grafer/figurer har vi valgt å implementere `react-chart`. Disse grafene
er innvevd i `react-responsive-modal`-komponenten vi også benytter oss av. Denne komponenten kan innstalleres ved hjelp
av NPM slik: `npm-install react-chartjs-2 chart.js --save`. Deretter importeres grafene til prosjektet slik:
`import {Doughnut, Pie, Line, Bar} from 'react-chartjs-2';`. Man vil da ha fire forskjellige grafer å velge mellom.
I vårt prosjekt har vi sett det som mest hensiktsmessig å benyttet oss av "Doughnut"- og "Bar"-grafen. Disse hjelper oss
med å representere henholdsvis smakssammensetningen og antall "likes"/dislikes for hvert enkelt produkt. Disse komponentene
brukes også ved å sende inn forskjellige props, men den absolutt viktigste er `data` da denne er påkrevd for grafen.
Dette er den dataen du ønsker å representere ved hjelp av grafen. I vårt prosjekt har vi valgt å lage en egen komponent
`ModalChart` som vever inn både Modal-komponenten og Doughnut- samt Bar-grafen.

### Redux
Prosjektet bruker Redux for state management, i henhold til kravet. Redux lar oss ha en såkalt "single source of truth" i Redux Storen, hvor state/tilstanden til samtlige komponenter lagres.
Tilstandene kan gjøres tilgjengelig for de komponentene som trenger det, og vi slipper dermed å sende så mye props via render-funksjonene. I tillegg sørger Redux storen for at vi ikke
lagrer tilstand to steder samtidig, noe som potensielt kan føre til desynkroniserte og uforutsigbar komponentfunksjonalitet.

For å gjøre en endring i Redux storen benytter man seg av såkalte "action"-objekter og "action creators" som lager disse. Disse rapporterer en payload til en reducer, som igjen tar seg av å endre innholdet i state.
For å gjøre tilstand tilgjengelig til de forskjellige komponentene pakker man App.js inn i en provider som er koblet til Redux storen. Deretter kan man ta inn innhold fra store som props inn i App.js eller andre komponenter.

#### Redux Thunk
Redux Thunk er en såkalt "middleware" som lar "action creators" returnere funksjoner i stedet for objekter. Dette er nyttig for å gjøre asynkrone spørringer, som når vi henter fra databasen via REST og axios. 
Ved å returnere en funksjon i stedet for et objekt kan vi kort fortalt tillate forsinkelse i innhenting av verdiene som skal settes til state.

### Søking, sortering of filtrering
I frontend lar vi brukeren gjøre søk i databasen enten ved å søke på navn, velge blant ulike volum, land, kategorier, eller en kombinasjon av disse. Disse søkekriteriene lagres i state og oppdateres on-the-fly ettersom brukeren skriver inn søketekst eller velger blant alternativer.
For å minske antall overflødige spørringer til databasen har vi benyttet oss av debounce-funksjonen i lodash som grupperer flere spørringer sammen og eliminerer identiske spørringer.
Dette kommer godt til nytte blant annet i vårt on-the-fly søkefelt hvor state må oppdateres før en ny spørring kan kjøres. Dette førte til at de ble gjort en spørring for hvert tastetrykk, hvor flere av disse spørringene også ble identiske.
Debounce-funksjonen medfører en liten delay på 300ms men vi mener dette er et rimelig kompromiss ikke bare for å spare serverkapasitet men også for å øke ytelsen på siden.

Videre har vi valgt å kun laste inn ti elementer av gangen, for å ytterligere spare serverkapasitet. når brukeren blar ned til bunnen av siden vil det automatisk lastes inn ti nye ytterligere elementer, eventuelt færre dersom det ikke finnes flere resultater å vise.
I stedet for å laste inn hele resultatsettet på nytt når man blar ned på siden har vi valgt å kontinuerlig lagre resultatsettene i state, og deretter pushe ytterligere elementer inn i eksisterende state. Dette hjelper også på ytelsen og minsker belastningen på server.

For å gjøre sortering av datasettet enkelt har vi benyttet oss av Semantic UIs innebygde sorterings-grensesnitt for tabeller. Ved å trykke på de forskjellige feltene i header-raden kan man velge om man vil ha en stigende eller synkende sortering på dette feltet.
Denne informasjonen sendes så via REST til databasen, som gir oss det korrekte sorterte resultatsettet tilbake. Fordelen med å gjøre sortering i backend er at påfølgende elementer som lastes inn også vil være ferdig sorterte, men en ulempe er derimot at hele det innlastede datasettet må lastes inn på nytt i state.
### Semantic UI
Som UI-bibliotek har vi valgt React-implementasjonen av Semantic UI. Vi har valgt å bruke dette ettersom vi hadde litt kjennskap til biblioteket fra i før, i tillegg til at det har veldig mye ferdig innebygd funksjonalitet.



## Testing

### Cypress
For å gjøre automatisert end-to-end testing har vi i vårt prosjekt benyttet oss av Cypress.
Dette er et verktøy som lar oss skrive automatiserte tester som interagerer med siden på samme måte som et menneske ville gjort.
For å vise grunnleggende ferdigheter i denne typen testing har vi derfor laget to tester som til sammen tester det meste av funksjonalitet på siden.
Du kan kjøre cypress ved å først `cd client` og deretter skrive `npm run cypress`. Du vil da finne tre tester, `navigation_spec.js`, `put_request_spec.js` og `search_query_spec.js` som henholdsvis tester navigering på siden, endring av verdier i databasen og søking i databasen.
Disse kan du kjøre ved å trykke deg inn på de og du skal deretter få opp et nettleser-vindu hvor disse testene kjøres.
Cypress gir også en tidslinje for testingen i venstre sidebar, du kan trykke på de forskjellige hendelsene for å se hva testen så og søkte etter i det tidspunktet.

Cypress-testfilene ligger på følgende sted i prosjektmappen:
```
├───client
│   ├───cypress
│   │   ├───integration
│   │   │   │
│   │   │   ├───navigation_spec.js
│   │   │   ├───put_request_spec.js
│   │   │   └───search_query_spec.js
│   │   │   
│   │   ├───fixtures
│   │   ├───plugins
│   │   └───support
│   ├───public
│   └───src
└───server

```
(`search_query_spec.js`, `put_request_spec.js` og `navigation_spec.js` er testene av interesse)

### Jest
For å hjelpe oss med vårt utvalg av systematiske enhetstester har vi benytet oss av Jest.
For å vise at vi behersker systematisk enhetstesting har vi derfor lagt vekt på å teste komponenter
som ikke inneholder andre komponenter igjen. Alle våre enhetstester ligger lokalisert i `src` ->
`__tests__`. Her har vi implementert både enhetstester og snapshot-tester som sjekker at komponentene rendres
på korrekt vis, samt at propsene vi sender inn i komponentene oppfører seg på korrekt måte.


### Mocha og Chai (Og Istanbul)
Mocha er et testrammeverk som tilrettelegger for enklere asynkron testing. Mocha kjører testene sine serielt, og vi har brukt det i lag med Chai for å kunne bruke Chai sitt 'assertion' bibliotek. Det ga oss veldig leselige tester for backenden. Vi har også brukt Istanbul for å se test-coverage. 



## Kilder

* React Semantic UI:
https://react.semantic-ui.com/

* Vinmonopolet produktdatabase:
https://www.vinmonopolet.no/datadeling

* Visualisering av data - react-chart.js:
https://github.com/jerairrest/react-chartjs-2

* Visualisering av data - react-responsive-modal:
https://www.npmjs.com/package/react-responsive-modal



