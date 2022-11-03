module.exports = async (_client, queue, _song) => {
  if (!queue) return;

  if (queue.textChannel)
    await queue.textChannel
      .send({ content: "Queue is empty. You can play some more music, byebye... ✅" })
      .catch(() => {})
}