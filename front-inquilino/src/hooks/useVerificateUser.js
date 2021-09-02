const useVerifiateUser=(user,type) =>{
    let validate = false;
    type.forEach(userType => {
        if(userType===user.tipo){
            validate = true
        }
    });
    return validate;

}
export default useVerifiateUser