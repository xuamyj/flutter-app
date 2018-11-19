import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    // this.observeAuth();
  }

  // -------------------
  // INITIALIZE DATABASE
  // -------------------

  init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyCyWQi7euej7M1fH7GIBZWKhZcaUD0gpRM",
      authDomain: "flutter-app-e2bd9.firebaseapp.com",
      databaseURL: "https://flutter-app-e2bd9.firebaseio.com",
      projectId: "flutter-app-e2bd9",
      storageBucket: "flutter-app-e2bd9.appspot.com",
      messagingSenderId: "725969630373"
    });

  // ----------------
  // GENERALLY USEFUL
  // ----------------

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  // --------------
  // AUTHENTICATION
  // --------------

  // observeAuth = () => {
  //   return firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  // }

  // onAuthStateChanged = user => {
  //   if (!user) {
  //     try {
  //       firebase.auth().signInAnonymously();
  //     } catch ({ message }) {
  //       alert(message);
  //     }
  //   }
  // };

  // -----------------------
  // DATABASE: CHAT TUTORIAL
  // -----------------------

  // turn on the database connection
  // listen for `child_added` event, if it happens, run `snapshot => ...`
  on = callback => {
    return firebase.database().ref('messages')
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  }

  // stick messages into the database
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  append = message => {
    return firebase.database().ref('messages').push(message);
  }

  // turn off the database connection
  off() {
    firebase.database().ref('messages').off();
  }

  // ----------------
  // DATABASE: PHOTOS
  // ----------------

  // // save picture, return url of picture
  // function writeImage() {

  // }

  // ---------------
  // DATABASE: USERS
  // ---------------

  // save uid + email + display name the first time
  writeUserData(userId, email, displayName) {
    firebase.database().ref('users/' + userId).set({
      email: email,
      display_name: displayName,
      profile_picture : ''
    });
  }

  // update display name
  updateUserDisplayName(userId, displayName, successCallback, errorCallback) {
    firebase.database().ref('users/' + userId).update({
      display_name: displayName,
    }).then(function() {
      successCallback();
    }).catch(function(error) {
      errorCallback();
    });
  }

  // update profile picture
  updateUserProfilePic(userId, imageUrl, successCallback, errorCallback) {
    firebase.database().ref('users/' + userId).update({
      profile_picture : imageUrl
    }).then(function() {
      successCallback();
    }).catch(function(error) {
      errorCallback();
    });
  }

  // get display name from uid
  getUserDisplayName(userId, successCallback) {
    return firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
      var displayName = (snapshot.val() && snapshot.val().display_name) || '';
      successCallback(displayName);
    });
  }

  // get profile picture from uid
  getUserProfilePic(userId, successCallback) {
    return firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
      var imageUrl = (snapshot.val() && snapshot.val().profile_picture) || '';
      successCallback(imageUrl);
    });
  }

  // // get uid from email
  // function getUserIdFromEmail(email) {

  // }

  // ----------------
  // DATABASE: GROUPS
  // ----------------

}

Fire.shared = new Fire();
export default Fire;
