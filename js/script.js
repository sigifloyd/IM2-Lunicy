// Überprüfen, ob der Benutzer die Seite bereits besucht hat
if (!localStorage.getItem('visited')) {
    // Wenn nicht, füge den Eintrag 'visited' im Local Storage hinzu
    localStorage.setItem('visited', true);

    // Führe die Animation aus
    animateLogo(false);
} else {
    localStorage.setItem('visited', true);
    animateLogo(true);

}

function animateLogo(status) {

    if (status == true) {

        // Wenn die Seite bereits besucht wurde, wird die Animation nicht ausgeführt
        console.log('Die Logo-Animation wird nicht ausgeführt.');
        document.querySelector('.logo-hook').classList.remove('logo-animated');
        document.querySelector('.logo-hook').classList.add('logo-small');

    } else {

        console.log('Logo-Animation wird ausgeführt.');


    }


}

document.getElementById('scrollButton').addEventListener('click', function() {
    document.getElementById('scrollTarget').scrollIntoView({ behavior: 'smooth' });
});

function fetchAge() {
    const name = document.getElementById('name').value;
    const country = document.getElementById('country').value;
    const url = `https://api.agify.io?name=${name}&country_id=${country}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.age) {
                resultDiv.innerHTML = `Dein Opfer ist mit hoher Wahrscheinlichkeit <span class="age">${data.age}</span> Jahre alt.`;
                let slider = document.getElementById("myRange");
                slider.classList.remove("hide-thumb");
                slider.classList.add("show-thumb");
                slider.value = data.age;
                animateAge(resultDiv, parseInt(data.age));

                // Hier wird der Code zur Farbänderung basierend auf dem Alter platziert
                var ageElement = document.querySelector('.age');
                var age = parseInt(data.age); // Verwenden Sie das Alter aus der API-Antwort
                if (age < 40) {
                    ageElement.style.color = '#ff0000';
                } else if (age >= 41 && age <= 59) {
                    ageElement.style.color = '#ffff01';
                } else {
                    ageElement.style.color = '#09ff00';
                }
            } else {
                resultDiv.innerHTML = "Keine Daten gefunden. Bitte überprüfen Sie die Eingaben.";
            }
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Daten: ', error);
            document.getElementById('result').innerHTML = "Fehler bei der Anfrage.";
        });
}



function animateAge(resultDiv, targetAge) {
    // Beginne mit 0
    let currentAge = 0;

    // Setze die Intervalldauer (in Millisekunden) zwischen den Schritten
    const intervalDuration = 30; // Zum Beispiel 50ms

    // Berechne die Schritte, die benötigt werden, um das Zielalter zu erreichen
    const totalSteps = Math.ceil(targetAge / 10); // Zum Beispiel: wenn targetAge 45 ist, dann wären es 5 Schritte

    // Erstelle das Intervall, um die Animation zu steuern
    const animationInterval = setInterval(() => {
        // Inkrementiere das aktuelle Alter um 1 Schritt
        currentAge++;

        // Aktualisiere den Text im Ergebnis-Div mit dem aktuellen Alter
        resultDiv.innerHTML = `Dein Opfer ist mit hoher Wahrscheinlichkeit <span class="age">${currentAge}</span> Jahre alt.`;

        applyColor(currentAge);

        // Beende die Animation, wenn das Zielalter erreicht ist
        if (currentAge >= targetAge) {
            clearInterval(animationInterval);
        }
    }, intervalDuration);

    function applyColor(age) {
        var ageElement = resultDiv.querySelector('.age');
        if (age < 40) {
            ageElement.style.color = '#ff0000';
        } else if (age >= 41 && age <= 59) {
            ageElement.style.color = '#ffff01';
        } else {
            ageElement.style.color = '#09ff00';
        }
    }
}













