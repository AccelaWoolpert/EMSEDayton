//Script 13
expDate = new Date()
expDate.setMonth(expDate.getMonth()+12)
editAppSpecific("Permit Expiration Date",jsDateToASIDate(expDate))

//Script 16
if (matches(inspType, "Final w/ CUO", "Final w/o CUO") && inspResult == "Approved") {
	closeTask("Inspection","Complete","Updated via Script","Updated via Script")
	closeTask("Inspections","Complete","Updated via Script","Updated via Script")
	
	//Script 18
	if (matches(""+getAppSpecific("CUO Required"),"N","No")) {
		closeOutWorkflow("Closed","Updated via Script")
	}
		
}


