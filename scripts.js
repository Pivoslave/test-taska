function InitialRequest(){

    let reqInfo = getBase();
    let jsons = [];

    console.log(reqInfo);
    console.log(reqInfo[0]);

    var info;
    fetch(getPrimePage(reqInfo[0])).then(res => res.json()).then(data => {info = data;}).then(() => {
        console.log(info);

        if (!reqInfo[2]) {
            let elems = info.results.filter(item => item.id >= reqInfo[0]*20 + reqInfo[1]+1 && item.id < reqInfo[0]*20 + reqInfo[1]+10);
            for(var item of elems) formCell2(item);
        }

        else{
            var data2;
            let elems = info.results.filter(item => item.id >= reqInfo[0]*20 + reqInfo[1]+1);
            for(var item of elems) formCell2(item);
            fetch(getPrimePage(reqInfo[0]+1)).then(res => res.json()).then(data => {data2 = data}).then(() => {
                for(let i = 0; i < (9-elems.length); i++) formCell2(data2.results[i]);
            })
        }
    });
}

window.onload = InitialRequest;

function formCell2(a){

    let newCard = document.createElement("div");
    document.querySelector("#card-wrapper").append(newCard);
    newCard.outerHTML = "<div class='character-card'>" +
        `<img src='${a.image}' class='char-image'>` +
        `<h2>${a.name}</h2>` +
        `<h3>Species: ${a.species}/${a.gender}</h3>` +
        `<h3>Status: ${a.status}</h3>` +
        `<h3>Location: ${a.location.name}</h3>` +
        `<button class='dlbtn' onclick='delCard(this)'>Delete</button>` +
        `</div></div>`;

}

function  formCell2R(){

    var data;
    fetch(`https://rickandmortyapi.com/api/character/${Math.floor(Math.random()*826)}`).then(res=>res.json()).then(dat => data = dat).then(() => {
        formCell2(data);
    })
    }

function delCard(a){
    a.parentElement.remove();
}

// 1-2 первоначальных запроса
function getBase(){
    let charnum = Math.floor(Math.random()*(826-9));
    return [Math.floor(charnum/20), charnum%20, charnum%20+9>20];
}

function getPrimePage(a){
    return a == "0" ? `https://rickandmortyapi.com/api/character` : `https://rickandmortyapi.com/api/character?page=${a+1}`;
}