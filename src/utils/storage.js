import Cookies from 'js-cookie'

const getCookies = async (key) => {
  let data = []
  try {
    data = Cookies.get(key)
    return data
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const setCookies = async (key, data, options = {}) => {
  try {
    Cookies.set(key, data, options)
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const removeCookies = async (key) => {
  try {
    const removeProgress = Cookies.remove(key)
    return removeProgress
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const get = async (key) => {
  let data = []
  try {
    data = localStorage.getItem(key)
    return data
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const set = async (key, data) => {
  try {
    localStorage.setItem(key, data)
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const remove = async (key) => {
  try {
    const removeProgress = localStorage.removeItem(key)
    return removeProgress
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const setSessionStorage = async (key, data) => {
  try {
    sessionStorage.setItem(key, data)
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const getSessionStorage = async (key) => {
  let data = []
  try {
    data = sessionStorage.getItem(key)
    return data
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const getSessionStorage2 = (key) => {
  let data = []
  try {
    data = sessionStorage.getItem(key)
    return data
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const removeSessionStorage = async (key) => {
  try {
    const removeProgress = sessionStorage.removeItem(key)
    return removeProgress
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

export {
  getCookies,
  setCookies,
  removeCookies,
  get,
  set,
  remove,
  setSessionStorage,
  getSessionStorage,
  getSessionStorage2,
  removeSessionStorage,
}
