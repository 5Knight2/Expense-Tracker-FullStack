const login=document.querySelector('#login_btn');
const form=document.querySelector('#form2');
const baseurl="http://localhost:5000/"

login.addEventListener('click',signin)

async function signin(e){
    e.preventDefault();
    if(form.checkValidity()){
    const obj={
        email:document.querySelector('#email').value,
        password:document.querySelector('#password').value
    }
    try{
    const msg=await axios.post(baseurl+'user/login',obj)
    alert(msg.data)
        window.location.href = "http://127.0.0.1:5500/Front%20End/expense.html";
    }
    catch(err){
        console.log(err.response.data);alert(err.response.data)}
    }else form.classList.add('was-validated')
}