const data = {
    users: [
        {
            name: "saiful islam",
            userId: '',
            email: "saifulislam@gmail.com",
            password: "Saiful0123456@",
            phone: "+8801855544679",
            address: "comilla, Chittagong",
            image: 'default.png',
            nidBirth: 'default.png',
            gender: 'male',
        },
        {
            name: "Islam",
            userId: '',
            email: "islam123@gmail.com",
            password: "Saiful0123456@",
            phone: "+8801855544670",
            address: "Feni, Chittagong",
            image: 'default.png',
            nidBirth: 'default.png',
            gender: 'female',
        },
        {
            name: "Arafat",
            userId: '',
            email: "arafat234@gmail.com",
            password: "Saiful0123456@",
            phone: "+8801855544675",
            address: "B-Baria, Chittagong",
            image: 'default.png',
            nidBirth: 'default.png',
            gender: 'male',
        },
    ],
}
data.users.forEach((user, index) => {
    const uniqueNumber = String(index + 1).padStart(5, '00100'); 
    user.userId = `HTPBD-${uniqueNumber}`; 
});


module.exports = data; 