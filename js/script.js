const OATUH_APP_ID = '4d583690e1214c4581e492a653213c59';
      function auth(){
        YaAuthSuggest.init(
      {
         client_id: OATUH_APP_ID,
         response_type: 'token',
         redirect_uri: 'https://osmaav.github.io/YandexOauth/auth.html'
      },
      'https://osmaav.github.io/YandexOauth/'
       ).then(function(result) {
               return result.handler()
            })
      
          .then(function(data) {
               // console.log('Сообщение с токеном: ', data);
               document.body.innerHTML += `Сообщение с токеном: ${JSON.stringify(data,null,2)}`;
            })
            .catch(function(error) {
               // console.warn('Что-то пошло не так: ', error);
               document.body.innerHTML += `Что-то пошло не так: ${JSON.stringify(error,null,2)}`;
            });
         // .then(({
          // handler
       // }) => handler())
       // .then(data => {document.getElementsById('token')[0].outerhtml=`<h1>Token ${data}</h1>`})
       // .catch(error => console.warn('Ошибка', error));
      }
