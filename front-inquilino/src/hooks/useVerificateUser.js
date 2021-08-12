const useVerifiateUser=(user,type) =>{
    let validate = false;
    type.forEach(userType => {
        if(userType===user.tipo){
            validate = true
        }
    });
    console.log("validacion:" + validate)
    return validate;

}
export default useVerifiateUser