class auth {
  static authenticateUser(data) {
    localStorage.setItem('token', data.token)
  }

  static deauthenticateUser() {
    localStorage.removeItem('token')
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static getTokenInfo() {
    const token = this.getToken()
    if (token != null && !this.isTokenExpired(token)) {
      return this.decodeToken(token)
    } else {
      return { username: '' }
    }
  }

  static urlBase64Decode(str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/')
    switch (output.length % 4) {
      case 0: {
        break
      }
      case 2: {
        output += '=='
        break
      }
      case 3: {
        output += '='
        break
      }
      default: {
        throw new Error('Illegal base64url string!')
      }
    }
    return this.b64DecodeUnicode(output)
  }

  static b64decode(str) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    let output = ''

    str = String(str).replace(/=+$/, '')

    if (str.length % 4 === 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      )
    }

    for (
      let bc = 0, bs, buffer, idx = 0;
      (buffer = str.charAt(idx++));
      ~buffer &&
      ((bs = bc % 4 ? bs * 64 + buffer : buffer), // tslint:disable-line
      bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0 // tslint:disable-line
    ) {
      buffer = chars.indexOf(buffer)
    }
    return output
  }

  static b64DecodeUnicode(str) {
    return decodeURIComponent(
      Array.prototype.map
        .call(this.b64decode(str), c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
  }

  static decodeToken(token) {
    const parts = token.split('.')

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts')
    }

    const decoded = this.urlBase64Decode(parts[1])
    if (!decoded) {
      throw new Error('Cannot decode the token')
    }

    return JSON.parse(decoded)
  }

  static getTokenExpirationDate(token) {
    const decoded = this.decodeToken(token)

    if (!decoded.hasOwnProperty('exp')) {
      return null
    }

    const date = new Date(0)
    date.setUTCSeconds(decoded.exp)

    return date
  }

  static isTokenExpired(token, offsetSeconds) {
    const date = this.getTokenExpirationDate(token)
    offsetSeconds = offsetSeconds || 0

    if (date == null) {
      return false
    }

    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000)
  }

  static tokenNotExpired() {
    const token = this.getToken()
    return token != null && !this.isTokenExpired(token)
  }
}

export default auth
