const { spawn } = require('child_process');
const ExpressAppWrapper = require('@ud-viz/node').ExpressAppWrapper;

const app = new ExpressAppWrapper();
app
  .start({
    folder: './',
    port: 8998,
  })
  .then(() => {
    const child = spawn(
      'nodemon',
      [
        '--trace-warnings',
        '--verbose',
        '--watch',
        './UD-Viz/packages/core/src',
        '--watch',
        './UD-Viz/packages/browser/src',
        '--delay',
        '2500ms',
        './bin/buildDebugBrowser.js',
        '-e',
        'js,css,html',
      ],
      { shell: true }
    );
    child.stdout.on('data', (data) => {
      console.log(`child stdout:\n${data}`);
    });
    child.stderr.on('data', (data) => {
      console.error(`child stderr:\n${data}`);
    });
  });
