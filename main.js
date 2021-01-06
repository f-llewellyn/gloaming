// Imports API key from apiKeys.js
import { pixabayAPI } from "../apiKeys.js";

// Declares dom variables using a query selector
const img = document.querySelector("img");
const id = document.querySelector(".photo-id");
const user = document.querySelector(".user-name");
const back = document.querySelector("#back");
const next = document.querySelector("#next");

// Declares new HTML img element with constructor. This is not visable on the page
let preload = new Image();

let i = 0;

// Defines function "Get" which creates an Obj-Lit from an API URL
function Get(URL){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",URL,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
};

// Declares variable "images" which holds the content from the API call
const images = JSON.parse(Get((`https://pixabay.com/api/?key=${pixabayAPI}&q=sunset&image_type=photo&min_width=960&min_height=480`)));

// --DEBUG/ Console logs content from API call as Obj-lit
console.log(images);

// Declares variable "imgNum" as the number of images pulled from the API
const imgNum = (images.hits).length;

// --DEBUG/ Console logs number of images
console.log(imgNum);

// Sets attributes of elements on load
img.src = images.hits[i].largeImageURL;
id.href = images.hits[i].pageURL;
id.innerHTML = `${images.hits[i].id}`;
user.href = images.hits[i].pageURL;
user.innerHTML = `${images.hits[i].user}`;

// Sets the src of hidden image element as the next image as a form of preloading
preload.src = images.hits[i + 1].largeImageURL;

// Defines function "editClass"
function editClass() {
    // Adds "fade" class to img, id and user
    img.classList.add("fade");
    id.classList.add("fade");
    user.classList.add("fade");

    // Sets function that's called after 1 second
    setTimeout(() => {
        // Changes img src to i variable
        id.href = images.hits[i].pageURL;
        id.innerHTML = `${images.hits[i].id}`;
        img.src = images.hits[i].largeImageURL;
        user.href = images.hits[i].pageURL;
        user.innerHTML = `${images.hits[i].user}`;

        // Loops back round to 0 if i = 19
        if(i === imgNum - 1) {
             preload.src = images.hits[1].largeImageURL;
        } else {
             preload.src = images.hits[i + 1].largeImageURL;
        };
        
        // Removes fade class from img, id and user
        img.classList.remove("fade");
        id.classList.remove("fade");
        user.classList.remove("fade");
    }, 1000);
};

// Defines function "imgNext"
function imgNext() {
    // If i = 3, then change i to 0
    if(i === imgNum - 1) {
        i = 0;
    // Else, inc by one
    } else {
        i++;
    };
    // Call editClass function
    editClass();
    // --DEBUG/ Console log text and value of i
    console.log(`imgNext run! ${i}`);
};

// Define function "imgLast"
function imgLast(){
    // If i = 0, change i to 3
    if(i === 0) {
        i = imgNum - 1;
    // Else, dec by 1
    } else {
        i--;
    };
    // Call editClass function
    editClass();
    // --DEBUG/ Console log text and value of i
    console.log(`imgLast run! ${i}`);
};

next.addEventListener("click", imgNext);
back.addEventListener("click", imgLast);