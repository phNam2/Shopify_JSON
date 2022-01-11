// First task
getCurrentInfo().then(response => {
    console.log('yay');
}).catch(error => {
    console.log('error!');
    console.error(error);
});
  
async function getCurrentInfo() {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=8XXbGX2Tu4dXShKenTphOV2V5J05n89FVrFAvRkR');
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
    document.getElementById("current_image").addEventListener("error", toVideo(dataObject));

    document.getElementById('current_description').innerHTML = dataObject.explanation;
}

function toVideo(dataObject) {
    document.getElementById("current_image").style = "display: none;";
    document.getElementById("current_video").style = "display: block;";
    document.getElementById('current_video').src = dataObject.url;
}


function like(x) {
    // x.classList.toggle("fa-thumbs-down");
    if (x.classList.contains("thumbs_up")) {
        x.classList.remove("thumbs_up");
    } else {
        x.classList.add("thumbs_up");
        document.getElementById('current_dislike').classList.remove("thumbs_down");
    }
   
}

function dislike(x) {
    // x.classList.toggle("fa-thumbs-down");
    if (x.classList.contains("thumbs_down")) {
        x.classList.remove("thumbs_down");
    } else {
        x.classList.add("thumbs_down");
        document.getElementById('current_like').classList.remove("thumbs_up");
    }
   
}

// Third task
// getMultipleInfo().then(response => {
//     console.log('yay');
// }).catch(error => {
//     console.log('error!');
//     console.error(error);
// });
  
// async function getMultipleInfo() {
//     const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=8XXbGX2Tu4dXShKenTphOV2V5J05n89FVrFAvRkR&start_date=2017-07-08&end_date=2017-07-10');
//     const datas = await response.text();
//     console.log(datas);
//     const ul = document.getElementById('multiple');
//     const list = document.createDocumentFragment();

//     const dataObject = JSON.parse(datas);
//     console.log(dataObject);

//     for (let i = 0; i < dataObject.length; i++) {
//         let li = document.createElement('li');
//         let name = document.createElement('h2');
//         let img = document.createElement('img');
//         let des = document.createElement('h4');

//         name.innerHTML = dataObject[i].title;
//         img.src = dataObject[i].url;
//         des.innerHTML = dataObject[i].explanation;
//         li.appendChild(name);
//         li.appendChild(img);
//         li.appendChild(des);
//         list.appendChild(li);
//     }

//     ul.appendChild(list);
// }