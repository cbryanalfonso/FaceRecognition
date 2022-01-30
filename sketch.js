// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/BlP1OZ89F/';
//El modelo de abiajo es mio
//let imageModelURL = 'https://teachablemachine.withgoogle.com/models/1DIzlEoZs/'

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 520);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
  //whoFunction();
}

function draw() {
  background('black');
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill('white');
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
  if(results[0].label === 'Wrong: No Mask'){
    let resultadosNew = 'No esta usando mascarilla el bro';
    label = resultadosNew;
  }else{
    let resultadosNew = 'Esta usando mascarilla bien hecho my king';
    label = resultadosNew;
  }
  //label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
