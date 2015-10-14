//Script 13
expDate = new Date()
expDate.setMonth(expDate.getMonth()+12)
editAppSpecific("Permit Expiration Date",jsDateToASIDate(expDate))

//Script 16
if (matches(inspType, "Residential Final w/o CUO", "Commercial Final w/o CUO", "Residential Final w/CUO", "Commercial Final w/CUO") && inspResult == "Approved") {
	closeTask("Inspection","Complete","Updated via Script","Updated via Script")
	
	//Script 18
	if (matches(""+getAppSpecific("CUO Required"),"N","No")) {
		taskCloseAllExcept("Closed","Updated via Script")
	}
		
}


