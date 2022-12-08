$(document).ready(function() {
    $search = $("#searchField");
    $results = $("#results");
    $searchButton = $("#searchButton");
    $searchButton.on("click", function(e) {
        var search = $search.val();
        if(search === "") return;
        $(this).prop("disabled",true);
        $results.html("<i>Doing a search for "+search+"</i>");
        $.get("https://api.github.com/search/repositories",
            {"q":search}, function(res,code) {
                if(res.items && res.items.length) {
                    var s = "<h2>Results</h2>";
                    for(var i=0, len=res.items.length; i<len; i++) {
                        var entry = res.items[i];
                        s += "<p><strong>"+entry.name+"</strong><br/>";
                        s += "By: " + entry.owner.login+"<br/>";
                        s += "Updated: " + entry.updated_at+"<br/>";
                        s += entry.description;
                        s += "</p>";
                    }
                    $results.html(s);
                }
        $searchButton.prop("disabled",false);
    });
});
});