//Script 21
if (inspResult == "Refer to Housing") {
	childId = createChild("Enforcement","Complaint","NA","NA",capName )

	copyAppSpecific(capId, childId)
	copyParcels(capId, childId)
	copyOwner(capId, childId)
	copyAddresses(capId, childId)	
	aa.asset.cloneAssets(cap.getCapModel(), childId); 
	copyContacts(capId, childId)
}