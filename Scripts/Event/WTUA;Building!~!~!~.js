//Script 11
if (matches(wfTask,"Application Submittal","Application Submitted") && wfStatus=="Accepted") {
	today = new Date()
	editAppSpecific("Application Date",jsDateToASIDate(today))
	today.setMonth(today.getMonth()+6)
	editAppSpecific("Permit Expiration Date",jsDateToASIDate(today))
}

//Script 12
if (wfTask.slice(-6) == "Review") {
	expDate = new Date()
	expDate.setMonth(expDate.getMonth()+6)
	editAppSpecific("Plan Review Expiration Date",jsDateToASIDate(expDate))
}