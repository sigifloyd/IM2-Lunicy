// js/script.js

// Funktion `fetchAge` definiert, die aufgerufen wird, wenn der Benutzer auf den Button klickt.
function fetchAge() {
    // Die Werte der Input-Felder für Name und Land werden abgerufen und in Variablen gespeichert.
    const name = document.getElementById('name').value;
    const country = document.getElementById('country').value;

    // Erstellung der URL für die API-Anfrage, die den Namen und den Ländercode enthält.
    const url = `https://api.agify.io?name=${name}&country_id=${country}`;

    // Durchführung der API-Anfrage mit `fetch`, wobei die oben definierte URL verwendet wird.
    fetch(url)
        .then(response => response.json()) // Die Antwort der API wird als JSON verarbeitet.
        .then(data => {
            // Das Element für das Anzeigeergebnis wird abgerufen.
            const resultDiv = document.getElementById('result');

            // Überprüfung, ob ein Alter in den Daten vorhanden ist, und Anzeige des Alters.
            if (data.age) {
                resultDiv.innerHTML = `Dein Opfer ist mit hoher warscheinlichkeit ${data.age} Jahre alt.`;
            } else {
                // Falls keine Daten gefunden wurden, wird eine entsprechende Nachricht angezeigt.
                resultDiv.innerHTML = "Keine Daten gefunden. Bitte überprüfen Sie die Eingaben.";
            }
        })
        .catch(error => {
            // Bei einem Fehler in der Anfrage wird dieser im Konsolen-Log ausgegeben und eine Fehlermeldung angezeigt.
            console.error('Fehler beim Abrufen der Daten: ', error);
            document.getElementById('result').innerHTML = "Fehler bei der Anfrage.";
        });
}
