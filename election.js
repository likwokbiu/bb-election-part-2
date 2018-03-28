document.addEventListener("DOMContentLoaded", function() {

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(responseData) {
    var ul = document.getElementById('election_results');
    for (var i = 0; i < responseData.candidates.length; i++) {
      console.log(responseData.candidates[i]);
      var form = '<form  action="https://bb-election-api.herokuapp.com/vote?id=' + responseData.candidates[i].id +'" method="POST"><input type="submit"></form>';
      var li = document.createElement("li");
      li.innerHTML = responseData.candidates[i].name + " has " + responseData.candidates[i].votes + " votes." + form;
      ul.appendChild(li);
    };
  });

});
