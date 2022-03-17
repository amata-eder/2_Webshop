"use strict"

//help from: https://michaelkipp.de/web/jquery.html

$(document).ready(function(){
    $('.accordion h2').siblings('div').hide();

    $('.accordion h2').click(function() {
        // Alle anderen Segmente schließen, wenn auf eines geklickt wird
        $(this).siblings('h2').each(function() {
            $(this).next().hide();
        });

        if ($(this).next().eq(0).css('display') == 'none') {
            $(this).next().slideDown();
        } else {
            $(this).next().slideUp();
        }
    });

    //VARIABLEN:
    //richtiges Bild ->check (img)
    //Produkt(anzahl) ->check (products)
    //anzahl variable, die mitzählt -> check (anzahl)
    //gesamtpreis - fullprice ->check

    let products;   //produktanzahl
    let fullprice = 0;      //gleich auf 0 setzen, sonst kommt NaN
    $("#fullprice").text(fullprice);        //anzeigen, dass der Gesamtpreis aktuell bei 0 liegt


    //in den Einkaufswagen damit
    $(".buttons").click(function(){
        //needed some help from https://api.jquery.com/parent/
        let img = $(this).parent()[0].children[0].attributes[0].value;
        let article = $(this).parent()[0].children[1].innerHTML;
        console.log(article);
        let price = $(this).parent()[0].children[2].firstElementChild.innerHTML;
        let id = article.replace(" ","");

        console.log(price);

        if($(`#shoppingCart #${id}`).length === 0){
            $("#shoppingCart").append(`
                <div class="shopping">
                    <div class="undercategory" id="${id}">
                        <img src="${img}" width="200">
                        <p class="article">${article}</p>
                        <p>Anzahl: <span id="anzahl-${id}">1</span></p>
                        <p>Preis: <span class="price">${price}</span>€</p>
                <!--p>Gesamtsumme: </p-->
                    </div>
            </div>
            `);
        } else{
            let anzahl = $(`#anzahl-${id}`).text();
            $(`#anzahl-${id}`).text(Number(anzahl)+1);
        }

        products++;
        fullprice += Number(price);
        $("#fullprice").text(fullprice);

        //Bestellen Button wird erst eingefügt, wenn sich mind. ein Artikel im Einkaufswagen befindet
        //help from https://www.askingbox.de/frage/jquery-ueberpruefen-ob-ein-div-container-leer-ist
        if ($('#buy').is(':empty')){
            $("#buy").append(`
        <input id="buy" type="button" class="buttons" value="Bestellen"/>
        `);
        }
    });

    //bestellen
    $("#buy").click(function(){
        alert("Wir bedanken uns für Ihren Einkauf! \nDie gewünschten Artikel werden nun bestellt. Auf Wiedersehen!");

        //help from https://api.jquery.com/each/
        $("#shoppingCart .undercategory").each(function(){
            $(this).remove();
        });

        //Bestellen-Button BLEIBT und wird nicht mehr nur dann eingeblendet, wenn mind. 1 Artikel im Einkaufswagen ist

        //Oder mit diesem Code verschwindet der Button und kommt gar nicht mehr wieder:
        /*$("#buy").each(function(){
            $(this).remove();
        })*/
        //diese Möglichkeit empfinde ich aber blöder, dann kann man ja garnichts mehr bestellen :/

        products = 0;
        fullprice = 0;
        $("#fullprice").text(fullprice);        //Gesamtpreis wird wieder mit 0€ angezeigt
    });
});