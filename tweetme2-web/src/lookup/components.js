function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = cookies[i].trim();
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) === (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }

export  function 
backendLookup(method, endpoint, 
  callback, data) {
    let jsonData = {}
    if (data){
      jsonData = JSON.stringify(data)
    }
    // console.log("data: ", data);
    // console.log("jsonData: ", jsonData);

    var csrftoken = getCookie('csrftoken');

    const xhr = new XMLHttpRequest()
    const url = `http://localhost:8000/api${endpoint}`

    xhr.responseType = "json"
    
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
    if (csrftoken) {
      xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      xhr.setRequestHeader("X-CSRFToken", csrftoken)
    }
    
    xhr.onload = () => {
      callback(xhr.response, xhr.status)
    }

    xhr.onerror = () => {
        alert("Sorry, a serious error occured");
    }
    xhr.send(jsonData)
}