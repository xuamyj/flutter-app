import firebase from 'firebase';

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
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

  observeAuth = () => {
    return firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  // --------
  // DATABASE
  // --------

  // the `get` says: translate this.ref into ref()
  get ref() {
    return firebase.database().ref('messages');
  }

  // turn on the database connection
  // listen for `child_added` event, if it happens, run `snapshot => ...`
  on = callback => {
    return this.ref
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
    return this.ref.push(message);
  }

  // turn off the database connection
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
