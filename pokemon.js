// zorgen we ervoor dat hij de functio laadPokemonLijst uitvoert bij het laden van de pagina.
window.onload = function () {
	laadPokemonLijst();
	typeList();
};

let overlay = document.querySelector('.overlay');
let dropdown = document.getElementById('pokelijstDropDown');
let pokecard = document.getElementById("pokecard");
let audio = document.getElementById("audio");
let pokeInfo;
let eng = false;
let ja = false;
let chin = false;
let poInfo = document.getElementById('poInfo');

function laadPokemonLijst() {

	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', './data/json/pokedex.json', true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			uitgepakteLijst = JSON.parse(xobj.responseText);
			toonPokemonLijst(uitgepakteLijst);
		}
	};
	xobj.send(null);
}
function typeList() {

	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', './data/json/types.json', true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
			types = JSON.parse(xobj.responseText);
			typ(types);
		}
	};
	xobj.send(null);
}
function toonPokemonLijst(lijst) {
	let firstOption;
	firstOption = document.createElement('option');
	firstOption.text = "Pick a Pokemon";
	firstOption.value = 0;
	dropdown.add(firstOption);
	for (let i = 0; i < lijst.length; i++) {
		let option;
		option = document.createElement('option');
		option.text = lijst[i].name.english;
		option.value = i + 1;
		dropdown.add(option);
		pokeInfo = lijst;
	}
}


let par = document.querySelector('section');
function typ(types){
	for(let j = 0; j < types.length; j++){
		let div = document.createElement('div');
		div.setAttribute("id", 'type' + j);
		par.appendChild(div);
		let icon = JSON.parse(JSON.stringify(types, function(a, b) {
			return typeof b === "string" ? b.toLowerCase() : b
		  }));
		div.style.height = '100%';
		div.style.width = '70%';
		div.style.backgroundImage = "url(./icons/"+icon[j].english+".svg)";
		div.style.backgroundPosition = "center";
		div.style.backgroundSize = "50%, contain";
		div.style.backgroundRepeat = "no-repeat"
		div.style.borderRadius = "50%"
	}
}

function engl(){
	overlay.classList.add("poof");
	eng = true;
	for(let i = 0; i < par.childNodes.length-1; i++){
		div = document.getElementById("type" + i);
		div.textContent = types[i].english;
	}
}
function jap(){
	overlay.classList.add("poof1");
	ja = true;
	for(let i = 0; i < par.childNodes.length-1; i++){
		div = document.getElementById("type" + i);
		div.textContent = types[i].japanese;
	}
}
function chi(){
	overlay.classList.add("poof2");
	chin = true;
	for(let i = 0; i < par.childNodes.length-1; i++){
		div = document.getElementById("type" + i);
		div.textContent = types[i].chinese;
	}
}


function showPokemon() {
	document.querySelector('main').classList.add("grid");
	// check of er al een image staat:
	var imgCheck = document.getElementById("img");
	var thumbNail = document.getElementById("thumbNail");
	if (typeof (imgCheck) != 'undefined' && imgCheck != null) {
		//als er al een image staat (checken we hierboven), removen we hem 
		imgCheck.remove();
		thumbNail.remove();
	}
	let pokemonID = document.getElementById("pokelijstDropDown").value;
	let pokemonName = document.getElementById("pokelijstDropDown");

	pokemonName = pokemonName.options[pokemonName.selectedIndex].text;
	pokemonName = pokemonName.toLowerCase();
	let sprite = document.createElement('img');
	sprite.setAttribute("id", "img");
	sprite.src = "./data/sprites/" + pokemonID.padStart(3, '0') + "MS.png";
	document.getElementById("sprite").appendChild(sprite);

	let thumb = document.createElement('img');
	thumb.setAttribute("id", "thumbNail");
	thumb.src = "./data/thumbnails/" + pokemonID.padStart(3, "0") + ".png";
	document.getElementById("pokecard").appendChild(thumb);

	pokecard.querySelector('img').style.padding = "30px";
	document.getElementById('sprite').querySelector('img').style.padding = "5px";
	document.getElementById('sprite').querySelector('img').style.borderRadius = "10px";
	pokecard.querySelector('img').style.borderRadius = "10px"
	let tijdelijkeID = parseInt(pokemonID, 10);
	tijdelijkeID--;
	if(eng == true){
		
		if(pokemonName == "nidoran♀"){
			document.getElementById('audio').innerHTML = "<audio id='audio-player' controls='controls' src='./data/sounds/" + "nidoranf" + ".mp3' type='audio/mpeg'>";
		}
		else if(pokemonName == "nidoran♂"){
			document.getElementById('audio').innerHTML = "<audio id='audio-player' controls='controls' src='./data/sounds/" + "nidoranm" + ".mp3' type='audio/mpeg'>";
		}
		else{
			document.getElementById('audio').innerHTML = "<audio id='audio-player' controls='controls' src='./data/sounds/" + pokemonName + ".mp3' type='audio/mpeg'>";
		}
		poInfo.innerHTML = "<span>Name:</span> " + pokeInfo[tijdelijkeID].name.english;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "<span>HP:</span> " + pokeInfo[tijdelijkeID].base.HP;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "<span>Defense:</span> " + pokeInfo[tijdelijkeID].base.Defense;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "<span>Sp. Attack:</span> " + pokeInfo[tijdelijkeID].base["Sp. Attack"];
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "<span>Sp. Defense:</span> " + pokeInfo[tijdelijkeID].base["Sp. Defense"];
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "<span>Speed:</span> " + pokeInfo[tijdelijkeID].base.Speed;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "<span>Type:</span> " + pokeInfo[tijdelijkeID].type;
	}

	else if(ja == true){
		if(pokemonName == "nidoran♀"){
			document.getElementById('audio').innerHTML = "<audio id='audio-player' controls='controls' src='./data/sounds/" + "nidoranf" + ".mp3' type='audio/mpeg'>";
		}
		else if(pokemonName == "nidoran♂"){
			document.getElementById('audio').innerHTML = "<audio id='audio-player' controls='controls' src='./data/sounds/" + "nidoranm" + ".mp3' type='audio/mpeg'>";
		}
		else{
			document.getElementById('audio').innerHTML = "<audio id='audio-player' controls='controls' src='./data/sounds/" + pokemonName + ".mp3' type='audio/mpeg'>";
		}
		poInfo.innerHTML = "Name: " + pokeInfo[tijdelijkeID].name.japanese;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "HP: " + pokeInfo[tijdelijkeID].base.HP;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "Defense: " + pokeInfo[tijdelijkeID].base.Defense;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "Sp. Attack " + pokeInfo[tijdelijkeID].base["Sp. Attack"];
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "Sp. Defense " + pokeInfo[tijdelijkeID].base["Sp. Defense"];
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "Speed: " + pokeInfo[tijdelijkeID].base.Speed;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "Type: " + pokeInfo[tijdelijkeID].type;
	}
	else{
		if(pokemonName == "nidoran♀"){
			document.getElementById('audio').innerHTML = "<audio id='audio-player' controls='controls' src='./data/sounds/" + "nidoranf" + ".mp3' type='audio/mpeg'>";
		}
		else if(pokemonName == "nidoran♂"){
			document.getElementById('audio').innerHTML = "<audio id='audio-player' controls='controls' src='./data/sounds/" + "nidoranm" + ".mp3' type='audio/mpeg'>";
		}
		else{
			document.getElementById('audio').innerHTML = "<audio id='audio-player' controls='controls' src='./data/sounds/" + pokemonName + ".mp3' type='audio/mpeg'>";
		}
		poInfo.innerHTML = "Name: " + pokeInfo[tijdelijkeID].name.chinese;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "HP: " + pokeInfo[tijdelijkeID].base.HP;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "Defense: " + pokeInfo[tijdelijkeID].base.Defense;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "Sp. Attack " + pokeInfo[tijdelijkeID].base["Sp. Attack"];
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "Sp. Defense " + pokeInfo[tijdelijkeID].base["Sp. Defense"];
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "Speed: " + pokeInfo[tijdelijkeID].base.Speed;
		poInfo.innerHTML += "<br>";
		poInfo.innerHTML += "Type: " + pokeInfo[tijdelijkeID].type.split(',').join(', ');
	}
}
