var centaine = 100; //sert à  identifier les carrés
var decimal = 10; //sert à identifier les pastilles
var unite = 0; //sert à identifier les carrées et les pastilles
var chiffres = new Array(10); //tableau des chiffres au choix
var bonnecombinaison = new Array(3); //tableau de la combinaison à trouver
var verification = new Array(2); //tableau des vérifications
var fini = false; //jeu terminé
var ligne = 0;
var proposition = new Array(3);
var score = 0;

chiffres[0] = 'image/chiffresDigit/0d.png';

chiffres[1] = 'image/chiffresDigit/1d.png';
chiffres[2] = 'image/chiffresDigit/2d.png';
chiffres[3] = 'image/chiffresDigit/3d.png';
chiffres[4] = 'image/chiffresDigit/4d.png';
chiffres[5] = 'image/chiffresDigit/5d.png';
chiffres[6] = 'image/chiffresDigit/6d.png';
chiffres[7] = 'image/chiffresDigit/7d.png';
chiffres[8] = 'image/chiffresDigit/8d.png';
chiffres[9] = 'image/chiffresDigit/9d.png';

chiffres[10] = 'image/patch.png';

verification[0] = 'image/absent.gif';
verification[1] = 'image/present.gif';
verification[2] = 'image/bonneplace.gif';

proposition[3] = 'image/patch.png';



function nvelle_partie() {
	if (fini == false){
		var message = confirm ('Recommencer une autre partie ?');
		if (message){location.reload()}
	}
	else {location.reload()}
}

//fonction popup comment jouer
function aide(){
	window.open('aidemastermind.html','Aide','width=400,height=300,scrollbars=1'); //ascenceur activé
}

//fonction qui retourne un chiffre aléatoire
function aleatoire(x) {
	nb = Math.round(Math.random()*x);
	return nb;
}

//génère la combinaison à trouver
for (var x = 0; x < 4; x++) {
	bonnecombinaison[x] = chiffres[aleatoire(9)]; //attribue une image à chaque cellule du tableau bonnecombinaison
	//alert (bonnecombinaison[x]);
}

//fonction qui remplace 'image/patch.png' par une pastille de couleur
function placerchiffres(color) {

	if (unite == 4){

		alert ('Vous devez soumettre votre proposition !')}

	if ((fini == false) && (unite < 4)) { //le jeu est en cours et on ne place que 4 pastilles
		var number = decimal+unite;
		document.getElementById("patch"+number).src = chiffres[color];
			   proposition[unite] = chiffres[color];
			   unite++; //incrémentation
	}
}

//fonction qui compare la proposition de l'utilisateur avec la combinaison à trouver
function compar() {
var compteur_bon = 0; //compteur des pastilles bien placées
var compteur_present = 0; //compteur des pastiles présentes ms mal placées

	if (proposition[3] == 'image/patch.png' && fini == false) { //jeu en cours
		alert ('La proposition est incomplète.');
	}
	else { if (fini == false) { //jeu en cours
		ligne++; //incrémentation
		var essais = 15-ligne;
    document.getElementById("tries").innerHTML = "<p>Il vous reste "+essais+" essais !</p>";
		if (ligne !==13){
		  var shaka = ligne+1;
      document.querySelector("#grille tr:nth-child("+shaka+")").classList.add("boomShaka");
		}
		var x =0;
		var temp = proposition.slice(0,4); //copie les valeurs du tableau 'proposition' dans 'temp'
		var temp2 = bonnecombinaison.slice(0,4); //copie les valeurs du tableau 'bonnecombinaison' dans 'temp2'

		for (var x = 0; x < 4; x++) { // boucle qui sert à placer les 'image/bonneplace.gif'
			if(temp2[x] == temp[x]){
	               compteur_bon++; //incrémentation compteur
	               (temp.splice(x,1,'vide00')); //remplace la valeur de la cellule x du tableau 'temp' par 'vide00'
				   (temp2.splice(x,1,'vide01')); //remplace la valeur de la cellule x du tableau 'temp2' par 'vide01'
	       }}

		for (var r = 0; r < 4; r++){ // boucles qui servent à placer les 'image/présent.gif'
	                       for (var y = 0; y < 4; y++){
	                               if(temp2[r] == temp[y]){
	               compteur_present++;
	               (temp.splice(y,1,'vide02')); //remplace la valeur de la cellule x du tableau 'temp' par 'vide02'
				   (temp2.splice(r,1,'vide03')); //remplace la valeur de la cellule x du tableau 'temp' par 'vide03'
	               break; // permet de sortir de la boucle
				   }}}

		//alert(compteur_bon);

		if (compteur_bon != 0){
		for (var x = 0; x < compteur_bon; x++){ //place d'abord les 'image/bonneplace.gif'
		var nombre=centaine+x
		document.getElementById("carre"+nombre).src = verification[2];
		}}
		//alert(compteur_present);

		var tot = compteur_bon + compteur_present;
		for (var x = compteur_bon++; x < tot; x++){ //place ensuite les 'image/present.gif'
		var nombre=centaine+x
		document.getElementById("carre"+nombre).src = verification[1];}

		decimal=decimal+10; //ligne suivante du tableau
		centaine=centaine+100;
		unite=0;
	}}

	//fin de partie
	if (proposition.join() == bonnecombinaison.join() && fini == false){
								 score += 14-ligne;
                 document.getElementById("score").innerHTML = "<p>Score : "+score+"</p>";
		             document.getElementById("tries").innerHTML = "";
	               fini = true //partie finie
	               alert('Bravo, vous avez gagné!');
	               afficher_sol();}

	else {if(proposition.join() != bonnecombinaison.join() && ligne == 13 && fini == false) {
								 document.getElementById("tries").innerHTML = "";
	               window.alert ('Vous avez perdu!');
	               fini = true; //partie finie
	               afficher_sol();}}

	proposition[3] = 'image/patch.png'
	}

//fonction qui efface la dernière proposition de l'utilisateur
function effacerligne() {
if (fini == false){
for (var i = 0; i < 4; i++) {
	var number=decimal+i;
	document.getElementById("patch"+number).src = chiffres[10];
	}
	unite=0

	proposition[3] = 'image/patch.png';}
	}

//fonction qui dévoile la solution
function afficher_sol(){

if ((fini == true)|| (window.confirm('Afficher la solution ?')))
	{for (var x = 0 ; x < 4 ; x++){
	document.getElementById('solution'+x).src = bonnecombinaison[x];
	document.getElementById("panel").style.display="none";
	document.getElementById("solution").style.display="table";
	fini = true;
	}
}}

function initAfterDom() {

    var links = document.querySelectorAll("#panel tr td a");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("keydown", function(e){
            if (e.which == 13) {
                e.preventDefault();
            }
         });
    }

    document.addEventListener("keyup", checkEnter);
    function checkEnter(event) {
       if (event.which == 13) {
             compar();
         }
    }
}

document.addEventListener('DOMContentLoaded', initAfterDom);
