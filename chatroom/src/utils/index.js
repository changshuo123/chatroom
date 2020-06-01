let page = {
  showNav: path => {
    switch (path) {
      case 'first':
        return true
      case 'chatroom':
        return true
      case 'livevideo':
        return true
      case 'my':
        return true
      default:
        return false
    }
  }
}

export default page
