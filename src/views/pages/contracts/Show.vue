<template>
  <b-row>
    <b-col cols="12" md="12">
      <b-card no-header>
        <template slot="header">
             <i class="fa fa-file-text-o"></i>Contrato
        </template>
        <caption>Contratante</caption>
        <b-table-simple striped small fixed responsive="sm"  >
              <b-thead>
                  <b-th>Nome</b-th>
                  <b-th>E-mail</b-th>
                  <b-th>{{contract.type === 0? 'CPF':'CNPJ'}} </b-th>
              </b-thead>
              <b-tbody>
               <b-tr v-if="contract.owner">

                <b-td>{{contract.owner.name}}</b-td>

                <b-td>{{contract.owner.email}}</b-td>

                <b-td>{{contract.owner.cpf || contract.owner.cnpj}}</b-td>

              </b-tr>
             </b-tbody>
        </b-table-simple>
        <caption>Imóvel</caption>
        <b-table-simple striped small fixed responsive="sm"  >

              <b-thead >
                  <b-th>Propriedade</b-th>
                  <b-th>Descrição</b-th>
                  <b-th>UF</b-th>
                  <b-th>Cidade</b-th>
                  <b-th>Bairro</b-th>
                  <b-th>Rua</b-th>
                  <b-th>Número</b-th>
                  <b-th>Complemento</b-th>
              </b-thead>
              <b-tbody>
               <b-tr v-if="contract.property">

                <b-td>{{contract.property.title}}</b-td>

                <b-td>{{contract.property.descrition || '-'}}</b-td>

                <b-td>{{contract.property.state}}</b-td>

                <b-td>{{contract.property.city}}</b-td>

                <b-td>{{contract.property.district}}</b-td>

                <b-td>{{contract.property.street}}</b-td>

                <b-td>{{contract.property.number}}</b-td>

                <b-td>{{contract.property.complement || '-'}}</b-td>

              </b-tr>
             </b-tbody>
        </b-table-simple>
        <b-row>
          <b-col cols="12" md="12" >
            <article>
               <caption>Contrato</caption>
               <hr/>
               <section>
                  <p v-html="contract.text"></p>
               </section>
               <hr/>
            </article>
          </b-col>
        </b-row>

      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import apiRoutes from '@/services/api-routes'
export default {
  name: 'ShowContract',
  props: {
    caption: {
      type: String,
      default: 'Contrato'
    },
  },
  data: () => {
    return {
      contract: {},
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getContract(){
        const url = `${apiRoutes.services.contracts}/${this.$route.params.id}`;
        this.$http.get(url).then(res => {
              this.contract = res.data.data
          })
          .catch(err => {
              console.log(err)
          })
    },
  },
  beforeMount(){
      this.getContract()
  },
}
</script>
