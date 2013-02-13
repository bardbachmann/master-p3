Ext.define('TestApp.controller.Main', {
    extend: 'Ext.app.Controller',


    config: {
        /*  refs: {

         },

         control: {
         newsContent: {
         tap: 'articleStart'
         }
         }*/
    },

    init: function() {

        this.control({
            'button[action=onTesting]': {
                initialize: 'testing'
            }

        });


    },


    testing: function(){

        this.callParent(arguments);
        this.element.on('tap', this.onTap, this);

        var kar =  Ext.getCmp('thecarousel');
        if(kar.getItems().length < 2){
            this.hide()
        }
    }




});