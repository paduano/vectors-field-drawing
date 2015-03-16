
var canvas;



function getWacomPlugin()
{
    return document.getElementById('wtPlugin');
}

function isPluginLoaded()
{
    var retVersion = "";
    var pluginVersion = getWacomPlugin().version;
    //alert("pluginVersion: [" + pluginVersion + "]");

    if ( pluginVersion != undefined )
    {
        retVersion = pluginVersion;
    }

    return retVersion;
}

$(window).ready(function() {
    externalSvgModel.loadResources(function(){

        canvas = DrawingCanvas($("canvas"));

        var toolbarContainer = d3.select("#toolbar-container"),
            configurationsContainer = d3.select("#configuration-bar-container");

        var canvasModeToolbar = CanvasModeToolbar();
        canvasModeToolbar.view.appendTo(toolbarContainer);

        var configurationsToolbar = ConfigurationsToolbar();
        configurationsToolbar.view.appendTo(configurationsContainer);



    });



    var loadVersion = isPluginLoaded();
    //alert("loadVersion: [" + loadVersion + "]");

    if ( loadVersion != "" )
    {
        console.log("Loaded webplugin: " + loadVersion);
    }
    else
    {
        alert("wacom webplugin is NOT Loaded (or undiscoverable). Please enable it." +
        "\n If you haven't a Wacom tablet you can still use just the mouse");

    }
});
