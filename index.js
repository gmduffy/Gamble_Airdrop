const express = require('express');
const EthereumTx= require('ethereumjs-tx').Transaction;
const sqlite3=require('sqlite3').verbose();
const dbPath= "./whitelist_DB.db";
var Web3 = require('web3');
const Database = require("@replit/database")
const _web3 = new Web3("https://goerli.infura.io/v3/f73cf42608a44a429c2c3d7e51563084")//"https://eth-goerli.g.alchemy.com/v2/EXlP8cAzH_nIsZZjrI31JZEr-ts0LkKo")

_web3.eth.getBlockNumber(function (error, result) {
   console.log(result)
   })

//createdbConnection
function CreateDbConnection(){
  const db = new sqlite3.Database(dbPath,(error) =>{
    if (error){
      return console.error(error.message);
    }
  });
  console.log("connection with database successful.")
  return db;
}

DB = CreateDbConnection();

function CreateTable(){
DB.exec (`CREATE TABLE whitelist(
ID INTEGER PRIMARY KEY AUTOINCREMENT,
wallet_address VARCHAR(70) NOT NULL,
amount INTEGER NOT NULL,
status VARCHAR(50) NOT NULL

)`); 
}
//INSTERT
function insertRow(wallet_address,amount,status) {
  //const [wallet_address, amount, status] = process.argv.slice(2);
  DB.run(
    `INSERT INTO whitelist (wallet_address, amount, status) VALUES (?, ?, ?)`,
    [wallet_address, amount, status],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
  );
}
  //select
let sql_select = `SELECT ID id,
                  wallet_address address,
                  amount amt,
                  status sts
           FROM whitelist
           WHERE wallet_address  = ?`;





function Updatedb(my_amt, my_wallet){  
let data = [my_amt, my_wallet];
let sql_Update = `UPDATE whitelist
            SET amount = ?
            WHERE wallet_address = ?`;
  DB.run(sql_Update, data, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Row(s) updated: ${this.changes}`);

});
}






function selectRow(wallet_address) {  
  return new Promise((resolve, reject) => {
  DB.serialize(() =>{
     DB.get(sql_select, [wallet_address], (err, row) => {
     if (err) {
       reject(err)
       //return console.error(err.message);
     }
     resolve(row)
     //return row
     //? console.log(row.id, row.amt)
     //: console.log(`No playlist found with the id ${wallet_address}`);
     })
    });
  })
 }


//CreateTable();
const privkey=process.env['Priv_key']
const airdropAddress="0x0B1A70D2fA533CC62C578b3B2A663B638c62fF86"
   //set whitelised addresses
const app = express();
const whitelisted = {"0x90cfC0E17855C195FB307c16680d511469C483D4" :"18408274",
                        "0x0c9C3Ba64072eb566b0E9A4B6Bb0D7B204d68469" : "732881",
                      "0x48DB1c7870E0f6e8Ef6A67aD83FE6eF516eAc084" : "4146770",
                        "0x58fd698FCd22403b533Ee4e6D1dD80846c4c0f41" : "268416",
                       "0x0b0A96960f3797B72432fb646e0C7Bd7F093325F" : "3251925",
                      "0x5043c7D66fb4E78186D8cAfc66605456be4C93e0" : "3149184",
                     "0x5F19702E9021d78dAe5F440DCC4990FFc368B0C7" : "885072",
                    "0x5A029adb159ec5f1b41B34cb13D205390576Bf66" : "920758",
                     "0x7dB73a2ea36ECd18D31c8251cD472d619BcC9E8A" : "4916634",
                    "0x5fA275BA9F04BDC906084478Dbf41CBE29388C5d" : "13500000",
                   "0x19c76B5AeF28b131B9098f845e2b9D7e2687cc80" : "9426607",
                    "0x9512f8AdEdE8584D550006746a609773fF638F63" : "1620882",
                   "0x51A0ADf4a1076b791ec3BbbddC24E5e42Bb7f21d" : "2092939",
                  "0x28bA11179f852a38768064B26E06Fb606B137911" : "4979332",
                  "0x79010d1a7056C88EBB0e94CFD2785DC7D1A36bEd" : "14224012",
                  "0xB0D70d1904290eD13A6323Ea160d9E1ff76bEa71" : "17608644",
                  "0x59c7F8aF5FB9C8f10274b9D46c7F3cB0E7E9Fadc" : "13915046",
                  "0xCC8AC596b9eF2bf0fEe958ccd4Dd8971643D2199" : "12146561",
                   "0x25BD038606909aC6F2F4ab44064Bf85dd3171eb0" : "3669627",
                  "0x55d26210d5A331936F8C9BeC068d01d1909C111e" : "3544863",
                  "0xa5b75972a4a1101ddAD598969f437fEC77cD964a" : "1000000",};

const StartDay = 14;
const interval = 0;
const delay = StartDay + interval;
 // gett time 
var countDownDate = new Date(`Apr ${delay}, 2023 16:37:52`).getTime();

var now = new Date().getTime();
var _timeleft = countDownDate - now;
    
var days = Math.floor(_timeleft / (1000 * 60 * 60 * 24));

console.log(days)
 //add whitelisted to database
 for(const[key, value] of Object.entries(whitelisted)){
     //insertRow(key,parseInt(value),"false");
   //let promise = selectRow(key).then(results =>{
     // console.log(results.address)
    //})
    //console.log(wallet);
     
    }

  
//const path= require('path');
//app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));

function CheckWhitelisted(walletaddress){
  var valAmt;
  let promise = selectRow(walletaddress).then(results =>{
      valAmt = results.amt;
      return valAmt;
  })
}




async function claim(address="",amt="") {
      //airdrop address
     let tokenAddress = '0xeFa3acC9E00c66a4bAF0fa5eFb8d8D830C49A9a2';//
     let toAddress = address; // where to send it
     console.log("i got here");
     let fromAddress = airdropAddress // your wallet
     //let privateKey = privkey
     let privateKey = new Buffer.from(privkey, 'hex');
     let contractABI = 
    [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountETH","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountBOG","type":"uint256"}],"name":"AutoLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_maxTxAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_maxWalletToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"approveMax","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"authorize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"autoLiquidityReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blacklistMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnTo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyBurnFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyCooldownEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyTotalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountPercentage","type":"uint256"}],"name":"clearStuckBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountPercentage","type":"uint256"}],"name":"clearStuckBalance_sender","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_status","type":"bool"},{"internalType":"uint8","name":"_interval","type":"uint8"}],"name":"cooldownEnabled","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cooldownTimerInterval","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"distributor","outputs":[{"internalType":"contract DividendDistributor","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_status","type":"bool"}],"name":"enable_blacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeDenominator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCirculatingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"accuracy","type":"uint256"}],"name":"getLiquidityBacking","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"isAuthorized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"accuracy","type":"uint256"}],"name":"isOverLiquified","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"bool","name":"status","type":"bool"}],"name":"manage_blacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"bool","name":"exempt","type":"bool"}],"name":"manage_blacklist_and_dividend_exempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"bool","name":"status","type":"bool"}],"name":"manage_burn_exempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"marketingWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"uint256[]","name":"tokens","type":"uint256[]"}],"name":"multiTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address[]","name":"addresses","type":"address[]"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"multiTransfer_fixed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"contract IDEXRouter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newBurnTo","type":"address"}],"name":"setBurnTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newBuyBurnFee","type":"uint256"}],"name":"setBuyBurnFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"buyTax","type":"uint256"}],"name":"setBuyTax","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_minPeriod","type":"uint256"},{"internalType":"uint256","name":"_minDistribution","type":"uint256"}],"name":"setDistributionCriteria","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gas","type":"uint256"}],"name":"setDistributorSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_autoLiquidityReceiver","type":"address"},{"internalType":"address","name":"_newMarketingWallet","type":"address"},{"internalType":"address","name":"_newTreasuryWallet","type":"address"}],"name":"setFeeReceivers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"bool","name":"exempt","type":"bool"}],"name":"setIsDividendExempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"bool","name":"exempt","type":"bool"}],"name":"setIsFeeExempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"bool","name":"exempt","type":"bool"}],"name":"setIsTimelockExempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"bool","name":"exempt","type":"bool"}],"name":"setIsTxLimitExempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newWallet","type":"address"}],"name":"setMarketingWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxTXPercentage_base1000","type":"uint256"}],"name":"setMaxTxPercent_base1000","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxWallPercent_base1000","type":"uint256"}],"name":"setMaxWalletPercent_base1000","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setSwapBackSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newSwapBurnFee","type":"uint256"}],"name":"setSwapBurnFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newSwapLpFee","type":"uint256"},{"internalType":"uint256","name":"_newSwapRewardFee","type":"uint256"},{"internalType":"uint256","name":"_newSwapMarketingFee","type":"uint256"},{"internalType":"uint256","name":"_newSwapTreasuryFee","type":"uint256"},{"internalType":"uint256","name":"_feeDenominator","type":"uint256"}],"name":"setSwapFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_target","type":"uint256"},{"internalType":"uint256","name":"_denominator","type":"uint256"}],"name":"setTargetLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newWallet","type":"address"}],"name":"setTreasuryFeeReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setTxLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapBurnFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapLpFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapMarketing","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapRewardFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapTotalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"swapTreasuryFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_status","type":"bool"}],"name":"tradingStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"adr","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"twrecievermanager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"unauthorize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
    let contract = new _web3.eth.Contract(contractABI, tokenAddress, {from: fromAddress});

    // 1e18 === 1 HST
    let amount = parseInt(amt) * 10 ** 9;
    
    _web3.eth.getTransactionCount(fromAddress)
  .then((count) => {
    let rawTransaction = {
      'from': fromAddress,
      'gasPrice': _web3.eth.gasPrice,
      'gasLimit': "0x7458",
      'to': tokenAddress,
      'value': 0x0,
      'data': contract.methods.transfer(toAddress,  amount).encodeABI(),
      'nonce': _web3.utils.toHex(count+25)
    }
    let transaction = new EthereumTx(rawTransaction,{ chain: 'goerli' })
    transaction.sign(privateKey)
    console.log("sdgsdsj")
    const serializedTX = transaction.serialize().toString('hex')
    //console.log(serializedTX)
    _web3.eth.sendSignedTransaction('0x' + serializedTX .toString('hex'), function(err, hash) {
    if (!err)
    {
        console.log(hash);
        //success transaction
        //divide 2 
        // Update db with new value
        // upate db status

         db.get(address).then(value => {
          if (value == null)
          {
            console.log("wt")
          }
          else
          {
            let extendTime = parseInt(value) + 4;
            db.set(address,extendTime).then(() => {})
            lastamt = amt;
            var currentamt = lastamt / 2;
            Updatedb(currentamt, address)
          }
           
         })
        return hash;
    }
    else
    {
        console.log(err);
        return "failed";
    }
});
  })
  //return
}


const db = new Database()


app.get('/lock/:dynamic',(req,res)=>{
  

  const {dynamic}  = req.params
  db.get(dynamic).then(value => {
    
    if(value == null)
    {
      db.set(dynamic, "0").then(() => {})
      
    } 
    else
    {
      var d_day = parseInt(value) + StartDay; 
   console.log(d_day)
      var my_countDownDate = new Date(`Apr ${d_day}, 2023 15:37:52`).getTime();

      var my_now = new Date().getTime();
      var s_timeleft = my_countDownDate - my_now;
  
      var s_hours = Math.floor((s_timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 
  60));
      
      let individualTime;
      console.log("hours : " + s_hours)
      if(s_hours > 1)
         individualTime = "false";
      else
         individualTime = "true";

       let _mainTime;
      if(days > 0)
      {
        _mainTime = "false";
      }
      else
      {
        _mainTime = "true";
      }
      
        res.status(200).json({individualLock: individualTime,
                              mainLock: _mainTime})
    }
  })
  console.log(dynamic)
  //Amt=CheckWhitelisted(dynamic)
 
})


app.get('/info/:dynamic',(req,res)=>{
 
  
  const {dynamic}  = req.params
  console.log(dynamic)
  //Amt=CheckWhitelisted(dynamic)
  let promise = selectRow(dynamic).then(results =>{
     res.status(200).json({info: results.sts, name:"booombox",value:results.amt})
  })
 
})

app.get('/trans/:dynamic',(req,res)=>{
 //const filePath = path.resolve(__dirname, 'index.html')
 //const key=process.env['Priv_key']
 //res.render(filePath,{name:key})
  const {dynamic}  = req.params
  console.log(dynamic)
  //Amt=CheckWhitelisted(dynamic)
  let promise = selectRow(dynamic).then(results =>{
     res.status(200).json({info: results.sts, name:"booombox",tx: claim(dynamic,results.amt),value: results.amt })
  })
 
  
})

app.listen(8484, () =>{
  console.log("server is running")
})