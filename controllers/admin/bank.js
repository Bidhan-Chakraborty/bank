const Bank = require('../../models').bank;
const Branch = require('../../models').branch;
const fs = require("fs");
const fastcsv = require("fast-csv");
const { like } = require("sequelize").Op;
const { ErrorHandler } = require('../../helpers/error');

exports.importCSV = async (req,res,next) => {
    try{
        let path = __basedir+"/public/bank_branches.csv"
        let stream = fs.createReadStream(path);
        let csvData = [];
        let csvStream = fastcsv
        .parse()
        .on("data", function(data) {
            csvData.push(data);
        })
        .on("end", async function() {
            csvData.shift();
            for( const branchData of csvData){
                let bank = await Bank.findByPk(branchData[1])
                if(!bank){
                    let bankData = {
                        id : branchData[1],
                        name : branchData[7]
                    }
                    bankItem = await Bank.create(bankData)
                }
                branchDataItem = {
                    bank_id : branchData[1],
                    branch : branchData[2],
                    ifsc : branchData[0],
                    city : branchData[4],
                    state : branchData[6],
                    district : branchData[5],
                    address : branchData[3]
                }
                branchItem = await Branch.create(branchDataItem)
            }
            res.status(200).json({ error: false, data: {}, msg : 'success' });
        });
        stream.pipe(csvStream);
    }catch(err){
        return next(err); 
    }
}

exports.getAutocompleteBranches = async (req,res,next) => {
    try{
        const searchText = req.query.q
        const limit = parseInt(req.query.limit)
        const offset = parseInt(req.query.offset)
        const branches = await Branch.findAll({
            attributes: {
                exclude: ['id']
            }, 
            order: [
                ['ifsc', 'asc']
            ],
            where : {
                branch : {
                    [like] : `%${searchText}%`
                }
            },
            offset:offset,
            limit : limit
        })
        res.status(200).json({ branches : branches });
    }catch(err){
        return next(err); 
    }
} 

exports.getBranches = async (req,res,next) => {
    try{
        const branch = req.query.q
        const limit = parseInt(req.query.limit)
        const offset = parseInt(req.query.offset)
        const branches = await Branch.findAll({
            attributes: {
                exclude: ['id']
            }, 
            order: [
                ['ifsc', 'asc']
            ],
            where : {
                branch : branch
            },
            offset:offset,
            limit : limit
        })
        res.status(200).json({ branches : branches });
    }catch(err){
        return next(err); 
    }
} 