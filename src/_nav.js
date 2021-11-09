export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Administração'
    },
    {
      name: 'Imóveis',
      url: '/pages',
      icon: 'fa fa-building-o',
      children: [
        {
          name: 'listar',
          url: '/dashboard/properties',
          icon: 'fa fa-list-alt'
        },
        {
          name: 'cadastrar',
          url: '/dashboard/properties/create',
          icon: 'fa fa-save'
        },
      ]
    },
    {
      name: 'Contratos',
      url: '/pages',
      icon: 'fa fa-folder-open-o',
      children: [
        {
          name: 'listar',
          url: '/dashboard/contracts',
          icon: 'fa fa-list-alt'
        },
        {
          name: 'cadastrar',
          url: '/dashboard/contracts/create',
          icon: 'fa fa-save'
        },
      ]
    },
  ]
}
