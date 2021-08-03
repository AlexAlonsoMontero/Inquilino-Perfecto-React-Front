const host = 'http://127.0.0.1'
const port ='3001'

export const routes = {
    home: '/',
    r_register: `/api/users`,
    r_login:`/login`,
    r_ativactionUser:`/activation`,
    r_advSearcher: '/'
    
}

export const backRoutes ={
    r_host_port:`${host}:${port}`,
    r_register: `${host}:${port}/api/users`,
    r_login:`${host}:${port}/login`,
    r_activationUser: `${host}:${port}/activation`,
    r_getAdvertisement: `${host}:${port}/api/adv/`,
    r_advSearcher: `${host}:${port}/api/adv/` // se completa con :table1/:table2/ y queryparams
}




//TODO hacer hooks, y revisar el lo hecho hasta ahor, loguin registro y búsqueda
export const endpoints = {
//ENDPOINTS ADMIN USER
 endpointAdminAdv : '/api/admin/adv',
 endpointAdminUsers:'/api/admin/users',
 endpointAdminReviews : '/api/admin/reviews',
 endpointAdminReservations : '/api/admin/reservations',

//ENDPOINTS ADVERTISEMENT
 enpointAdvByUser : '/api/adv/:usr_casero_uuid/:estado',
 enpointAdvByAdv : '/api/adv/:anuncio_uuid',
 endpointAdv : '/api/adv/',

//ENDPOINTS LOGIN
 endpointLogin : '/login',
 endpointLogout : '/logout',

//ENDPOINTS PROPERTIES
 endpointProperties : '/api/properties',
 endpointPropertiesByProp : '/api/properties/:inmueble_uuid',
 endpointPropertiesByUser : '/api/properties/:usr_casero_uuid/:inmueble_uuid',

//ENDPOINTS RESERVATIONS
 endpointReservations : '/api/reservations',
 endpointReservationsByUsers : '/api/reservations/:usr_casero_uuid/:usr_inquilino_uuid',
 endpointReservationsByRes : '/api/reservations/:alquiler_uuid',

//ENDPOINTS REVIEWS
 endpointReviews : '/api/reviews',
 endpointReviewByRev : '/api/reviews/:resena_uuid',
 endpointReviewByUsr : '/api/reviews/:usr_casero_uuid/:usr_inquilino_uuid',

//ENDPOSINTS SEARCHER
 endpointGenericSearcher:'/search/:table',
 endpointGenericMultiSearcher:'/searches/:table1/:table2/:t1key/:t2key',

//ENDPOINTS USER
 endpointUserProfile : '/api/users/:username',
 endpointUserByUuid : '/api/user/:user_uuid',
 endpointUser : '/api/users',

//ENDPOINTS SELF
 endpointSelfAdvertisements : '/api/user/:username/advertisements',
 endpointSelfProfile : '/api/users/me',
 endpointSelfProperties : '/api/user/:username/properties',
 endpointSelfReservations : '/api/user/:username/reservations',
 endpointSelfReviews : '/api/user/:username/reviews',
}