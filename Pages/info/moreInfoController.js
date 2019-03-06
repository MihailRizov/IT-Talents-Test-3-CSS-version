function moreInfoController () {
    (async()=>{
        try {
            const hashData = decodeURIComponent(location.hash.split("=")[2]);
            const id = hashData.substring(1,hashData.length-1);
            const content = await beerStorage.getBeerById(id);
            const beerMaker = await Handlebars.compile(await (await fetch("Pages/info/info.htm")).text());
            $("#workingPhase").html(beerMaker(content))
            $("#back").fadeIn()
            $("#back").on("click", ()=>{
                location.replace("#page=home")
            })
            $("#beerPic").hover(()=>{
               var id = setTimeout(()=>{
                    $("#beerPic").animate({
                        position: "relative",
                        left:0,
                        width:70,
                        zIndex: 50
                    },500)
                }, 30)
            }, ()=>{
                setTimeout(()=>{
                    $("#beerPic").animate({
                        position: "",
                        width:50
                    },500)
                }, 30)
            })
        } catch (error) {
            alert(error);
        }
    })()
}