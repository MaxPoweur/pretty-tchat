<template>
    <div id="tchat">
        <div id="messages">
            <div class="message">
                <p class="content">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                <div class="details">
                    <span class="author">Adam Rotard</span>
                    <span class="date">23:10</span>
                </div>
            </div>
            <div class="message own-message">
                <p class="content">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                <div class="details">
                    <span class="author">Adam Rotard</span>
                    <span class="date">23:10</span>
                </div>
            </div>
            <div class="message">
                <p class="content">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                <div class="details">
                    <span class="author">Adam Rotard</span>
                    <span class="date">23:10</span>
                </div>
            </div>
            <div class="message own-message">
                <p class="content">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                <div class="details">
                    <span class="author">Adam Rotard</span>
                    <span class="date">23:10</span>
                </div>
            </div>
            <div class="message">
                <p class="content">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                <div class="details">
                    <span class="author">Adam Rotard</span>
                    <span class="date">23:10</span>
                </div>
            </div>
        </div>
        <div id="input-message"></div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import ThemeMixin from '@mixins/ThemeMixin.js';
export default {
    computed: {
        ...mapGetters([
            'username',
            'logged'
        ])
    },
    methods: {
    },
    updated() {
        console.log('update')
    }
}
</script>

<style scoped lang="scss">
    #tchat {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        #messages {
            display: flex;
            flex-direction: column;
            padding: 25px;
            overflow: auto;
            flex: 1;
            .message {
                display: flex;
                margin-bottom: 2em;
                // border-bottom: 1px dashed var(--secondary-color-reverse);
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
                    // margin-top:20px;
                    // margin-bottom: 20px;
                    // font-weight: bold;
                    // font-style: italic;
                    // font-size: 10px;
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
            // position: fixed;
            bottom: 0;
            height: 100px;
            width: 100%;
            background-color: red;
        }
    }
</style>