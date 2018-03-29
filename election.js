document.addEventListener('DOMContentLoaded', function() {

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(responseData) {
    var ul = document.getElementById('election_results');
    for (var i = 0; i < responseData.candidates.length; i++) {
      var form = document.createElement("form");
      form.action = "https://bb-election-api.herokuapp.com/vote";
      form.method = "POST";
      var input1 = document.createElement("input");
      input1.type = "submit";
      var input2 = document.createElement("input");
      input2.type = "hidden";
      input2.name = "id";
      input2.value = responseData.candidates[i].id;
      var li = document.createElement("li");
      li.innerText = responseData.candidates[i].name + " has " + responseData.candidates[i].votes + " votes.";
      form.appendChild(input1);
      form.appendChild(input2);
      li.appendChild(form);
      ul.appendChild(li);
    };
  });

  var getSubmit = document.querySelector('#election_results');
  getSubmit.addEventListener('click', function(e) {
    if(e.target.type ==='submit') {
      e.preventDefault();
      var form = e.target.parentElement;
      $.ajax({
        url: form.getAttribute("action"),
        method: form.getAttribute("method"),
        data: $(form).serialize(),
        dataType: "html"
      }).done(function(data) {
        console.log(data);
      });
    };
  });

  var getRefresh = document.querySelector('#refresh');
  getRefresh.addEventListener('click', function() {
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      dataType: 'json'
    }).done(function(responseData) {
      var li = document.querySelectorAll("li");
      for (var i = 0; i < responseData.candidates.length; i++) {
        li[i].firstChild.data = responseData.candidates[i].name + " has " + responseData.candidates[i].votes + " votes.";
      };
    });
  });

});
