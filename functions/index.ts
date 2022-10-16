export async function onRequest(context) {
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context
  const url = new URL(request.url)

  const now = new Date();
  const nowCST = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }))
  const cstOffset = now.getTimezoneOffset() * 60 * 1000

  // Get days since epoch in CST
  const daysSinceEpoch = (nowCST.getTime() - cstOffset) / (1000 * 60 * 60 * 24);

  console.log(daysSinceEpoch)

  const isEven = Math.floor(daysSinceEpoch) % 2 === 0

  url.pathname = isEven ? '/asics_black.jpg' : '/asics_blue.jpg'
  return env.ASSETS.fetch(url)
}
