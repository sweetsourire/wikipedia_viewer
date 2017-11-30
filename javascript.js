$(document).ready(function () {

     $("#results").on("click", ".results", function () {
         $(this).children(".description:visible").hide("fast");
         $(this).children(".description:hidden").show("fast");
     });

     var form = document.getElementById("search");

     form.onsubmit = function () {
         $("#results").html("");
         $.ajax({
             url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + form.keyword.value + "&limit=5&namespace=0&format=json",
             dataType: 'jsonp',
             success: function (json) {
                results = json[1]
                if(results.length){
                    for (var i = 0; i < results.length; i++) {
                         $("#results").append(
                            "<div class=\"results\"><div class=\"title\">" + json[1][i] + "</div>" +
                            "<div class=\"description\">" + json[2][i] + 
                            "<a target=\"_blank\"href=\"" + json[3][i] + "\"><div class=\"wikilink\"> Go to article </div></a>" + 
                            "</div></div>");
                         $("#results").fadeIn("slow")}
                     } else {
                        $("#results").html("No results");
                        $("#results").fadeIn("slow");
                    }
                }               
             });
        };
    });