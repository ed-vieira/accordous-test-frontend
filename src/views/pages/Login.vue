<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="doLogin">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <p>{{message}}</p>
                  <p>Email: <u>admin@developer.com</u>
                  <br>Senha: <u>admin</u></p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="email" v-model="form.email" class="form-control" placeholder="E-mail" autocomplete="username email" required/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                    <b-form-input type="password" v-model="form.password" class="form-control" placeholder="Password" autocomplete="current-password" required/>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button  variant="primary" class="px-4" type="submit" :disabled="formBtnDisabled">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <!-- <h2>Sign up</h2> -->
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <!-- <b-button variant="primary" to="register" class="active mt-3">Register Now!</b-button> -->
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'Login',
  data: function(){
    return{
      form: {
        email: '',
        password: ''
      },
      message: '',
      formBtnDisabled: false,
    }
  },
  methods: {
    doLogin(){
      this.formBtnDisabled = true

      this.$http.post('/api/auth/login', this.form).then(res => {
          if (res.data.user) {
            auth.login({
              user: res.data.user,
              store: this.$store,
              router: this.$router,
              http: this.$http,
            });
          } else {
            this.message = res.data.message
          }

      }).catch(err => console.log(err))
      .finally(() => {
          this.formBtnDisabled = false;
      })

    }
  }
}
</script>
