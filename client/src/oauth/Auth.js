import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'film-base.auth0.com',
      audience: 'https://film-base.auth0.com/userinfo',
      clientID: 'gec4UrR9vEWzdQBCrobGTdP5rnNUi4Bz',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  fetchLocalStorageItems() {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:7001/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: `${auth0Client.getProfile().name}`, username: `${auth0Client.getProfile().nickname}`})
      })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('userId', json.userId)
        localStorage.setItem('favoriteMovies', JSON.stringify(json.favoriteMovies))
        resolve()
      })
      .catch(error => {
        alert(`ERROR: ${error.message}`)
        reject(error.message)
      })
    })
  }
  

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          return reject(err);
        }
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult)
        resolve();
      });
    })
  }

  setSession(authResult) {
    this.idToken = authResult.idToken
    this.profile = authResult.idTokenPayload
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize({
      connection: 'google-oauth2'
    })
  }

  signOut() {
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'gec4UrR9vEWzdQBCrobGTdP5rnNUi4Bz',
    });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        console.log("ERROR:", err)
        console.log("AUTHRESULT:", authResult)
        if (err) return reject(err);
        this.setSession(authResult);
        if (localStorage.getItem('userId') === null || localStorage.getItem('favoriteMovies') === null) {
          const fetchLocalStorageItemsPromise = this.fetchLocalStorageItems()
          fetchLocalStorageItemsPromise.then(() => resolve())
          .catch(err => reject(err))
        } else {
          resolve()
        }
      });
    });
  }
}

const auth0Client = new Auth();

export default auth0Client;