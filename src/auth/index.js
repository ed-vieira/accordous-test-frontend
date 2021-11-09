import Redirect from '@/auth/redirect'

export default {

    user: () => {
        let user = localStorage.getItem('user')
        return user? JSON.parse(user) : null;
    },

    login:  params => {

      const user = params.user;
      const router = params.router;
      const store = params.store;
      const http = params.http

      if(user){
         localStorage.setItem('user', JSON.stringify(user));
         store.dispatch('setUser', user);
         http.defaults.headers.Authorization = `Bearer ${user.token}`;
         Redirect.login(user, router);
      }else{
        store.dispatch('clearUser');
        localStorage.removeItem('user');
        Redirect.logout(router);
      }
    },

    logout: (store, router) => {
       localStorage.removeItem('user');
       store.dispatch('clearUser');
       Redirect.logout(router);
    },

}
