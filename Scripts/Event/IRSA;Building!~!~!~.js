//Script 13
expDate = new Date()
expDate.setMonth(expDate.getMonth()+12)
editAppSpecific("Permit Expiration Date",jsDateToASIDate(expDate))

//Script 16
if (matches(inspType.slice(0,17), "Residential Final", "Commercial Final ") && inspType.slice(-3) == "CUO" && inspResult == "Approved") {
	closeTask("Inspection","Complete","Updated via Script","Updated via Script")
	
	//Script 18
	if (matches(""+getAppSpecific("CUO Required"),"N","No")) {
		closeOutWorkflow("Closed","Updated via Script")
	}
		
}


