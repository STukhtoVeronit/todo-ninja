window.onload = function(){

    document.getElementsByTagName('form')[0].addEventListener('submit', function(){
      var item = document.getElementById('todo-table-form').getElementsByTagName('input')[0];
      var todo = JSON.stringify({item: item.value});
      var promise = post('todo', todo);
      promise.then(function (res) {
          // console.log(res);
          // location.reload();
      }).catch(function (err) {
          alert(err);
      });
      return false;
  });

  document.getElementById('task-list').addEventListener ('click', function(e){
    if (e.target && e.target.matches("li")){
      var item = e.target.textContent.replace(/ /g, "-");
      var promise = del('todo/' + item);
      promise.then(function (res) {
          location.reload();
      }).catch(function (err) {
          console.log(err);
      })

    }
  });

  function post(url, data) {
      return new Promise(function (resolve, reject) {
          var xhttp = new XMLHttpRequest();
          xhttp.open('POST', url, true);
          xhttp.setRequestHeader('Content-type', 'application/json');
          xhttp.onload = function () {
              if (xhttp.status === 200){
                  try {
                      resolve(JSON.parse(xhttp.response));
                  } catch (e) {
                      resolve(xhttp.response);
                  }
              } else {
                reject(xhttp.statusText);
              }
          };
          xhttp.onerror = function(){
              reject(xhttp.statusText);
          };
          xhttp.send(data);
      });
  }

  function del(url) {
      return new Promise(function (resolve, reject) {
          var xhttp = new XMLHttpRequest();
          xhttp.open('DELETE', url, true);
          xhttp.onload = function () {
              if (xhttp.status == 200){
                  try {
                      resolve(JSON.parse(xhttp.response));
                  } catch (e) {
                      resolve(xhttp.response);
                  }
              } else {
                  reject(xhttp.statusText);
              }
          };
          xhttp.onerror = function(){
              reject(xhttp.statusText);
          };
          xhttp.send(null);
      });
  }

}