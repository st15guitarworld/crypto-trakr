let CryptoSubHelper={};

CryptoSubHelper.generateSubsFromCoinDetails = (coinDetails) => {
  return coinDetails.map(detail => "2~"+detail.RAW.MARKET+"~"+detail.RAW.FROMSYMBOL +"~"+detail.RAW.TOSYMBOL);
}

export default CryptoSubHelper;
