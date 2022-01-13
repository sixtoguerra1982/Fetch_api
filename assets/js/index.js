function ModalUp(IdBtn){
    let btn_clic = document.getElementById(IdBtn)
    let url = btn_clic.getAttribute('url')
    fetch(url)
        .then((response) => response.json())
        .then(data => {
            let jsontext = document.getElementById("modal-body-text")
            jsontext.innerHTML = data
        })
        .then( () => {
            $('#myModal').modal('show') 
        })
}
document.addEventListener('DOMContentLoaded', (e) => {
    // listado inicial
    function ApiRequest(url){
        fetch(url)
        .then((response) => response.json())
        .then(data => {
            var n = 1
            let element = document.getElementById("element")
            var img
            var url_next = data.next
            var btn_next = document.getElementById("btn_more")

            var url_previus = data.previous
            console.log(url_previus)
            if (url_previus != null){
                let btn_previus = document.getElementById("btn_previus")
                btn_previus.classList.remove("d-none");
                btn_previus.setAttribute("href", url_previus)
            }else{
                btn_previus.classList.add("d-none");
            }
            btn_next.setAttribute("href", url_next)
            data.results.forEach(function(info){
                fetch(info.url)
                .then((response) => response.json())
                .then(datapoke => {
                    img = datapoke.sprites.other.dream_world.front_default
                    let div = document.createElement('div');
                    div.className = "col-md-4 pokemon mt-2 mb-2"
                    let new_element =  `<div class="card">
                    <img src="${img}" class="card-img-top mt-2 p-4" alt="${img}" height="200px" width="200px">
                    <div class="card-body">
                    <h1 class="card-title">${info.name}</h1>
                    <a id='enlace-${n}' href="#" url="${info.url}" class="btn btn-primary pokemodal" onclick="ModalUp('enlace-${n}')">¡Quiero ver más de este pokémon!</a>
                    </div>
                    </div>`
                    n = n + 1
                    div.innerHTML = new_element
                    element.appendChild(div)
                })
            })
        })
    }
    // BTN_MORE CLIC
    function fn_btn_more(url){
        // alert(url)
        ApiRequest(url)
    }
    
    $('#btn_more').click(function(){
        $(".pokemon").remove()
        fn_btn_more($("#btn_more").attr('href'))
    })

    $('#btn_previus').click(function(){
        $(".pokemon").remove()
        ApiRequest($("#btn_previus").attr('href'))
    })

    const url = "https://pokeapi.co/api/v2/pokemon/"
    ApiRequest(url)
})