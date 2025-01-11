module.exports = {
  apps: [{
    name: 'guru-vpn-tma',
    script: 'npx',
    args: 'serve -s dist -l 3000',
    env: {
      NODE_ENV: 'production',
    },
  }],
};
