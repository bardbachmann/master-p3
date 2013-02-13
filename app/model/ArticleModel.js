Ext.define("TestApp.model.ArticleModel", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {name: 'title', mapping: 'title', type: 'auto'},
            {name: 'link', type: 'auto'},
            {name: 'categories', type: 'auto'},
            {name: 'contentSnippet', mapping: 'contentSnippet', type: 'auto'},
            {name: 'content', mapping: 'content', type: 'auto'},
            {name: 'url', mapping: 'mediaGroups[0].contents[0].url', type: 'auto'},
            {name: 'author', type: 'auto'},
            {name: 'publishedDate', type: 'auto'}
        ]
    }
});
