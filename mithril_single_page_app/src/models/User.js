// include mithril
var m = require('mithril')
// module to store state
var User = {
  list: [],
  // function to trigger XHR
  loadList: function(){
    // make call
    return m.request({
      method: "GET",
      url: "https://rem-rest-api.herokuapp.com/api/users",
      withCredentials: true,
    })
    .then(function(result){
      User.list = result.data
    })
  },
  current: {},
  load: function(id){
    return m.request({
      method: 'GET',
      url: 'https://rem-rest-api.herokuapp.com/api/users' + id,
      withCredentials: true,
    })
    .then(function(result){
      User.current = result
    })
  },

  save: function() {
    return m.request({
        method: "PUT",
        url: "https://rem-rest-api.herokuapp.com/api/users/" + User.current.id,
        data: User.current,
        withCredentials: true,
    })
  }
}

module.exports = User