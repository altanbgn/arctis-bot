module.exports = (client, queue, song) => {
  if (queue) {
    if (queue?.repeatMode !== 0) return;
    if (queue?.textChannel) {
      queue?.textChannel
        ?.send({
          content: "🎵 Now playing: **{track?.title}** -> Channel: **{queue?.connection.channel.name}** 🎧"
            .replace("{track?.title}", song?.name)
            .replace("{queue?.connection.channel.name}",
            `<#${queue.voice.connection.joinConfig.channelId}>`)
        }).catch(() => {});
    }
  }
}