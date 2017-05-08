//assess fees
if(wfTask == "Application Submittal" && wfStatus == "Accepted" && AInfo["Job Cost"] > 0){
	updateFee("FIR_010","B_FIRE","FINAL",AInfo["Job Cost"],"N");
	updateFee("FIR_090","B_FIRE","FINAL",1,"N");
	updateFee("FIR_020","B_FIRE","FINAL",1,"N");
	updateFee("FIR_022","B_FIRE","FINAL",1,"N");
}

