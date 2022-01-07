console.log('about to fetch a rainbow');

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
    console.log(dataObject.date);

    document.getElementById('rainbow').src = dataObject.url;
}