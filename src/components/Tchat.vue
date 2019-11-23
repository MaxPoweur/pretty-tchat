<template>
    <div id="tchat">
        <div id="messages">
            <div id="loading" v-if="!loaded">
                <RippleLoader :color="primaryColor"/>
            </div>
            <div v-else class="message" :class="{'own-message':message.user.id==userData.id}" v-for="message in messages" :key="message.id">
                <div class="details">
                    <span class="author">{{message.user.username}}</span>
                    <span class="time">{{message.created_at.toLocaleTimeString()}}</span>
                    <span class="date">{{message.created_at.toLocaleDateString()}}</span>
                </div>
                <div class="content">
                    <div class="start-message"><i class="fas fa-quote-left"></i></div>
                    <p>{{message.content}}</p>
                    <div class="end-message"><i class="fas fa-quote-right"></i></div>
                </div>
            </div>
        </div>
        <div id="input-message" class="box-shadow">
            <textarea placeholder="Hello world !" v-model="message"></textarea>
            <div id="submit-container" @click="addMessage">
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import ThemeMixin from '@mixins/ThemeMixin.js';
import gql from 'graphql-tag';
import { RippleLoader } from 'vue-spinners-css';

const graphql = {
    addMessage: gql`mutation AddMessage($author: uuid!, $content: String!) {
        insert_messages(objects: {author: $author, content: $content}) {
            returning {
                id
            }
        }
    }`,
    messages: gql`subscription GetMessages {
        messages {
            user {
                id
                created_at
                updated_at
                username
            }
            content
            created_at
            id
            updated_at
        }
    }`
}

export default {
    data() {
        return {
            message: "",
            messages: [],
            loaded: false
        }
    },
    computed: {
        ...mapGetters([
            'userData',
            'logged'
        ]),
    },
    methods: {
        updateMessages(messages) {
            this.messages = messages.map(message=>{
                message.created_at = new Date(Date.parse(message.created_at));
                return message;
            });
            this.scrollBottom();
        },
        addMessage() {
            if(this.message.trim().length==0) {
                return;
            }
            this.$apollo.mutate({
                mutation: graphql.addMessage,
                variables: {
                    author: this.userData.id,
                    content: this.message
                },
            });
            this.message = "";
        },
        observeMessages() {
            var messages = document.querySelector('#messages');
            var observer = new MutationObserver(this.scrollBottom);
            var config = {childList: true};
            observer.observe(messages, config);
        },
        scrollBottom() {
            this.animateScroll(300);
            // var container = document.querySelector("#messages");
            // container.scrollTop = container.scrollHeight;
        },
        animateScroll(duration)  {
            var messages = document.querySelector('#messages');
            var start = messages.scrollTop;
            var end = messages.scrollHeight;
            var change = end - start;
            var increment = 20;
            function easeInOut(currentTime, start, change, duration) {
                // by Robert Penner
                currentTime /= duration / 2;
                if (currentTime < 1) {
                return change / 2 * currentTime * currentTime + start;
                }
                currentTime -= 1;
                return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
            }
            function animate(elapsedTime) {
                elapsedTime += increment;
                var position = easeInOut(elapsedTime, start, change, duration);
                messages.scrollTop = position;
                if (elapsedTime < duration) {
                setTimeout(function() {
                    animate(elapsedTime);
                }, increment)
                }
            }
            animate(0);
        }
    },
    components: {
        RippleLoader,
    },
    apollo: {
        $subscribe: {
            messages: {
                query: graphql.messages,
                result(result) {
                    this.updateMessages(result.data.messages);
                    this.loaded = true;
                },
                error(error) {
                    console.log('error:', error);
                }
            }
        },
        $mutation: {
            addMessage: {
                query: graphql.addMessage,
                variables: {
                    author: "",
                    content: ""
                },
                result(result) {
                    this.updateMessages(result.data.messages);
                },
                error(error) {
                    console.log('error:', error);
                }
            }
        }
    },
    created() {
    },
    mounted() {
        this.observeMessages();
    }
}
</script>

<style scoped lang="scss">
#tchat {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    #loading {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 4;
    }
    #messages {
        display: flex;
        flex-direction: column;
        padding: 25px;
        overflow: auto;
        flex: 4;
        .message {
            display: flex;
            margin-bottom: 2em;
            .content {
                @extend .box-shadow;
                margin: 0;
                color: var(--secondary-color);
                background-color: var(--secondary-color-reverse);
                opacity: 0.9;
                padding: 35px 25px;
                text-align: justify;
                flex: 4;
                transition: 1s;
                position: relative;
                .start-message {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    font-size: 30px;
                }
                .end-message {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 30px;
                }
                p {
                    font-style: italic;
                }
            }
            .details {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 25px;
                padding: 15px;
                flex: 1;
                transition: 1s;
                background-color: rgba(0, 0, 0, 0.05);
                .author {
                    margin-bottom: 15px;
                }
                .time {
                    font-size: 16px;
                }
                .date {
                    font-size: 14px;
                }
            }
            &.own-message {
                flex-direction: row-reverse;
            }
        }
    }
    #input-message {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
        textarea {
            width: 100%;
            border: none;
            overflow: auto;
            outline: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
            resize: none;
            padding: 10px;
            min-height: 100px;
            color: var(--secondary-color);
            background-color: var(--secondary-color-reverse);
            font-family: "Avenir", Helvetica, Arial, sans-serif;
        }
        #submit-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            background-color: red;
            color: var(--secondary-color-reverse);
            background-color: var(--secondary-color);
            text-align: center;
            padding: 10px;
            font-size: 30px;
            flex: 1;
            cursor: pointer;
            transition: 0.5s;
            &:hover {
                background-color: var(--secondary-color-hover);
            }
            i {
                transition: 0.5s;
                &:hover {
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>