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
    if (dataObject.media_type=="video") {
        toVideo(dataObject, x);
    }

    // document.getElementById("current_image").addEventListener("error", toVideo(dataObject));

    document.getElementById('current_description').innerHTML = dataObject.explanation;
}

// Add video link instead of an image
function toVideo(dataObject, x) {
    tag = splitTag(x.id);
    x.style = "display: none;";
    let linkArray = dataObject.url.split("/");
    console.log(linkArray[2]);

    if (linkArray[2]=="apod.nasa.gov"){
        document.getElementById(tag+"_image_error").style = "display: block;";
        document.getElementById(tag+'_link').href = dataObject.url;
    } else {
        document.getElementById(tag+"_video").style = "display: block;";
        document.getElementById(tag+'_video').src = dataObject.url;
    }
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
    document.getElementById("specific_video").src = null;
    const day = document.getElementById("specific").value;
    document.getElementById("error").style = "display:none";
    document.getElementById("error2").style = "display: none";
    document.getElementById("multiple").style = "display:none";
    show(day);
}

function show(day) {
    document.getElementById("specific_infos").style = "display: block";
    document.getElementById("specific_info").style = "display: none";
    document.getElementById("specific_loader").style = "display:block";
    document.getElementById("specific_image").style = "display: block";
    document.getElementById("specific_video").style = "display: none";
    document.getElementById("specific_image_error").style = "display: none";
    getSpecificInfo(day).then(response => {
        console.log('yay');
        
        // document.getElementById("error").style = "display:none";
        document.getElementById("specific").value = null;
        document.getElementById("specific_loader").style = "display:none";
        // document.getElementById("specific_info").style = "display: block";
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
    console.log(dataObject.code);

    document.getElementById('specific_title').innerHTML = dataObject.title;
    document.getElementById('specific_date').innerHTML = dataObject.date;
    if (dataObject.copyright == null) {
        document.getElementById('specific_author').innerHTML = "Anonymous";
    } else {
        document.getElementById('specific_author').innerHTML = dataObject.copyright;
    }

    document.getElementById('specific_image').src = dataObject.url;
    x = document.getElementById('specific_image');
    if (dataObject.media_type=="video") {
        toVideo(dataObject, x);
    }

    // document.getElementById("current_image").addEventListener("error", toVideo(dataObject));

    document.getElementById('specific_description').innerHTML = dataObject.explanation;
    document.getElementById("specific_info").style = "display: block";
    if (dataObject.code == 400) {
        document.getElementById("error").style = "display:block;";
        document.getElementById("error").innerHTML = dataObject.msg;
        document.getElementById("specific_info").style = "display: none";
    }
}

function search2(){
    document.getElementById("specific_video").src = null;
    document.getElementById("specific_infos").style = "display: none";
    document.getElementById("multiple").style = "display:block";
    document.getElementById("multiple_loader").style = "display:block";
    document.getElementById("error2").style = "display: none";
    deleteList();

    const start_date = document.getElementById("start").value;
    const end_date = document.getElementById("end").value;
    getMultipleInfo(start_date, end_date).then(response => {
        console.log('yay');
        document.getElementById("start").value = null;
        document.getElementById("end").value = null;
        document.getElementById("multiple_loader").style = "display:none"

        // Add the button for the multiple result
        const buttons = document.querySelectorAll('.multiple_border');
        buttons.forEach(function(currentBtn){
            currentBtn.addEventListener('click', function() {
                choose(currentBtn.id);
            });
        });

        // Like button functionality
        const multiple_up = document.querySelectorAll('.modal_up');
        multiple_up.forEach(function(currentBtn){
            currentBtn.addEventListener('click', function() {
                like(currentBtn);
            });
        });

        // Dislike button functionality
        const multiple_down = document.querySelectorAll('.modal_down');
        multiple_down.forEach(function(currentBtn){
            currentBtn.addEventListener('click', function() {
                dislike(currentBtn);
            });
        });
        
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

    if (dataObject.code == 400) {
        x=document.getElementById("error2");
        x.style = "display:block";
        x.innerHTML = dataObject.msg;
    }

    for (let i = 0; i < dataObject.length; i++) {
        let li = document.createElement('div');
        let border = document.createElement('div');

        let buttons = document.createElement('div');
        let divup = document.createElement('div');
        let up = document.createElement('i');
        let divdown = document.createElement('div');
        let down = document.createElement('i');

        let date = document.createElement('h3'); 
        
        let img = document.createElement('img');
        if (dataObject[i].media_type=="video") {

            let linkArray = dataObject[i].url.split("/");
            if (linkArray[2]=="apod.nasa.gov"){
                img = document.createElement('div');
                img.innerHTML = "Image cannot be displayed";
            } else {
                img = document.createElement('iframe');
                img.src = dataObject[i].url;
            }
        } else {
            img.src = dataObject[i].url;
        }

        up.classList.add("fa");
        up.classList.add("fa-thumbs-up");
        divup.classList.add("modal_up");
        down.classList.add("fa");
        down.classList.add("fa-thumbs-down");
        divdown.classList.add("modal_down");
        date.classList.add("multiple_date");
        img.classList.add("multiple_image");
        border.classList.add("multiple_border");

        border.id = dataObject[i].date;
        buttons.style = "display: flex; justify-content: center; margin-bottom: 15px";
        up.style= "margin-right: 80px; font-size:150%";
        down.style= "font-size:150%";
        date.innerHTML = dataObject[i].date;
        divup.id = dataObject[i].date+"_like";
        divdown.id = dataObject[i].date+"_dislike";

        divup.appendChild(up);
        divdown.appendChild(down);
        buttons.appendChild(divup);
        buttons.appendChild(divdown);
        border.appendChild(date);
        border.appendChild(img);
        li.appendChild(border);
        li.appendChild(buttons);
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

function choose(day) {
    // document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    document.getElementById("modal_image").style.display = "block";
    document.getElementById("modal_video").style.display = "none";
    document.getElementById("modal_image_error").style.display = "none";
    giveModalInfo(day).then(response => {
        console.log('yay');
    }).catch(error => {
        console.log('error!');
    });
}

async function giveModalInfo(day) {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DLM2BzUBSBJylwzHIrmD2zugoFaHcQAPdymRrakb&date='+day);
    const datas = await response.text();
    console.log(datas);

    const dataObject = JSON.parse(datas);
    console.log(dataObject);

    document.getElementById('modal_title').innerHTML = dataObject.title;
    document.getElementById('modal_date').innerHTML = dataObject.date;
    if (dataObject.copyright == null) {
        document.getElementById('modal_author').innerHTML = "Anonymous";
    } else {
        document.getElementById('modal_author').innerHTML = dataObject.copyright;
    }

    document.getElementById('modal_image').src = dataObject.url;
    x = document.getElementById('modal_image');
    if (dataObject.media_type=="video") {
        toVideo(dataObject, x);
    }
    document.getElementById('modal_description').innerHTML = dataObject.explanation;
}


// Function return the current date
function currentDate(){
    var today = new Date();
    var theDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    document.getElementById("specific").max = theDate;
    document.getElementById("start").max = theDate;
    document.getElementById("end").max = theDate;
}

window.onload = currentDate;