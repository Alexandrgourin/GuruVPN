module.exports = {
  apps: [{
    name: 'guru-vpn-tma-staging',
    script: 'npx',
    args: 'serve -s dist -l 3001',
    env: {
      NODE_ENV: 'staging',
    },
  }],
};
