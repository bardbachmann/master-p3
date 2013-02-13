Ext.define("TestApp.store.Main", {
    extend: "Ext.data.Store",
    requires: ["Ext.data.proxy.JsonP", "Ext.dataview.List" ],
    config: {
        model: "TestApp.model.ArticleModel",
        autoLoad: true,
        proxy: {
            type: 'jsonp',
            url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://serienytt.no/feed/',
            reader: {
                type: 'json',
                rootProperty: 'responseData.feed.entries'
            }
        }
    }
});