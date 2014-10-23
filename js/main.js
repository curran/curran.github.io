// Gets a partial HTML file and implements a simple cache.
var getPartial = (function(){
  var cache = {};
  return function (name, callback){
    if(cache[name]){
      callback(cache[name]);
    } else {
      fetchPartial(name, function (partial) {
        cache[name] = partial;
        callback(partial);
      });
    }
  };
}())

// Fetches the partial html file using XMLHttpRequest.
function fetchPartial(name, callback){
  var path = "partials/" + name + ".html",
      request = new XMLHttpRequest();

  request.onload = function () {
    callback(request.responseText);
  };
  request.open("GET", path, true);
  request.send(null);
}

// Gets the fragment identifier value.
function getHashValue(){
  return location.hash.substr(1);
}

// Navigate to the initial page.
navigate(getHashValue())

// Listen for fragment value changes.
window.addEventListener("hashchange", function (){
  navigate(getHashValue())
});

// Navigates to a page given its name.
function navigate(name){
  var titleDiv = document.getElementById("page-title"),
      contentDiv = document.getElementById("content");

  titleDiv.innerHTML = name;
  getPartial(name, function (partial) {
    contentDiv.innerHTML = partial;
  });

  setActiveLink(name);
}

// Sets the active class on the clicked navigation link.
function setActiveLink(name){
  var navbarDiv = document.getElementById("navbar"),
      links = navbarDiv.children,
      i, link, pageName;
  for(i = 0; i < links.length; i++){
    link = links[i];
    pageName = link.getAttribute("href").substr(1);
    if(pageName === name) {
      link.setAttribute("class", "active");
    } else {
      link.removeAttribute("class");
    }
  }
}
