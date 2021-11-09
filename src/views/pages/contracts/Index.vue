<template>
  <div>
  <b-row>
    <b-col cols="12" xl="12">


      <transition name="slide">
      <b-card no-header>

      <template slot="header">
        <i class="fa fa-file-text-o"></i>Contratos
      </template>


      <b-button pill variant="success" class="mb-10 float-right" to='contracts/create'>
        <i class="fa fa-save"></i> Cadastrar
      </b-button>

      <b-col cols="4">
          <b-form @submit.stop.prevent="onSubmit">
              <b-input-group>
                <b-form-input type="text" v-model="search" placeholder="Pesquisar..."
                    aria-label="Pesquisar" aria-describedby="pesquisar" />
                <b-input-group-append>
                <b-button variant="success" type="submit">
                    <i class="fa fa-search"></i>
                </b-button>
                </b-input-group-append>
              </b-input-group>
          </b-form>
      <br>
      </b-col>


      <b-table :hover="hover" :busy="isBusy" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" >

          <template #cell(document)="row">
              {{row.item.type === 0? `CPF: ${row.item.doc}`: `CNPJ: ${row.item.doc}`}}
          </template>

          <template #cell(action)="row" >
              <b-button pill variant="success" title="Detalhes" size="sm" :to="`contracts/show/${row.item.id}`">
                <i class="fa fa-search"></i>
              </b-button>
              <b-button pill variant="warning" title="Editar" class="ml-1" size="sm" :to="`contracts/edit/${row.item.id}`">
                <i class="fa fa-edit"></i>
              </b-button>
          </template>

          <template #table-busy>
            <div class="text-center text-success my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong> Carregando... </strong>
            </div>
          </template>

      </b-table>

        <nav>
          <b-pagination class="float-right" size="sm" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>
      </b-card>
      </transition>
    </b-col>
  </b-row>

  </div>
</template>

<script>
import apiRoutes from '@/services/api-routes'
export default {
  name: 'Users',
  props: {
    caption: {
      type: String,
      default: 'Contratos'
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      items: [],
      fields: [
        {key: 'name', label: 'Nome', sortable: true },
        {key: 'email', label: 'Email', sortable: true },
        {key: 'document', label: 'Documento', sortable: true },
        {key: 'title', label: 'Propriedade', sortable: true },
        {key: 'address', label: 'Endereço', sortable: true },
        {key: 'action', label: 'Ação'}
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      tableKey: 0,
      isBusy: true,
      search: '',
    }
  },
  computed: {
  },
  methods: {
    getRowCount (items) {
      return items.length
    },
    getContracts(){
        let url = `${apiRoutes.services.contracts}?page=${this.currentPage}`;
        if (this.search !== '') {
          url += `&search=${this.search}`
        }
        this.isBusy = true
        this.$http.get(url).then(res => {
              this.items = res.data.data.map(c => ({
                id: c.id,
                type: c.type,
                name: (c.type === 0)? c.customer_name : c.company_name,
                email: (c.type === 0)? c.customer_email : c.company_email,
                doc: (c.type === 0)? c.cpf : c.cnpj,
                title: c.title,
                address: `${c.street}, ${c.number}, ${c.city}, ${c.state}`,
              }))
              this.isBusy = false
          })
          .catch(err => {
              console.log(err)
          }).finally(() => {
             this.isBusy = false
          })
    },
    loadContracts(){
        this.getContracts();
    },
    onSubmit(){
        this.getContracts();
    },
  },
  beforeMount(){
    this.loadContracts();
  },
  watch:{
    currentPage: function(){
      this.loadContracts();
    }
  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
