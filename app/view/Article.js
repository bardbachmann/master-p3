Ext.define("TestApp.view.Article", {
    extend: 'Ext.Panel',
    requires: [
        'Ext.carousel.Carousel'
    ],
    layout: 'card',
    xtype: 'article',

    fullscreen: true,




    config: {
        title: 'Test',
        iconCls: 'tree',
        cls: 'article',
        styleHtmlContent: true,
        scrollable: 'vertical',

        items: {
            xtype: 'titlebar',
            docked: 'top',
            title: 'Serienytt',


            items: [
                {
                    iconCls: 'arrow_left',
                    iconMask: true,
                    id: 'art_backbutton',
                    align: 'left'
                },
                {

                    id: 'font_button',
                    html: '<span style="font-size: 0.85em">a</span><span style="font-size: 1.4em">a</span>',
                    align: 'right'


                }
            ]
        },

        html:
        '<b>Testing</b>'

    }



});



