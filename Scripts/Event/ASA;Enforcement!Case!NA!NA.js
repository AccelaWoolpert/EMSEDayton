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