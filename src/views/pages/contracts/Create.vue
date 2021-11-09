<template>
 <div>

  <b-row>
    <b-col cols="12" xl="12">


 <b-card no-header>

    <template slot="header">
        <i class="fa fa-save"></i>Cadastrar
    </template>

    <b-form @submit.stop.prevent="onSubmit">


      <b-row>
          <b-col cols="12" md="10">

      <b-form-group id="input-group-property" label="Propriedade" label-for="input-x">
        <b-form-select
          id="input-property"
          name="input-property"
          v-model="form.property_id"
          v-validate="{ required: true }"
          :options="properties"
          :state="validateState('input-property')"
          aria-describedby="input-property-live-feedback"
          data-vv-as="Propriedade"
        ></b-form-select>

        <b-form-invalid-feedback id="input-property-live-feedback">{{ veeErrors.first('input-property') }}</b-form-invalid-feedback>
      </b-form-group>

          </b-col>
      </b-row>


      <b-row>
        <b-col cols="4" md="5">

      <b-form-group id="input-group-owner" label="Contratante" label-for="input-owner">
        <b-form-select
          id="input-owner"
          name="input-owner"
          v-model="form.ownerType"
          v-validate="'required'"
          :options="ownerType"
          :state="validateState('input-owner')"
          aria-describedby="input-owner-live-feedback"
          data-vv-as="Tipo de contratante"
        ></b-form-select>

        <b-form-invalid-feedback id="input-owner-live-feedback">{{ veeErrors.first('input-owner') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>

        <b-col v-show="form.ownerType === '0'" cols="6" md="5">

        <b-form-group id="input-group-cpf" label="CPF do contratante" label-for="input-cpf">
        <b-form-input
          id="input-cpf"
          name="input-cpf"
          v-model="form.cpf"
          placeholder="CPF:"
          v-mask="'###.###.###-##'"
          v-validate="{ required: (form.ownerType === '0') }"
          :state="validateState('input-cpf')"
          aria-describedby="input-cpf-live-feedback"
          data-vv-as="CPF"
        ></b-form-input>

        <b-form-invalid-feedback id="input-cpf-live-feedback">{{ veeErrors.first('input-cpf') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>

        <b-col v-show="form.ownerType === '1'" cols="6" md="5">

        <b-form-group id="input-group-cnpj" label="CNPJ do contratante" label-for="input-cnpj">
        <b-form-input
          id="input-cnpj"
          name="input-cnpj"
          v-model="form.cnpj"
          placeholder="CNPJ:"
          v-mask="'##.###.###/####-##'"
          v-validate="{ required: (form.ownerType === '1') }"
          :state="validateState('input-cnpj')"
          aria-describedby="input-cnpj-live-feedback"
          data-vv-as="CNPJ"
        ></b-form-input>

        <b-form-invalid-feedback id="input-cnpj-live-feedback">{{ veeErrors.first('input-cnpj') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>

      </b-row>


      <b-row>
        <b-col cols="12" md="5">

        <b-form-group id="input-group-name" label="Nome do contratante" label-for="input-name">
        <b-form-input
          id="input-name"
          name="input-name"
          v-model="form.name"
          placeholder="Nome:"
          v-validate="'required'"
          :state="validateState('input-name')"
          aria-describedby="input-name-live-feedback"
          data-vv-as="Nome"
        ></b-form-input>

        <b-form-invalid-feedback id="input-name-live-feedback">{{ veeErrors.first('input-name') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>

        <b-col cols="12" md="5">

        <b-form-group id="input-group-email" label="Email do contratante" label-for="input-email">
        <b-form-input
          id="input-email"
          name="input-email"
          type="email"
          placeholder="Email do contratante"
          v-model="form.email"
          v-validate="'required|email'"
          :state="validateState('input-email')"
          aria-describedby="input-email-live-feedback"
          data-vv-as="Email do contratante"
          @blur="verifyEmail"
        ></b-form-input>

        <b-form-invalid-feedback id="input-email-live-feedback">{{ veeErrors.first('input-email') }}</b-form-invalid-feedback>
      </b-form-group>

        </b-col>
      </b-row>



      <b-row>
        <b-col cols="12" md="10" >

          <b-form-group id="input-group-contract" label="Contrato" label-for="input-contract">
            <quill-editor :style="invalidEditor? {border: '1px solid #f86c6b'} : {}"  ref="qTextEditor" v-model="form.text" />
            <input type="hidden" v-bind:value="form.text" required/>
          </b-form-group>
          <p class="qtxteditor-warning-text" v-show="invalidEditor" >  O campo texto do contrato é obrigatório </p>
        </b-col>
      </b-row>

      <b-row>
          <b-col><br><br></b-col>
      </b-row>

      <b-row>
          <b-col  cols="12" md="10" >
            <div class="float-right form-btn-area" style="" >
              <b-button  @click="resetForm()">
                <i class="fa fa-undo"></i> Desfazer
              </b-button>
              <b-button class="ml-2" type="submit" variant="success" :disabled="btnSubmitDisabled">
                <i class="fa fa-save"></i> Salvar
              </b-button>
            </div>
          </b-col>
      </b-row>



      </b-form>

     </b-card>
    </b-col>
  </b-row>

 </div>
</template>

<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import apiRoutes from '@/services/api-routes'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'CreateContract',
  components: {
    quillEditor
  },
  data: function() {
    return {

      ownerType: [
        { value: "0", text: "Pessoa Física" },
        { value: "1", text: "Pessoa Jurídica" }
      ],


      form: {
        text: '',
        ownerType: '0',
        email: '',
        name: '',
        property_id: '',
      },

      btnSubmitDisabled: false,
      invalidEditor: false,

      properties: [
        { value: null, text: "Selecione..." },
      ],
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
      this.checkEditorText()
      this.$validator.validateAll().then(result => {
        if (result) {
            this.store()
        } else {
            return;
        }
      });
    },

    verifyEmail(){
      this.$http.get(`${apiRoutes.webServices.verifyEmail}/${this.form.email}`)
      .then(res => {
         console.log(res.data.valid)
      })
    },

    store(){
        this.btnSubmitDisabled = true
        const url = apiRoutes.services.contracts;
        this.$http.post(url, this.form)
          .then(() => {
             this.$router.push({path: '/dashboard/contracts'})
          }).catch(err => {
              console.log(err)
            })
            .finally(() => {
              this.btnSubmitDisabled = false
            })
    },

    checkEditorText(){
      if (this.form.text === '') {
          this.invalidEditor = true
      } else {
          this.invalidEditor = false
      }
    },

    loadProperties(){
        const url = `${apiRoutes.services.properties}/addresses`;
        this.$http.get(url).then(res => {
              this.properties = res.data.data.map(el =>  ({
                value: el.id, text: `${el.district} ${el.street} ${el.number}`
              }));
          })
          .catch(err => {
              console.log(err)
          })
    },

  },
  beforeMount(){
    this.loadProperties()
  },
  watch:{
      'form.ownerType': function(val){
          switch(val) {
            case '0':
              delete this.form.cnpj
            break;
            case '1':
              delete this.form.cpf
            break;
          }
      },
      'form.text': function(val){
        if(val !== ''){
          this.invalidEditor = false
        }else{
           this.invalidEditor = true
        }
      }
  }
}
</script>
<style scoped>
.form-btn-area {
    margin-top: 60px;
}
.qtxteditor-warning-text {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 90%;
    color: #f86c6b;
}
</style>
