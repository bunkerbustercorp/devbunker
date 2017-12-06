import hello from 'hellojs';

hello.init({
    facebook: 939690429505200,
    google: '981765274313-v4pla2sng69nnv7m2k0jaapoch830j3n.apps.googleusercontent.com'
}, {redirect_uri: '/redirect.html'});

/*hello.init({
    facebook: 939690429505200,
    google: '981765274313-v4pla2sng69nnv7m2k0jaapoch830j3n.apps.googleusercontent.com'
}, {redirect_uri: '/api/auth/register/google'});*/

export default(function () {
    return {
        facebook: () => {
            return new Promise((resolve, reject) => {
                // hellojs 는 일반 Promise 가 아닌 Promise A+ 를 사용하므로, Promise 로 감싸줌
                hello.login('facebook', { scope: 'email' }).then(
                    auth => resolve(auth.authResponse.access_token),
                    e => reject(e)
                );
            })
        },
        google: () => {
            return new Promise((resolve, reject) => {
                hello.login('google', { scope: 'email' }).then(
                    auth => resolve(auth.authResponse.access_token),
                    e => reject(e)
                );
            })
        }
    }
})();
