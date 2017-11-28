/*global $ APIKEY*/


$(document).ready(function() {



    $.ajax({
        method: "GET",
        url: "https://newsapi.org/v2/sources",
        data: { category: "business", country: "us", language: "en", apiKey: APIKEY },
        success: function(data) {

            if (data.status === "ok") {
                console.log(data);
                for (var i = 0; i < data.sources.length; i++) {
                    var source = document.createElement("OPTION");
                    source.setAttribute("value", data.sources[i].id);
                    source.innerHTML = data.sources[i].name;
                    document.getElementById("selection").appendChild(source);
                    // jsonData.push(JSON.parse(data));
                }

            }
        }

    });


    $('#source').submit(function(event) {
        event.preventDefault();
        // alert(document.getElementById("selection").value);
        var selectedNews = document.getElementById("selection").value;
        $.ajax({
            method: "GET",
            url: "https://newsapi.org/v2/top-headlines",
            data: { sources: selectedNews, category: "business", country: "us", language: "en", apiKey: APIKEY },
            success: function(data) {
                console.log(data);
                if (data.status === "ok") {
                    for (var i = 0; i < data.articles.length; i++) {

                        // console.log(data.articles[i].title);
                        // var headline = document.createElement("P");
                        // headline.innerHTML = data.articles[i].title;
                        // document.getElementById("headlines").appendChild(headline);
                        var thumbnails = document.createElement("DIV");
                        thumbnails.setAttribute("class", "thumbnail");
                        thumbnails.setAttribute("class", "col-xs-4");
                        thumbnails.setAttribute("style", "width: 30%");
                        thumbnails.innerHTML = "<div class='thumbnail'><img class='img-responsive' src=" + data.articles[i].urlToImage + "></img><div class='caption'><h3><a href=" + data.articles[i].url + ">" + data.articles[i].title + "</a></h3><p>"+data.articles[i].description+"</p></div></div>";

                        document.getElementById("insertThumbs").appendChild(thumbnails);

                    }
                }
            }

        });

    });



});
