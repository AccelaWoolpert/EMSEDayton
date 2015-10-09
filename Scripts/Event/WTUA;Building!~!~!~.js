//Script 11
if (matches(wfTask,"Application Submittal","Application Submitted") && wfStatus=="Accepted") {
	today = new Date()
	editAppSpecific("Application Date",jsDateToASIDate(today))
	today.setMonth(today.getMonth()+6)
	editAppSpecific("Permit Expiration Date",jsDateToASIDate(today))
}