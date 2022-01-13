// First task
getCurrentInfo().then(response => {
    console.log('yay');
    document.getElementById("current_loader").style = "display:none";
    document.getElementById("info").style = "display: block";
}).catch(error => {
    console.log('error!');
});
  
async function getCurrentInfo() {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DLM2BzUBSBJylwzHIrmD2zugoFaHcQAPdymRrakb');
    const datas = await response.text();
    console.log(datas);

    const dataObject = JSON.parse(datas);
    console.log(dataObject);

    document.getElementById('current_title').innerHTML = dataObject.title;
    document.getElementById('current_date').innerHTML = dataObject.date;
    if (dataObject.copyright == null) {
        document.getElementById('current_author').innerHTML = "Anonymous";
    } else {
        document.getElementById('current_author').innerHTML = dataObject.copyright;
    }

    document.getElementById('current_image').src = dataObject.url;
    x = document.getElementById('current_image');
    urlArray = dataObject.url.split("/");
    for (i = 0; i < urlArray.length; i++){
        if (urlArray[i] == "www.youtube.com") {
            toVideo(dataObject, x);
            stop;
        }
    } 

    // document.getElementById("current_image").addEventListener("error", toVideo(dataObject));

    document.getElementById('current_description').innerHTML = dataObject.explanation;
}

// Add video link instead of an image
function toVideo(dataObject, x) {
    tag = splitTag(x.id);
    x.style = "display: none;";
    document.getElementById(tag+"_video").style = "display: block;";
    document.getElementById(tag+'_video').src = dataObject.url;
}

// Second task
function like(x) {
    // x.classList.toggle("fa-thumbs-down");
    if (x.classList.contains("thumbs_up")) {
        x.classList.remove("thumbs_up");
    } else {
        x.classList.add("thumbs_up");
        tagging = splitTag(x.id);
        document.getElementById(tagging+'_dislike').classList.remove("thumbs_down");
    }
}

function dislike(x) {
    // x.classList.toggle("fa-thumbs-down");
    if (x.classList.contains("thumbs_down")) {
        x.classList.remove("thumbs_down");
    } else {
        x.classList.add("thumbs_down");
        tagging = splitTag(x.id);
        document.getElementById(tagging+'_like').classList.remove("thumbs_up");
    }
   
}

function splitTag(id){
    tagging = id.split("_");
    return tagging[0];
}

// Third task
function search1(){
    deleteList();
    const day = document.getElementById("specific").value;
    show(day);
}

function show(day) {
    document.getElementById("specific_infos").style = "display: block";
    document.getElementById("specific_info").style = "display: none";
    document.getElementById("specific_loader").style = "display:block";
    document.getElementById("specific_image").style = "display: block";
    document.getElementById("specific_video").style = "display: none";
    getSpecificInfo(day).then(response => {
        console.log('yay');
        
        document.getElementById("error").style = "display:none";
        document.getElementById("specific").value = null;
        document.getElementById("specific_loader").style = "display:none";
        document.getElementById("specific_info").style = "display: block";
    }).catch(error => {
        document.getElementById("specific").value = null;
        document.getElementById("specific_loader").style = "display:none";
        document.getElementById("specific_info").style = "display:none";
        document.getElementById("error").style = "display:block";
        console.log('error!');
    });
}

async function getSpecificInfo(day) {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DLM2BzUBSBJylwzHIrmD2zugoFaHcQAPdymRrakb&date='+day);
    const datas = await response.text();
    console.log(datas);

    const dataObject = JSON.parse(datas);
    console.log(dataObject);

    document.getElementById('specific_title').innerHTML = dataObject.title;
    document.getElementById('specific_date').innerHTML = dataObject.date;
    if (dataObject.copyright == null) {
        document.getElementById('specific_author').innerHTML = "Anonymous";
    } else {
        document.getElementById('specific_author').innerHTML = dataObject.copyright;
    }

    document.getElementById('specific_image').src = dataObject.url;
    x = document.getElementById('specific_image');
    urlArray = dataObject.url.split("/");
    for (i = 0; i < urlArray.length; i++){
        if (urlArray[i] == "www.youtube.com") {
            toVideo(dataObject, x);
            stop;
        }
    } 

    // document.getElementById("current_image").addEventListener("error", toVideo(dataObject));

    document.getElementById('specific_description').innerHTML = dataObject.explanation;
}

function search2(){
    document.getElementById("specific_infos").style = "display: none";
    document.getElementById("multiple_loader").style = "display:block";
    deleteList();

    const start_date = document.getElementById("start").value;
    const end_date = document.getElementById("end").value;
    getMultipleInfo(start_date, end_date).then(response => {
        console.log('yay');
        document.getElementById("start").value = null;
        document.getElementById("end").value = null;
        document.getElementById("multiple_loader").style = "display:none";

        borderArray = document.getElementsByClassName("multiple_border");
        for(i=0; i<borderArray.length; i++) {
            borderArray[i].addEventListener("click",choose);
        }
        
    }).catch(error => {
        document.getElementById("start").value = null;
        document.getElementById("end").value = null;
        console.log('error!');
        document.getElementById("multiple_loader").style = "display:none";
    });
}
  
async function getMultipleInfo(start, end) {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DLM2BzUBSBJylwzHIrmD2zugoFaHcQAPdymRrakb&start_date='+start+'&end_date='+end);
    const datas = await response.text();
    console.log(datas);
    const ul = document.getElementById('multiple_list');
    const list = document.createDocumentFragment();

    const dataObject = JSON.parse(datas);
    console.log(dataObject);

    for (let i = 0; i < dataObject.length; i++) {
        let li = document.createElement('div');
        let border = document.createElement('div');
        let date = document.createElement('h3'); 
        
        let img = document.createElement('img');
        urlArray = dataObject[i].url.split("/");
        for (j = 0; j < urlArray.length; j++){
            // console.log(dataObject[i].url);
            if (urlArray[j] == "www.youtube.com") {
                img = document.createElement('iframe');
                stop;
            }
        }

        img.classList.add("multiple_image");
        border.classList.add("multiple_border");

        date.innerHTML = dataObject[i].date;
        img.src = dataObject[i].url;

        border.appendChild(date);
        border.appendChild(img);
        li.appendChild(border);
        list.appendChild(li);
    }

    ul.appendChild(list);
}

function test(){
    // var today = new Date();
    // console.log(today);
    console.log(document.getElementById("specific").value);
}

// Delete the elements of the ul elemennts
function deleteList() {
    var listElements = document.getElementById("multiple_list");   // Get the <ul> element with id="myList"
    while (listElements.firstChild) {
        listElements.removeChild(listElements.lastChild);
    }
}

function choose() {
    console.log("Choosed:");
}


// Function return the current date
function currentDate(){
    var today = new Date();
    
    var month = new String();
    dateArray = today.toDateString().split(" ");
    // console.log(dateArray[3]);
    if(dateArray[1] == "Jan") {
        month = "01";
    } else if(dateArray[1] == "Feb") {
        month = "02";
    } else if(dateArray[1] == "Mar") {
        month = "03";
    } else if(dateArray[1] == "Apr") {
        month = "04";
    } else if(dateArray[1] == "May") {
        month = "05";
    } else if(dateArray[1] == "Jun") {
        month = "06";
    } else if(dateArray[1] == "Jul") {
        month = "07";
    } else if(dateArray[1] == "Aug") {
        month = "08";
    } else if(dateArray[1] == "Sep") {
        month = "09";
    } else if(dateArray[1] == "Oct") {
        month = "10";
    } else if(dateArray[1] == "Nov") {
        month = "11";
    } else if(dateArray[1] == "Dec") {
        month = "12";
    } 
    const theDate = dateArray[3]+"-"+month+"-"+dateArray[2];
    document.getElementById("specific").max = theDate;
    document.getElementById("start").max = theDate;
    document.getElementById("end").max = theDate;
}

window.onload = currentDate;