let firebaseConfig = {
  apiKey: 'AIzaSyAXMHUDoCgyQWlIuSwbk9fnMwrz4aL8dfc',
  authDomain: 'hvsb-dev.firebaseapp.com',
  databaseURL: 'https://hvsb-dev.firebaseio.com',
  projectId: 'hvsb-dev',
  storageBucket: 'hvsb-dev.appspot.com',
  messagingSenderId: '755847767329',
  appId: '1:755847767329:web:2dd02edd2b7d076e3c4a60',
  measurementId: 'G-775VGH8EFM',
};

if (
  window.location.href.includes('hvsb.app') ||
  window.location.href.includes('prod.hvsb.workers.dev') ||
  window.location.port === '3050'
) {
  firebaseConfig = {
    apiKey: 'AIzaSyDSakZjKR6EB5g2WFZqgSotswk0z-SJpmc',
    authDomain: 'hvsb-prod.firebaseapp.com',
    databaseURL: 'https://hvsb-prod.firebaseio.com',
    projectId: 'hvsb-prod',
    storageBucket: 'hvsb-prod.appspot.com',
    messagingSenderId: '801822037572',
    appId: '1:801822037572:web:f0ff9de3ea352fbaedce11',
    measurementId: 'G-9VV1GJBKRG',
  };
}

const app = firebase.initializeApp(firebaseConfig);

// firebase.functions().useFunctionsEmulator("http://localhost:5001");

// if (process.env.PROJECT === 'CHANGE') {
//     app.firestore().useEmulator("localhost", 8080);
// } else {
app.firestore().enablePersistence({ synchronizeTabs: true });
// }
