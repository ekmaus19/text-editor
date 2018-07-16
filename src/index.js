import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import bodyParser from 'body-parser';
import { StackNavigator } from 'react-navigation';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
module.exports = (passport) => {

  app.get('/register', (req, res) =>
    this.props.navigation.navigate('Register'),
  );

  const validateReq = (user) =>
    return (user.password === user.passwordRepeat);

  app.post('/register', (req, res) => {
    if (!validateReq(req.body)) {
      this.props.navigation.navigate('Register')
        alert("Passwords don't match")
      );
    }
    const user = new User(req.body);

    user.save((err, user) => {
      if (err) {
        console.log(err);
        this.props.navigation.navigate('Register');
        return;
      }
      console.log(user);
      this.props.navigation.navigate('Login');
    });
  });

  app.get('/login', (req, res) => {
    this.props.navigation.navigate('Login');
  });

  app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: true }),
);

  app.get('/logout', (req, res) => {
    req.logout();
    this.props.navigation.navigate('Login');
  });
};
