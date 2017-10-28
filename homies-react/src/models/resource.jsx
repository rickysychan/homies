import axios from 'axios'

const Resource = (endpoint) => {

  // We're extracting result.data and returning it on success to avoid
  // result.data.data in our components
  function findAll() {
    return new Promise((resolve, reject) => {
      api.get(`/${endpoint}`)
      .then((result) => resolve(result.data))
      .catch((errors) => reject(errors))
    })
  }

  // Same as above
  function find(id) {
    return new Promise((resolve, reject) => {
      api.get(`/${endpoint}/${id}`)
      .then((result) => resolve(result.data))
      .catch((errors) => reject(errors))
    })
  }

  function create(data) {
    return api.post(`/${endpoint}`, data)
  }

  function update(id, data) {
    return api.patch(`/${endpoint}/${id}`, data)
  }

  function destroy(id) {
    return api.delete(`/${endpoint}`)
  }

  function isArticleInDB(url) {
    return
      axios.get(`http://localhost:3001/api/v1/articles/url_filter/`, {
        params: {
          url: url
        }
      })
      .then((result) => {
        console.log("my result in resorces:", result);
        resolve(result.data)
      })
      .catch((errors) => reject(errors))
  }

  return {
    findAll,
    find,
    create,
    update,
    destroy,
    isArticleInDB
  }

}

export default Resource