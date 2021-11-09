<template>
 <div>

  <b-row>
    <b-col cols="12" xl="10">


 <b-card no-header>

    <template slot="header">
        <i class="fa fa-save"></i>Cadastrar
    </template>

    <b-form @submit.stop.prevent="onSubmit">



      <b-row>
        <b-col cols="12" md="12">

        <b-form-group id="input-group-title" label="Propriedade" label-for="input-title">
        <b-form-input
          id="input-title"
          name="input-title"
          v-model="form.title"
          placeholder="Propriedade ex: casa, apartamento..."
          v-validate="'required'"
          :state="validateState('input-title')"
          aria-describedby="input-title-live-feedback"
          data-vv-as="Propriedade"
        ></b-form-input>

        <b-form-invalid-feedback id="input-title-live-feedback">{{ veeErrors.first('input-title') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>
      </b-row>


      <b-row>
        <b-col cols="12" md="12">

        <b-form-group id="input-group-email" label="Email do proprietário" label-for="input-email">
        <b-form-input
          id="input-email"
          name="input-email"
          type="email"
          placeholder="Email do proprietário"
          v-model="form.email"
          v-validate="'required|email'"
          :state="validateState('input-email')"
          aria-describedby="input-email-live-feedback"
          data-vv-as="Email do proprietário"
          @blur="verifyEmail"
        ></b-form-input>

        <b-form-invalid-feedback id="input-email-live-feedback">{{ veeErrors.first('input-email') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>
      </b-row>


      <b-row>
        <b-col cols="12" md="12">

        <b-form-group id="input-group-description" label="Descrição (Opcional)" label-for="input-description">
        <b-form-textarea
          id="input-description"
          name="input-description"
          v-model="form.description"
          v-validate="{ required: false }"
          :state="validateState('input-description')"
          aria-describedby="input-description-live-feedback"
          data-vv-as="Description"
        ></b-form-textarea>

        <b-form-invalid-feedback id="input-description-live-feedback">{{ veeErrors.first('input-description') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>
      </b-row>


      <b-row>
        <b-col cols="6" md="6">

      <b-form-group id="input-group-cep" label="CEP" label-for="input-cep">
        <b-form-input
          id="input-cep"
          name="input-cep"
          v-model="form.cep"
          v-mask="'#####-###'"
          v-validate="'required'"
          :state="validateState('input-cep')"
          aria-describedby="input-cep-live-feedback"
          data-vv-as="CEP"
          @blur="viaCep"
        ></b-form-input>

        <b-form-invalid-feedback id="input-cep-live-feedback">{{ veeErrors.first('input-cep') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>
        <b-col cols="6" md="6">

      <b-form-group id="input-group-state" label="Estado" label-for="input-state">
        <b-form-input
          id="input-state"
          name="input-state"
          v-model="form.state"
          v-validate="'required'"
          :state="validateState('input-state')"
          aria-describedby="input-state-live-feedback"
          data-vv-as="Estado"
        ></b-form-input>

        <b-form-invalid-feedback id="input-state-live-feedback">{{ veeErrors.first('input-state') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>
      </b-row>


      <b-row>
        <b-col cols="6" md="6">

      <b-form-group id="input-group-city" label="Cidade" label-for="input-city">
        <b-form-input
          id="input-city"
          name="input-city"
          v-model="form.city"
          v-validate="'required'"
          :state="validateState('input-city')"
          aria-describedby="input-city-live-feedback"
          data-vv-as="Cidade"
        ></b-form-input>

        <b-form-invalid-feedback id="input-city-live-feedback">{{ veeErrors.first('input-city') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>
        <b-col cols="6" md="6">

      <b-form-group id="input-group-district" label="Bairro" label-for="input-district">
        <b-form-input
          id="input-district"
          name="input-district"
          v-model="form.district"
          v-validate="'required'"
          :state="validateState('input-district')"
          aria-describedby="input-district-live-feedback"
          data-vv-as="Bairro"
        ></b-form-input>

        <b-form-invalid-feedback id="input-district-live-feedback">{{ veeErrors.first('input-district') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>
      </b-row>


      <b-row>
        <b-col cols="6" md="6">

      <b-form-group id="input-group-street" label="Rua" label-for="input-street">
        <b-form-input
          id="input-street"
          name="input-street"
          v-model="form.street"
          v-validate="'required'"
          :state="validateState('input-street')"
          aria-describedby="input-street-live-feedback"
          data-vv-as="Rua"
        ></b-form-input>

        <b-form-invalid-feedback id="input-street-live-feedback">{{ veeErrors.first('input-street') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>
        <b-col cols="6" md="6">

      <b-form-group id="input-group-number" label="Número" label-for="input-number">
        <b-form-input
          id="input-number"
          name="input-number"
          v-model="form.number"
          v-validate="'required'"
          :state="validateState('input-number')"
          aria-describedby="input-number-live-feedback"
          data-vv-as="Número"
        ></b-form-input>

        <b-form-invalid-feedback id="input-number-live-feedback">{{ veeErrors.first('input-number') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" md="12">

        <b-form-group id="input-group-complement" label="Complemento" label-for="input-complement">
        <b-form-textarea
          id="input-complement"
          name="input-complement"
          v-model="form.complement"
          v-validate="{ required: false }"
          :state="validateState('input-complement')"
          aria-describedby="input-complement-live-feedback"
          data-vv-as="Complemento"
        ></b-form-textarea>

        <b-form-invalid-feedback id="input-complement-live-feedback">{{ veeErrors.first('input-complement') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>
      </b-row>



          <div class="float-right">
            <b-button class="ml-2" @click="resetForm()">
              <i class="fa fa-undo"></i> Desfazer
            </b-button>
            <b-button class="ml-2" type="submit" variant="success" :disabled="btnSubmitDisabled">
              <i class="fa fa-save"></i> Salvar
            </b-button>
          </div>

      </b-form>

     </b-card>
    </b-col>
  </b-row>

 </div>
</template>

<script>
import apiRoutes from '@/services/api-routes'
export default {
  name: 'CreateProperty',

  data: function() {
    return {

      form: {
        title: '',
        description: '',
        email: '',
        cep: '',
        state: '',
        district: '',
        street: '',
        number: '',
        complement: '',
      },
      btnSubmitDisabled: false,

    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    resetForm() {

      Object.keys(this.form).forEach( el => {
          this.form[el] = ''
      })

      this.$nextTick(() => {
        this.$validator.reset();
      });
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
            this.store()
        } else {
            return;
        }
      });
    },
    viaCep(){
      const cep = this.form.cep.replace('-', '');
      this.$http.get(`${apiRoutes.webServices.viaCep}/${cep}`)
      .then(res => {
         const endereco = res.data.endereco;
         if (endereco) {
            this.form.state = endereco.uf
            this.form.city = endereco.localidade
            this.form.district = endereco.bairro
            this.form.street = endereco.logradouro
            this.form.complement = endereco.complemento
         }
      }).catch(err => console.log(err))
    },
    verifyEmail(){
      this.$http.get(`${apiRoutes.webServices.verifyEmail}/${this.form.email}`)
      .then(res => {
         console.log(res.data.valid)
      })
    },
    store(){
        this.btnSubmitDisabled = true
        const url = apiRoutes.services.properties;
        this.$http.post(url, this.form)
          .then(() => {
              this.$router.push({path: '/dashboard/properties'})
          }).catch(err => {
              console.log(err)
            })
            .finally(() => {
              this.btnSubmitDisabled = false
          })
    }

  },

}
</script>
