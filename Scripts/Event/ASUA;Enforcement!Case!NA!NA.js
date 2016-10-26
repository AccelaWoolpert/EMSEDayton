//Application Status Update After

/*===================================================================*/

//Developer: James Lloyd
//Developer Agency: Woolpert
//Script Description: 
//showMessage = true;//sets global to display the message as a pop-up
//message("Case Updated...");//the message you want to display
//cancel = true;//cancels the action


//function getScriptText(vScriptName) {
//    vScriptName = vScriptName.toUpperCase();
//    var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
//    var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
//    return emseScript.getScriptText() + "";
//}
////****************************************************************
////  Accela Script include
////****************************************************************
//eval(getScriptText("INCLUDES_CUSTOM"));
//eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));


//Global settings...
//var showMessage = true;                        // Set to true to see results in popup window
//var showDebug = 3;                            // Set to true to see debug messages in popup window
//var message = "";                            // Message String
//var debug = "";                                // Debug String
//var br = "<BR>";                            // Break Tag 





//****************************************************************
//Custom Web Service settings
//****************************************************************
var UriBase = "http://10.16.81.21:804/HansenAccelaServices/";
var LogTest = "LogTest.svc/LogTest";
var UpdateStatusHansenServiceRequest = "HansenUpdateStatus.svc/UpdateStatusHansenServiceRequest";

var provider = "Han84";
var username = "jlloyd";
var password = 'hansen';
var contentType = "application/json";
function postToHansen(service, body) {
    try {
        var post = new org.apache.commons.httpclient.methods.PostMethod(UriBase + service);
        var client = new org.apache.commons.httpclient.HttpClient();

        // ---- Authentication ---- //
        if (username !== null && password !== null) {
            var creds = new org.apache.commons.httpclient.UsernamePasswordCredentials(username, password);
            client.getParams().setAuthenticationPreemptive(true);
            client.getState().setCredentials(org.apache.commons.httpclient.auth.AuthScope.ANY, creds);
        }
        // -------------------------- //

        post.setRequestHeader("Content-type", contentType);
        post.setRequestEntity(new org.apache.commons.httpclient.methods.StringRequestEntity(body, contentType, "UTF-8"));
        var status = client.executeMethod(post);
        aa.print("<br/>status: " + status);

        var br = new java.io.BufferedReader(new java.io.InputStreamReader(post.getResponseBodyAsStream()));
        var response = "";
        var line = br.readLine();
        while (line != null) {
            response = response + line;
            line = br.readLine();
        }
        post.releaseConnection();

        return response;
    }
    catch (err) {
        logDebug("ERROR Posting to Hansen: " + err)
        return null;
    }
};


var ReferenceNumber = capId.getCustomID();
var jsonOut = '{ "ReferenceNumber" : "' + ReferenceNumber +
                    //'", "ContactKey" : "' + Resolution +
                    '", "Resolution" : "' + capStatus + '"}';

//logDebug("Preparing to post to Hansen");
logDebug("Post to Hansen Response: " + postToHansen(UpdateStatusHansenServiceRequest, jsonOut));

//logDebug("Posted to Hansen");
