let iterator = 0;
function formCell(){
    let rnd = Math.floor(Math.random() * 826);

    fetch(`https://rickandmortyapi.com/api/character/${rnd}`)
        .then(res => res.json())
        .then(data => {
            const card = document.createElement(`div`);
            card.setAttribute("class", "character-card");

            const card_img = document.createElement(`img`);
            card_img.setAttribute("src", `${data.image}`);
            card_img.setAttribute("class", "char-image");

            const card_name = document.createElement("h2");
            card_name.append(document.createTextNode(`${data.name}`));

            const card_geninfo = document.createElement("h3");
            card_geninfo.append(document.createTextNode(`Species: ${data.species}/${data.gender}`));

            const card_status = document.createElement("h3");
            card_status.append(document.createTextNode(`Status: ${data.status}`));

            const card_location = document.createElement("h3");
            card_location.append(document.createTextNode(`Location: ${data.location.name}`));

            const del_btn = document.createElement("button");
            del_btn.setAttribute("class", "dlbtn");
            del_btn.setAttribute("data-id", `${iterator}`);
            del_btn.setAttribute("onclick", `test(${del_btn.getAttribute("data-id")})`);
            del_btn.append(document.createTextNode("Delete"));


            card.append(card_img);
            card.append(card_name);
            card.append(card_geninfo);
            card.append(card_status);
            card.append(card_location);
            card.append(del_btn);
            document.getElementById("card-wrapper").append(card);
            iterator++;
        })
}

function FormInitial(){
    for(let i = 0; i<9; i++) formCell();
}

function test(a){
    const card = document.querySelector(`[data-id=\"${a}\"]`).parentElement;
    card.remove();
}