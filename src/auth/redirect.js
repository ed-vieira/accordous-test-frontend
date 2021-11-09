export default {
  login: (user, router) => {
      if(user){
        router.push({name: 'Home'});
      }
  },
  logout: router => {
      router.push({name: 'Login'});
  }
}
