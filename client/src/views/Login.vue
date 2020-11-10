<template>
<div id="Login-container" class="container">
    <div id="Login" class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="login-panel text-left">
                    <div class="alert alert-primary" rol="alert" :style="{opacity: isAlertShow ? 1:0}">
                        Processing <small> please wait...</small>
                        <loading-component width="20"></loading-component>
                    </div>
                    <h1 class="display-3 font-weight-bold">Login</h1>
                    <p class="font-weight-bold">Welcome Back!</p>
                    <br>
                    <form action="">
                        <!-- Email -->
                        <div class="form-group">
                            <label for="" class="ionput-label"><h4>Email</h4>
                            </label>
                            <input @enter="login" type="email" v-model="email" id="email" class="form-control" placeholder="Email" required="true">
                        </div>
                        <div class="email-error_message">
                            <p id="email-error">{{sendEmailError}}</p>
                            <p id="email-success">{{}}</p>
                        </div>
                        <!-- password -->
                        <div class="form-group">
                            <label for="" class="ionput-label"><h4>Password</h4></label>
                            <input @enter="login" type="password" v-model="password" id="password" class="form-control" placeholder="password" required="true">
                        </div>
                        <br>
                        <!-- Submit -->
                        <div class="form-group d-flex justify-content-center">
                            <button class="btn btn-primary w-25" @click="login" v-if="!isLoggingIn">Login</button>
                            <button class="btn btn-primary w-25" disabled @click="login()" v-if="isLoggingIn">
                                <loading-component width="20"></loading-component>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import LoadingComponent from '../components/LoadingComponent'
import UserService from '../UsersService'
import {setTimeout} from 'timers'
export default {
    name:"Login",
    components:{
        LoadingComponent
    },
    data(){
        return{
            emailError:"",
            isLoggingIn:false,
            isAlertShow:false,
            email:"",
            password:"",
            logIn:[]
        }
    },
    computed:{
        sendEmailError: function(){
            const email =  this.email;
            //initialize
            if (this.email == ""){
                return ""
            }
            // Valid Email
            if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
                return "" 
            }else{
                return "Invalid email"
            }
        }
    },
    methods:{
        login(){  
            this.isLoggingIn = true;
            setTimeout(async () =>{
                this.isLoggingIn = false;
                this.isAlertShow = true;
                //Validate here
                if (this.email=="" || this.password==""){
                    alert("Complete input in all fields")
                    this.isAlertShow = false
                    this.email = ""
                    this.password = ""
                }
                // End oof Validation
                this.logIn = await UserService.login(this.email, this.password)
                if(this.logIn.status == 202){
                    setTimeout(() => this.redirect(), 1000)
                }else if(this.logIn.status == 201){
                    alert("This credentials are not yet registered in the database")
                    this.isAlertShow = false
                    this.email = ""
                    this.password = ""
                }
            }, 1000)
        },
        EmptyWarning(){
            return "You haven't placed anything yet";
        },
        redirect(){
            // This makes your page go form one page to another
            this.$router.push({name:'Orders'})
        }
    }
}
</script>

<style lang="scss" scoped>
#Login-container{
    #Login{
        color:white;
        background: #76CCA6;
        padding-bottom: 5.5em;
        .login-panel{
            margin-top: 2em;
            padding: 100px 60px;
            border-radius: 5em;
            background-color: #116466;
            position: relatve;
            border: 5px #2B2445 solid;
            background-image: linear-gradient(180deg, #59253A, #003F5B);
                .ionput-label{
                    h4{
                        font-weight: bold;
                    }
                }
                .alert{
                    opacity: 0;
                    position: absolute;
                    top: 70px;
                    left: 60px;
                    width: 80%;
                        &.alert-primary{
                            background-color: #007bff;
                            color: #fff;
                            border: none;
                            font-size: 18px;
                                .widget{
                                    position:absolute;
                                    right: 5px;
                                    top: 0;
                                    margin: 10px;
                                }
                            }
                        }
                    }
                }
}
</style>