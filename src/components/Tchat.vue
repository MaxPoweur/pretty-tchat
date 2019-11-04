<template>
    <div id="tchat">
        <div id="loading">
            <RippleLoader :color="primaryColor"/>
        </div>
        <!-- <div v-else id="messages">
            <div class="message">
                <p
                    class="content"
                >Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                <div class="details">
                    <span class="author">Adam Rotard</span>
                    <span class="date">23:10</span>
                </div>
            </div>
            <div class="message own-message">
                <p
                    class="content"
                >Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                <div class="details">
                    <span class="author">Adam Rotard</span>
                    <span class="date">23:10</span>
                </div>
            </div>
            <div class="message">
                <p
                    class="content"
                >Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                <div class="details">
                    <span class="author">Adam Rotard</span>
                    <span class="date">23:10</span>
                </div>
            </div>
            <div class="message own-message">
                <p
                    class="content"
                >Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                <div class="details">
                    <span class="author">Adam Rotard</span>
                    <span class="date">23:10</span>
                </div>
            </div>
            <div class="message">
                <p
                    class="content"
                >Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                <div class="details">
                    <span class="author">Adam Rotard</span>
                    <span class="date">23:10</span>
                </div>
            </div>
        </div> -->
        <div id="input-message" class="box-shadow">
            <textarea placeholder="Hello world !"></textarea>
            <div id="submit-container">
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

const query = gql`
    query MyQuery {
        users {
            username
            updated_at
            id
            created_at
        }
    }
`;

export default {
    data() {
        return {
            users: [],
        }
    },
    computed: {
        ...mapGetters([
            'username',
            'logged'
        ]),
    },
    methods: {
    },
    components: {
        RippleLoader,
    },
    apollo: {
        users: {
            query,
        },
    },
    updated() {
    },
    mounted() {
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
                padding: 30px 20px;
                text-align: justify;
                flex: 4;
                transition: 1s;
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