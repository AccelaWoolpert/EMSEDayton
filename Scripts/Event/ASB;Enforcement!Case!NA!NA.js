/*===================================================================*/

//Developer: James Lloyd
//Developer Agency: Woolpert
//Script Description: 

function getScriptText(vScriptName) {
    vScriptName = vScriptName.toUpperCase();
    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
    var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
    return emseScript.getScriptText() + "";
}

//****************************************************************
//  Accela Script include
//****************************************************************
eval(getScriptText("INCLUDES_CUSTOM"));
eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));

//Global settings...
var showMessage = true;                        // Set to true to see results in popup window
var showDebug = true;                            // Set to true to see debug messages in popup window
var message = "";                            // Message String
var debug = "";                                // Debug String
var br = "<BR>";                            // Break Tag 

logDebug("Performing data validation");
