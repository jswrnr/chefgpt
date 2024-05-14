<template>
    <div class="modalOverlay fadeIn" id="loginModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLoginLabel">Log in / Sign up</h5>
                <button type="button" class="btn-close" @click="closeModal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <!-- Email input -->
                    <div class="form-outline mb-4">
                        <input type="text" id="form2Example1" class="form-control" v-model="username"/>
                        <label class="form-label" for="form2Example1">Username</label>
                    </div>
                    
                    <!-- Password input -->
                    <div class="form-outline mb-4">
                        <input type="password" id="form2Example2" class="form-control" v-model="password"/>
                        <label class="form-label" for="form2Example2">Password</label>
                    </div>
                    
                    <!-- 2 column grid layout for inline styling -->
                    <div class="row mb-4">
                        <div class="col d-flex justify-content-center">
                        <!-- Checkbox -->
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                            <label class="form-check-label" for="form2Example31"> Remember me </label>
                        </div>
                        </div>
                    </div>
                    
                    <!-- Submit button -->
                    <div class="col d-flex justify-content-center">
                        <button type="button" id="loginBtn" class="btn btn-primary btn-block mb-4">Log in</button>
                    </div>
                    
                    <!-- Register buttons -->
                    <div class="text-center">
                        <p>No account yet? <a href="#" @click="openSignupModal">Register</a></p>
                    </div>
                    </form>
            </div>
            <div class="modal-footer col d-flex justify-content-center">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            </div>
            </div>
        </div>
    </div>

    <div class="modalOverlay fadeIn" id="signupModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLoginLabel">Sign up</h5>
                <button type="button" class="btn-close" @click="closeModal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <!-- First name input -->
                    <div class="form-outline mb-4">
                        <input type="text" id="firstNameForm" class="form-control" v-model="firstName"/>
                        <label class="form-label" for="firstNameForm">First name</label>
                    </div>
                    <!-- Surname input -->
                    <div class="form-outline mb-4">
                        <input type="text" id="surNameForm" class="form-control" v-model="surName"/>
                        <label class="form-label" for="surNameForm">Surname</label>
                    </div>
                    <!-- Email input -->
                    <div class="form-outline mb-4">
                        <input type="text" id="form2Example1" class="form-control" v-model="username"/>
                        <label class="form-label" for="form2Example1">Username</label>
                    </div>
                    
                    <!-- Password input -->
                    <div class="form-outline mb-4">
                        <input type="password" id="form2Example2" class="form-control" v-model="password"/>
                        <label class="form-label" for="form2Example2">Password</label>
                    </div>
                    
                    <!-- 2 column grid layout for inline styling -->
                    <div class="row mb-4">
                        <div class="col d-flex justify-content-center">
                        <!-- Checkbox -->
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                            <label class="form-check-label" for="form2Example31"> Remember me </label>
                        </div>
                        </div>
                    </div>
                    
                    <!-- Submit button -->
                    <div class="col d-flex justify-content-center">
                        <button type="button" id="loginBtn" class="btn btn-primary btn-block mb-4">Register</button>
                    </div>
                    
                    <!-- Register buttons -->
                    <div class="text-center">
                        <p>Got an account? <a href="#" @click="openLoginModal"> Log in</a></p>
                    </div>
                    </form>
            </div>
            <div class="modal-footer col d-flex justify-content-center">
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
    closeModal() {
      this.$emit('close');
    },
    openSignupModal() {
        document.querySelector('#loginModal').style.display = "none";
        document.querySelector('#signupModal').style.display = "flex";
    },
    openLoginModal() {
        document.querySelector('#loginModal').style.display = "flex";
        document.querySelector('#signupModal').style.display = "none";
    }
  },
}
</script>

<style>
/* Custom CSS for the modal */

.modalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Hier kannst du die Transparenz des Overlays einstellen */
    z-index: 999; /* Höhere Stapelreihenfolge, um über anderen Elementen zu liegen */
    display: flex;
    justify-content: center;
    align-items: center;
}

#signupModal {
    display: none;
}

.modal-dialog {
    background-color: #bbdcff;
    border-radius: 25px;
    max-width: 90vw;
    width: 90%;
}

.modal-content {
    background-color: #343a40; /* Change background color */
    color: #ffffff; /* Text color */
    padding: 4vw;
}

.modal-header {
    border-bottom: none; /* Remove border */
    margin-bottom: 2vw;
}

.modal-title {
    color: 0056b3;
}

.modal-body {
    padding: 4vw;
}

.modal-footer {
    border-top: none; /* Remove border */
    justify-content: space-between; /* Align buttons */
    padding: 2vw;
}

/* Styling for form elements */
.form-group {
    margin-bottom: 2vw;
}

/* Input fields */
.form-control {
    background-color: #454d55; /* Input field background */
    color: #ffffff; /* Input text color */
    border-color: #ced4da; /* Input border color */
}

/* Buttons */
#loginBtn {
    position: relative;
    background-color: #007bff; /* Button background color */
    border-color: #007bff; /* Button border color */
}

.btn-primary:hover {
    background-color: #0056b3; /* Hover background color */
    border-color: #0056b3; /* Hover border color */
}

.btn-secondary {
    background-color: #6c757d; /* Button background color */
    border-color: #6c757d; /* Button border color */
}

.btn-secondary:hover {
    background-color: #5a6268; /* Hover background color */
    border-color: #5a6268; /* Hover border color */
}

/* Links */
a {
    color: #007bff; /* Link color */
}

a:hover {
    color: #0056b3; /* Hover link color */
}

@media screen and (max-width: 768px) {
  .modal-dialog {
    border-radius: 5vw;
  }

  .modal-content {
    padding: 8vw;
  }

  .modal-header {
    margin-bottom: 6vw;
  }

  .modal-body {
    padding: 8vw;
  }

  .modal-footer {
    padding: 4vw;
  }

}
</style>