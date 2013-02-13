Ext.Loader.setConfig({
    enabled: true
});




Ext.application({
    name: 'TestApp',
    models: ["ArticleModel", "Settings", "CommentModel", "ImportSettingsModel"],
    stores: ["Main", "Settings"],
    views: ['Main', 'Article'],
    controller: ['Main'],



    requires: ['Ext.data.reader.Xml', 'Ext.Img', 'Ext.MessageBox', 'Ext.dataview.List',
        'Ext.data.proxy.JsonP',
        'Ext.data.Store'],

    //On launch
    launch: function() {

        //Store for getting the repository of online categories.
        var settingsStore = Ext.create(Ext.data.Store, {
            model: "TestApp.model.ImportSettingsModel",
            autoLoad: true,

            proxy: {
                type: 'jsonp',
                //Generates JSON from a remote RSS-feed
                url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&q=https://dl.dropbox.com/u/19161853/sn_settingstest2.rss',
                
                //How is the feed read?
                reader: {
                    type: 'json',
                    //GoogleAPIs generate JSON with the entries at responseData -> feed -> entries.
                    rootProperty: 'responseData.feed.entries'
                }//endreader
            }//endproxy

             });//endstore

        //Get the local store for categories. The online one will be synced with this one, to find new categories.
        var settingsStorage = Ext.getStore('Settings');
        //Temporary Array for storage of the category-data.
        var storeArray = [];

        //When the online settings store is loaded, it is parsed through it to add into the local storage.
        settingsStore.on('load', function() {
            //This is done through a for each-loop of all the entries in the online storage.
            settingsStore.each(function (recs){
                //GoogleAPIS requires specific tags to get the content through, so these are here converted to more logical names.
                var ids = recs.get('content');          //Specific ID for the entry
                var title = recs.get('title');          //The title of the category
                var toggle = recs.get('contentSnippet');//Is the category toggled on or off?
                var src = recs.get('link');             //The URI required to find the specific RSS-stream.
                var classField = recs.get('author');    //Class-system to easily sort the categories.

                //All of these values are added to the temporary array.
                storeArray.push({ids: ids, title: title, toggle: toggle, src: src, class1: classField })
                });//endEachParsing

            //The temporary array is then parsed through to synchronize with the local storage.
            storeArray.forEach(function (record){
                //Parse through the IDs to check for existing entries.
                var test = settingsStorage.findBy(function (storeRec){
                    //If the  ID already exists, return true
                    if(record.ids == storeRec.get('ids')){
                        return true;
                    }//endIfCheck

                    //Else false
                    else{
                        return false;
                    }//endElseCheck


                });//EndFindBy

                //Checks if the test value exists, if not it will add the record to the store.
                if(test == -1){
                    settingsStorage.add(record);
                }//End testCheck


            });//End TemporaryArray ForEach

            //Synchronize the localstorage
            settingsStorage.sync();

            //Create the main view.
            Ext.Viewport.add(Ext.create('TestApp.view.Main'))




        });//EndSettingsStoreOnLoad

        /*
        storeArray.push({ids: 1, title: "Alle nyheter", toggle: true, src: "", class: "1. Nyheter"});
        storeArray.push({ids: 2, title: "Sjanger/Action", toggle: false, src: "tv_serie-sjanger/action", class: "3. Sjangere"});
        storeArray.push({ids: 3 ,title: "Heads Up", toggle: false, src: "category/heads-up", class: "2. Hovedkategorier"});
        storeArray.push({ids: 4 ,title: "Tag/CBS", toggle: false, src: "tag/cbs", class: "4. Tags"});
        storeArray.push({ids: 5 ,title: "Seertall", toggle: false, src: "category/nyheter/seertall", class: "2. Hovedkategorier"});
        storeArray.push({ids: 6 ,title: "Fornying og Kansellering", toggle: false, src: "category/nyheter/fornyingkansellering", class: "2. Hovedkategorier", first: true});
        storeArray.push({ids: 7 ,title: "Spoilerkroken", toggle: false, src:"category/nyheter/spoilerkroken",class: "2. Hovedkategorier"});
        storeArray.push({ids: 8 ,title: "Trailere", toggle: false, src: "category/trailere", class: "2. Hovedkategorier"});
        // storeArray.push({ids: 9, title: "Bugger off", toggle: false, src: "category/trailere", class: "4. Tags"});
        */



    }
});