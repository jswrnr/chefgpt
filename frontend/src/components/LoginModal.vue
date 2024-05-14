<template>
  <!-- Login Modal -->
  <div class="modalOverlay fadeIn" id="loginModal">
    <!-- Modal Content -->
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h5
            style="text-align: center !important"
            class="modal-title"
            id="modalLoginLabel"
          >
            Welcome to CheftGPT
          </h5>
        </div>
        <!-- Modal Body -->
        <div class="modal-body">
          <form>
            <!-- Email Input -->
            <div class="form-group">
              <input
                type="text"
                id="loginEmail"
                class="form-input"
                v-model="email"
                placeholder="Email"
              />
            </div>
            <!-- Password Input -->
            <div class="form-group">
              <input
                type="password"
                id="loginPassword"
                class="form-input"
                v-model="password"
                placeholder="Password"
              />
            </div>
            <!-- Login Button -->
            <!-- TODO: Call to Database -->
            <button
              style="margin-left: 0rem"
              type="button"
              id="loginBtn"
              class="btn-primary"
              @click="login"
            >
              Log in
            </button>
            <!-- Sign Up Link -->
            <p style="margin-top: 1rem" class="signup-link">
              No account yet? <a href="#" @click="openSignupModal">Register</a>
            </p>
          </form>
        </div>
        <!-- Modal Footer -->
        <div class="modal-footer">
          <!-- Footer content here -->
        </div>
      </div>
    </div>
  </div>

  <!-- Signup Modal -->
  <div class="modalOverlay fadeIn" id="signupModal">
    <!-- Modal Content -->
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title">Sign up to CheftGPT</h5>
          <button
            type="button"
            class="close-btn"
            @click="closeModal"
            aria-label="X"
          >
            X
          </button>
        </div>
        <!-- Modal Body -->
        <div class="modal-body">
          <form>
            <!-- Email Input -->
            <div class="form-group">
              <input
                type="text"
                id="signupEmail"
                class="form-input"
                v-model="email"
                placeholder="Email"
              />
            </div>
            <!-- Username Input -->
            <div class="form-group">
              <input
                type="text"
                id="signupUsername"
                class="form-input"
                v-model="name"
                placeholder="Name"
              />
            </div>
            <!-- Password Input -->
            <div class="form-group">
              <input
                type="password"
                id="signupPassword"
                class="form-input"
                v-model="password"
                placeholder="Password"
              />
            </div>
            <!-- Register Button -->
            <!-- TODO: Call to Database -->
            <button
              type="button"
              class="btn-primary"
              style="margin-left: 0rem"
              @click="register"
            >
              Register
            </button>
            <!-- Login Link -->
            <p class="login-link">
              Got an account? <a href="#" @click="openLoginModal">Log in</a>
            </p>
          </form>
        </div>
        <!-- Modal Footer -->
        <div class="modal-footer">
          <!-- Footer content here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataProvider from "../dataProvider/dataProvider";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      dataProvider: new DataProvider(),
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    openSignupModal() {
      document.querySelector("#loginModal").style.display = "none";
      document.querySelector("#signupModal").style.display = "flex";
    },
    openLoginModal() {
      document.querySelector("#loginModal").style.display = "flex";
      document.querySelector("#signupModal").style.display = "none";
    },
    register() {
      const response = this.dataProvider.post("signup", {
        email: this.email,
        password: this.password,
        name: this.name,
      });
      this.$router.push("/main");
    },
    async login() {
      const response = await this.dataProvider.post("login", {
        email: this.email,
        password: this.password,
      });
      localStorage.setItem("token", response.token);
      this.$router.push("/main");
    },
  },
  mounted() {
    this.openLoginModal();
  },
};
</script>
