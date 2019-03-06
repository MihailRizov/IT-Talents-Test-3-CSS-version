function homeController() {
   (async() =>{
       try {
        // const homeHtml = await (await fetch("Pages/home/home.htm")).text();
        const makeRow = await Handlebars.compile(await (await fetch("Pages/home/tableRow.htm")).text());
        let option = JSON.parse(sessionStorage.getItem("option")) || 1;
        var content = await beerStorage.getMoreBeer(option);
        // $("main").html(homeHtml);
        $("#workingPhase").html(makeRow({content:content}));
        addEventListenerOnPics();
        $("#back").fadeOut()
        $(".cups").each((i,el)=>{
            $(el).on("click",async ()=>{
                try {
                    content = await beerStorage.getMoreBeer($(el).attr('value'));
                    $("#workingPhase").html(makeRow({content:content}));
                    sessionStorage.setItem("option", JSON.stringify($(el).attr("value")));
                    addEventListenerOnPics();
                } catch (error) {
                    alert(error)
                }
            })
        })
        
        $("#footerWoman").on("click",()=>{
            const MIN_BEER_ID_VALUE = 1;
            const MAX_BEER_ID_VALUE = 90;
            const luck = Math.floor(Math.random() * (MAX_BEER_ID_VALUE - MIN_BEER_ID_VALUE + 1)) + MIN_BEER_ID_VALUE;
            location.replace(`#page=q="${luck}"`)
        })
        $("#footerWoman").hover(()=>{
            $('#recomend').fadeIn(); 
        },()=>{
            $('#recomend').fadeOut(); 
        })

        $("#buttonBeer").on("click", async ()=>{
            const content = await beerStorage.getBeerByFoodCriteria($('input[name=food]:checked').val());
            $("#workingPhase").html(makeRow({content:content}));
            addEventListenerOnPics();
        })
        
       } catch (error) {
           alert (error)
       }
   })()
}
function addEventListenerOnPics(){
    $(".pics").each((i,el)=>{
            $(el).hover( () =>{
                $(el).children("div:nth-of-type(2)").css("display",'block');
            }, () => {
                $(el).find(".title").css("display",'none');
            } )
        $(el).on("click",()=>{
            location.replace(`#page=q="${$(el).attr("id")}"`)
        })
    })
}

   

