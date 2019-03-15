import firebase from 'firebase';
import uuid from 'uuid';

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
    return firebase.database().ref('chats')
      .limitToLast(20)
      .once('child_added', snapshot => callback(this.parse(snapshot)));
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

  uploadImageAsync = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());

    const snapshot = await ref.put(blob);

    const downloadURL = await snapshot.ref.getDownloadURL();
    return downloadURL;
  }

  // ---------------
  // DATABASE: USERS
  // ---------------

  // save uid + email + display name the first time
  writeUserData(userId, email, userName) {
    console.log('got here at all');
    firebase.database().ref('users/' + userId).set({
      email: email,
      display_name: userName,
      profile_picture : ''
    });
  }

  // update display name
  updateUserName(userId, userName, successCallback, errorCallback) {
    firebase.database().ref('users/' + userId).update({
      display_name: userName,
    }).then(function() {
      successCallback();
    }).catch(function(error) {
      errorCallback();
    });
  }

  // update profile picture
  updateUserPicUrl(userId, userPicUrl, successCallback, errorCallback) {
    firebase.database().ref('users/' + userId).update({
      profile_picture : userPicUrl
    }).then(function() {
      successCallback();
    }).catch(function(error) {
      errorCallback();
    });
  }

  // get display name from uid
  getUserName(userId, successCallback) {
    return firebase.database().ref('users/' + userId).on('value', function(snapshot) {
      var userName = (snapshot.val() && snapshot.val().display_name) || '';
      successCallback(userName);
    });
  }

  // get profile picture from uid
  getUserPicUrl(userId, successCallback) {
    return firebase.database().ref('users/' + userId).on('value', function(snapshot) {
      var userPicUrl = (snapshot.val() && snapshot.val().profile_picture) || '';
      successCallback(userPicUrl);
    });
  }

  getUser(userId, successCallback) {
    var emptyUser = {
      display_name: "",
      email: "",
      profile_picture: "",
    }

    return firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
      var user = userId === "" ? emptyUser : snapshot.val();
      successCallback(user);
    });
  }

  offUsers(userId, returnedCallback) {
    firebase.database().ref('users/' + userId).off('value', returnedCallback);
  }

  // get uid from email
  getUserIdFromEmail(email, successCallback) {
    return firebase.database().ref('users/').orderByChild('email').equalTo(email).once('value').then(function(snapshot) {
      var userId = (snapshot.val() && snapshot.val().uid) || '';
      successCallback(userId);
    });
  }

  // get all uid/email pairs
  getAllUsers(successCallback) {
    return firebase.database().ref('users/').once('value').then(function(snapshot) {
      successCallback(snapshot);
    });
  }

  // get all uid/email pairs
  getAllUsersOn(successCallback) {
    return firebase.database().ref('users/').once('value', function(snapshot) {
      successCallback(snapshot);
    });
  }

  offAllUsers(returnedCallback) {
    firebase.database().ref('users/').off('value', returnedCallback);
  }

  // ----------------
  // DATABASE: ITEMS
  // ----------------

  // get all items
  getAllItems(successCallback) {
    return firebase.database().ref('posts/').orderByChild('timestamp').on('value', function(snapshot) {
      successCallback(snapshot);
    });
  }

  getItem(itemKey, successCallback) {
    return firebase.database().ref('posts/' + itemKey).once('value').then(function(snapshot) {
      successCallback(snapshot.val());
    });
  }

  updateItem(itemKey, description, picUrl) {
    firebase.database().ref('posts/' + itemKey).update({
      state : "COMPLETE",
      receiver : {
        itemDescription: description,
        itemPicUrl: picUrl,
      },
      timestamp: this.timestamp
    }).then(function() {
      successCallback();
    }).catch(function(error) {
      errorCallback();
    });
  }

  writeItem(name, groupId, description, picUrl) {
    var newItemKey = firebase.database().ref('posts/').push().key;
    firebase.database().ref('posts/' + newItemKey).set({
      itemName: name,
      groupId: groupId,
      state: "POSTED",
      giver: {
        id: this.uid,
        itemDescription: description,
        itemPicUrl: picUrl,
      },
      receiver: {
        id: "",
        itemDescription: "",
        itemPicUrl: "",
      },
      timestamp: this.timestamp,
    });
  }

  offItems(returnedCallback) {
    firebase.database().ref('posts/').off('value', returnedCallback);
  }

  // ----------------
  // DATABASE: GROUPS
  // ----------------

  // save groupId + group name + group image + member list the first time
  writeGroupData(groupName, groupPicUrl, memberList, successCallback) {
    var newGroupKey = firebase.database().ref('groups/').push().key;
    firebase.database().ref('groups/' + newGroupKey).set({
      groupId: newGroupKey,
      groupName: groupName,
      groupPicUrl: groupPicUrl,
      memberList: memberList,
    });
    return successCallback(newGroupKey);
  }

  // get all groups for a certain uid
  getAllGroups(successCallback) {
    return firebase.database().ref('groups/').on('value', function(snapshot) {
      successCallback(snapshot);
    });
  }

  getGroupName(groupId, successCallback) {
    return firebase.database().ref('groups/' + groupId).once('value', function(snapshot) {
      var groupName = (snapshot.val() && snapshot.val().groupName) || '';
      successCallback(groupName);
    });
  }

  getGroup(groupId, successCallback) {
    return firebase.database().ref('groups/' + groupId).once('value').then(function(snapshot) {
      var group = snapshot.val() || '';
      successCallback(group);
    });
  }

  offGroups(userId, returnedCallback) {
    firebase.database().ref('groups/').off('value', returnedCallback);
  }

  // ----------------
  // DATABASE: MESSAGES
  // ----------------

  // get all groups for a certain uid
  getAllChats(successCallback) {
    return firebase.database().ref('chats/').on('value', function(snapshot) {
      successCallback(snapshot);
    });
  }

  offChats(returnedCallback) {
    firebase.database().ref('chats/').off('value', returnedCallback);
  }

  getChat(chatId, successCallback) {
    return firebase.database().ref('chats/' + chatId).once('value').then(function(snapshot) {
      successCallback(snapshot);
    })
  }

  getAllMessages(chatId, successCallback) {
    return firebase.database().ref('chats/' + chatId + "/messages").on('value', function(snapshot) {
      successCallback(snapshot);
    })
  }

  getMessage(chatKey, messageKey, successCallback) {
    firebase.database().ref('chats/' + chatKey + "/messages/" + messageKey).once('value').then(function(snapshot) {
      successCallback(snapshot);
    })
  }

  writeMessageData(chatKey, text, user) {
    var newMessageKey = firebase.database().ref('chats/' + chatKey + '/messages/').push().key;
    firebase.database().ref('chats/' + chatKey + "/messages/" + newMessageKey).set({
      _id: newMessageKey,
      text: text,
      createdAt: this.timestamp,
      user: user,
    });
    firebase.database().ref('chats/' + chatKey).update({
      timestamp: this.timestamp,
    }).then(function() {
      successCallback();
    }).catch(function(error) {
      errorCallback();
    });
    return newMessageKey;
  }

  writeChatData(userIds) {
    var newChatKey = firebase.database().ref('chats/').push().key;
    firebase.database().ref('chats/' + newChatKey).set({
      userIds: userIds,
      timestamp: this.timestamp,
    });
    return newChatKey;
  }
}

Fire.shared = new Fire();
export default Fire;


// -------------------------------------------
// copied from online due to fetch not working
// -------------------------------------------

;(function(self) {
    'use strict'

    function parseHeaders(rawHeaders) {
        var headers = new Headers()
        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
        preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(':')
            var key = parts.shift().trim()
            if (key) {
                var value = parts.join(':').trim()
                headers.append(key, value)
            }
        })
        return headers
    }

    var supportsBlob =
        'FileReader' in self &&
        'Blob' in self &&
        (function() {
            try {
                new Blob()
                return true
            } catch (e) {
                return false
            }
        })()

    self.fetch = function(input, init) {
        return new Promise(function(resolve, reject) {
            var request = new Request(input, init)
            var xhr = new XMLHttpRequest()

            xhr.onload = function() {
                var options = {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: parseHeaders(xhr.getAllResponseHeaders() || '')
                }
                options.url =
                    'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
                var body = 'response' in xhr ? xhr.response : xhr.responseText
                resolve(new Response(body, options))
            }

            xhr.onerror = function() {
                reject(new TypeError('Network request failed'))
            }

            xhr.ontimeout = function() {
                reject(new TypeError('Network request failed'))
            }

            xhr.open(request.method, request.url, true)

            if (request.credentials === 'include') {
                xhr.withCredentials = true
            } else if (request.credentials === 'omit') {
                xhr.withCredentials = false
            }
            if ('responseType' in xhr && supportsBlob) {
                xhr.responseType = 'blob'
            }
            request.headers.forEach(function(value, name) {
                xhr.setRequestHeader(name, value)
            })

            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
        })
    }
    self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this)
