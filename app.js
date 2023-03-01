const URL_API = ' https://api.thedogapi.com/v1'

async function loadImages() {
    try {
        const response = await fetch(`${URL_API}/images/search?limit=4&api_key=live_G0jtWG909v2Q2MVt6dph2bXTLBLtivpVmHJPpwVcC9phZ6KSRtPGkiok1YHbMkqb`);
        const data = await response.json();
        console.log(data)
        console.log('Recarga')
        const imgs = document.querySelectorAll('.container-images .container-img img')
        imgs.forEach((e,i) => {
            e.src = data[i].url
        })
    } catch(error) {
        console.log(error)
    }
    
}

loadImages()