const { users } = require('../models') 
const Op = require("sequelize").Op;

exports.viewUser = async (req, res) => {
    try {
        const user = await users.findAll({
            order : [
                ['createdAt', 'DESC']
            ]
        });

        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alertText = req.flash('alertText');
        const alert = { message: alertMessage, status: alertStatus , text:alertText};
        res.render("user/view", {
            title : "User",
            users: user,
            alert: alert,
            page_name: 'users'
        })
    }
    catch (err) {
        throw err
    }
}

exports.viewAdd = (req, res) => {
    
    req.session.errors = null;
    var a = req.session.errors
    res.render("user/adduser", {
        title :"User",
        errors : a,
        page_name: 'users'
    })
}

exports.actionCreate = async (req, res) => {

    req.check('name', 'Name Is Request').not().isEmpty();
    req.check('email', 'Email Is Request').not().isEmpty().isEmail();
    req.check('phone_number', 'Phone Number is Request').not().isEmpty();

    var errors = req.validationErrors();
    if(errors) {
        
        res.render("user/adduser", {
            title :"User",
            page_name: 'users',
            errors : errors
        })
        console.log(errors);
    }
    else {
        const { name, email, phone_number, gender} = req.body;
    
        await users.create({
            name: name,
            email: email,
            phone_number : phone_number,
            gender: gender,
            status : "Non-active"
        });
        
        req.flash('alertMessage', `Data Users : ${name}`);
        req.flash('alertText', 'Success Added');
        req.flash('alertStatus', 'success');
        res.redirect("/users");
    }
    
}

exports.viewEdit = async (req, res) => {
    const { id } = req.params;
    const user = await users.findOne({ where: { id: {[Op.eq]: id} } });
    res.render("user/edituser", {
        title :"User",
        user: user,
        page_name: 'users'
    })
}

exports.actionUpdate = async (req, res) => {
    const { id, name, email, phone_number, gender} = req.body;

    const updateuser = await users.findOne({
        where : {
            id: { [Op.eq]: id }
        }
    })

    if(updateuser) {
        updateuser.name = name
        updateuser.email = email
        updateuser.phone_number = phone_number
        updateuser.gender = gender

        await updateuser.save()
    }
    req.flash('alertMessage', `Data Users : ${name}`);
    req.flash('alertText', 'Success Updated');
    req.flash('alertStatus', 'success');
    res.redirect('/users')
}

exports.actionUpdateStatus = async (req, res) => {
    const { id } = req.params;

    const statususer = await users.findOne({
        where : {
            id: { [Op.eq]: id }
        }
    })

    if (statususer.status === "Active") {
        statususer.status = "Non-active";
        await statususer.save();
        req.flash('alertMessage', `Data Users : ${statususer.name}`);
        req.flash('alertText', 'Data Non-Active');
        req.flash('alertStatus', 'error');
        res.redirect("/users");
    } else if (statususer.status === "Non-active") {
        statususer.status = "Active";
        await statususer.save();
        req.flash('alertMessage', `Data Users : ${statususer.name}`);
        req.flash('alertText', 'Data Active');
        req.flash('alertStatus', 'success');
        res.redirect("/users");
    }
}

exports.actionDelete = async (req, res) => {
    const { id } = req.params;
    const deleteuser = await users.findOne({
        where : {
            id: { [Op.eq]: id }
        }
    })
    await deleteuser.destroy().then(() => {
        
        res.redirect('/users');
    })
}