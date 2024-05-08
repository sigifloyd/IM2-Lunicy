// Überprüfen, ob der Benutzer die Seite bereits besucht hat
if (!localStorage.getItem('visited')) {
    localStorage.setItem('visited', true);

    animateLogo(false);
} else {
    localStorage.setItem('visited', true);
    animateLogo(true);

}

function animateLogo(status) {

    if (status == true) {

        console.log('Die Logo-Animation wird nicht ausgeführt.');
        document.querySelector('.logo-hook').classList.remove('logo-animated');
        document.querySelector('.logo-hook').classList.add('logo-small');

    } else {

        console.log('Logo-Animation wird ausgeführt.');


    }


}

//Wenn auf Scan gedrückt wird scrollt die Seite automatisch zum festgelegten scrollTarget. Dadruch verpasst der User die Animation nicht.
document.getElementById('scrollButton').addEventListener('click', function () {
    document.getElementById('scrollTarget').scrollIntoView({ behavior: 'smooth' });
});


//API wird abegrufen, der eingegeben Name wird in der Datenbank abgeglichen
//Je nach Alter bewegt sich der Regler zwischen Position 0 und 100
//Je nach Alter wird eine andere Farbe angezeigt. Dies wird mit if/else Bedinungen gelöst.
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

                
                var ageElement = document.querySelector('.age');
                var age = parseInt(data.age);
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


//Animation um das per API abgefragte Alter darzustellen. 
function animateAge(resultDiv, targetAge) {
    let currentAge = 0;
    const intervalDuration = 30;
    const totalSteps = Math.ceil(targetAge / 10);
    const animationInterval = setInterval(() => {
        currentAge++;
        resultDiv.innerHTML = `Dein Opfer ist mit hoher Wahrscheinlichkeit <span class="age">${currentAge}</span> Jahre alt.`;

        applyColor(currentAge);
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













