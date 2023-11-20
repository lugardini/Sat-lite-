var map;

function initialize() { //biblioteca WebGLEarth, cria o mapa 3D
    map = new WE.map('map3d_div');

    WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
        tileSize: 256,
        bounds: [[-85, -180], [85, 180]],
        minZoom: 0,
        maxZoom: 16,
        attribution: 'WebGLEarth example',
        tms: true
    }).addTo(map);

    getIss();
    setInterval(getIss, 4000);
}

const endPoint = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getIss() {
    const dados = await fetch(endPoint);
    const dadosConvertidos = await dados.json();
    const { latitude, longitude, altitude, velocity } = dadosConvertidos;
    //atualiza o map e as informações no meu card conforme o meu setInterval abaixo 
    map.setView([latitude, longitude]);
    document.getElementById('lat').innerHTML = latitude + '°';
    document.getElementById('lon').innerHTML = longitude + '°';
    document.getElementById('vel').innerHTML = Math.round(velocity) + ' Km/H';
    document.getElementById('alt').innerHTML = altitude;
}

