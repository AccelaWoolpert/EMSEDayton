/*

custom function declarations go here.   One function per file

*/
 
 
 
 
/*

custom function declarations go here.   One function per file

*/
function validateRequiredPlanningASI(requiredASIbyCaseType) {
	logDebug(AInfo["Case Type"])
	logDebug(requiredASIbyCaseType[""+AInfo["Case Type"]])
	var thisASIlist = requiredASIbyCaseType[""+AInfo["Case Type"]]
	if (typeof thisASIlist != "object") return true

	var reqsNotMet = []
	switch(""+wfTask) {
		case "Hearing Scheduled":
			if (matches(""+wfStatus, "Hearing Scheduled")) {
				for (i in thisASIlist) {
					if (matches(AInfo[thisASIlist[i]], null, "")) reqsNotMet.push(thisASIlist[i])
				}
			}
			break;
		case "Board Hearing":
			if (matches(""+wfStatus, "Approved with Conditions", "Approved", "Denied")) {
				for (i in thisASIlist) {
					if (matches(AInfo[thisASIlist[i]], null, "")) reqsNotMet.push(thisASIlist[i])
				}
			}
			break;
	}
	logDebug(reqsNotMet)
	if (reqsNotMet.length > 0) {
		showMessage = true
		logMessage("The Data Field"+ (reqsNotMet.length > 1? "s": "") + ": '" + reqsNotMet.join("', '") + "' " +(reqsNotMet.length > 1? "are": "is")+" required before updating the Workflow task "+wfTask+" to a status of "+wfStatus)
		cancel = true
	}
}