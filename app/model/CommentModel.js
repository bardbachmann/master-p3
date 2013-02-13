Ext.define("TestApp.model.CommentModel", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {name: 'content', mapping: 'content', type: 'auto'},
            {name: 'author', type: 'auto'},
            {name: 'publishedDate', type: 'auto'}
        ]
    }
});
