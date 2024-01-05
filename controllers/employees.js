const { prisma } = require('../prisma/prisma-client')
const brypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all = async (req, res) => {
  try{
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees)
  }
  catch{
    res.status(400).json({message: "Не удалось получить сотрудников"})
  }
}

const add = async (req, res)=>{
    try{
        const data =req.body
        if(!data.firstName || !data.lastName || !data.age || !data.adress){
            return   res.status(400).json({message: "Все поля обязательны"})
        }
        const employee=  await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        });
       
        res.status(200).json(employee)
      }
      catch{
        res.status(500).json({message: "Не удалось создать сотрудника"})
      }
}

const remove=async (req, res)=>{
   try{
    const { id } = req.params
    console.log(id)
    const employee = await prisma.employee.delete({
        where:{
            id,
        },
    })
    return res.status(200).json(employee)
}catch{
    res.status(500).json({message: "Не удалось удалить сотрудника"})
 }
}

const edit = async (req, res) =>{
    try{
        const data = req.body
        const id = data.id
        const employee = await prisma.employee.update({
            where:{
                id,
            },
            data
        })
        return res.status(200).json(employee)
    }
    catch{
        res.status(500).json({message: "Не удалось изменить сотрудника"})
    }
}

const employee = async (req, res) =>{
    try{
        const {id} = req.params;
   
        const employee = await prisma.employee.findUnique({
            where:{
                id,
            },
        })
        return res.status(200).json(employee)
    }
    catch{
        res.status(500).json({message: "Не удалось найти сотрудника"})
    }
}

module.exports = {
    all,
    add,
    remove,
    edit,
    employee
}