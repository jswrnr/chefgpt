<template>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <div class="navbarBrand">SmartFridge</div>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="#" data-toggle="modal" data-target="#modalLogin" @click="openLoginModal">Log-In</a>
            </li>
        </ul>
    </nav>
    <LoginModal v-if="showLoginModal" @close="closeLoginModal" />
</template>
  
<script>
    import LoginModal from './LoginModal.vue';

    export default {
        components: {
            LoginModal
        },
        data() {    
            return {
                showLoginModal: false
            }
        },
        methods: {
            openLoginModal(){
                this.showLoginModal = true;
            },
            closeLoginModal(){
                this.showLoginModal = false;
            }
        }
        
    }

</script>
  
<style>
    .navbar {
        background-color: #28a745;
        color: #ffffff;
    }

    .navbarBrand {
        font-size: 2rem;
        position: absolute;
        width: 80%;
        left: 1.5vw;
        top: 50%;
        transform: translateY(-50%);
    }

    .nav-item .nav-link {
        font-size: 20px;
        margin-left: 92vw;
    }

    .navbarNav {
        display: flex;
        justify-content: flex-end;
        width: 80%;
        margin-left: auto;
    }

    .nav-item {
        margin-right: 2vw;
    }

    @media screen and (max-width: 991px){ 
        .nav-item .nav-link {
            font-size: 20px;
            margin-left: 85vw;
        }   
    }

    @media screen and (max-width: 1837px){ 
        .nav-item .nav-link {
            font-size: 20px;
            margin-left: 91vw;
        }   
    }

    @media screen and (max-width: 1470px){ 
        .nav-item .nav-link {
            font-size: 20px;
            margin-left: 90vw;
        }   
    }

    @media screen and (max-width: 1225px){ 
        .nav-item .nav-link {
            font-size: 20px;
            margin-left: 88vw;
        }   
    }

    @media screen and (max-width: 992px){ 
        .nav-item .nav-link {
            font-size: 20px;
            margin-left: 88vw;
        }   
    }

    @media screen and (max-width: 575px){ 
        .nav-item .nav-link {
            font-size: 20px;
            margin-left: 85vw;
        }   
    }

    @media screen and (max-width: 430px){ 
        .nav-item .nav-link {
            font-size: 20px;
            margin-left: 80vw;
        }   
    }

    @media screen and (max-width: 280px){ 
        .nav-item .nav-link {
            font-size: 20px;
            margin-left: 77vw;
        }   
    }
</style>