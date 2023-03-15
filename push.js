#!/usr/bin/env node
const name = process.argv[2] || 'auto-commit';
// eslint-disable-next-line import/no-extraneous-dependencies
const shell = require('shelljs');
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies

const { exec } = shell;

async function push() {
  const getLocalVersion = exec('fep --version');
  const localVersion = getLocalVersion.stdout.replace('\n', '');

  if (!shell.which('git')) {
    console.log('\x1B[33m%s\x1B[0m', 'Sorry, this script requires git');
    shell.exit(1);
  }

  if (exec('git add .').code !== 0) {
    console.log('\x1B[33m%s\x1B[0m', 'Error: Git add failed');

    shell.exit(1);
  }
  if (exec(`git commit -am "${name}"`).code !== 0) {
    console.log('\x1B[33m%s\x1B[0m', 'Error: Git commit failed');
    shell.exit(1);
  }

  const pushHandel = exec('git push');
  if (pushHandel.code !== 0) {
    if (pushHandel.code === 128) {
      const newAfter = pushHandel.stderr.replace('/n', '').match(/git.*/);
      console.log(
        '\x1B[33m%s\x1B[0m',
        `新分支，即将执行 ${newAfter[0].trim()} 在远端建立新分支`
      );
      // 推送到新分支
      if (exec(`${newAfter[0].trim()}`).code !== 0) {
        console.log('\x1B[33m%s\x1B[0m', `Error: Git push failed`);
        shell.exit(1);
      }
    } else {
      console.log('\x1B[33m%s\x1B[0m', `Error: Git push failed `);
      shell.exit(1);
    }
  }

  console.log('\x1B[32m%s\x1B[0m', `git push success commit-备注为:${name}`);

  if (exec('think build -p').code !== 0) {
    console.log('\x1B[33m%s\x1B[0m', `Error: think build failed`);
  }

  const projectName = shell.env.PWD.split('/').pop();

  // (async () => {
  //   await open(url, { app: ["google chrome", "--incognito"] });
  // })();
}

push();
