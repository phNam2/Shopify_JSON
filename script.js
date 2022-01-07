// First task
// getCurrentInfo().then(response => {
//     console.log('yay');
// }).catch(error => {
//     console.log('error!');
//     console.error(error);
// });
  
// async function getCurrentInfo() {
//     const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=8XXbGX2Tu4dXShKenTphOV2V5J05n89FVrFAvRkR');
//     const datas = await response.text();
//     console.log(datas);

//     const dataObject = JSON.parse(datas);
//     console.log(dataObject.date);

//     document.getElementById('current').src = dataObject.url;
// }

// Third task
getMultipleInfo().then(response => {
    console.log('yay');
}).catch(error => {
    console.log('error!');
    console.error(error);
});
  
async function getMultipleInfo() {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=8XXbGX2Tu4dXShKenTphOV2V5J05n89FVrFAvRkR&start_date=2017-07-08&end_date=2018-07-10');
    const datas = await response.text();
    console.log(datas);
    const ul = document.getElementById('multiple');
    const list = document.createDocumentFragment();

    const dataObject = JSON.parse(datas);
    console.log(dataObject);

    for (let i = 0; i < dataObject.length; i++) {
        let li = document.createElement('li');
        let name = document.createElement('h2');
        let img = document.createElement('img');
        let des = document.createElement('h4');

        name.innerHTML = dataObject[i].title;
        img.src = dataObject[i].url;
        des.innerHTML = dataObject[i].explanation;
        li.appendChild(name);
        li.appendChild(img);
        li.appendChild(des);
        list.appendChild(li);
    }

    ul.appendChild(list);
}