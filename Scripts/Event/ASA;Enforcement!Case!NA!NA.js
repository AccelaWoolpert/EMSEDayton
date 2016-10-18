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
var CreateHansenServiceRequest = "HansenServiceRequestCreate.svc/CreateHansenServiceRequest";

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
        return null;
    }
};

var ReferenceNumber = capId.getCustomID();

//Address Key
var capAddResult = aa.address.getAddressByCapId(capId);
var AddressKey;
var StreetNumber;
var PreDirection;
var StreetName;
var Suffix;
var City;
var State;
var Zip;

if (capAddResult.getSuccess()) {
    var Adds = capAddResult.getOutput();
    for (zz in Adds) {
        //AddressKey = Adds[zz].getRefAddressId();
        PreDirection = Adds[zz].getStreetDirection();
        StreetNumber = Adds[zz].getHouseNumberStart();
        StreetName = Adds[zz].getStreetName();
        Suffix = Adds[zz].getStreetSuffix();
        City = Adds[zz].getCity();
        State =  Adds[zz].getState();
        Zip = Adds[zz].getZip();
    }
};

var fcapAddressObj;
var capAddressResult = aa.address.getAddressWithAttributeByCapId(capId);
if (capAddressResult.getSuccess())
{
    fcapAddressObj = capAddressResult.getOutput();
}
 
for (i in fcapAddressObj) {
    var addressAttrObj = fcapAddressObj[i].getAttributes().toArray();
    for (z in addressAttrObj) {
        if (addressAttrObj[z].getB1AttributeName() == "ADDRKEY") {
            AddressKey = addressAttrObj[z].getB1AttributeValue();
        };
    };
};

//Complaint 3 - Request Type
var RequestType;
var itemName = "Complaint 3";

var appSpecInfoResult = aa.appSpecificInfo.getByCapID(capId);
var appspecObj = appSpecInfoResult.getOutput();

for (i in appspecObj)
    if (appspecObj[i].getCheckboxDesc() == itemName) {
        RequestType = appspecObj[i].getChecklistComment();
    }

//TODO: Get Request Type from Complaint section of Case
//      Get Contact Key

var ContactKey = "1001";
var AddedBy = "LLO01";
var Inspector = "WAR07";
var Priority = "2";
if (AddressKey === null) { AddressKey = 0; }
var jsonOut = '{ "ReferenceNumber" : "' + ReferenceNumber +
                    '", "AddressKey" : "' + AddressKey +
                    '", "PreDirection" : "' + PreDirection +
                    '", "StreetNumber" : "' + StreetNumber +
                    '", "StreetName" : "' + StreetName +
                    '", "Suffix" : "' + Suffix +
                    '", "City" : "' + City +
                    '", "State" : "' + State +
                    '", "Zip" : "' + Zip +
                    '", "RequestType" : "' + RequestType +
                    '", "ContactKey" : "' + ContactKey +
                    '", "Inspector" : "' + Inspector +
                    '", "Priority" : "' + Priority +
                    '", "AddedBy" : "' + AddedBy + '"}';


var hansenSRNo = postToHansen(CreateHansenServiceRequest, jsonOut);
//var logTest = postToHansen(LogTest, jsonOut);

//Set Hansen SR#
var hansenSRField = "Hansen SR#";
var appSpecInfoUpdateResultHansenSRNo = aa.appSpecificInfo.editSingleAppSpecific(capId, hansenSRField, hansenSRNo, null);


