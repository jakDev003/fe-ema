export const environment = {
  production: true,
  name: 'production',
  rootDomain: 'http://192.168.1.197:8000',
  endpoints: {
    login: '/api/user/token/',
    list_users: '/api/user/list/',
    create_user: '/api/user/register/',
    get_user: '/api/user/get/',
    list_companies: '/api/company/',
    add_company: '/api/company/',
    delete_company: '/api/company/delete/'
  }
};
