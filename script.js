$(document).ready(function () {
  // Start your code from here

  const API_URL =
    "https://api.giphy.com/v1/gifs/search?api_key=3T7FVGunhQUTGYkkB2OBaynqGNMbrM8w&limit=10&offset=0&q=";

  var temas = ["dog", "cat", "rabbit", "hamster"];

  const addTema = function () {
    var tag = document.getElementById("animal-input");
    const animal = tag.value;
    if (animal) {
      if (!temas.includes(animal)) {
        temas.push(animal);
        tag.value = "";

        generateButtons();
        delegacionEventos();
      } else {
        alert("El animal ya existe");
      }
    }
  };

  const generateButtons = function () {
    var template = ``;
    temas.forEach((tema) => {
      template += `<button class="btn">` + tema + `</button>`;
    });

    var tag = document.getElementById("animal-buttons");
    tag.innerHTML = template;
  };

  const delegacionEventos = function () {
    var buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.innerText;
        search(filter);
      });
    });
  };  

  const search = function (filter) {
    fetch(API_URL + filter)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        renderGifs(result.data);
      })
      .catch((err) => {
        alert("Algo salió mal" + err);
      });
  };

  const renderGifs = function (data) {
    let template = ``;
    data.forEach((element) => {
      template +=
        `<div class="animal-item">
                    <p>Rating: ` +
        element.rating +
        `</p>
                    <img class="gif" src="` +
        element.images.fixed_height_still.url +
        `" alt="" data-id="` + element.id + `" data-sin-movimiento="" data-con-movimiento="" data-estado="`+ 0 +`">
                </div>`;
    });

    document.getElementById("animals").innerHTML = template;
  };

  $("#add-animal").click(function (e) {
    addTema();
    e.preventDefault();
    return false;
  });

  generateButtons();
  delegacionEventos();
});
