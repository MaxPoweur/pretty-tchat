<template>
    <div id="login-form">
        <div class="container">
            <img alt="Vue logo" src="@images/logo.png">
            <h1>Viens tchatter avec nous !</h1>
            <form class="box-shadow">
                <input name="username" type="text" id="tmp" v-model.trim="username" @keyup.enter="onLogin" />
                <input type="submit" value="GO" @click.prevent="onLogin" />
            </form>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { LOGIN } from  '@assets/scripts/mutationTypes.js';
import gql from 'graphql-tag';
export default {
    data() {
        return {
            username: ""
        }
    },
    methods: {
        ...mapMutations([
            'login'
        ]),
        onLogin() {
            if(this.username.length<3) {
                return;
            }
            this.$apollo.query({
                query: gql`query SearchUser($username: String!) {
                    users(where: {username: {_eq: $username}}) {
                        id
                        username
                    }
                }`,
                variables: {username: this.username}
            }).then(response=>{
                if(response.data.users.length==1) {
                    this.login(response.data.users[0]);
                } else {
                    this.$apollo.mutate({
                        mutation: gql`mutation AddUserMutation($username: String!) {
                            insert_users(objects: {username: $username}) {
                                returning {
                                    id
                                    username
                                }
                            }
                        }`,
                        variables: {
                            username: this.username,
                        },
                    }).then(response=>{
                        this.login(response.data.insert_users.returning[0]);
                    })
                }
            });
        }
    }
}
</script>

<style scoped lang="scss">
    #login-form {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: -$topbarHeight;
            form {
                display: inline-block;
                input {
                    border: 0;
                    outline: 0;
                    padding: 20px;
                    &[type=text] {
                        color: var(--thirth-color-reverse);
                        background-color: var(--thirth-color);
                        font-size: 25px;
                    }
                    &[type=submit] {
                        font-weight: bold;
                        color: var(--secondary-color-reverse);
                        font-size: 25px;
                        background-color: var(--secondary-color);
                        cursor: pointer;
                        &:hover {
                            background-color: var(--secondary-color-hover);
                        }
                    }
                }
            }
            * {
                transition: 1s;
            }
        }
    }
</style>