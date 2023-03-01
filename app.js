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
        const buttons = document.querySelectorAll('.buttonFavorite')
        buttons.forEach((e,i) => {
            e.onclick = () => saveImage(data[i].id)
        })
    } catch(error) {
        console.log(error)
    }
    
}

async function saveImage(id) {
    try {
        const newFavourite = await fetch(`${URL_API}/favourites`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-API-KEY': 'live_G0jtWG909v2Q2MVt6dph2bXTLBLtivpVmHJPpwVcC9phZ6KSRtPGkiok1YHbMkqb'
            },
            body: JSON.stringify({
                image_id: id,
            })
        })
        
        const div = document.querySelector('.div-message')
        div.style = 'transform: scale(1)';
        setTimeout(()=>{
            div.style = 'transform: scale(0)';
        },1000)
        loadFavoritesImg();
    } catch(error) {
        console.log(error)
    }
}

async function loadFavoritesImg() {
    try {
        const response = await fetch(`${URL_API}/favourites`, {
            headers: {
                'Content-type': 'application/json',
                'X-API-KEY': 'live_G0jtWG909v2Q2MVt6dph2bXTLBLtivpVmHJPpwVcC9phZ6KSRtPGkiok1YHbMkqb',
            }
        })
        const data = await response.json();
        const sectionFavorite = document.querySelector('.imgs-favourites')
        sectionFavorite.innerHTML = '';
        data.forEach(e => {
            const dataHTML = `
                <div class="img-favourite">
                    <img src=${e.image.url} alt="">
                    <div onclick="${() => deleteFavorites(e.id)}" class="buttonDelete" title="Quitar de favoritos">
                        <i class="fa-solid fa-heart-crack"></i>
                    </div>
                </div>
        `;
            sectionFavorite.innerHTML += dataHTML;
        })
        console.log(data)
    } catch(err) {
        console.log(err)
    }
    
}

async function deleteFavorite(id) {
    
}
loadImages()
loadFavoritesImg()