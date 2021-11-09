<template>
  <b-row>
    <b-col cols="12" md="10">
      <b-card no-header>
        <template slot="header">
          <h5>Propriedade</h5>
        </template>
        <b-table-simple striped small fixed responsive="sm"  >
            <b-thead head-variant="dark">
            </b-thead>
              <b-tbody>
               <b-tr>
                  <b-td >Propriedade</b-td>
                  <b-td>{{property.title}}</b-td>
               </b-tr>
               <b-tr>
                  <b-td >Descrição</b-td>
                  <b-td>{{property.descrition || '-'}}</b-td>
               </b-tr>
               <b-tr>
                  <b-td >UF</b-td>
                  <b-td>{{property.state}}</b-td>
               </b-tr>
               <b-tr>
                  <b-td >Cidade</b-td>
                  <b-td>{{property.city}}</b-td>
               </b-tr>
               <b-tr>
                  <b-td >Bairro</b-td>
                  <b-td>{{property.district}}</b-td>
               </b-tr>
               <b-tr>
                  <b-td >Rua</b-td>
                  <b-td>{{property.street}}</b-td>
               </b-tr>
               <b-tr>
                  <b-td >Número</b-td>
                  <b-td>{{property.number}}</b-td>
               </b-tr>
               <b-tr>
                  <b-td >Complemento</b-td>
                  <b-td>{{property.complement || '-'}}</b-td>
               </b-tr>
             </b-tbody>
        </b-table-simple>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import apiRoutes from '@/services/api-routes'
export default {
  name: 'User',
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  data: () => {
    return {
      fields: [
        {key: 'key'},
        {key: 'value'},
      ],
      property: {},
      items: [],
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getProperties(){
        const url = `${apiRoutes.services.properties}/${this.$route.params.id}`;
        this.$http.get(url).then(res => {
              this.property = res.data.data
          })
          .catch(err => {
              console.log(err)
          })
    },
  },
  beforeMount(){
      this.getProperties()
  },
}
</script>
