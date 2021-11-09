<template>
  <div>

  <b-row>
     <b-col cols="12" xl="12">
        <b-button pill variant="danger" class="mb-10 float-right" to='properties/removed'>
          <i class="fa fa-trash"></i> Removidos
        </b-button>
        <br><br>
     </b-col>
  </b-row>

  <b-row>
    <b-col cols="12" xl="12">

      <transition name="slide">
      <b-card no-header>

      <template slot="header">
        <i class="fa fa-building-o"></i>Imóveis
      </template>

      <b-button pill variant="success" class="mb-10 float-right" to='properties/create'>
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


      <b-table :key="tableKey" :hover="hover" :busy="isBusy" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" >

          <template #cell(street)="data">
            {{data.item.street}}, {{data.item.number}}, {{data.item.city}}, {{data.item.state}}
          </template>
          <template #cell(contracted)="data">
            <b-badge pill :variant="getBadge(data.item.contracted)">{{data.item.contracted? 'contratado' : 'não contratado'}}</b-badge>
          </template>
          <template #cell(action)="row" >
            <b-button pill variant="success" title="Detalhes" size="sm" :to="'properties/show/'+row.item.id">
              <i class="fa fa-search"></i>
            </b-button>
            <b-button pill variant="warning" title="Editar" class="ml-1" size="sm" :to="'properties/edit/'+row.item.id">
              <i class="fa fa-edit"></i>
            </b-button>
            <b-button pill variant="danger" title="Remover" class="ml-1" size="sm" @click="info(row.item, $event.target)">
              <i class="fa fa-trash"></i>
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
          <b-pagination class="float-right" size="sm"
            :total-rows="getRowCount(items)"
            :per-page="perPage"
            v-model="currentPage"
            prev-text="Prev"
            next-text="Next"
            hide-goto-end-buttons/>
        </nav>
      </b-card>
      </transition>
    </b-col>
  </b-row>


    <b-modal :id="deleteModal.id" centered header-bg-variant="danger"
        :title="deleteModal.title" ok-only ok-variant="danger"
        @ok="removeItem(deleteModal.content)" @hide="resetDeleteModal">
         <ul class="list-group">
            <li class="list-group-item">
              <strong>Propriedade:</strong>
              {{ deleteModal.content.title }}
            </li>
            <li class="list-group-item">
              <strong>Email:</strong>
              {{ deleteModal.content.email }}
            </li>
            <li class="list-group-item">
              <strong>Endereço:</strong>
              {{deleteModal.content.street}}, {{deleteModal.content.number}}, {{deleteModal.content.city}}, {{deleteModal.content.state}}
            </li>
         </ul>
    </b-modal>


      <br> <br>

  </div>
</template>

<script>

import apiRoutes from '@/services/api-routes'
export default {
  name: 'Users',
  props: {
    caption: {
      type: String,
      default: 'Propriedades'
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
        {key: 'title', label: 'Propriedade', sortable: true },
        {key: 'description', label: 'Descrição', sortable: true },
        {key: 'email', label: 'Email', sortable: true },
        {key: 'street', label: 'Endereço', sortable: true },
        {key: 'contracted', label: 'Status', sortable: true },
        {key: 'action', label: 'Ação'}
      ],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      tableKey: 0,
      properties: [],
      isBusy: true,
      search: '',
      deleteModal: {
          id: 'delete-modal',
          title: '',
          content: {}
      },
    }
  },
  computed: {
  },
  methods: {
    getBadge (status) {
      return (status === 1)? 'success' : 'secondary'
    },
    getRowCount (items) {
      return items.length
    },
    propertyLink (id) {
      return `properties/show/${id.toString()}`
    },
    rowClicked (item) {
      const link = this.propertyLink(item.id)
      this.$router.push({path: link})
    },

    removeItem(item){
        const url = `${apiRoutes.services.properties}/${item.id}`;
        this.$http.delete(url).then(() => {
            this.getProperties()
          })
          .catch(err => {
              console.log(err)
          })
    },

    info(item, button) {
      this.deleteModal.title = `Remover ${item.title}?`
      this.deleteModal.content = item
      this.$root.$emit('bv::show::modal', this.deleteModal.id, button)
    },

    resetDeleteModal() {
      this.deleteModal.title = ''
      this.deleteModal.content = {}
    },
    getProperties(){
        let url = `${apiRoutes.services.properties}?page=${this.currentPage}`;
        if (this.search !== '') {
          url += `&search=${this.search}`
        }
        this.isBusy = true
        this.$http.get(url).then(res => {
              this.items = res.data.data
              this.isBusy = false
          })
          .catch(err => {
              console.log(err)
          }).finally(() => {
             this.isBusy = false
          })
    },
    loadProperties(){
        this.getProperties()
    },
    onSubmit(){
        this.getProperties()
    }

  },
  beforeMount(){
    this.loadProperties()
  },
  watch:{
    currentPage: function(){
      this.getProperties()
    }
  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
