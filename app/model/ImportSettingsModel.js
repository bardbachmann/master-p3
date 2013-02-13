Ext.define("TestApp.model.ImportSettingsModel", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {name: 'title', mapping: 'title', type: 'auto'},
            {name: 'link', type: 'auto'},
            {name: 'contentSnippet', mapping: 'contentSnippet', type: 'auto'},
            {name: 'content', mapping: 'content', type: 'auto'},
            {name: 'author', type: 'auto'}

        ]
    }
});