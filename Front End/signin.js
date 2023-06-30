const login=document.querySelector('#login_btn');
const baseurl="http://localhost:5000/"

login.addEventListener('click',signin)

function signin(e){
    e.preventDefault();
    const obj={
        email:document.querySelector('#email').value,
        password:document.querySelector('#password').value
    }
    axios.post(baseurl+'user/login',obj)
    .then((msg)=>alert(msg))
    .catch((err)=>{
        console.log(err.message);alert(err.message)})
}