$(document).ready(function(){
    function displayData(filter){
        $.ajax("https://www.reddit.com/r/movies"+ filter +".json").done(function(data){
            var articles = data;
            var movies = {};
            var article = [];
            $(".container").html("");
            $.each(articles.data.children, function(index, value){
                movies = {
                    title: value.data.title,
                    thumbnail: value.data.thumbnail,
                    url: value.data.url,
                    spoiler: value.data.spoiler
                } 
                article.push(movies);
                // console.log(article.length);
            });
            var template = $(".template").html();
            for(var i=1; i<article.length; i++){
                $(".container").append(template);
                if(article[i].thumbnail=="self" || article[i].thumbnail=="spoiler" || article[i].thumbnail=="default" || article[i].thumbnail=="nsfw"){
                    $(".container > .box:nth-child(" + i + ") .img-header img" ).attr("src", "reddit.jpg");
                }else{
                    $(".container > .box:nth-child(" + i + ") .img-header img" ).attr("src", article[i].thumbnail);
                }
                
                $(".container > .box:nth-child(" + i + ") .caption h4" ).html(article[i].title);
                $(".container > .box:nth-child(" + i + ") .caption a" ).attr("href", article[i].url);
                if(article[i].spoiler==true){
                    $(".container > .box:nth-child(" + i + ") .caption").append("<p class='spoiler'>spoiler alert</p>");
                }
            }
            
        }).fail(function() {
            alert( "error" );
        });
    }
    displayData("");
    $(".filter ul li").on("click", function(){
        var filterAttr = $(this).attr("data-filter");
        $(".filter ul li").removeClass("active");
        $(this).addClass("active");
        displayData(filterAttr);
    });
});