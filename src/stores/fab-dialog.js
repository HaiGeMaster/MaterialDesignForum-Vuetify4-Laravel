
import { defineStore } from 'pinia'

export const useFabDialogStore = defineStore('fab_dialog', {
    state: () => ({
        fabdialogName: '',
        searchFabDialog: {
            model: 'close',
            value: '',
        },
        editorFabDialog: {
            model: 'close',
            title: '',
            icon: 'mdi-pencil-outline',
            has_title: true,
            has_topic: true,
            submit_text: '',
            edit_type: 'article',
            edit_mode: 'new',
            edit_mode_id: 0,
            answer_to_question_id: 0,
            md_title: '',
            md_topics: [],
            md_content: '',
        },
        newSearchFabDialog: {
            model: false,
            value: '',
        },
        newEditorFabDialog: {
            model: false,
            title: '',
            icon: 'mdi-pencil-outline',
            showTitle: true,
            showTopics: true,
            submitText: '',
            editType: 'article',//article,question,answer
            editMode: 'new',//new,edit
            editItem: null,
            editItemId: 0,//编辑的id，question_id,article_id,answer_id
            answerToQuestionId: 0,//回答的问题id
            mdTitle: '',
            mdTopics: [],
            mdContent: '',
        },
    }),
    getters: {
        getFabDialogName: (state) => state.fabdialogName,
        getSearchFabDialog: (state) => state.searchFabDialog,
        getEditorFabDialog: (state) => state.editorFabDialog,
        getNewSearchFabDialog: (state) => state.newSearchFabDialog,
        getNewEditorFabDialog: (state) => state.newEditorFabDialog,
    },
    actions: {
        setFabDialogName(val) {
            this.fabdialogName = val
        },
        setSearchFabDialog({ model = this.searchFabDialog.model, value = this.searchFabDialog.value }) {
            this.searchFabDialog = { model, value }
        },
        setEditorFabDialog({
            model = this.editorFabDialog.model,
            title = this.editorFabDialog.title,
            icon = this.editorFabDialog.icon,
            has_title = this.editorFabDialog.has_title,
            has_topic = this.editorFabDialog.has_topic,
            submit_text = this.editorFabDialog.submit_text,
            edit_type = this.editorFabDialog.edit_type,
            edit_mode = this.editorFabDialog.edit_mode,
            edit_mode_id = this.editorFabDialog.edit_mode_id,
            answer_to_question_id = this.editorFabDialog.answer_to_question_id,
            md_title = this.editorFabDialog.md_title,
            md_topics = this.editorFabDialog.md_topics,
            md_content = this.editorFabDialog.md_content,
        }) {
            this.editorFabDialog = {
                model,
                title,
                icon,
                has_title,
                has_topic,
                submit_text,
                edit_type,
                edit_mode,
                edit_mode_id,
                answer_to_question_id,
                md_title,
                md_topics,
                md_content,
            }
        },
        setNewSearchFabDialog({ model = this.newSearchFabDialog.model, value = this.newSearchFabDialog.value }) {
            this.newSearchFabDialog = {
                model: model,
                value: value,
            }
        },
        setNewEditorFabDialog({
            model = this.newEditorFabDialog.model,
            title = this.newEditorFabDialog.title,
            icon = this.newEditorFabDialog.icon,
            showTitle = this.newEditorFabDialog.showTitle,
            showTopics = this.newEditorFabDialog.showTopics,
            submitText = this.newEditorFabDialog.submitText,
            editType = this.newEditorFabDialog.editType,
            editMode = this.newEditorFabDialog.editMode,
            editItem = this.newEditorFabDialog.editItem,
            editItemId = this.newEditorFabDialog.editItemId,
            answerToQuestionId = this.newEditorFabDialog.answerToQuestionId,
            mdTitle = this.newEditorFabDialog.mdTitle,
            mdTopics = this.newEditorFabDialog.mdTopics,
            mdContent = this.newEditorFabDialog.mdContent,
        }) {
            this.newEditorFabDialog = {
                model,
                title,
                icon,
                showTitle,
                showTopics,
                submitText,
                editType,
                editMode,
                editItem,
                editItemId,
                answerToQuestionId,
                mdTitle,
                mdTopics,
                mdContent,
            }
        },
    }
})