module.exports = {
  log: (message, status) => {
    switch(status) {
      case "success":
        console.log(`\x1b[46m\x1b[37m[arctis-bot]\x1b[0m\x1b[32m ${message}\x1b[0m`); // 32
        break;
      case "warn":
        console.log(`\x1b[46m\x1b[37m[arctis-bot]\x1b[0m\x1b[33m ${message}\x1b[0m`); // 33
        break;
      case "error":
        console.log(`\x1b[46m\x1b[37m[arctis-bot]\x1b[0m\x1b[31m ${message}\x1b[0m`); // 31
        break;
      default:
        console.log(`\x1b[46m\x1b[37m[arctis-bot]\x1b[0m\x1b[37m ${message}\x1b[0m`); // 37
        break;
    }
  }
}