let classifier;
// Model URL
//let imageModelURL = 'https://teachablemachine.withgoogle.com/models/BlP1OZ89F/';
//El modelo de abiajo es mio primer modelo entrenado ERRORES DEL ENTRENO DE MODELO
//let imageModelURL = 'https://teachablemachine.withgoogle.com/models/1DIzlEoZs/'
//tercer modelo entrenado CON FOTOGRAFIAS LEJANAS
let imageModelURL= 'https://teachablemachine.withgoogle.com/models/tpwuoSI-E/'
//Segundo modelo entrenado ERROR EN FOTOGRAFIAS LEJANAS
//let imageModelURL = 'https://teachablemachine.withgoogle.com/models/lcek5_KD2/';
//variables de json() son MASK (para mascara) NOMASK (para los que no tienen cubrebocas)


// Video
let video;
let flippedVideo;
//string de clasificacion
let label = "";

// Se carga el primer modelo
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  // Crear el video
  video = createCapture(VIDEO);
  video.size(640, 520);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Iniciar la clasificación
  classifyVideo();
}

function draw() {
  background('black');
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  if(label === 'NOMASK'){
    fill('red');
  }else if(label ==='MASK'){
    fill('white');
  }else if(label === ''){
    fill('white')
  }
  textSize(30);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  //console.log(results[0]);
  if(results[0].label === 'NOMASK'){
    let resultadosNew = 'No esta usando mascarilla';
    label = resultadosNew;
  }else{
    let resultadosNew = 'Esta usando mascarilla bien hecho my king';
    label = resultadosNew;
  }
  //label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
