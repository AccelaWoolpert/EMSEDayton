/*===================================================================
// Standard Choices Item Name:  ASA;Enforcement!Case!NA!NA
===================================================================*/

//Script 46
try {
	var addResult = aa.address.getAddressByCapId(capId);
	if (addResult.getSuccess()) { 
		var aoArray = addResult.getOutput(); 
		if (aoArray.length) { 
			var ao = aoArray[0]; 

			// get caps with same address
			var capAddResult = aa.cap.getCapListByDetailAddress(ao.getStreetName(),ao.getHouseNumberStart(),ao.getStreetSuffix(),ao.getZip(),ao.getStreetDirection(),null);
			if (capAddResult.getSuccess())	{ 
				var capIdArray = capAddResult.getOutput()

				for (c in capIdArray) {
					var relcap = aa.cap.getCap(capIdArray[c].getCapID()).getOutput();
					var reltype = relcap.getCapType().toString();
					
					logDebug(reltype +": " +appTypeString)
					
					if (reltype == appTypeString) {
						if (matches(""+relcap.getCapStatus(), "Active", "Appeal", "Attempt to Contact", "Awaiting Court Decision","In Violation","In Violation - Reissue", "New")) {
							updateAppStatus("Potential Duplicate")
							break
						}
					}
				}
			}
			else logDebug("**ERROR: getting similar addresses: " + capAddResult.getErrorMessage())
		}
		else logDebug("No address found on record.")
	}
	else logDebug("**ERROR: getting address by cap ID: " + addResult.getErrorMessage())
}
catch(err) {logDebug(err)}

/*===================================================================*/
//ID: 
//Name: 
//Developer: Chris Godwin
//Developer Agency: Woolpert
//Script Description: Schedule Complaint Inspection on same day, assign inspection to record detail assigned to staff.
//Status: 

var numDays = 0;//set value to the number of days ahead to schedule inspection
var assignedStaff = getAssignedToStaff();
scheduleInspectDate("Complaint",dateAdd(null,numDays),assignedStaff);

/*===================================================================*/

//Developer: James Lloyd
//Developer Agency: Woolpert
//Script Description: 
try {
    logDebug("Begin Accela > Hansen Test Script");

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

    //****************************************************************
    //Custom Web Service settings
    //****************************************************************
    var UriBase = "http://10.16.81.21:804/HansenAccelaServices/";
    var LogTest = "LogTest.svc/LogTest";

    var provider = "Han84";
    var username = "jlloyd";
    var password = 'hansen';
    var contentType = "application/json";

    function postToHansen(service, body) {
        try{
            logDebug("Posting Log Test");
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
            logDebug("Error Posting Test: " + err);
            return null;
        }
    };

    var CaseAddress = aa.address.getAddressByCapId(capId);
    var AddressKey;
    Address = address.getOutput();
    for (yy in Address) {

        aa.print("Address[yy]: " + Address[yy]);
        addScriptMod = Address[yy];

        AddressKey = addScriptMod.getAddressId();
    }

    var ReferenceNumber = capId.getCustomID();

    var jsonOut = { "ReferenceNumber": "' + ReferenceNumber + '", "AddressKey": "' + AddressKey + '" };

    // Call to Hansen to test event from Accela
    var logTest = postToHansen(LogTest, "Test Output From Accela");
    aa.print(logTest);
}
catch (err) { logDebug(err) }