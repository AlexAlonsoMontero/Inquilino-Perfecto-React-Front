const host = 'http://127.0.0.1'
const port ='3001'

export const routes = {
    home: '/',
    //USER
    r_register: `/api/users`,
    r_login:`/login`,
    r_ativactionUser:`/activation`,
    r_DataUser: '/api/users/',
    //ADVERTISEMENT
    r_advSearcher: '/',
    r_advertisement: '/advertisement',
    r_addAdvertisement: '/advertisement/add',
    //PROPERTY
    r_PropertyNewProp:'/api/property/add',
    r_ControlPanelCasero:'/api/property',
    r_updatePropertiesUser:'/api/property/update'
    

}

export const backRoutes ={
    r_host_port:`${host}:${port}`,
    //USER
    r_register: `${host}:${port}/api/users`,
    r_login:`${host}:${port}/login`,
    r_activationUser: `${host}:${port}/activation`,
    r_Datauser: `${host}:${port}/api/users/`,

    //ADVERTISEMENT
    r_getAdvertisement: `${host}:${port}/api/adv/`,
    r_advSearcher: `${host}:${port}/api/adv/`, // se completa con :table1/:table2/ y queryparams
    r_advSearcherByProp: `${host}:${port}/api/adv/prop/`,
    r_advSearcherByUser: `${host}:${port}/api/adv/user/`,//PROPERTIES
    r_AvgPropertyCalification: `${host}:${port}/api/avg-reviews/resenas/puntuacion/`,
    r_Newproperties: `${host}:${port}/api/properties`,
    r_PropertiesSelfUser:`${host}:${port}/api/self/properties/`,
    r_Properties:`${host}:${port}/api/properties/`,
    //images
    r_getImages:`${host}:${port}/img/`
}



