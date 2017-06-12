<template>
    <div>
        <textarea style="opacity: 0"></textarea>
    </div>
</template>
<script>
import {marked} from '../../lib/utils'
import SimpleMDE from 'simplemde'
export default {

    data () {
        return {
            smde: null
        }
    },

    props: {
        value: {
            type: String,
            required: true,
            'default': ''
        }
    },

    created () {
        this.smde = new SimpleMDE({
            initialValue: this.value,
            autoDownloadFontAwesome: false,
            element: this.$el.children[0],
            previewRender: function (plainText) {
                return marked(plainText) // Returns HTML from a custom parser
            },
            spellChecker: false
        })

        this.smde.codemirror.on('change', () => {
            let value = this.smde.value()
            if (this.value === value) {
                return
            }
            this.$emit('input', value)
        })
    },

    destroyed () {
        this.smde = null
    },

    watch: {
        value (val) {
            if (val !== this.smde.value()) {
                this.smde.value(val)
            }
        }
    }
}
</script>
