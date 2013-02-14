//Temporary array for the carousel panels
var carouselArray = [];

//How each of the list hits for Articles will look.



//The Actual Carousel-Component.
var karusell = {
    xtype:'carousel', //It's a carousel
    id: 'thecarousel',//ID to retrieve later

    direction:'horizontal', //Horizontal panels, not vertical.


    defaults: {
        styleHtmlContent: true, //All content is styled with CSS
        scrollable: {
            direction: 'vertical', //The windows inside the carousel have vertical scroll
            directionLock: true    //And is locked to that.
        }
    }



};

//Fucntion to add panels to the Carousel-component.
function addCarouselList(title, id, store){

    var stores = Ext.getStore('Settings');
    var max = 0;
    //Adds the news list if it is toggled true.
    stores.each(function(record) {
        if(record.get("toggle") == true){ max++;}
    });
    //Check to see if the carousel has too many entries. Similar check at the category selection.
    if (carouselArray.length >= 6) {

     }
    else {

        //Create a new list of the news.
        var newsStore = {
            title:title, //The title of the list. This is hidden.
            xtype:"list", //It's a list.

            //The store used is an online store, which dynamically gets the store depending on the categories chosen.
            store:{
                model:"TestApp.model.ArticleModel",
                autoLoad:true,
                proxy:{
                    type:'jsonp',

                    //GoogleAPIs is used to convert RSS to JSON. All Serienytt-categories has it's own feed, which means
                    //we can just insert the correct path to retrive the RSS-data.
                    url:'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&q=http://serienytt.no/' + store + '/feed/',
                    reader:{
                        type:'json',
                        rootProperty:'responseData.feed.entries'
                    }//End Ready
                }//End Proxy
            }, //End Store

            //Unique ID, to avoid confusion within the system (with scrolling and the likes).
            itemId:id,

            //Adds a titlebar to each carousel-window.
            items:[
                {
                    xtype:'titlebar', //titlebar
                    title: title, //The text inside the titlebar.
                    docked:'top', //The titlebar is placed at the top.
                    height: 46,
                    //The titlebar itself can also have internal items.
                    items:[{
                        //In this case, it's a button.
                        xtype:'button',
                        iconCls: 'help_black', //Text used on the button itself
                        iconMask: true,
                        height: 37,
                        width: 47,
                        styleHtmlContent:true, //Content is styled (double post)

                        //What happens when the button is pressed?
                        handler:function () {
                            //An alert message is written, to help the user understand interaction options.
                            Ext.Msg.alert("Hjelp", "For å gå mellom ulike kategorier, så kan du sveipe til høyre og venstre." +
                                "<br>For å endre kategorier, så kan du trykke på Mine Kategorier.", Ext.emptyFn)


                          //  console.log(Ext.Viewport.get);
                        }//End of Button Handler
                    },
                        {
                            xtype: 'button',
                            html: '<span style="font-size: 1.3em">a</span><span style="font-size: 2.0em">a</span>',
                            height: 37,
                            width: 47,

                            iconMask: true,
                            styleHtmlContent:true,
                            align: 'right',
                            action: 'fontsize',
                            handler: function(){
                                var testing = Ext.getCmp('thecarousel').getItems().length;
                                var z = 1;


                                while(z < testing){

                                    if(Ext.getCmp('thecarousel').getItems().items[z].getItemTpl().html.indexOf('descriptionlarger') == -1){

                                        Ext.getCmp('thecarousel').getItems().items[z].setItemTpl(new Ext.XTemplate(
                                            '<div class="headerimage">',
                                            '<img src="{url}" alt="" />',
                                            '<div class="descriptionlarger"><h1 style="font-size: 1.5em; color: white;">{title}</h1><p>{contentSnippet}</p>' +
                                                '<div style="text-align: right; margin-right: 5px">Les mer ></div> ' +
                                                '</div>' +
                                                '</div>'
                                        ));


                                    }
                                    else{
                                        Ext.getCmp('thecarousel').getItems().items[z].setItemTpl(new Ext.XTemplate(
                                            '<div class="headerimage">',
                                            '<img src="{url}" alt="" />',
                                            '<div class="description"><h1 style="font-size: 1.3em; color: white;">{title}</h1><p>{contentSnippet}</p>' +
                                                '<div style="text-align: right; margin-right: 5px">Les mer ></div> ' +
                                                '</div>' +
                                                '</div>'
                                        ));
                                    }


                                    Ext.getCmp('thecarousel').getItems().items[z].refresh();
                                    z++;
                                }
                            }
                        }  //End of Zoombutton
    ] //End of titlebar items
                },
               {
                    xtype: 'button',
                   scrollable : false,
                   listeners: {
                       painted: function(){


                           var kar =  Ext.getCmp('thecarousel');

                           kar.getAt(1).getAt(1).hide();

                           if(kar.getItems().length < 2){
                               this.hide()
                           }
                       }

                   },

                    docked: 'left',
                    iconCls: 'arrow_left',

                   handler: function(){
                       var kar =  Ext.getCmp('thecarousel');
                       kar.setActiveItem(kar.getActiveIndex()-1);
                   },
                   style: 'border: none; background-color: #f8f8f8;background-image: url(resources/images/arrow_left3.png); background-repeat: no-repeat; background-position: center;',

                   width: '6%'
                },

                {

                   xtype: 'button',

                    listeners: {
                        painted: function(){


                            var kar =  Ext.getCmp('thecarousel');
                            var lengthz = kar.getItems().length;
                            kar.getAt(lengthz-1).getAt(2).hide();

                        }

                    },



                    docked: 'right',
                    handler: function(){
                        var kar =  Ext.getCmp('thecarousel');
                        kar.setActiveItem(kar.getActiveIndex()+1);

                    },
                    iconCls: 'arrow_left',
                    style: 'border: none; background-color: #f8f8f8;background-image: url(resources/images/arrow_right2.png); background-repeat: no-repeat; background-position: center;',

                    width: '6%'
                }

            ], //End of CarouselWindow items

            //The list looks like the template defined earlier.
            itemTpl: new Ext.XTemplate(
                '<div class="headerimage">',
                '<img src="{url}" alt="" />',
                '<div class="description"><h1 style="font-size: 1.4em; color: white;">{title}</h1><p>{contentSnippet}</p>' +
                    '<div style="text-align: right; margin-right: 5px">Les mer ></div> ' +
                    '</div>' +
                    '</div>'
            ),

            //Listener for interaction inside the list.
            listeners:{
                //When you press a view (in this case, a list item).
                select:function (view, record) {

                    //Create a new view, which is the article-views.
                    var ntpage2 = Ext.getCmp('article') || new TestApp.view.Article;

                    //The text for the articles is retrieved from the MainStore.
                    var articleText = record.get('content').toString();

                    //Temporary variables for parsing through the content strings.
                    var i = 1;
                    var check = true;
                    var x = 1;
                    var y = 1;
                    var z = 1;

                    //Checks for links and removes them.
                    while (check == true) {
                        x = articleText.indexOf("<a href", i);
                        var x2 = articleText.indexOf("<a title", i);
                        if (x2 > x) {
                            x = x2;
                        }

                          if(x != -1){z = articleText.indexOf('">', x)+2;
                              var linkEnd = articleText.indexOf('</a>', x)+4;
                              var removeTextAlt = articleText.substring(x, linkEnd);
                              var removeText = articleText.substring(x, z);
                              if(removeText.indexOf('href="#') != -1){
                                  articleText = articleText.replace(removeTextAlt, "");}
                              else if(removeTextAlt.indexOf('<img') != -1){
                                 var removeTextAlt2 = removeTextAlt.replace(removeText, "");
                                 removeTextAlt2 = removeTextAlt2.replace('</a>', "");
                                 articleText = articleText.replace(removeTextAlt, removeTextAlt2);
                                  console.log("Img: " + removeTextAlt);
                              }

                          }

                       if(z != -1){i = z-3}


                        if (z == -1 || z == articleText.length) {
                            check = false;
                        }

                        if (x == -1 || x == articleText.length) {
                            check = false;
                        }

                           console.log('trip here');;

                    }//End of linkRemovalLoop


                    var i = 1;
                    var check = true;
                    var x = 1;
                    var y = 1;
                    var z = 1;

                    //Resetting the tempVariables
                    x = 1;
                    z = 1;
                    check = true;

                    //Removal of Divs with specific div styles.
                    while (check == true) {
                        x = articleText.indexOf("div style=", i);
                        y = articleText.indexOf('width:', x + 7);
                        z = articleText.indexOf('"', y);

                        if (x != -1) {
                            removeText = articleText.substring(x + 3, z + 1);
                            articleText = articleText.replace(removeText, "");
                        }
                        if (z == -1) {
                            check = false;
                        }
                        if (x == -1) {
                            check = false;
                        }
                    }//End of DivRemovalLoop

                    //Resetting the tempVariables
                    x = 1;
                    y = 1;
                    z = 1;
                    check = true;


                    //Checks for Iframes with Youtube links.
                    while (check == true) {
                        x = articleText.indexOf("<iframe", i);
                        var h = articleText.indexOf("src", x);
                        y = articleText.indexOf('</iframe>', x);
                        z = articleText.indexOf('"', h + 5);
                        if (x != -1) {
                            removeText = articleText.substring(h + 5, z);
                            var keepSrc = articleText.substring(x, y + 9);
                            articleText = articleText.replace(keepSrc, 'Watch from YouTube: <a href="' + removeText + '">Link </a>');
                            console.log(removeText);
                        }
                        if (z == -1) {
                            check = false;
                        }
                        if (x == -1) {
                            check = false;
                        }
                    } //End of IframeRemoval


                    var checks = 0;
                    //Replaces a string generated by the RSS with a more relevant string.
                    while (checks != 10) {
                        articleText = articleText.replace('Klikk her for at se den integrerte videoen', 'Videoer er ikke tilgjengelig i appen - se <a href="' + record.get('link') + '">' + record.get('link') + '</a>');
                        checks++;
                    }

                    //The date when the article was published.
                    var dato = record.get('publishedDate').toString();

                    //Dager til norsk
                    dato = dato.replace('Mon', 'Mandag');
                    dato = dato.replace('Tue', 'Tirsdag');
                    dato = dato.replace('Wed', 'Onsdag');
                    dato = dato.replace('Thu', 'Torsdag');
                    dato = dato.replace('Fri', 'Fredag');
                    dato = dato.replace('Sat', 'Lørdag');
                    dato = dato.replace('Sun', 'Søndag');

                    //Måned til norsk
                    dato = dato.replace('Jan', "Januar");
                    dato = dato.replace('Feb', 'Februar');
                    dato = dato.replace('Mar', 'Mars');
                    dato = dato.replace('Apr', 'April');
                    dato = dato.replace('May', 'Mai');
                    dato = dato.replace('Jun', 'Juni');
                    dato = dato.replace('Jul', 'Juli');
                    dato = dato.replace('Aug', 'August');
                    dato = dato.replace('Sep', 'September');
                    dato = dato.replace('Oct', 'Oktober');
                    dato = dato.replace('Nov', 'November');
                    dato = dato.replace('Dec', 'Desember');

                    //Remove time and timezone.
                    dato = dato.substring(0, dato.length - 14);

                    //The url for comment RSSes. It is also parsed through the GoogleAPIs to become JSON.
                    var googleUrl = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=' + record.get('link') + 'feed/';

                    //Creates a store with the comments written for each article.
                    var commentStore = Ext.create('Ext.data.Store', {
                        model:"TestApp.model.CommentModel",
                        autoLoad:true,

                        proxy:{
                            type:'jsonp',
                            url:googleUrl,
                            reader:{
                                type:'json',
                                rootProperty:'responseData.feed.entries'
                            }
                        }
                    });

                    //When the comments are loaded.
                    commentStore.on('load', function () {

                        //HTML is created with the content gathered through JSON.
                        var articleHtml = '<h1>' + record.get('title') + '</h1>' + '<img src="' + record.get('url') + '"/>' +
                            '<p><strong>Skrevet av:</strong> ' + record.get('author') +
                            '<br><strong>Dato:</strong> ' + dato + '</p>' + articleText;

                        //Adds comments to the HTML.
                        articleHtml += '<div class="articlecomments"><h3>Kommentarer:</h3>';
                        var commentz = "";
                        //Parses through the commentStore to add each individual comment.
                        commentStore.each(function (recs) {
                            commentz += ('<div class="singlecomment">' + '<h4>' + recs.get('author') + '</h4>' + recs.get('content') + '</div>');
                        });
                        if(commentz == ""){commentz = "Ingen kommentarer."}
                        articleHtml += commentz;

                        articleHtml += '</div>';
                        var y = Ext.getCmp('thecarousel').getActiveIndex();
                        //Sets the content for the ArticleView.
                        ntpage2.setHtml(articleHtml);
                        Ext.getCmp('art_backbutton').setHandler(function() {
                            console.log("Button works!");
                            var ntpage2 = Ext.getCmp('mainpanel') || new TestApp.view.Main;
                            Ext.Viewport.setActiveItem(ntpage2);
                            console.log(Ext.getCmp('thecarousel').getActiveIndex());
                            Ext.getCmp('thecarousel').setActiveItem(y);
                            Ext.getCmp('art_backbutton').destroy();
                            Ext.getCmp('font_button').destroy();
                        });

                        Ext.getCmp('font_button').setHandler(function() {
                            if(ntpage2.getCls().toString().indexOf("larger") == -1){
                                ntpage2.setCls(["articlelarger", "x-layout-card-item"]) ;
                                console.log('setting larger');
                            }
                            else{
                                ntpage2.setCls(["article", "x-layout-card-item"]) ;
                                console.log('setting smaller');
                            }
                        });

                        //Removes the current list of categories.
                        Ext.getCmp('TheList').destroy();
                        //Removes the carousel.
                        Ext.getCmp('thecarousel').destroy();

                        //Empties array
                        carouselArray.splice(0, carouselArray.length);

                        //Places the create articleView into the viewport.
                        Ext.Viewport.setActiveItem(ntpage2);
                    }); //End of commentstore.OnLoad.
                }
            } //End of the carousel list listeners.
        }; //End of the Carousels internal lists.

        //Adds the generated carousel items into the carousel component.
        carouselArray.push(newsStore);
    }


}

   //The main view for the app.
    Ext.define("TestApp.view.Main", {
    extend: 'Ext.tab.Panel',
    requires: ['Ext.TitleBar', 'Ext.data.proxy.LocalStorage'],
    xtype: 'mainpanel',

    //What happens when the view is created.
    initialize: function(){
        this.callParent(); //required.

        //Removes the current carousel, to avoid duplicates.
        Ext.getCmp('thecarousel').removeAll();

        //Retrieves the local store with categories.
        var stores = Ext.getStore('Settings');

        //Adds the news list if it is toggled true.
        stores.each(function(record) {
            if(record.get("toggle") == true){ addCarouselList(record.get('title'), record.get('title'), record.get('src'));
            }
        });

        //Adds the carousel array into the carousel component again.
        Ext.getCmp('thecarousel').add(carouselArray);

    }, //end of initialize.

    config: {

        xtype:'tabpanel',
        tabBarPosition: 'bottom',
        requires: [
            'Ext.field.TextArea'],


        defaults: {
            styleHtmlContent: true
        },
        listeners: {
                activeitemchange:function(){
                    console.log(this.getActiveItem());
                    if(this.getActiveItem().id == "TheList"){
                        Ext.getCmp('thecarousel').removeAll();
                    }
                    else {

                        var storage = Ext.getStore('Settings');
                        var localCar = Ext.getCmp('thecarousel').removeAll();
                        carouselArray = [];
                        storage.each(function(record) {
                            if(record.get("toggle") == true){ addCarouselList(record.get('title'), record.get('title'), record.get('src'));
                            }

                        });

                        Ext.getCmp('TheList').setMasked({
                            xtype: 'loadmask',
                            message: 'Lagrer kategorier'
                        });

                        setTimeout(function() {


                            // Unmask the formpanel
                            Ext.getCmp('TheList').unmask();
                        }, 500);

                        Ext.getCmp('TheList');

                        if(carouselArray.length == 0){
                            Ext.Msg.alert("Ingen kategori valgt", "Du må velge minst en kategori for at systemet skal fungere.", Ext.emptyFn);

                            localCar.add({
                                xtype: 'panel',
                                html: 'Ingen kategori valgt'
                            });
                            localCar.setActiveItem(0);

                        }
                        else{
                        localCar.add(carouselArray);
                        localCar.setActiveItem(0);
                        }
                    }
                }

        },

        items: [
            {
                title: 'Home',
                iconCls: 'home',
                layout:'card',
                items:[karusell]
            },            
            {
                title: 'Mine Kategorier',
                id: 'TheList',
                xtype: "list",
                iconCls: 'docs1',
                store: 'Settings',
                itemId:"EbList",
                grouped: true,
                tpl: 'ListTest',

                itemTpl: new Ext.XTemplate(
                    '<div class="listcontainer">',
                    '<tpl for=".">',

                    '{title}',
                    '<tpl if="toggle == true">',
                    '<img src="./resources/images/ontoggle.png">',
                    '</tpl>',
                    '<tpl if="toggle == false || toggle == null">',
                    '<img src="./resources/images/offtoggle.png"">',
                    '</tpl></tpl></div>'

                ),

                listeners: {
                    select: function(view, record) {
                        view.deselect(record);
                        var storage = Ext.getStore('Settings');
                        //storage.add({ title: "Mijn Titel", toggle: "false"});

                        var count = 0;

                        storage.findBy(function(rec) {
                            if (rec.get('toggle') == true) {
                                count = count + 1;
                            }
                        });


                        var index = storage.find('title', record.get('title'));
                        var storeRecord = storage.getAt(index);

                        if(storeRecord.get("toggle") == true){storeRecord.set('toggle', false );}
                        else{
                            if(count < 6){storeRecord.set('toggle', true);}
                            else{
                                Ext.Msg.alert("Dessverre", "I denne testen kan du ha maksimum 6 kategorier<br/>" +
                                    "Vennligst skru av en annen kategori om du ønsker denne kategorien.", Ext.emptyFn)
                            }
                        }
                        storeRecord.dirty = true;

                        storage.sync();
                        console.log(count);


                    }
                }
            }

        ]
    }

});



