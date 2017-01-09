//Script 11
if (matches(wfTask,"Application Submittal","Application Submitted") && wfStatus=="Accepted") {
	editAppSpecific("Application Date",dateAdd(null,0));
	editAppSpecific("Plan Review Expiration Date",dateAdd(null,180));
}

//Script 12
if (wfTask.slice(-6) == "Review") {
	editAppSpecific("Plan Review Expiration Date",dateAdd(null,180))
}

//Script 14
if (matches((""+capStatus).toUpperCase(), "FINAL", "FINALED", "CLOSE", "CLOSED" )) {
	addStdCondition("Finalled Permit","Finalled Permit")
}

//Script 15
if (matches((""+capStatus).toUpperCase(), "WITHDRAW", "WITHDRAWN", "WITHDRAWAL", "CANCEL", "CANCELED", "EXPIRE", "EXPIRED" )) {
	addStdCondition("Finalled Permit","Permit Read Only")
}

//Script 56
if(matches(wfTask,"Permit Issuance") && matches(wfStatus,"Issued")){
	editAppSpecific("Permit Expiration Date",dateAdd(null,365));
}