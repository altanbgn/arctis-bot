module.exports = (client, queue, song) => {
  if (queue) {
    if (queue?.textChannel) {
      queue?.textChannel?.send({ content: "Queue is empty. You can play some more music, byebye... ✅" }).catch(() => {})
    }
  }
}