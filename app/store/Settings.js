Ext.define('TestApp.store.Settings', {
    extend: 'Ext.data.Store',

    config: {
        model: 'TestApp.model.Settings',
        autoLoad: true,

        proxy: {
            //use sessionstorage if need to save data for that
            //specific session only
            type: 'localstorage',
            id  : 'settingsKeyTest8090'
        },

        sorters: [
            {
                property : 'class1',
                direction: 'ASC'
            },

            {
                property : 'title',
                direction: 'ASC'
            }
        ],
        grouper: {
            groupFn: function (item) {
                return item.get('class1')[0];
            } // groupFn
        },
        groupField: 'class1'/*,

        data: [{title: 'Nyheter', toggle: true, src: ""},
            {title: 'Tag/CBS', toggle: false, src: "tag/cbs"}]  */
    }
});