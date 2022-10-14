function getQueryString (name, search) {
  search = search || window.location.search.substr(1) || window.location.hash.split('?')[1]
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')

  if (search) {
    const r = search.match(reg)
    if (r != null) return unescape(r[2])
    return null
  } else {
    return null
  }
}

export {
  getQueryString
}
