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

  const daysSinceEpoch = Math.floor(Date.now() / 86400000)
  const isEven = daysSinceEpoch % 2 === 0

  url.pathname = isEven ? '/asics_black_small.webp' : '/asics_blue_small.webp'
  return env.ASSETS.fetch(url)
}
