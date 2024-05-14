<template>
    <div class="profile">
        <div class="profile-picture">
            <img src="../assets/icons/profile_picture_tmp.jpg" alt="Profile Picture" />
        </div>
        <div class="profile-header">
            <h2>{{ userName }}</h2>
        </div>
        <div class="profile-actions" style="align-items: center;">
            <button class="action-button" @click="uploadProfilePicture">Change Profile Picture</button>
            <button class="action-button" @click="editUserName">Edit Name</button>
            <button class="action-button" @click="changePassword">Change Password</button>
            <button class="action-button" @click="deleteAccount">Delete Account</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: "Luka Grv",
            profilePicture: null,
        };
    },
    methods: {
        editUserName() {
            const newName = prompt("Enter new name:");
            if (newName) {
                this.userName = newName;
            }
        },
        uploadProfilePicture(event) {
            const file = event.target.files[0];
            // Handle file upload logic here
        },
        changePassword() {
            // Implement password change logic here
        },
    },
};
</script>

<style scoped>
.profile {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.profile-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
}

.profile-picture {
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}

.profile-picture img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
}

.profile-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
}

.action-button {
    display: flex;
    justify-content: center;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #343434;
    cursor: pointer;
}
</style>
