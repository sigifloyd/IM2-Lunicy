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


// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// let interval = null;

// document.querySelector("h1").onmouseover = event => {  
//   let iteration = 0;
  
//   clearInterval(interval);
  
//   interval = setInterval(() => {
//     event.target.innerText = event.target.innerText
//       .split("")
//       .map((letter, index) => {
//         if(index < iteration) {
//           return event.target.dataset.value[index];
//         }
      
//         return letters[Math.floor(Math.random() * 26)]
//       })
//       .join("");
    
//     if(iteration >= event.target.dataset.value.length){ 
//       clearInterval(interval);
//     }
    
//     iteration += 1 / 3;
//   }, 30);
// }

// var slider = document.getElementById("myRange");
// var output = document.getElementById("result");
// output.innerHTML = slider.value; // Display the default slider value

// // Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//   output.innerHTML = this.value;
// }

// slider.value = 30;


// const slider = document.getElementById("myRange");
// const sliderThumb = document.querySelector (".slider: :-webkit-slider-thumb");

