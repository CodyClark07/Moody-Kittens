// Data //
let kittens = []
let mood = ""
let affection = 4

// #region Game Logic 
function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("div2").classList.remove("hidden")
  drawKittens()
}

function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

function drawKittens() {
  loadKittens()
  let kittenElem = document.getElementById("moody-kittens")
  let kittensTemplate = ""

  kittens.forEach(kitten => {
    kittensTemplate +=`
    <div class="cat-mood bg-dark kitten ${kitten.mood} text-light">
      <img class="kitten" src="https://robohash.org/${kitten.name}?set=set4&size=150x150">
      <div class="d-flex justify-content-center">Name: ${kitten.name}</div>
      <div class="d-flex justify-content-center">Mood: ${kitten.mood}</div>
      <div class="d-flex justify-content-center">Affection: ${kitten.affection}</div>
      <div class="d-flex space-between"></div>
      <button class="btn-cancel m-1 " onclick="pet('${kitten.id}')">Pet</button>
      <button class="m-1" onclick="catnip('${kitten.id}')"> Feed</button>
      <div class="d-flex justify-content-center">
      <i class="action fa fa-trash text-danger" onclick="removeKitten('${kitten.id}')"></i>
      </div>
      </div>
    `
  })
  kittenElem.innerHTML = kittensTemplate
}
//#endregion

//#region Kitten Settings
function addKitten(event) {
  event.preventDefault()

  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 4,
  }
  if (form.name.value == "") {alert("Must Enter Name")}

  else {

  kittens.push(kitten)
  saveKittens()

  form.reset()
}}


function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}


function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if(storedKittens) {
    kittens = storedKittens
  }
}
function removeKitten(id) {
  console.log(id)
  let index = kittens.findIndex(kitten => kitten.id == kitten.id)
  if (index == -1){
    throw new Error("Invalid ID")
  }
  kittens.splice(index, 1)
  saveKittens()
  loadKittens()
}

function pet(id) {
  let currentKitten = findKittenById(id)
  let randNum = Math.random()
  if (randNum > .7) {
    currentKitten.affection ++;
    setKittenMood(currentKitten)
    saveKittens()
  }
  else currentKitten.affection --;
  setKittenMood(currentKitten)
  saveKittens()
}

function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "Tolerant"
  currentKitten.affection = 4;
  saveKittens()
}

function setKittenMood(kitten) {
document.getElementById("moody-kittens").classList.remove(kitten.mood)
if (kitten.affection <= 6){kitten.mood = "Happy"}
if (kitten.affection <= 4){kitten.mood = "Tolerant"}
if (kitten.affection <= 2){kitten.mood = "Angry"}
if (kitten.affection <= 0){kitten.mood = "Gone", alert("Kitten Ran Away")}
document.getElementById("moody-kittens").classList.add(kitten.mood)
saveKittens()
}
//#endregion


