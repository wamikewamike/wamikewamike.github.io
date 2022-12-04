////////////////////////////////////////////////////////////////////////////////
// transformation-b.js
//
// Bearbeiten Sie diese Datei fuer den Praktikumsteil "Transformation B".
//
// HS Duesseldorf - Fachbereich Medien - Grundlagen d. Computergrafik
// Wintersemester 2021/22
//
// Studiengang: BMI
// Gruppe     : E
// Autor 1    : Diem, Dorina
// Autor 2    : Dopatka, Mike
// Autor 3    : Kandziora, Alexander
// Autor 4    : Poppek, Kevin
// Autor 5    : Wensauer, Mathias
////////////////////////////////////////////////////////////////////////////////

// globale Variablen

let sceneRoot;  // speichert den Wurzelknoten der Szene


////////////////////////////////////////////////////////////////////////////////
// renderScene(time)
// Wird aufgerufen, wenn die gesamte Szene gerendert werden muss.
// In der Variable time wird die verstrichene Zeit in Sekunden übergeben.
////////////////////////////////////////////////////////////////////////////////
function renderScene(time) {

  // Faktor fuer die Zeit -- fuer Zeitraffer / Zeitlupe
  let timeScale = 100.0;

  // Falls der Szenenknoten eine Shape enthaelt ...
  if (sceneRoot.shape != undefined) {
    planetenRendern(sceneRoot, time, timeScale);
  }
}

/**
 * Durchlaeuft den kompletten Szenengraphen und rendert alle Knoten. Rekursive implementierung.
 * @param node
 * @param time
 * @param timescale
 */
function planetenRendern(node, time, timescale){
  // console.log("test erfolgreich");

  // Transformationsmatrix fuer Punkte
  let pointMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0);

  // Transformationsmatrix fuer Normalen
  let normalMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0);

  if(node.children.length === 0){
    // Tranformation des Szenenknotens bestimmen
    let nodeTransformation = node.animator(timescale * time);
    // Transformation des Szenenknotens anwenden
    pointMatrix.multiply(nodeTransformation.pointMatrix);
    normalMatrix.multiply(nodeTransformation.normalMatrix);
    // Szenenknoten rendern
    renderSceneNode(node, pointMatrix, normalMatrix);

  }
  else{
    let nodeTransformation = node.animator(timescale * time);
    pointMatrix.multiply(nodeTransformation.pointMatrix);
    normalMatrix.multiply(nodeTransformation.normalMatrix);
    renderSceneNode(node, pointMatrix, normalMatrix);


    for (let i = 0; i < node.children.length; i++) {
      // wird rekursiv fuer den ganzen Baum aufgerufen
      planetenRendern(node.children[i], time, timescale);

    }
  }
}



////////////////////////////////////////////////////////////////////////////////
// initScene()
// Wird aufgerufen, wenn die Szene initialisiert werden soll.
// Erstellt den Szenengraphen.
////////////////////////////////////////////////////////////////////////////////
function initScene()
{
  // TODO: Hier werden Sie die Szenenknoten für Planeten und Monde anlegen.


  // -- Moon
  let moon = {
    animator: animateMoon,
    shape: CreateMoon(),
    children: []
  };

  // -- Erde
  let earth = {
    animator: animateEarth,
    shape: CreateEarth(),
    children: [moon]
  };

  // -- Venus
  let venus = {
    animator: animateVenus,
    shape: CreateVenus(),
    children: []
  };

  // -- Mercury
  let mercury = {
    animator: animateMercury,
    shape: CreateMercury(),
    children: []
  };

  // -- Phobos
  let phobos = {
    animator: animatePhobos,
    shape: CreateMoon(),
    children: []
  };

  // -- Deimos
  let deimos = {
    animator: animateDeimos,
    shape: CreateMoon(),
    children: []
  };

  // -- Mars
  let mars = {
    animator: animateMars,
    shape: CreateMars(),
    children: [phobos, deimos]
  };

  // -- Sonne
  let sun = {
    animator: animateSun,
    shape: CreateSun(),
    children: [earth, mars, mercury, venus]
  };

  // Setze die Sonne als Wurzelknoten der Szene.
  sceneRoot = sun;
}


////////////////////////////////////////////////////////////////////////////////
// Animate-Funktionen
////////////////////////////////////////////////////////////////////////////////
// -- Sonne --------------------------------------------------------------------
function animateSun(time)
{

  let pointmatrix = new Matrix4(1, 0.0, 0.0, 0.0,
                                0.0, 1.0, 0.0, 0.0,
                                0.0, 0.0, 1.0, 0.0,
                                0.0, 0.0, 0.0, 1.0);

  let normalMatrix = normalenTransformation(pointmatrix);

  return {
    pointMatrix:  pointmatrix,
    normalMatrix: normalMatrix
  }
}

function animateMercury(time){
  let radius = 5;
  let bahnradius = 76;
  let umdrehungszeit = 58.7;
  let umlaufzeit = 88;
  let achsneigung = 0;
  let bahnneigung = 7;
  let orbitzentrum = 0;
  let mutterumlaufzeit = 0;
  let mutterbahnneigung = 0;
  let matrizen = animatePlanet(time, radius, bahnradius, umdrehungszeit, umlaufzeit, achsneigung, bahnneigung, orbitzentrum, mutterumlaufzeit, mutterbahnneigung);

  return {
    pointMatrix: matrizen.pointMatrix,
    normalMatrix: matrizen.normalMatrix
  }
}

function animateVenus(time){
  let radius = 12;
  let bahnradius = 145;
  let umdrehungszeit = 243;
  let umlaufzeit = 224.7;
  let achsneigung = 177;
  let bahnneigung = 3;
  let orbitzentrum = 0;
  let mutterumlaufzeit = 0;
  let mutterbahnneigung = 0;
  let matrizen = animatePlanet(time, radius, bahnradius, umdrehungszeit, umlaufzeit, achsneigung, bahnneigung, orbitzentrum, mutterumlaufzeit, mutterbahnneigung);

  return {
    pointMatrix: matrizen.pointMatrix,
    normalMatrix: matrizen.normalMatrix
  }
}

function animateDeimos(time){
  let radius = 1.5;
  let bahnradius = 20;
  let umdrehungszeit = 1.3;
  let umlaufzeit = 1.3;
  let achsneigung = 0;
  let bahnneigung = 1;
  let orbitzentrum = 305;
  let mutterumlaufzeit = 687;
  let mutterbahnneigung = 2;
  let matrizen = animatePlanet(time, radius, bahnradius, umdrehungszeit, umlaufzeit, achsneigung, bahnneigung, orbitzentrum, mutterumlaufzeit, mutterbahnneigung);

  return {
    pointMatrix: matrizen.pointMatrix,
    normalMatrix: matrizen.normalMatrix
  }
}

function animatePhobos(time){
  let radius = 2.5;
  let bahnradius = 15;
  let umdrehungszeit = 0.3;
  let umlaufzeit = 0.3;
  let achsneigung = 0;
  let bahnneigung = 1;
  let orbitzentrum = 305;
  let mutterumlaufzeit = 687;
  let mutterbahnneigung = 2;
  let matrizen = animatePlanet(time, radius, bahnradius, umdrehungszeit, umlaufzeit, achsneigung, bahnneigung, orbitzentrum, mutterumlaufzeit, mutterbahnneigung);

  return {
    pointMatrix: matrizen.pointMatrix,
    normalMatrix: matrizen.normalMatrix
  }
}

function animateMars(time){
  let radius = 7;
  let bahnradius = 305;
  let umdrehungszeit = 1;
  let umlaufzeit = 687;
  let achsneigung = 25;
  let bahnneigung = 2;
  let orbitzentrum = 0;
  let mutterumlaufzeit = 0;
  let mutterbahnneigung = 0;
  let matrizen = animatePlanet(time, radius, bahnradius, umdrehungszeit, umlaufzeit, achsneigung, bahnneigung, orbitzentrum, mutterumlaufzeit, mutterbahnneigung);

  return {
    pointMatrix: matrizen.pointMatrix,
    normalMatrix: matrizen.normalMatrix
  }
}

function animateMoon(time){
  let radius = 3.5;
  let bahnradius = 22;
  let umdrehungszeit = 27.3;
  let umlaufzeit = 27.3;
  let achsneigung = 7;
  let bahnneigung = 5;
  let orbitzentrum = 200;
  let mutterumlaufzeit = 365.2;
  let mutterbahnneigung = 0;
  let matrizen = animatePlanet(time, radius, bahnradius, umdrehungszeit, umlaufzeit, achsneigung, bahnneigung, orbitzentrum, mutterumlaufzeit, mutterbahnneigung);

  return {
    pointMatrix: matrizen.pointMatrix,
    normalMatrix: matrizen.normalMatrix
  }
}

function animateEarth(time){
  let radius = 13;
  let bahnradius = 200;
  let umdrehungszeit = 1;
  let umlaufzeit = 365.2;
  let achsneigung = 23;
  let bahnneigung = 0;
  let orbitzentrum = 0;
  let mutterumlaufzeit = 0;
  let mutterbahnneigung = 0;

  let matrizen = animatePlanet(time, radius, bahnradius, umdrehungszeit, umlaufzeit, achsneigung, bahnneigung, orbitzentrum, mutterumlaufzeit, mutterbahnneigung);

  return {
    pointMatrix:  matrizen.pointMatrix,
    normalMatrix: matrizen.normalMatrix
  }
}

/**
 * Wendet eine Inversion und eine Transponierung auf die angegebene Matrix an und gibt diese zurück.
 * @param matrix
 * @returns {*}
 */
function normalenTransformation(matrix){
  let normalMatrix = matrix.clone();
  normalMatrix = invert(normalMatrix);
  normalMatrix = transpose(normalMatrix);
  return normalMatrix;
}


/**
 * Gibt die Transformationsmatrizen für die angegebenen Werte zurück.
 * @param time
 * @param radius
 * @param bahnradius
 * @param umdrehungszeit
 * @param umlaufzeit
 * @param achsneigung
 * @param bahnneigung
 * @param orbitzentrum Falls Mutterplanet die Sonne, 0 angeben
 * @param mutterumlaufzeit Falls Mutterplanet die Sonne, 0 angeben
 * @param mutterbahnneigung Falls Mutterplanet die Sonne, 0 angeben
 * @returns {{normalMatrix: *, pointMatrix: *}}
 */
function animatePlanet(time, radius, bahnradius, umdrehungszeit, umlaufzeit, achsneigung, bahnneigung, orbitzentrum, mutterumlaufzeit, mutterbahnneigung){

  let rotationSpeed = ((time) / umdrehungszeit);
  let orbitSpeed = ((time) / umlaufzeit);


  let pointMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0);

  // Radius
  pointMatrix = skalieren(pointMatrix, radius, radius, radius);

  // Umdrehung um Achse
  pointMatrix = rotieren(pointMatrix, 0, rotationSpeed, 0);

  //Achsneigung (nicht implementiert, da es Probleme mit der Bleuchtung verursacht hat
  //pMatrix = rotieren(pMatrix, achsneigung, 0, 0);

  // Bahnradius
  pointMatrix = translatieren(pointMatrix, bahnradius, 0, 0);

  // Rotieren um Orbitzentrum
  pointMatrix = rotieren(pointMatrix, 0, orbitSpeed, 0);

  //Bahnneigung
  pointMatrix = rotieren(pointMatrix, 0, 0, bahnneigung);


  // Bewegen zum Orbitzentrum
  if(orbitzentrum !== 0){
    pointMatrix = translatieren(pointMatrix, orbitzentrum, 0,0);
  }
  // Bewegen mit Orbitzentrum
  if(mutterumlaufzeit !== 0){
    let mutterOrbitSpeed = time / mutterumlaufzeit;
    pointMatrix = rotieren(pointMatrix, 0, mutterOrbitSpeed, 0);
  }
  if(mutterbahnneigung !== 0){
    //Bahnneigung Mutter
    pointMatrix = rotieren(pointMatrix, 0, 0, mutterbahnneigung);
  }

  let normalMatrix = normalenTransformation(pointMatrix);


  return {
    pointMatrix:  pointMatrix,
    normalMatrix: normalMatrix
  };

}


////////////////////////////////////////////////////////////////////////////////
// Transformationsfunktionen
////////////////////////////////////////////////////////////////////////////////
/**
 * Skaliert die angegebene Matrix in die angegebenen x-, y- und z-Richtungen.
 * @param matrix
 * @param x
 * @param y
 * @param z
 * @returns {*}
 */
function skalieren (matrix, x, y, z){
  let sMatrix = new Matrix4(x, 0.0, 0.0, 0.0,
      0.0, y, 0.0, 0.0,
      0.0, 0.0, z, 0.0,
      0.0, 0.0, 0.0, 1.0);
  return sMatrix.multiply(matrix);
}

/**
 * Translation die angegebene Matrix in die angegebenen x-, y- und z-Richtungen.
 * @param matrix
 * @param x
 * @param y
 * @param z
 * @returns {*}
 */
function translatieren (matrix, x, y, z){
  let tMatrix = new Matrix4(1.0, 0.0, 0.0, x,
      0.0, 1.0, 0.0, y,
      0.0, 0.0, 1.0, z,
      0.0, 0.0, 0.0, 1.0);
  return tMatrix.multiply(matrix);
}

/**
 * Rotiert die angegebene Matrix um die angegebenen x-, y- und z-Achsen.
 * @param matrix
 * @param x
 * @param y
 * @param z
 * @returns {*}
 */
function rotieren (matrix, x, y, z){
  let rMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0);
  if(x !== 0){
    let xMatrix = new Matrix4(1.0, 0.0, 0.0, 0.0,
        0.0, Math.sin(x), Math.cos(x), 0.0,
        0.0, Math.cos(x), -Math.sin(x), 0.0,
        0.0, 0.0, 0.0, 1.0);
    rMatrix = xMatrix.multiply(rMatrix);
  }
  if(y !== 0){
    let yMatrix = new Matrix4(Math.cos(y), 0.0, Math.sin(y), 0.0,
        0.0, 1.0, 0.0, 0.0,
        -Math.sin(y), 0.0, Math.cos(y), 0.0,
        0.0, 0.0, 0.0, 1.0);
    rMatrix = yMatrix.multiply(rMatrix);
  }
  if(z !== 0) {
    let zMatrix = new Matrix4(Math.cos(z), -Math.sin(z), 0.0, 0.0,
        Math.sin(z), Math.cos(z), 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0);
    rMatrix = zMatrix.multiply(rMatrix);
  }

  return rMatrix.multiply(matrix);
}


/**
 * Gibt die Inversion der angegebenen Matrix zurück.
 * @param matrix
 * @returns {Matrix4|*}
 */
function invert(matrix){

  // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
  let newMatrix = matrix;
  const te = newMatrix.elements,

      n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ], n41 = te[ 3 ],
      n12 = te[ 4 ], n22 = te[ 5 ], n32 = te[ 6 ], n42 = te[ 7 ],
      n13 = te[ 8 ], n23 = te[ 9 ], n33 = te[ 10 ], n43 = te[ 11 ],
      n14 = te[ 12 ], n24 = te[ 13 ], n34 = te[ 14 ], n44 = te[ 15 ],

      t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
      t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
      t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
      t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

  const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

  if ( det === 0 ){
    return new Matrix4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
  }

  const detInv = 1 / det;

  te[ 0 ] = t11 * detInv;
  te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
  te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
  te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

  te[ 4 ] = t12 * detInv;
  te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
  te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
  te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

  te[ 8 ] = t13 * detInv;
  te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
  te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
  te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

  te[ 12 ] = t14 * detInv;
  te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
  te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
  te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

  return newMatrix;

}

/**
 * Gibt die transponierte Matrix zurück.
 * @param matrix
 * @returns {*}
 */
function transpose(matrix) {

  let newMatrix = matrix;
  const te = newMatrix.elements;
  let tmp;

  tmp = te[ 1 ]; te[ 1 ] = te[ 4 ]; te[ 4 ] = tmp;
  tmp = te[ 2 ]; te[ 2 ] = te[ 8 ]; te[ 8 ] = tmp;
  tmp = te[ 6 ]; te[ 6 ] = te[ 9 ]; te[ 9 ] = tmp;

  tmp = te[ 3 ]; te[ 3 ] = te[ 12 ]; te[ 12 ] = tmp;
  tmp = te[ 7 ]; te[ 7 ] = te[ 13 ]; te[ 13 ] = tmp;
  tmp = te[ 11 ]; te[ 11 ] = te[ 14 ]; te[ 14 ] = tmp;

  return newMatrix;

}


